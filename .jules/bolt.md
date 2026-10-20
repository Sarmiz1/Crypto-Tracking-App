## 2025-05-18 - Memoize ETF Data Generation in CryptoETFsNetFlow
**Learning:** `generateETFData` was generating 2,220+ objects (for 30d, 1y, 5y windows) on every render synchronously. Wrapping the generator calls in `useMemo` and making data generation deterministic eliminates heavy object allocations on re-renders and tab switches while preserving React render purity.
**Action:** Always wrap data generators and array/object transforms in `useMemo` when rendered inside React components, and ensure mock data generators use deterministic math (e.g. `Math.sin(i)`).
