import type { Plugin } from 'vite'
import { parsePnls } from './parsing'
import dayjs from 'dayjs'
import { TradeData } from './interfaces'
import { computeEvolution, computeStats } from './compute'
import { promises as fs } from 'fs'

export default function ExportParserPlugin(): Plugin {
  return {
    name: 'export-parser',
    buildStart: generateTradeData,
    buildEnd: resetJsonFile,
  }
}

async function generateTradeData(): Promise<void> {
  console.log('\nPnL parser: Generating trade_data.json...')
  const tradesPnl = await parsePnls()

  const data: TradeData = {
    updatedAt: dayjs().unix(),
    profitEvolution: computeEvolution(tradesPnl),
    stats: {
      overall: computeStats(tradesPnl),
      monthly: computeStats(tradesPnl, 'M'),
      weekly: computeStats(tradesPnl, 'w'),
    },
  }
  await fs.writeFile('./src/trade_data.json', JSON.stringify(data), 'utf8')
}

async function resetJsonFile(): Promise<void> {
  console.log('\nPnL parser: Resetting trade_data.json')
  const data: TradeData = {
    updatedAt: 0,
    profitEvolution: computeEvolution([]),
    stats: {
      overall: computeStats([]),
      monthly: computeStats([]),
      weekly: computeStats([]),
    },
  }
  await fs.writeFile('./src/trade_data.json', JSON.stringify(data), 'utf8')
}
