## 2025-05-18 - Heavy ETF Mock Dataset Allocation in CryptoETFsNetFlow

**Learning:** In `CryptoETFsNetFlow.jsx`, synchronously calling `generateETFData` for 30, 365, and 1825 days created 2,220 objects and Date instances on every render cycle. Additionally, mock generators using `Math.random()` violate React purity rules when used with `useMemo`.

**Action:** Wrap mock data generation in `useMemo` and use deterministic functions (e.g. `Math.sin(i)`) in mock generators to maintain React purity and avoid redundant memory allocation on state updates.
