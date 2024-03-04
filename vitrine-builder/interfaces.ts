export interface BybitPnlList {
  nextPageCursor?: string
  category: 'linear' | 'inverse'
  list: BybitPnl[]
}

export interface BybitPnl {
  symbol: string
  orderType: string
  leverage: string
  updatedTime: string
  side: 'Buy' | 'Sell'
  orderId: string
  closedPnl: string
  avgEntryPrice: string
  qty: string
  cumEntryValue: string
  createdTime: string
  orderPrice: string
  closedSize: string
  avgExitPrice: string
  execType: string
  fillCount: string
  cumExitValue: string
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
