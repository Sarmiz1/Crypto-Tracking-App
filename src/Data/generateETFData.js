// Generates realistic ETF net flow data
export const generateETFData = (days) => {
  const data = [];
  let base = 200;

  for (let i = 0; i < days; i++) {
    // Pure, deterministic pseudo-volatility calculation for render purity
    const pseudoVolatility = Math.sin(i * 12.9898) * 400;
    const trend = Math.sin(i / 20) * 300;

    const flow = Math.round(base + pseudoVolatility + trend);

    const date = new Date();
    date.setDate(date.getDate() - (days - i));

    data.push({
      date: date.toLocaleDateString(),
      flow,
      type: flow >= 0 ? "positive" : "negative",
    });
  }

  return data;
};