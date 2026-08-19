## 2026-03-29 - Fixed dimensions on Recharts sparklines in table rows

**Learning:** Using `ResponsiveContainer` inside mapped table rows (e.g., `CustomTableBody`) creates an active `ResizeObserver` instance for every single row. This introduces heavy DOM measurement overhead and layout thrashing during list renders and scrolling.
**Action:** When sparklines in tables or lists have known fixed dimensions (e.g. 120x50px), omit `ResponsiveContainer` and pass `width` and `height` props directly to `<LineChart>` to bypass `ResizeObserver` overhead.
