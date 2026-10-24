## 2025-05-18 - Memoizing heavy dataset generators in dashboard components
**Learning:** Generating mock or historical datasets synchronously on component render (`generateETFData` creating 2,200+ objects with Date/string operations) blocks the main thread and causes severe render delays whenever component props/tabs change.
**Action:** Wrap heavy mock data generation in `useMemo` and replace impure `Math.random()` with index-based deterministic formulas (`Math.sin`) to maintain React render purity and avoid wasteful object re-allocations.
