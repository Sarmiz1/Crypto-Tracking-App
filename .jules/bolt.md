## 2026-06-29 - Context Value Stabilization
**Learning:** Bundling frequently changing UI state (like `tabValue`) with stable application data in a single context `value` object triggers unnecessary re-renders in all context consumers.
**Action:** Use memoized sub-objects within the context provider and implement the memoized 'Content' component pattern in heavy consumers to isolate them from unrelated context updates.
