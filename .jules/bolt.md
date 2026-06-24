## 2026-06-24 - Context Re-render Cascade
**Learning:** Bundling frequently changing UI state (like `tabValue`) with stable application data in a single context `value` object triggers unnecessary re-renders in all context consumers.
**Action:** Use the "Wrapper/Content" pattern with `React.memo` to isolate components from unrelated context updates, and ensure the context provider's value is fully memoized.
