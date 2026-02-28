/**
 * Formats a large number into a compact, human-readable string with abbreviations.
 * Examples:
 *   formatNumber(1234567)     → "1.23M"
 *   formatNumber(2346106498138) → "2.35T"
 *   formatNumber(1500, 0)     → "1.5K"
 *   formatNumber(-987654321)  → "-987.65M"
 *   formatNumber(1000000000000) → "1T"
 *
 * @param {number} num - The number to format
 * @param {number} [decimals=2] - Number of decimal places (default 2)
 * @returns {string} Formatted number with abbreviation
 */
function formatNumber(num, decimals = 2) {
  if (num === 0) return "0";
  if (!num || isNaN(num)) return "N/A";

  const absNum = Math.abs(num);
  const sign = num < 0 ? "-" : "";

  const tiers = [
    { value: 1e15, suffix: "Q" },   // Quadrillion
    { value: 1e12, suffix: "T" },   // Trillion
    { value: 1e9,  suffix: "B" },   // Billion
    { value: 1e6,  suffix: "M" },   // Million
    { value: 1e3,  suffix: "K" },   // Thousand
    { value: 1,    suffix: "" },
  ];

  for (const tier of tiers) {
    if (absNum >= tier.value) {
      const scaled = absNum / tier.value;
      const rounded = scaled.toFixed(decimals);
      // Remove trailing zeros after decimal
      const clean = rounded.replace(/\.?0+$/, "");
      return `${sign}${clean}${tier.suffix}`;
    }
  }

  // Fallback for very small numbers
  return num.toFixed(decimals);
}

export function formatLargeDigits(num, currency = "$", decimals = 2) {
  return currency + formatNumber(num, decimals);
}
