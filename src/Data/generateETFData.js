// Generates realistic ETF net flow data
// Generates realistic ETF net flow data deterministically
export const generateETFData = (days) => {
  const data = [];
  const base = 200;
  // Fixed base date anchor to maintain purity
  const baseTimestamp = 1700000000000;

  for (let i = 0; i < days; i++) {
    // Deterministic pseudo-randomness based on index 'i' to preserve React component purity
    const pseudoRandom = Math.sin(i * 12.9898 + 78.233);
    const volatility = pseudoRandom * 400;
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