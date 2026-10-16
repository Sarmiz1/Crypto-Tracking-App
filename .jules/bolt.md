## 2025-05-18 - Avoid ResponsiveContainer in Repeating Table Rows
**Learning:** Recharts `<ResponsiveContainer>` creates a `ResizeObserver` for every element. When rendered inside mapped table rows (e.g. 100 coin rows), it instantiates 100 `ResizeObserver` listeners, leading to heavy layout thrashing and scroll lag.
**Action:** When rendering sparklines inside fixed-width table cells, pass explicit `width` and `height` directly to `<LineChart width={120} height={50}>` instead of wrapping with `<ResponsiveContainer>`.
