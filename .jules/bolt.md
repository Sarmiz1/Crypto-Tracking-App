# Bolt's Journal

## 2026-07-21 - Lifting Context to parent to enable effective React.memo
**Learning:** When a child component consumes React Context directly, wrapping it in `React.memo` is useless because any update to the context provider's value (e.g., when global UI state changes or unrelated context fields update) triggers a direct, un-skippable re-render of the child. By lifting the context consumption to a parent component (or wrapper) and passing down the destructured, primitive, or stable references via props, the child can be successfully memoized with `React.memo`, eliminating redundant re-renders of heavy lists and charts.
**Action:** Always extract context consumption from heavy rendering components (like tables, grids, list items) to stable parent/wrapper components and pass the values as props so `React.memo` can optimize renders effectively.
