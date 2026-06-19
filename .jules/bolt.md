## 2025-05-15 - Context Value Memoization
**Learning:** In a large React application, failing to memoize the context provider's `value` prop causes the entire application tree to re-render whenever any state in the provider updates. Nested object memoization within the context value is necessary but insufficient if the top-level `value` object itself is not memoized.
**Action:** Always wrap the context `value` object in `useMemo` and ensure all sub-objects (e.g., data from fetches) are also memoized to maintain reference stability for consumers.

## 2025-05-15 - React.memo with Context Consumers
**Learning:** Components that call `useContext` will always re-render when the context value changes, even if they are wrapped in `React.memo`.
**Action:** Use a "Content" component pattern where the parent consumes the context and passes only the required, stable values to a memoized child component to effectively skip re-renders.
