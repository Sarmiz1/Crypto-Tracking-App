## 2026-03-22 - Memoize dataset generation in CryptoETFsNetFlow
**Learning:** In `CryptoETFsNetFlow.jsx`, synchronous generation of 2,225 items across 3 datasets (`generateETFData`) on every render causes wasted CPU cycles and garbage collection overhead during UI interactions like tab switches.
**Action:** Wrap heavy mock/data generation logic in `useMemo` in UI components when dataset parameters are constant to prevent unnecessary allocations on re-renders.
