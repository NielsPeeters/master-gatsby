const formatter = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
});

const formatMoney = (cents) => formatter.format(cents / 100);

export default formatMoney;
