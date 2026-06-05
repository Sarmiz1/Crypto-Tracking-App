## 2025-05-15 - [Context Value Memoization vs Consumer Re-renders]
**Learning:** Even when `appContext.Provider` value is memoized, any change to a single field (like `tabValue`) updates the context reference, triggering re-renders in ALL consumers. Using `React.memo` on the consumer itself doesn't help if it uses `useContext`.
**Action:** Use a "Wrapper + Memoized Content" pattern. The wrapper consumes the context and passes only the necessary, stable sub-objects as props to a `React.memo`'d content component. This effectively blocks re-render cascades from the global context.
>>>>>>> REPLACE
