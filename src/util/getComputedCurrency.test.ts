import { getComputedCurrency } from './getComputedCurrency'

test('should return formatted string', () => {
  const value = getComputedCurrency('12.34', 2, true)
  expect(value).toBe('24.68')
})