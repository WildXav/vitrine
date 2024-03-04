import { BybitPnl, PeriodData } from './interfaces'
import dayjs from 'dayjs'

export function computeEvolution(tradesPnl: BybitPnl[]): number[] {
  const evolution: number[] = []
  tradesPnl.forEach((tradePnl, i) => {
    evolution[i] = Number(tradePnl.closedPnl) + (evolution[i - 1] ?? 0)
  })
  return evolution
}

export function computeStats(pnls: BybitPnl[], startOf?: 'M' | 'w'): PeriodData {
  const from = startOf ? dayjs().startOf(startOf).valueOf() : 0
  const periodPnls = pnls.filter((pnl) => Number(pnl.updatedTime) > from)

  const winners = periodPnls.filter((pnl) => Number(pnl.closedPnl) > 0)
  const losers = periodPnls.filter((pnl) => Number(pnl.closedPnl) < 0)
  const winrate = periodPnls.length ? winners.length / periodPnls.length : 0
  const avgWin = winners.length
    ? winners.reduce((a, b) => a + Number(b.closedPnl), 0) / winners.length
    : 0
  const avgLoss = losers.length
    ? losers.reduce((a, b) => a + Number(b.closedPnl), 0) / losers.length
    : 0
  const longPnl = periodPnls
    .filter((pnl) => pnl.side === 'Sell')
    .reduce((a, b) => a + Number(b.closedPnl), 0)
  const shortPnl = periodPnls
    .filter((pnl) => pnl.side === 'Buy')
    .reduce((a, b) => a + Number(b.closedPnl), 0)
  const expectancy = periodPnls.length ? winrate * avgWin - (1 - winrate) * avgLoss : 0

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
