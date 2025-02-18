export const formatCurrency = (number: number) =>
  number.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    currencyDisplay: "symbol",
  });
