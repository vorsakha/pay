import { format } from "date-fns";

const formatMoney = (amount?: number, currencyCode?: string) => {
  return `${(amount || 0).toLocaleString(undefined, {
    style: "currency",
    currency: currencyCode === "USDC" ? "USD" : currencyCode || "USD",
  })}`;
};

const formatDate = (date?: string) => {
  if (!date) return "";

  const dateObject = new Date(date);

  return format(dateObject, "MMM d");
};

export { formatMoney, formatDate };
