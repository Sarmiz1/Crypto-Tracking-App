## 2025-06-09 - React Context Re-render Cascade
**Learning:** In applications using a global context for both stable data (API responses) and frequent UI state (tabs, theme), updating UI state triggers a full re-render of all context consumers because the context value object is recreated on every render.
**Action:** Always memoize the context value object and its sub-objects using `useMemo`. Decouple frequently updating data from stable data within the context value to minimize unnecessary re-render triggers in components that only need specific subsets of the data.

## 2025-06-09 - Impure Render Functions
**Learning:** Using `Math.random()` inside a component's render or within `useMemo` violates React's purity rules and triggers ESLint errors in strict configurations. This causes unstable results during re-renders.
**Action:** Use deterministic functions like `Math.sin(index)` for mock or placeholder data generation within components and hooks.
