## 2025-02-05 - On-Demand ETF Dataset Generation with Pure Calculation
**Learning:** Generating all time-window datasets (30d, 365d, 5y = 2,220+ objects) synchronously on every component render creates significant memory allocation and main thread overhead. Using `useMemo` with a deterministic formula avoids generating inactive tab datasets and eliminates allocations on unrelated parent re-renders.
**Action:** Always compute time-window datasets on demand using `useMemo` based on active selection state rather than pre-generating all windows upfront in render.
