## 2025-05-20 - [CryptoETFsNetFlow data generation memoization]
**Learning:** `generateETFData` constructs over 2,200 objects synchronously (30d, 365d, 1825d) on every render of `CryptoETFsNetFlow`. Calling this inside render without `useMemo` wastes allocation and array generation time on every tab switch or parent update.
**Action:** Always wrap synchronous mock/static dataset generators that generate multi-year data points in `useMemo(() => generateETFData(...), [])` to isolate data generation from UI re-renders.
