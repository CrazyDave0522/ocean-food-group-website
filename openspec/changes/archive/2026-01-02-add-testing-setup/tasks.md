# Tasks: Add Vitest + React Testing Library Testing Setup

## Phase 1: Configuration & Setup

- [x] Install vitest, @testing-library/react, @testing-library/user-event, @testing-library/jest-dom, happy-dom, @vitest/ui, @vitest/coverage-v8, and @vitest/browser (optional) via pnpm.
  - Validate: Dependencies added to `package.json` devDependencies. ✓

- [x] Create `vitest.config.ts` with:
  - Environment: happy-dom. ✓
  - Test globals enabled (describe, it, expect). ✓
  - TypeScript support via tsx. ✓
  - Path alias resolution matching `tsconfig.json` (e.g., `@/` → `./`). ✓
  - Coverage configuration (optional; set to `70% lines` threshold initially). ✓
  - Test include pattern (e.g., `**/__tests__/**/*.{test,spec}.{ts,tsx}` and `src/**/*.{test,spec}.{ts,tsx}`). ✓
  - Validate: `npx vitest --version` works; `npx vitest --run --no-coverage` passes (no tests yet). ✓

- [x] Create `__tests__/setup.ts` to:
  - Import and register @testing-library/jest-dom matchers globally. ✓
  - Configure any global test utilities or mocks. ✓
  - Validate: File exists and imports without errors. ✓

- [x] Update `package.json` scripts:
  - Add `"test": "vitest"` (watch mode for development). ✓
  - Add `"test:ui": "vitest --ui"` (optional visual dashboard). ✓
  - Add `"test:run": "vitest --run"` (CI mode, single run). ✓
  - Add `"test:coverage": "vitest --run --coverage"` (coverage report). ✓
  - Validate: `pnpm test:run` executes successfully. ✓

- [x] Update `.gitignore` to exclude:
  - `coverage/` directory. ✓
  - `.vitest/` cache directory (if applicable). ✓
  - Validate: File edited without breaking other ignore rules. ✓

## Phase 2: Test Migration & Refactoring

- [x] Refactor `__tests__/pages.test.ts` to use vitest syntax:
  - Replace any Jest-specific globals with vitest equivalents (should be minimal; vitest is Jest-compatible). ✓
  - Ensure all tests pass: `pnpm test:run`. ✓
  - Validate: All 7 page metadata tests pass. ✓

## Phase 3: Example Tests (Best Practices)

- [x] Create `__tests__/components/forms/FormTitle.test.tsx` demonstrating:
  - Rendering title and subtitle correctly. ✓
  - Accessibility (heading level, semantic HTML). ✓
  - Props validation (optional subtitle). ✓
  - Validate: Test passes and covers 6 scenarios. ✓

- [x] Create `__tests__/components/forms/FormShell.test.tsx` demonstrating:
  - Rendering children inside container. ✓
  - Container styling applied (card, border, padding). ✓
  - Props validation (nested structure). ✓
  - Validate: Test passes and covers 5 scenarios. ✓

- [x] Create `__tests__/components/forms/SubmitButton.test.tsx` demonstrating:
  - Rendering button with label. ✓
  - Type attribute and click behavior. ✓
  - Loading label and styling. ✓
  - Validate: Test passes and covers 6 scenarios. ✓

- [x] Create `__tests__/lib/actions/contact.test.ts` demonstrating:
  - Validation logic for contact form fields (required fields, email pattern, length limits). ✓
  - Field limit validation. ✓
  - Email format validation. ✓
  - Validate: Test passes and covers 19 validation scenarios. ✓

## Phase 4: Documentation & Integration

- [x] Update `openspec/project.md` "Testing Strategy" section to include:
  - Current status: vitest + React Testing Library configured. ✓
  - File placement conventions: `__tests__/` folder or collocated with source. ✓
  - Command reference: `pnpm test`, `pnpm test:ui`, `pnpm test:run`, `pnpm test:coverage`. ✓
  - Priority test targets (server actions, form components, reusable UI). ✓
  - Coverage goal: Reach 70% lines initially; increase per feature. ✓
  - Validate: Section updated and references match configured scripts. ✓

- [ ] (Optional) Create `.github/workflows/test.yml` for CI:
  - Run `pnpm install` and `pnpm test:run` on every PR against `main`.
  - Fail CI if tests do not pass.
  - (Can be deferred to a future PR if CI already exists.)
  - Validate: Workflow file is valid YAML and references correct commands.

## Validation Checklist

- [ ] `pnpm test:run` passes all tests (including refactored and new examples).
- [ ] `pnpm test:coverage` generates a coverage report without errors.
- [ ] `pnpm lint` shows no errors (tests follow project linting rules).
- [ ] `openspec validate --strict` passes for the testing-framework spec.
- [ ] All tests are isolated and do not depend on execution order.
- [ ] TypeScript type checking passes for all test files (no `any`).

## Notes

- **Happy DOM vs jsdom**: Happy DOM is faster and sufficient for component testing; switch to jsdom if DOM edge cases are encountered.
- **Mocking**: Use vitest's built-in mocking for Supabase and Resend; avoid external mocking libraries initially.
- **Coverage**: Start low (70%); focus on critical paths. Increase incrementally as more tests are added.
- **Watch mode**: `pnpm test` is suitable for development; `pnpm test:run` for CI.
