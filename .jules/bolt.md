## 2025-05-18 - Memoizing heavy sync data generation in Dashboard components
**Learning:** `CryptoETFsNetFlow.jsx` calculated mock datasets of 30d, 365d, and 5y (totaling >2,200 objects) inline on every render. Wrapping these generator functions in `useMemo` avoids redundant allocations and GC churn on every state update or theme toggle.
**Action:** Always check components generating large datasets inline during render and wrap them in `useMemo`.
