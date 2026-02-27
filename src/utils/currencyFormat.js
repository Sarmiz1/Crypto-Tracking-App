const currencyFormat = (currency) => {
  return currency?.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default currencyFormat;