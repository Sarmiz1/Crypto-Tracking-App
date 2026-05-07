## 2025-05-15 - Context Memoization Pitfall
**Learning:** Wrapping a large context object in a single `useMemo` with many dependencies still causes it to change frequently. Sub-objects within the context (like API data) must be independently memoized to ensure that components consuming them through `React.memo` actually skip renders when unrelated context fields (like theme mode) change.
**Action:** Always break down complex context values into independently memoized sub-objects and ensure `React.memo` components only receive what they need as props.
