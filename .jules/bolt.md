## 2026-06-20 - [Optimize context and component memoization]
**Learning:** In a global context provider like AppContextProvider, any derived data (like merging two fetch results) must be memoized using useMemo. Otherwise, new references are created on every render, which triggers re-renders in all consumers even if the context value itself is memoized.
**Action:** Always check the dependency chain of context values to ensure all parts are stable. Use the "Memoized Content Pattern" (wrapper + React.memo'd sub-component) to isolate components from unrelated context updates.
