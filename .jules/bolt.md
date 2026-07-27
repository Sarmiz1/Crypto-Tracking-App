# Bolt's Performance Journal

## 2025-07-27 - Sparkline Chart ResizeObserver Bottleneck
**Learning:** Using Recharts `ResponsiveContainer` inside list or table row mapping (such as in `CustomTableBody` or `SpotTable`) introduces high rendering and layout overhead because it instantiates an active `ResizeObserver` for each row. When the parent container has fixed dimensions, removing `ResponsiveContainer` and specifying `width` and `height` directly on `<LineChart>` completely bypasses `ResizeObserver` creation, significantly optimizing rendering speeds and preventing scroll lag.
**Action:** Replace `ResponsiveContainer` with direct `width` and `height` properties on `<LineChart>` in row templates / tables when dimensions are known.
