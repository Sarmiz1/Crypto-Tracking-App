## 2025-05-18 - Memoize ETF Net Flow dataset generation
**Learning:** In `CryptoETFsNetFlow.jsx`, dataset generation functions (`generateETFData`) created over 2,200 objects with date conversions and calculations synchronously on every render. Wrapping these calls in `useMemo` hooks eliminated 2,200+ object allocations per re-render.
**Action:** Always inspect sub-components that generate mock/time-series datasets synchronously on render and wrap them in `useMemo`.
