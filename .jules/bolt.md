## 2025-05-14 - Context Sub-object Memoization Pattern
**Learning:** In large React Context providers, memoizing the entire value object is often insufficient if any dependency of that object changes frequently (e.g., tab state, theme). By memoizing sub-objects (e.g., `cryptoListing`, `globalMetrics`) independently, components that only consume those specific sub-properties can avoid re-renders if their specific sub-object reference remains stable, even if the parent context object changes.
**Action:** Always break down complex context values into independently memoized sub-objects to maximize the effectiveness of `React.memo` in consumer components.

## 2025-05-14 - Render Purity with Mock Data
**Learning:** Using `Math.random()` inside `useMemo` or during render is an anti-pattern that violates React's purity requirements and leads to unstable UI (e.g., jumping sparklines on every unrelated update).
**Action:** Use deterministic functions like `Math.sin(index)` or hash-based seeds when generating mock data to ensure stable, repeatable render outputs.
