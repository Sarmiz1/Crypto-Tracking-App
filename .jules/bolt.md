## 2025-05-18 - ETF Net Flow Dataset Memoization Pattern
**Learning:** In `CryptoETFsNetFlow.jsx`, dataset generation (`generateETFData`) generates over 2,200 objects (for 30d, 1y, and 5y windows) synchronously on every render. Wrapping these calls in `useMemo` avoids redundant data allocation and array generation during component re-renders.
**Action:** Wrap synchronous mock dataset generators in `useMemo` and ensure underlying mock data generators use pure deterministic math (e.g., `Math.sin(i)`) rather than `Math.random()` to comply with React purity rules.
