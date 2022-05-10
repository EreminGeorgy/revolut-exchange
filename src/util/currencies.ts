export const formatCurrencyString = (value: string, locale: string): string => {

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: "code"
  });

  return formatter.format(Number(value)).replace("USD", "").trim()
}