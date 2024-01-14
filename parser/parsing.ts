import { promises as fs } from 'fs'
import { parse } from 'csv-parse/sync'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import * as path from 'path'
import { BybitPnlRecord, TradePnl } from './interfaces'

dayjs.extend(utc)

const dirPath = './exports'

export async function listCsvFiles(): Promise<string[]> {
  return (await fs.readdir(dirPath)).filter((filename) => filename.endsWith('.csv'))
}

export async function parsePnls(): Promise<TradePnl[]> {
  const filesPath = (await listCsvFiles()).map((file) => path.join(dirPath, file))
  return (await Promise.all(filesPath.map(parseFile)))
    .flat()
    .sort((a, b) => a.filledTime - b.filledTime)
}

export async function parseFile(path: string): Promise<TradePnl[]> {
  const content = await fs.readFile(path)
  const records: BybitPnlRecord[] = parse(content, { columns: true, skip_empty_lines: true })
  return records.map((r) => ({
    type: r['Trade Type'] === 'BUY' ? 'Short' : 'Long',
    filledTime: dayjs.utc(r['Filled/Settlement Time(UTC+0)'], 'HH:mm YYYY-MM-DD').unix(),
    pnl: Number.parseFloat(r['Realized P&L']),
  }))
}
