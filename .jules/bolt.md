## 2025-05-18 - Memoize coin table transformations for referential stability
**Learning:** Raw API data mapped directly inside component render blocks (such as in `TopCoinTable.jsx` and `TrendingCoinTable.jsx`) re-creates array and object references on every render, invalidating downstream memoization in child components like `CustomTable`.
**Action:** Always wrap data array transformations (`.map()`, `.filter()`) in `useMemo` when passing transformed data to child components.
