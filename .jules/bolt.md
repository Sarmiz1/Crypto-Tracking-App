# Bolt's Journal

## 2025-05-18 - Heavy ETF Data Generation on Re-renders
**Learning:** Generating mock ETF datasets (over 2,200 objects with Date calculations and formatting) synchronously during component render without `useMemo` creates high memory churn and re-render lag.
**Action:** Wrap large mock dataset generators in `useMemo` and ensure data generators use deterministic mathematical functions rather than `Math.random()` to preserve React purity and prevent garbage collection pressure.
