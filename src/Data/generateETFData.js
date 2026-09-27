// Generates realistic ETF net flow data
// Generates realistic ETF net flow data deterministically to ensure React purity
export const generateETFData = (days) => {
  const data = [];
  let base = 200;
  // Use a fixed reference timestamp for consistent dates across renders
  const baseTime = 1704067200000; // Jan 1, 2024

  for (let i = 0; i < days; i++) {
    // Deterministic pseudo-random variation based on index i
    const pseudoRandom = Math.sin(i * 12.9898) * 43758.5453;
    const volatility = ((pseudoRandom - Math.floor(pseudoRandom)) - 0.5) * 800;
    const trend = Math.sin(i / 20) * 300;

    const flow = Math.round(base + volatility + trend);

    const date = new Date(baseTime - (days - i) * 86400000);

    data.push({
      date: date.toLocaleDateString("en-US"),
      flow,
      type: flow >= 0 ? "positive" : "negative",
    });
  }

  return data;
};