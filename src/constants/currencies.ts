import { DICTIONARY } from "./dictionary"

const EUR = 'EUR'
const GBP = 'GBP'
const USD = 'USD'

export const CURRENCIES = {
  EUR,
  GBP,
  USD
}

export const currenciesData = [
  { key: EUR, value: EUR, flag: 'eu', text: DICTIONARY.EUR },
  { key: GBP, value: GBP, flag: 'uk', text: DICTIONARY.GBP },
  { key: USD, value: USD, flag: 'us', text: DICTIONARY.USD },
]
