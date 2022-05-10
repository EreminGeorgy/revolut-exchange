import { CURRENCIES } from '../constants/currencies'

import { formatCurrencyString } from './formatCurrencyString'

test('should return formatted string', () => {
  const value = formatCurrencyString('10.12', CURRENCIES.USD)
  expect(value).toBe('$10.12')
})