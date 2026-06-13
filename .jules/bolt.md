## 2026-06-13 - Context Memoization & Component Decoupling
**Learning:** Memoizing the context value object in `AppContextProvider` prevents re-renders only if the value reference remains stable. However, frequently changing UI state (like `tabValue`) in the same context will still trigger re-renders in all consumers.
**Action:** Use a memoized sub-component pattern (`React.memo`) for expensive components to isolate them from unrelated context updates, and ensure all data passed to them is either stable or primitive.
