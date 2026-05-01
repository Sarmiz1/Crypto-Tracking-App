## 2025-05-14 - Context and Table Rendering Optimization
**Learning:** In applications with heavy data tables and global state, unmemoized Context values cause app-wide re-render cascades. Separating Context definition from its Provider is necessary for Fast Refresh and circular dependency prevention.
**Action:** Always memoize Context values and wrap expensive sub-components (like table bodies) in React.memo when they depend on external state that might trigger redundant updates.
