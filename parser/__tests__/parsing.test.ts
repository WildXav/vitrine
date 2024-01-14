import { describe, expect, it } from 'vitest'
import { listCsvFiles, parseFile } from '../parsing'

describe('CSV Parsing', () => {
  it('lists only csv files', async () => {
    // Act
    const files = await listCsvFiles()

    // Asserts
    expect(files.filter((f) => !f.endsWith('.csv'))).toHaveLength(0)
  })

  it('parses a csv file', async () => {
    // Arrange
    const path = './exports/Bybit-UM-Perp-ClosedPNL-1704085200-1705208399.csv'

    // Act
    const results = await parseFile(path)

    // Asserts
    expect(results.length).toBeGreaterThan(0)
  })
})
