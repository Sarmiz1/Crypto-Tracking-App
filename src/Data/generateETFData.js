// Generates realistic ETF net flow data deterministically to maintain purity & reference stability
export const generateETFData = (days) => {
  const data = [];
  let base = 200;

  for (let i = 0; i < days; i++) {
    // Deterministic pseudo-volatility using sine wave components instead of Math.random()
    const pseudoVolatility = (Math.sin(i * 12.9898) * 0.5) * 800;
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