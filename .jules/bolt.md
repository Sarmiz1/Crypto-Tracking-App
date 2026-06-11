## 2025-06-11 - Stabilizing App Context and Metric Rendering

**Learning:** Re-renders in React applications are often caused by unstable Context value objects. Even if the data hasn't changed, a new object reference triggers all consumers. Memoizing the context value and its sub-objects is essential. Furthermore, components that use complex data (like charts in MetricCards) should be isolated using `React.memo` and stable prop references to prevent redundant rendering during unrelated state updates (like tab switching).

**Action:** Always wrap Context Provider values in `useMemo`. Ensure that sub-objects within the context are also independently memoized so that consumers can depend on stable references. Use `React.memo` for heavy leaf components and verify stability with profiling.
