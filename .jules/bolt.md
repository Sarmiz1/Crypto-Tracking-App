## 2025-05-14 - Context Re-render Cascade Prevention
**Learning:** In this codebase, the global `appContext` was being recreated on every render of `AppContextProvider`, causing all consumer components (tables, cards, nav) to re-render. Memoizing the context value with `useMemo` and event handlers with `useCallback` significantly reduces the component tree noise. Additionally, separating the Context object from the Provider component into a dedicated file (`appContext.js`) is necessary to support Fast Refresh and follow ESLint naming conventions.
**Action:** Always memoize Context values that contain multiple state pieces or frequently updating data. Separate Context definitions from Provider components to avoid circular dependencies and satisfy "Fast Refresh" linting rules.

## 2025-05-14 - Stable Data for Purity
**Learning:** Using `Math.random()` inside a component or `useMemo` violates React's purity rules and triggers ESLint errors (`react-hooks/purity`). It also makes performance profiling harder as data is never stable.
**Action:** Use deterministic functions like `Math.sin(index)` or fixed seed data instead of `Math.random()` for mock charts or visual assets.
