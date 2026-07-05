## 2025-05-15 - Context consumption in Table Rows
**Learning:** Consuming context directly in components that are rendered many times (like table rows or a shared table body) causes massive re-render cascades whenever ANY context value changes, even if the row doesn't use that specific value.
**Action:** Lift context consumption to the highest possible stable parent and pass down only the required primitives or stable objects as props to memoized child components.
