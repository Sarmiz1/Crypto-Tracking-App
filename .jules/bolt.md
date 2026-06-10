## 2026-06-10 - Context-Driven Re-render Cascades
**Learning:** In this architecture, bundling dynamic UI state (like `tabValue`) with global data in a single context provider causes every consumer to re-render on any UI interaction. This is especially expensive for list components like `CustomTableBody`.
**Action:** Use `React.memo` on expensive leaf components and refactor them to receive only necessary data as props, passed down from a parent that extracts them from context.
