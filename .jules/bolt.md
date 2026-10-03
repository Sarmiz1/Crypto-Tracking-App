## 2025-03-09 - Avoid Synchronous Heavy Data Allocation in Render Loops

**Learning:** Components generating synthetic timeline or mock datasets synchronously (e.g. `generateETFData` producing 2,200+ items with date formatting) re-run on every single render if unmemoized. Additionally, using `Math.random()` inside mock generators violates React 19 component purity linting rules (`react-hooks/purity`).
**Action:** Always wrap synthetic dataset generators in `useMemo` and use deterministic index-based formulas like `Math.sin(i)` instead of `Math.random()` for stable, pure rendering.
