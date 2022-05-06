import { DICTIONARY } from "./dictionary"

export enum CURRENCIES {
  EUR = 'EUR',
  GBP = 'GBP',
  USD = 'USD'
}

export const currenciesData = [
  { key: CURRENCIES.EUR, value: CURRENCIES.EUR, flag: 'eu', text: DICTIONARY.EUR },
  { key: CURRENCIES.GBP, value: CURRENCIES.GBP, flag: 'uk', text: DICTIONARY.GBP },
  { key: CURRENCIES.USD, value: CURRENCIES.USD, flag: 'us', text: DICTIONARY.USD },
]
