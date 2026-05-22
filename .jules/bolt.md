## 2025-05-22 - [Context and Hook Stability]
**Learning:** In a context-heavy application, memoizing the context provider's value is insufficient if the custom hooks supplying that value return new object references on every render.
**Action:** Always wrap returned objects from custom hooks (like useFetch) in useMemo to ensure reference stability for downstream consumers.
