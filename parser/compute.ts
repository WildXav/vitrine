import { PeriodData, TradePnl } from './interfaces'
import dayjs from 'dayjs'

export function computeEvolution(tradesPnl: TradePnl[]): number[] {
  const evolution: number[] = []
  tradesPnl.forEach((tradePnl, i) => {
    evolution[i] = tradePnl.pnl + (evolution[i - 1] ?? 0)
  })
  return evolution
}

export function computeStats(tradesPnl: TradePnl[], startOf?: 'M' | 'w'): PeriodData {
  const from = startOf ? dayjs().startOf(startOf).unix() : 0
  const data = tradesPnl.filter((d) => d.filledTime > from)

  const winners = data.filter((d) => d.pnl > 0)
  const losers = data.filter((d) => d.pnl < 0)
  const winrate = data.length ? winners.length / data.length : 0
  const avgWin = winners.length ? winners.reduce((a, b) => a + b.pnl, 0) / winners.length : 0
  const avgLoss = losers.length ? losers.reduce((a, b) => a + b.pnl, 0) / losers.length : 0
  const longPnl = data.filter((d) => d.type === 'Long').reduce((a, b) => a + b.pnl, 0)
  const shortPnl = data.filter((d) => d.type === 'Short').reduce((a, b) => a + b.pnl, 0)
  const expectancy = data.length ? winrate * avgWin - (1 - winrate) * avgLoss : 0

  return {
    winners: winners.length,
    losers: losers.length,
    winrate,
    expectancy,
    longPnl,
    shortPnl,
    avgWin,
    avgLoss,
  }
}
