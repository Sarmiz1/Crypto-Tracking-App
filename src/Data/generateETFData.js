// Generates realistic ETF net flow data deterministically
export const generateETFData = (days) => {
  const data = [];
  let base = 200;

  for (let i = 0; i < days; i++) {
    // Deterministic volatility calculation using sine waves instead of Math.random()
    const pseudoRandomVolatility = Math.sin(i * 1.5) * 400;
    const trend = Math.sin(i / 20) * 300;

    const flow = Math.round(base + pseudoRandomVolatility + trend);

    // Fixed base date anchor to ensure consistent output and avoid non-pure render side-effects
    const date = new Date(1700000000000 + i * 86400000);

    data.push({
      date: date.toLocaleDateString(),
      flow,
      type: flow >= 0 ? "positive" : "negative",
    });
  }

  return data;
};
