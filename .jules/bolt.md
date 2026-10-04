## 2025-05-18 - Heavy Dataset Generation in Render Loops

**Learning:** Component level mock/dataset generators (like `generateETFData`) that construct thousands of objects synchronously during render degrade rendering speed and create memory churn on every parent/local re-render or tab switch.

**Action:** Always wrap non-trivial mock data generators in `useMemo` with minimal dependencies to prevent redundant array allocations and thread-blocking loop execution during component state transitions.
