# Bolt's Performance Journal

## 2025-06-15 - Context Reference Stability vs Consumer Rendering
**Learning:** Bundling rapidly changing UI state (like `tabValue`) with stable API data (like `globalMetrics`) in a single context value object forces every context consumer to re-render. Even if the data sub-objects are memoized individually using `useMemo` in the provider, the root context reference itself must change when the UI state changes.
**Action:** Lift the context consumption to a thin wrapper component and pass the stable sub-objects down as props to inner components wrapped in `React.memo`. This guarantees that the heavy rendering logic completely skips execution on unrelated state updates.
