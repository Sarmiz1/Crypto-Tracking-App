## 2026-10-30 - Memoizing synchronous dataset generation in CryptoETFsNetFlow
**Learning:** In components rendering data charts over multiple timeframe windows (30d, 1y, 5y), calling synchronous data generator functions directly inside the component body creates over 2,200 objects on every render pass (e.g., whenever tab selections or parent state change).
**Action:** Wrap dataset generation calls in `useMemo` with empty dependency arrays (`[]`) to ensure the array structures are allocated once and preserved across re-renders.
