// Generates realistic ETF net flow data
// Generates realistic ETF net flow data deterministically to adhere to React purity rules
export const generateETFData = (days) => {
  const data = [];
  let base = 200;

  // Static starting date to avoid Date.now() / dynamic new Date() during render/memo evaluation
  const baseDate = new Date("2025-01-01T00:00:00Z");

  for (let i = 0; i < days; i++) {
    // Deterministic pseudo-randomness based on index for purity
    const volatility = Math.sin(i * 1.5) * 400;
    const trend = Math.sin(i / 20) * 300;

    const flow = Math.round(base + volatility + trend);

    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() - (days - i));

    data.push({
      date: date.toLocaleDateString(),
      flow,
      type: flow >= 0 ? "positive" : "negative",
    });
  }

  return data;
};