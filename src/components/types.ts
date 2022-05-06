import { CURRENCIES } from "../constants/currencies"

export type InputState = {
  main: string,
  dependent: string,
}

export type WalletsState = {
  [index in CURRENCIES]: number
}