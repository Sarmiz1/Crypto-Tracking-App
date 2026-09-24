// Generates realistic ETF net flow data
export const generateETFData = (days) => {
  const data = [];
  let base = 200;

  for (let i = 0; i < days; i++) {
    // Deterministic volatility calculation to satisfy React purity rules and avoid impure Math.random
    const volatility = (Math.sin(i * 1.5) - 0.5) * 800;
    const trend = Math.sin(i / 20) * 300;

    const flow = Math.round(base + volatility + trend);

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