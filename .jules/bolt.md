## 2026-06-06 - Context Re-render Isolation
**Learning:** Even with memoized context values, a single frequently updating field (like 'tabValue') in a global context triggers re-renders in all consumers. Memoizing the context value sub-objects helps, but the final value reference still changes.
**Action:** Use a 'Content-component' pattern where a wrapper consumes context and passes stable props to a React.memo-wrapped inner component to achieve true render isolation.
