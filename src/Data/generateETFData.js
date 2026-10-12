// Generates realistic ETF net flow data deterministically
export const generateETFData = (days) => {
  const data = [];
  const base = 200;

  for (let i = 0; i < days; i++) {
    // Deterministic pseudo-random volatility using sine wave
    const pseudoVolatility = Math.sin(i * 12.34) * 400;
    const trend = Math.sin(i / 20) * 300;

    const flow = Math.round(base + pseudoVolatility + trend);

    const date = new Date(1704067200000); // Stable baseline date (Jan 1 2024)
    date.setDate(date.getDate() - (days - i));

    data.push({
      date: date.toLocaleDateString(),
      flow,
      type: flow >= 0 ? "positive" : "negative",
    });
  }

  return data;
};
