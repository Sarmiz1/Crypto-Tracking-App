## 2025-05-14 - Context and Table Memoization
**Learning:** Found that the root context was causing app-wide re-renders because the value object was recreated on every render. Also, large tables were re-rendering unnecessarily during scroll-triggered state updates in the parent component.
**Action:** Memoize the context value with `useMemo` and wrap performance-critical components like `CustomTable` and its sub-components in `React.memo`. Move context definition to a separate file to support Fast Refresh and satisfy naming conventions.
