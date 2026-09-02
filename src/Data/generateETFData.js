// Generates realistic ETF net flow data
export const generateETFData = (days) => {
  const data = [];
  let base = 200;

  for (let i = 0; i < days; i++) {
    // Use index-based deterministic math function for component purity & idempotency
    const mockVolatility = (Math.sin(i * 0.7) - 0.5) * 800;
    const trend = Math.sin(i / 20) * 300;

    const flow = Math.round(base + mockVolatility + trend);

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