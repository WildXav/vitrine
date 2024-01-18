export interface BybitPnlRecord {
  Contracts: string
  'Trade Type': string
  Qty: string
  'Entry Price': string
  'Realized P&L': string
  'Filled Price': string
  'Exit Type': string
  'Filled/Settlement Time(UTC+0)': string
  'Create Time': string
}

export interface TradePnl {
  type: 'Long' | 'Short'
  filledTime: number
  pnl: number
}

export interface TradeData {
  updatedAt: number
  profitEvolution: number[]
  stats: {
    overall: PeriodData
    monthly: PeriodData
    weekly: PeriodData
  }
}

export interface PeriodData {
  winners: number
  losers: number
  winrate: number
  expectancy: number
  longPnl: number
  shortPnl: number
  avgWin: number
  avgLoss: number
}
