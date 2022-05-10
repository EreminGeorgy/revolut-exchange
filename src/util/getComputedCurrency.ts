export function getComputedCurrency(value: string, rate: number, direct?: boolean): string {
  const cash = direct ? (Number(value) * rate) : (Number(value) / rate)
  return (Math.floor(cash * 100) / 100 ).toString()
}