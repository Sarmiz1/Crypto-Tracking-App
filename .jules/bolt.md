## 2025-05-15 - Context stability and Lockfile noise

**Learning:** Memoizing a Context value is only effective if all its dependencies and sub-objects are also stable. Derived data calculated during render (like `trendingWithSparkline`) must be memoized before being used in the Context value. Also, `npm install` can introduce massive noise in `package-lock.json` (like removing `"peer": true`) which should be reverted before PR submission.

**Action:** Ensure all sub-objects in Context are memoized. Always check and revert unintended lockfile changes.
