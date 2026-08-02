## 2026-08-02 - [Recharts Table Row Mapping Performance]
**Learning:** Instantiating `<ResponsiveContainer>` from Recharts inside a mapped list/table row triggers a separate active `ResizeObserver` per row. This creates massive rendering and layout recalculation overhead, leading to visible scroll lag and interface latency.
**Action:** Remove `<ResponsiveContainer>` inside iterated table cells, and supply fixed dimensions (`width={120}`, `height={50}`) directly to the nested `<LineChart>` component to bypass unnecessary ResizeObserver overhead.
