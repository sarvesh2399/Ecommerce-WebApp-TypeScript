export const formatMoney = (amountCents) => {
  return `$${(amountCents / 100).toFixed(2)}`;
};
