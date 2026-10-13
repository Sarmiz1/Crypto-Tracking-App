## 2025-05-20 - Memoizing synchronous mock/synthetic dataset generators
**Learning:** In components rendering timeframe tabs (e.g., `CryptoETFsNetFlow.jsx`), unmemoized dataset generation functions can create thousands of JavaScript objects and Date operations synchronously on every render and tab transition.
**Action:** Wrap dataset generation calls (like `generateETFData`) in `useMemo` with empty dependency arrays (`[]`) so dataset allocation occurs once upon mount rather than blocking the UI during tab switches and re-renders.
