## 2026-07-26 - [Avoid ResponsiveContainer in Repeating Table Rows]
**Learning:** Using Recharts `ResponsiveContainer` inside a repeating layout like custom table rows or lists instantiates a separate `ResizeObserver` instance for each row. This creates significant rendering and layout calculation overhead, leading to main-thread blockage and stuttering during scroll or dataset updates.
**Action:** Always bypass `ResponsiveContainer` and supply static `width` and `height` dimensions directly to the `<LineChart>` component when dimensions of parent table cells are fixed or constrained.
