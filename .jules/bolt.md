## 2025-02-23 - Memoizing Sliced/Mapped Context Data in Tables
**Learning:** In table components like `MarketTable.jsx`, wrapping array slicing and mapping logic in `useMemo` prevents unnecessary array re-allocations on unrelated context re-renders.
**Action:** Always wrap array transformations on context data inside `useMemo`.
