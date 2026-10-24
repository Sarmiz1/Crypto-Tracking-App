// Generates realistic ETF net flow data using deterministic pseudo-random variation
export const generateETFData = (days) => {
  const data = [];
  const base = 200;
  const now = new Date();

  for (let i = 0; i < days; i++) {
    // Pure, deterministic pseudo-random fluctuation based on index
    const pseudoRandom = Math.sin(i * 12.9898 + days * 78.233);
    const randomVolatility = pseudoRandom * 400;
    const trend = Math.sin(i / 20) * 300;

    const flow = Math.round(base + randomVolatility + trend);

    const date = new Date(now);
    date.setDate(now.getDate() - (days - i));

    data.push({
      date: date.toLocaleDateString(),
      flow,
      type: flow >= 0 ? "positive" : "negative",
    });
  }

  return data;
};
