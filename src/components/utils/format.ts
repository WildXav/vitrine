export function formatPct(pct: number, fractionDigits: number): string {
  return `${(pct * 100).toFixed(fractionDigits)}%`
}
