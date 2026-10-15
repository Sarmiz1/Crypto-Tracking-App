## 2025-05-20 - Memoizing Large Generated Datasets in Chart Components
**Learning:** Synchronously generating over 2,200 objects with `new Date()` and date string formatting on every render (e.g. in `CryptoETFsNetFlow.jsx`) causes significant CPU overhead and memory churn. Using `Math.random()` in data generators also violates React 19 component purity rules and causes chart data flickering.
**Action:** Replace `Math.random()` with deterministic trigonometric formulas (`Math.sin`) and wrap dataset generation in `useMemo` to eliminate unnecessary object allocations during component re-renders.
