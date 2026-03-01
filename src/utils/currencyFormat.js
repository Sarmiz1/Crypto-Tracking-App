const currencyFormat = (value, options = {}) => {
  const { decimals = 2, symbol = '$' } = options;
  if (value == null || isNaN(value)) return `${symbol}N/A`;
  return symbol + Number(value).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export default currencyFormat;