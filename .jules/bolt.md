# Bolt's Journal - Critical Learnings

## 2026-09-05 - Memoize Synchronous Data Generators in Component Bodies
**Learning:** Components generating synthetic chart or timeseries data synchronously (e.g. `generateETFData`) allocate hundreds or thousands of objects on every render cycle (such as tab switches or parent re-renders), leading to heavy garbage collection pressure and unnecessary re-computations.
**Action:** Always wrap data generation helper functions in `useMemo` with minimal/empty dependency arrays when parameters are static or derive from primitive props/state.
