export function getFormattedCurrency(value: number): string {
  const currencyFormatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });

  return currencyFormatter.format(value).replace(",", ".");
}
