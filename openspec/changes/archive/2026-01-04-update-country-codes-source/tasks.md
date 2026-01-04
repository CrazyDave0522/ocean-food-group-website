## 1. Planning & source selection
- [x] 1.1 Pick maintained country code dataset/library (default: smallest reliable set such as country-telephone-data) with clear update path
- [x] 1.2 Decide reusable provider surface (array + lookup maps, helper to format suggestions) to support future consumers
- [x] 1.3 Document chosen source and update process (version bumps)

## 2. Implementation
- [x] 2.1 Replace hardcoded COUNTRY_CODES with the maintained dataset loaded in memory for suggestions
- [x] 2.2 Create reusable country code provider utility exposing dataset + filtering helpers for other forms/features (suggestions array + lookup maps)
- [x] 2.3 Wire franchise form suggestion filtering to the shared provider (no per-keystroke external calls)
- [x] 2.4 Apply overlay/dense-region filtering (e.g., NANPA +1) to reduce noise without hiding valid prefixes
- [x] 2.5 Align validation to the maintained dataset (format + code presence)

## 3. Testing & validation
- [x] 3.1 Add/extend unit tests for the provider utility to cover diverse country samples, lookups, overlays filtering, and edge prefixes
- [x] 3.2 Add/extend franchise form component tests to confirm suggestions render from the maintained dataset
- [x] 3.3 Add a reuse-focused test (or harness) proving another consumer can import/use the provider without extra wiring
- [x] 3.4 Run `openspec validate --strict` and project checks (`pnpm test:run`, `pnpm lint`, `pnpm typecheck`)
