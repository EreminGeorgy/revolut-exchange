import { CURRENCIES } from "../constants/currencies";
import { LOCALE } from "../config";

export const formatCurrencyString = (value: string, code: CURRENCIES): string => {

  const formatter = new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: code,
  });

  return formatter.format(Number(value))
}