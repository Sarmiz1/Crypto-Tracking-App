## 2026-06-08 - Context Memoization Bottleneck
**Learning:** An unmemoized context value object in `AppContextProvider` caused application-wide re-render cascades. Even if the data didn't change, the object reference did, triggering all consumers (like `MetricCards` and `CustomTable`) to re-render on every provider update.
**Action:** Always wrap Context Provider values in `useMemo` and ensure all event handlers passed through context are wrapped in `useCallback`.

## 2026-06-08 - React Purity Enforcement
**Learning:** The project's ESLint configuration strictly enforces React purity, prohibiting impure functions like `Math.random()` during render.
**Action:** Use deterministic alternatives like `Math.sin(index)` for stable mock data or sparklines to maintain idempotency and pass linting.
