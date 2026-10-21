## 2026-10-21 - Memoize ETF Data Generation in CryptoETFsNetFlow
**Learning:** Generating synchronous dataset arrays (over 2,200 objects) with date calculations on every component render pass creates significant allocation overhead and chart re-render cascades. Using `useMemo` for dataset generation along with deterministic mathematical functions instead of `Math.random()` preserves component idempotency and satisfies React purity ESLint rules.
**Action:** Always wrap large dataset generators in `useMemo` and avoid `Math.random()` in data generators used in render paths or `useMemo`.
