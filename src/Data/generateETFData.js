// Generates realistic ETF net flow data
export const generateETFData = (days) => {
  const data = [];
  let base = 200;

  for (let i = 0; i < days; i++) {
    // Deterministic pseudo-random volatility to ensure purity and avoid re-render purity errors
    const pseudoRandom = Math.sin(i * 12.9898) * 0.5;
    const randomVolatility = pseudoRandom * 800;
    const trend = Math.sin(i / 20) * 300;

    const flow = Math.round(base + randomVolatility + trend);

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