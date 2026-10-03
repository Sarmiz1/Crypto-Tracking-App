// Generates realistic ETF net flow data deterministically to maintain purity and idempotency
export const generateETFData = (days) => {
  const data = [];
  let base = 200;

  for (let i = 0; i < days; i++) {
    // Use deterministic mathematical function to ensure render purity and stability
    const pseudoRandomVolatility = Math.sin(i * 1.5) * 400;
    const trend = Math.sin(i / 20) * 300;

    const flow = Math.round(base + pseudoRandomVolatility + trend);

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
