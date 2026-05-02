## 2025-05-22 - React Context and Fast Refresh
**Learning:** In this project's ESLint setup, exporting a Context object from the same file as a Provider component triggers a 'react-refresh/only-export-components' error. Additionally, using Math.random() during render is strictly forbidden by the 'react-hooks/purity' rule.
**Action:** Always move Context definitions to a separate file (e.g., appContext.js) and use deterministic alternatives like Math.sin(index) for mock data to satisfy purity requirements.
