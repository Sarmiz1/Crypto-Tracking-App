## 2025-05-15 - Memoizing Heavy Table Components
**Learning:** In applications rendering large datasets with embedded charts (like `recharts`), frequent parent state updates (e.g., scroll indicators) can cause significant UI lag if the table components are not memoized.
**Action:** Always wrap heavy table rows and bodies in `React.memo` and ensure the data props are referentially stable using `useMemo` in the parent.

## 2025-05-15 - React Fast Refresh & Context
**Learning:** Defining and exporting a Context object from the same file as the Provider component can break React Fast Refresh and cause unnecessary full-page reloads during development.
**Action:** Separate Context definitions into their own files (e.g., `appContext.js`) and import them into the Provider.
