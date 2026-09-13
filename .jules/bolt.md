## 2026-09-13 - Memoize Synchronous Mock Data Generator in Components
**Learning:** In `CryptoETFsNetFlow.jsx`, dataset generation (`generateETFData`) generated over 2,200 objects synchronously on every component render. Memoizing the datasets with `useMemo` avoids redundant calculations, array allocations, and loop executions during tab switches and UI re-renders.
**Action:** Inspect dataset generator functions in dashboard components and memoize dataset creation when mock or static calculated data is generated synchronously inside component bodies.
