// Generates realistic ETF net flow data deterministically
export const generateETFData = (days) => {
  const data = [];
  const base = 200;

  for (let i = 0; i < days; i++) {
    // Deterministic volatility based on index i to maintain React render purity
    const pseudoRandom = Math.sin(i * 12.9898) * 400;
    const trend = Math.sin(i / 20) * 300;

    const flow = Math.round(base + pseudoRandom + trend);

    // Fixed reference date to avoid impure Date.now() or new Date() in render
    const date = new Date(2025, 0, 1);
    date.setDate(date.getDate() - (days - i));

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      flow,
      type: flow >= 0 ? "positive" : "negative",
    });
  }

  return data;
};
