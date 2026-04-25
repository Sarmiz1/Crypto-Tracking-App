## 2025-05-22 - [appContext Refactor]
**Learning:** Moving React Context definitions to a separate file from their Provider component is necessary for Vite Fast Refresh and avoids potential circular dependency issues. It also helps satisfy ESLint rules that expect files to only export components.
**Action:** Always separate `createContext()` into its own small file (e.g., `appContext.js`) and import it into the Provider and consuming components.

## 2025-05-22 - [Pure Component Rules]
**Learning:** React 19 ESLint rules strictly enforce purity in components and hooks. Using `Math.random()` during render (including inside `useMemo`) is considered impure and triggers an error.
**Action:** Use deterministic alternatives like `Math.sin(index)` or stable seeded randoms if mock data is needed during render.
