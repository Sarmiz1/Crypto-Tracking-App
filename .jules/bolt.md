# Bolt's Journal - Critical Learnings Only

## 2026-11-09 - Memoizing synchronous large dataset generation
**Learning:** In components rendering data-driven charts like `CryptoETFsNetFlow`, helper functions like `generateETFData` can generate thousands of simulated data objects (e.g., >2,200 objects across 30d, 1y, and 5y windows) synchronously on every render. Because Date mutations and math operations run inside each loop, generating this data unmemoized consumes ~4.8ms of main thread time per render.
**Action:** When working with simulated or generated chart data arrays in dashboard components, wrap dataset generation in `useMemo` with empty dependency arrays (or proper dependencies) to prevent synchronous multi-millisecond main thread blocking on unrelated re-renders.
