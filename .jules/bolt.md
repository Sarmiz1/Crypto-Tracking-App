## 2026-03-29 - Memoize expensive synthetic ETF data generation
**Learning:** `CryptoETFsNetFlow.jsx` generated 2,220 historical data point objects with date math and trigonometric calculations synchronously during render on every tab change or re-render.
**Action:** Always wrap synthetic dataset generators with static parameters in `useMemo` so that dataset computation only runs once on mount rather than blocking the main thread on every render.
