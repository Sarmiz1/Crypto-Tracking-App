# Bolt's Journal - Performance Learnings

## 2026-11-03 - Synthetic Dataset Generation in Render Loops
**Learning:** In dashboard components with time-range controls (like `CryptoETFsNetFlow`), mock/synthetic dataset generation functions (`generateETFData`) were generating arrays totaling over 2,200 objects (for 30d, 1y, and 5y windows) synchronously on every render. Because the user frequently switches tabs or parent theme/data changes re-render the view, unmemoized calls repeatedly trigger expensive Date object allocations and loops.
**Action:** Wrap dataset generation calls in `useMemo(..., [])` to calculate historical series once per mount instead of on every render.
