## 2025-05-14 - Context Re-render Propagation
**Learning:** Wrapping a large application context in a single `useMemo` is insufficient if the context consumers destructure properties directly; any change to the context `value` object reference triggers all `useContext` consumers to re-render. Splitting the context value into memoized sub-objects and using memoized "Content" components that receive props from a context-consuming wrapper is the most effective way to block re-render cascades in MUI-heavy dashboards.
**Action:** Always refactor context-consuming components into a "Wrapper" (handles context) and a "MemoizedContent" (handles UI) to ensure `React.memo` can actually block renders.

## 2025-05-14 - React Purity and Sparklines
**Learning:** Using `Math.random()` inside `useMemo` or the render body to generate mock data for sparklines (e.g., in `MetricCards`) violates React's purity requirements. This causes inconsistent renders and can trigger ESLint errors in some configurations.
**Action:** Use stable indices or deterministic mathematical functions (like `Math.sin(i)`) for generating mock chart data to ensure component idempotency.
