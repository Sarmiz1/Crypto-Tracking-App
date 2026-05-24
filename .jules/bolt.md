## 2026-05-24 - Context Memoization & Component Isolation
**Learning:** Bundling frequently changing UI state (like `tabValue`) with stable application data in a single context triggers unnecessary re-renders in all consumers. Memoizing the context value itself doesn't prevent re-renders in `useContext` callers when any field changes.
**Action:** Use a "Wrapper + Memoized Child" pattern to isolate components from unrelated context updates. Extract necessary data in the wrapper and pass to a `React.memo` child to ensure stable props and skip redundant renders.
