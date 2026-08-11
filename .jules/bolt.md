## 2025-08-11 - Rendering overhead of ResponsiveContainer inside tables
**Learning:** Instantiating `ResponsiveContainer` inside mapped table rows (like in `CustomTableBody` or `SpotTable`) creates an active `ResizeObserver` for every row. This results in heavy layout and rendering overhead during scrolls and UI switches, causing lag.
**Action:** Replace `ResponsiveContainer` with explicit, fixed `width` and `height` dimensions directly on `<LineChart>` when rendering charts inside lists or tables with fixed parent sizes.
