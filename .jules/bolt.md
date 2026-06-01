## 2026-06-01 - Context Memoization & Component Decoupling
**Learning:** Bundling frequent UI state (tabValue) with stable data in a single context provider triggers app-wide re-renders. Component-level memoization (React.memo) on consumers is ineffective unless they are decoupled from the context or the context value itself is strictly memoized.
**Action:** Memoize context provider values into stable sub-objects. Use a "wrapper component" pattern to extract only needed context data and pass it as props to a memoized implementation component.
