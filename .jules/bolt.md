# Bolt's Performance Journal

## 2026-03-06 - Layout Overhead from ResponsiveContainer inside Map Elements
**Learning:** Using Recharts `<ResponsiveContainer>` inside mapped arrays (such as table rows in `CustomTableBody` or `SpotTable`) introduces high layout and rendering overhead because it instantiates an active `ResizeObserver` for every single element. When parent containers have fixed dimensions, removing `<ResponsiveContainer>` and declaring `width` and `height` directly on `<LineChart>` completely bypasses `ResizeObserver` creation, significantly boosting rendering speed and avoiding scroll lag.
**Action:** Always avoid `<ResponsiveContainer>` inside loops or rows. Instead, set explicit numeric dimensions on the chart component.
