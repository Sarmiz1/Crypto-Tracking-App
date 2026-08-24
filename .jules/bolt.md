## 2025-08-24 - Eliminating ResponsiveContainer Overhead in Table Rows
**Learning:** Recharts `ResponsiveContainer` instantiates a `ResizeObserver` for every table row, creating high observation overhead and initial 0-dimension re-render passes for list elements. When container cell dimensions are fixed, passing explicit `width` and `height` to `<LineChart>` avoids `ResizeObserver` creation completely.
**Action:** Remove `ResponsiveContainer` from row-level chart renders inside fixed-width table cells and specify `width` and `height` directly on `<LineChart>`.
