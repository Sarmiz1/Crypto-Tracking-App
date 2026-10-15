// Generates realistic ETF net flow data deterministically
export const generateETFData = (days) => {
  const data = [];
  const base = 200;
  // Fixed base date to ensure function idempotency and React purity compliance
  const baseDate = new Date("2025-01-01T00:00:00Z");

  for (let i = 0; i < days; i++) {
    // Deterministic pseudo-volatility using Math.sin
    const volatility = Math.sin(i * 1.5) * 400;
    const trend = Math.sin(i / 20) * 300;

    const flow = Math.round(base + volatility + trend);

    const date = new Date(baseDate);
    date.setDate(date.getDate() - (days - i));

    data.push({
      date: date.toLocaleDateString("en-US"),
      flow,
      type: flow >= 0 ? "positive" : "negative",
    });
  }

  return data;
};
