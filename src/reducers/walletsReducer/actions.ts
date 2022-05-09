import { CURRENCIES } from "../../constants/currencies"

export const UPDATE_WALLETS = 'UPDATE_WALLETS'

type Transaction = {
  currency: CURRENCIES
  amount: number
}

export type Exchange = {
  sell: Transaction
  buy: Transaction
}

export type WalletsAction = {
    type: 'UPDATE_WALLETS',
    payload: Exchange,
}