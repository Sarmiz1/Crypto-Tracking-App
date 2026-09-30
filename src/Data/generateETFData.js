// Generates realistic ETF net flow data deterministically
export const generateETFData = (days) => {
  const data = [];
  let base = 200;

  for (let i = 0; i < days; i++) {
    // Use stable deterministic mathematical wave instead of Math.random()
    // to keep function pure for React 19 rendering rules and avoid layout shifts.
    const pseudoRandomVolatility = Math.sin(i * 12.9898 + days) * 400;
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
