
const BN = require('bn.js');
export const decimals = new BN(10).pow(new BN(18));
export const currencyFormatter = (value: number, currency = 'USD', locale = 'en-US') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
}

export const tokenFormatter = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    maximumSignificantDigits: 20,
  }).format(value);
}

export const bigIntFormatter = (value: typeof BN) => {
  let valuesDecimals = new BN(value).div(decimals);
  return new Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 10,
  }).format(BigInt(valuesDecimals));
}