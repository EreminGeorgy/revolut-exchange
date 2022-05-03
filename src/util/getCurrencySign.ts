import { CURRENCIES } from "../constants/currencies"

export const getCurrencySign = (currency: string): string => {
  switch (currency) {
  case CURRENCIES.EUR:
    return '€'
  case CURRENCIES.GBP:
    return '£'
  case CURRENCIES.USD:
    return '$'
  default:
    return ''
  }
}
  