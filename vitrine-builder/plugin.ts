import type { Plugin } from 'vite'
import { BybitPnl, BybitPnlList, TradeData } from './interfaces'
import * as crypto from 'crypto'
import axios from 'axios'
import dayjs from 'dayjs'
import dayOfYear from 'dayjs/plugin/dayOfYear'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import config from '../vitrine.config.json'
import { computeEvolution, computeStats } from './compute'
import * as fs from 'fs'
import simpleGit from 'simple-git'
import * as path from 'path'

dayjs.extend(dayOfYear)
dayjs.extend(LocalizedFormat)

export default function VitrineBuilder(): Plugin {
  return {
    name: 'vitrine-builder',
    buildStart: generateTradeData,
    buildEnd: resetJsonFile,
    writeBundle: pushChanges,
  }
}

const tradeDataPath = path.join('./src', 'trade_data.json')

function getSignature(timestamp: number, parameters: string): string {
  return crypto
    .createHmac('sha256', config.apiSecret)
    .update(`${timestamp}` + config.apiKey + `${config.apiRecvWindow}` + parameters)
    .digest('hex')
}

async function requestPnLs(startTime: number, cursor: string | null): Promise<BybitPnlList> {
  const endpoint = `${config.apiHost}/v5/position/closed-pnl`
  const limit = 100
  const now = Date.now()
  const params = `category=linear&limit=${limit}&startTime=${startTime}${cursor ? `&cursor=${cursor}` : ''}`

  const signature = getSignature(now, params)
  const headers = {
    'X-BAPI-SIGN-TYPE': '2',
    'X-BAPI-SIGN': signature,
    'X-BAPI-API-KEY': config.apiKey,
    'X-BAPI-TIMESTAMP': `${now}`,
    'X-BAPI-RECV-WINDOW': `${config.apiRecvWindow}`,
  }

  return (await axios.get(`${endpoint}?${params}`, { headers })).data.result
}

async function getPnlsForPeriod(startTime: number): Promise<BybitPnl[]> {
  let cursor: string | null = null
  let pnls: BybitPnl[] = []
  do {
    const resp = await requestPnLs(startTime, cursor)
    cursor = resp.nextPageCursor || null
    pnls = [...pnls, ...resp.list]
  } while (cursor !== null)
  return pnls
}

async function generateTradeData(): Promise<void> {
  const pnls: BybitPnl[] = []
  let startDate = dayjs().dayOfYear(1)

  console.log(`Retrieving PnLs from ${startDate.format('LL')}...`)

  while (dayjs().isAfter(startDate)) {
    ;(await getPnlsForPeriod(startDate.valueOf()))
      .filter((pnl) => !pnls.find((p) => p.orderId === pnl.orderId))
      .forEach((pnl) => pnls.push(pnl))
    startDate = startDate.add(6, 'day')
  }
  pnls.sort((a, b) => Number(a.updatedTime) - Number(b.updatedTime))

  console.log(`Done. PnL Count: ${pnls.length}`)

  console.log('Evaluating Performance')
  const data: TradeData = {
    updatedAt: dayjs().unix(),
    profitEvolution: computeEvolution(pnls),
    stats: {
      overall: computeStats(pnls),
      monthly: computeStats(pnls, 'M'),
      weekly: computeStats(pnls, 'w'),
    },
  }
  console.log('Saving Performance Data')
  fs.writeFileSync(tradeDataPath, JSON.stringify(data), 'utf8')
  console.log('Ready to build')
}

async function resetJsonFile(): Promise<void> {
  console.log('\nCleaning up trade_data.json')
  const data: TradeData = {
    updatedAt: 0,
    profitEvolution: computeEvolution([]),
    stats: {
      overall: computeStats([]),
      monthly: computeStats([]),
      weekly: computeStats([]),
    },
  }
  fs.writeFileSync(tradeDataPath, JSON.stringify(data), 'utf8')
}

async function pushChanges(): Promise<void> {
  if (!config.vitrinePageGitSSH) {
    return
  }

  const distPath = './dist'
  const gitDir = '.git'
  const repoDir = 'repo'
  const repoPath = path.join(distPath, repoDir)

  if (config.vitrinePageDomain) {
    console.log('Writing CNAME file')
    fs.writeFileSync(path.join(distPath, 'CNAME'), config.vitrinePageDomain, 'utf8')
  }

  console.log('Updating remote page')

  await simpleGit().clone(config.vitrinePageGitSSH, repoPath)
  fs.readdirSync(repoPath, { withFileTypes: true })
    .filter((file) => file.name !== gitDir)
    .forEach((file) => {
      const fullPath = path.join(file.path, file.name)
      fs.rmSync(fullPath, { recursive: true, force: true })
    })
  fs.readdirSync(distPath, { withFileTypes: true })
    .filter((file) => file.name !== repoDir)
    .forEach((file) => {
      const fullPath = path.join(file.path, file.name)
      const destPath = path.join(file.path, repoDir, file.name)
      fs.cpSync(fullPath, destPath, { recursive: true })
    })
  await simpleGit(repoPath).add('./*').commit('Update Stats').push()

  console.log('Done. Cleaning up')
  fs.rmSync(repoPath, { recursive: true, force: true })
}
