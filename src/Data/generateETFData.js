// Generates realistic ETF net flow data deterministically
export const generateETFData = (days) => {
  const data = [];
  let base = 200;

  for (let i = 0; i < days; i++) {
    // Use deterministic wave function instead of Math.random for component idempotency & performance
    const pseudoVolatility = (Math.sin(i * 1.5) - 0.5) * 800;
    const trend = Math.sin(i / 20) * 300;

    const flow = Math.round(base + pseudoVolatility + trend);

    const date = new Date(2025, 0, 1);
    date.setDate(date.getDate() - (days - i));

    data.push({
      date: date.toLocaleDateString(),
      flow,
      type: flow >= 0 ? "positive" : "negative",
    });
  }

  return data;
};
