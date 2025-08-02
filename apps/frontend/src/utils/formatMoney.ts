export const formatMoney = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

export const formatDistance = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "unit",
    unit: "kilometer",
    unitDisplay: "short",
  }).format(value);
