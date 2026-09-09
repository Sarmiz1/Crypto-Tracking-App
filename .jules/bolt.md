## 2025-05-18 - Memoize mock data generation for large dataset charts
**Learning:** Generating mock datasets (such as 2,200+ items across 30d, 1y, and 5y windows) synchronously on every component render causes heavy array allocation and Date object creation overhead, as well as reference instability for chart components.
**Action:** Wrap large mock dataset generators in `useMemo` and ensure data creation helper functions use pure, deterministic mathematical functions (like `Math.sin(i)`) instead of `Math.random()`.
