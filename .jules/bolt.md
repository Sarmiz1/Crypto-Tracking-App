## 2025-05-15 - Initial Performance Audit
**Learning:** The application uses a single context for both stable data (API fetches) and high-frequency UI state (tabs). This causes the entire dashboard, including expensive Recharts components, to re-render whenever a tab is switched.
**Action:** Implement reference stability in AppContextProvider and use React.memo on heavy consumers like MetricCards and CustomTableBody.

## 2025-05-15 - Reference Stability in Context Consumers
**Learning:** Even with a memoized Context Provider, all consumers re-render if any part of the context value changes. To prevent expensive re-renders in consumers, components must be refactored into a memoized 'Content' sub-component, and all props passed to it (including arrays and functions) must be reference-stable (using useMemo/useCallback in the consumer).
**Action:** Always use the memoized 'Content' sub-component pattern for heavy context consumers and ensure all passed props are memoized.
