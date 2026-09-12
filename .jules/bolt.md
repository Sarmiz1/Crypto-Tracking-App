## 2025-05-20 - Memoizing synchronous ETF data generation
**Learning:** In components rendering large datasets generated on the fly (such as `generateETFData` generating >2,200 objects), wrapping dataset creation in `useMemo` prevents synchronous main thread blocking and array allocations during re-renders. Additionally, using deterministic math functions like `Math.sin` instead of `Math.random` preserves React purity during rendering.
**Action:** Always memoize synchronous dataset generators and avoid impure functions like `Math.random()` during render or inside hooks.
