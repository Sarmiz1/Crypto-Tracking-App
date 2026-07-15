## 2025-05-14 - Context Splitting for Performance
**Learning:** Bundling UI state (like tabValue) with stable application data in a single context object causes unnecessary re-renders in all consumers. Memoizing the context value and splitting components into a context-consuming wrapper and a memoized 'Content' component effectively isolates these re-renders.
**Action:** Always check if context contains both high-frequency UI state and stable data; use memoized sub-components to protect heavy rendering logic.
