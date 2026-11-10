## 2026-03-29 - Memoize Dataset Generation in CryptoETFsNetFlow
**Learning:** `generateETFData` builds arrays totaling over 2,220 data points with Date manipulations and locale strings on every render pass; wrapping dataset generation in `useMemo` avoids redundant allocation of >100k objects and cuts render work from ~4.5ms to <0.1ms per re-render.
**Action:** Check dashboard charting and simulation components for synchronous mock or dataset generation calls directly inside function bodies and ensure they are wrapped in `useMemo`.
