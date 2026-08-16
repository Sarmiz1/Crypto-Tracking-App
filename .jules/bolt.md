## 2025-05-18 - Avoid ResponsiveContainer in List / Table Rows
**Learning:** Using `ResponsiveContainer` inside table rows or mapped lists spawns active `ResizeObserver` instances and triggers layout reflows for each row.
**Action:** Use fixed `width` and `height` directly on `<LineChart>` for sparklines inside list/table rows when column dimensions are fixed.
