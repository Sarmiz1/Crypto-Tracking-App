## 2025-05-18 - Memoize Array Transformation in MarketTable
**Learning:** Slicing and mapping market listing arrays directly inside component renders causes redundant array allocations on every component re-render even when context data is unchanged.
**Action:** Always wrap array slicing, filtering, and mapping in `useMemo` when processing large data arrays in context consumers.
