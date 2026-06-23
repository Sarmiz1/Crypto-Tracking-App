# Bolt's Journal - Performance Optimization

## 2026-06-23 - AppContext performance bottleneck
**Learning:** The `appContext` bundles frequently changing UI state (like `tabValue`) with stable data fetch results. Because the context value object is recreated on every render and includes dynamic state, all 22 consumers re-render whenever a tab is switched, even if they don't use `tabValue`.
**Action:** Memoize sub-objects in `AppContextProvider` and use `React.memo` in heavy consumer components to isolate them from unrelated context updates.
