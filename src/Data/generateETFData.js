// Generates realistic ETF net flow data
export const generateETFData = (days) => {
  const data = [];
  const base = 200;
  // Fixed base timestamp for deterministic dates across renders
  const baseTimestamp = 1700000000000;

  for (let i = 0; i < days; i++) {
    // Deterministic pseudo-volatility using Math.sin instead of Math.random
    const volatility = Math.sin((i + 1) * 12.9898) * 400;
    const trend = Math.sin(i / 20) * 300;

    const flow = Math.round(base + volatility + trend);

    const date = new Date(baseTimestamp - (days - i) * 86400000);

    data.push({
      date: date.toLocaleDateString(),
      flow,
      type: flow >= 0 ? "positive" : "negative",
    });
  }

  return data;
};
