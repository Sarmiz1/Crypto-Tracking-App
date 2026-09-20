## 2025-05-18 - Memoizing Context Consumer Data Transformations
**Learning:** In components like `MarketTable` that consume global context arrays (`cryptoListing.data`), inline array slicing and mapping (`data.slice(12, 35).map(...)`) re-run on every component render and allocate new arrays/objects, causing unnecessary allocations and garbage collection overhead.
**Action:** Always wrap data transformation pipelines (slicing, mapping, filtering) in `useMemo` with minimal required dependencies.
