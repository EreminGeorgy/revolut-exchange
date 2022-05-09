import { CURRENCIES } from '../constants/currencies'

import { getCurrencySign } from './getCurrencySign'

test('should return $ if currency = USD', () => {
  const value = getCurrencySign(CURRENCIES.USD)
  expect(value).toBe('$')
})
test('should return $ if currency = EUR', () => {
  const value = getCurrencySign(CURRENCIES.EUR)
  expect(value).toBe('€')
})
test('should return $ if currency = GBP', () => {
  const value = getCurrencySign(CURRENCIES.GBP)
  expect(value).toBe('£')
})
test('should return nothing if currency = azaza', () => {
  const value = getCurrencySign('azaza' as CURRENCIES)
  expect(value).toBe('')
})