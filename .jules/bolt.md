## 2025-05-14 - Context Provider Memoization and Component Decoupling
**Learning:** Unmemoized Context Providers trigger re-renders in all consumers whenever any state in the provider updates. Even with a memoized provider value, a consumer will re-render if it accesses the context and the provider re-renders, unless the consumer itself or its sub-tree is memoized.
**Action:** Always memoize the context `value` object. For heavy components consuming global context, use the `React.memo` pattern on an internal 'Content' component to isolate it from unrelated context updates (e.g., UI state like `tabValue`).

## 2025-05-14 - Deterministic Mock Data in Memoized Hooks
**Learning:** Using impure functions like `Math.random()` inside `useMemo` or during render violates React's purity requirements and can cause unstable UI or build errors in strict environments.
**Action:** Use deterministic alternatives like `Math.sin(index)` when generating stable mock data or sparklines to ensure component idempotency and stable references.
