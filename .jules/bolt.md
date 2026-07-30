## 2025-07-30 - ResponsiveContainer Overhead in Table Cells
**Learning:** Using Recharts `<ResponsiveContainer>` inside mapped lists or table cells is extremely expensive as it registers a separate `ResizeObserver` per row. Removing it and setting a static size on the `<LineChart>` completely removes this layout overhead and prevents scroll stuttering and warnings.
**Action:** Always prefer setting explicit, static dimensions on `<LineChart>` when rendering charts inside lists, tables, or repeaters where the parent container has a fixed size.
