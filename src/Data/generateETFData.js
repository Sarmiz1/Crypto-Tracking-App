// Generates realistic ETF net flow data
export const generateETFData = (days) => {
  const data = [];
  let base = 200;

  for (let i = 0; i < days; i++) {
    // Use deterministic math calculation instead of Math.random to satisfy React purity
    const randomVolatility = Math.sin(i * 1.5) * 400;
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