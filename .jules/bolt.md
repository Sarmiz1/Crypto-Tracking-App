## 2025-05-20 - Eliminate ResponsiveContainer overhead in list and table row sparklines

**Learning:** Using Recharts `<ResponsiveContainer>` inside mapped table or list items (like `<CustomTableBody>` or `<SpotTable>`) instantiates an active `ResizeObserver` listener for every single row (up to 100+ observers). This creates significant DOM overhead, memory consumption, and layout thrashing during scrolling and rendering. When container dimensions are fixed, removing `<ResponsiveContainer>` and specifying fixed `width` and `height` props directly on `<LineChart>` completely bypasses `ResizeObserver` creation while maintaining identical visual representation.

**Action:** When rendering charts or sparklines inside repeating list items or table rows with fixed dimensions, always pass direct `width` and `height` props to `<LineChart>` instead of wrapping them in `<ResponsiveContainer>`.
