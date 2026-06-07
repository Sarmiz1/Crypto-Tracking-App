## 2025-05-15 - Context Provider Memoization
**Learning:** Unmemoized context providers cause application-wide re-renders on any state change. Moving context consumption up to parent components and using React.memo on children is essential for isolation.
**Action:** Always wrap Context Provider value in useMemo and memoize complex children that consume global state.
