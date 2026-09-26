## 2025-05-18 - Heavy ETF Data Generation Memoization
**Learning:** In `CryptoETFsNetFlow.jsx`, dataset generation (`generateETFData`) generated over 2,200 objects (for 30d, 1y, and 5y windows) synchronously on every render. Furthermore, calling `Math.random()` inside `generateETFData` violated React component purity.
**Action:** Wrap dataset generation in `useMemo` to preserve array references and eliminate redundant memory allocation during re-renders, and use deterministic trigonometric calculations (`Math.sin(i)`) for mock sparkline/flow data generation.
