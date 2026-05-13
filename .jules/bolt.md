## 2025-05-15 - Context Provider Re-render Cascade
**Learning:** The `AppContextProvider` was causing the entire application to re-render on every state change (like tab switching) because the `value` object and its data "slices" (e.g., `cryptoListing`, `globalMetrics`) were recreated on every render. This was exacerbated by the `useFetch` hook returning a new object literal every time, even if the data hadn't changed.

**Action:**
1. Memoize the return object of `useFetch`.
2. Wrap `AppContextProvider`'s context `value` and all sub-objects in `useMemo`.
3. Use `useCallback` for all functions passed through context.
4. Wrap heavy consumer components in `React.memo` to leverage the stable references.
