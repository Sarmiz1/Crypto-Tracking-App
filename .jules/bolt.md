## 2025-05-18 - Memoizing synchronous mock dataset generation in CryptoETFsNetFlow
**Learning:** `generateETFData` was called synchronously in render scope for 3 timeframes (30d, 1y, 5y), re-generating >2,200 objects on every render/tab change. Wrapping them in `useMemo` avoids redundant allocation.
**Action:** When components require derived mock or static datasets with large element counts, always memoize generation calls to prevent main-thread layout/render lag.
