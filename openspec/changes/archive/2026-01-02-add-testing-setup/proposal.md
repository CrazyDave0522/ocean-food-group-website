# Change: Add Vitest + React Testing Library Testing Setup

## Why
The project currently lacks a structured unit and component testing framework. An existing `__tests__/pages.test.ts` file uses generic TypeScript syntax without a test runner configured. Introducing **vitest** (fast unit testing with excellent TypeScript support) and **@testing-library/react** (best-practice component testing) will:

- Enable automated testing of React components, server actions, and utilities.
- Provide fast feedback during development via watch mode.
- Establish a foundation for critical test coverage (form validation, Supabase interactions, email notifications).
- Support CI/CD pipelines with a standard test command.
- Improve confidence when refactoring or adding features.

## What Changes

### Dependency Additions
- Add `vitest`, `@vitest/ui` (optional visual dashboard), `happy-dom` (lightweight DOM implementation).
- Add `@testing-library/react`, `@testing-library/user-event` (user interaction simulation).
- Add `@testing-library/jest-dom` for extended matchers.
- Add `@vitest/coverage-v8` for code coverage reporting.

### Configuration & Setup
- Create `vitest.config.ts` with:
  - Happy DOM environment (faster than jsdom for our use case).
  - TypeScript support via `tsx`.
  - Global test setup file for common utilities and matchers.
  - Coverage thresholds (optional; recommend 70% initially).
  - Path aliases matching `tsconfig.json` (`@/` prefix).
- Create `__tests__/setup.ts` to register `@testing-library/jest-dom` matchers globally.
- Update `package.json` with `test` and `test:ui` scripts.
- Update `.gitignore` to exclude coverage reports.

### Test Infrastructure
- Establish testing convention: collocate component tests with `*.test.tsx` or `*.test.ts` suffix in `__tests__/` or near source files.
- Create example tests for reusable components (`FormTitle`, `FormShell`, `SubmitButton`) to demonstrate best practices.
- Refactor existing `__tests__/pages.test.ts` to use vitest syntax.

### Documentation
- Add testing guidelines to `openspec/project.md` with:
  - File naming and placement conventions.
  - Priority test targets (form validation, server actions, complex components).
  - CI/CD integration notes.

## Impact

### Affected Specs
- **testing-framework** (new): Defines testing setup, conventions, and tools.

### Affected Code
- `package.json` — Add dev dependencies, test scripts.
- `vitest.config.ts` — New configuration file.
- `__tests__/setup.ts` — New global setup file.
- `.gitignore` — Exclude coverage directory.
- `__tests__/pages.test.ts` — Refactor to vitest syntax (if existing syntax is incompatible).
- `openspec/project.md` — Clarify testing conventions in "Testing Strategy" section.

### Breaking Changes
None. Tests are optional and do not affect runtime behavior.

### Dependencies
None. This change is self-contained and does not depend on prior changes.

## Implementation Notes

- **Priority**: Establish configuration first, then migrate/refactor existing tests, then add example tests.
- **Testing priority order**: 
  1. Server actions (validation, Supabase, Resend integration).
  2. Form components (`ContactForm` with `useActionState`).
  3. Reusable components (`FormTitle`, `FormShell`, `SubmitButton`).
  4. Page metadata exports (already partially covered).
- **CI/CD**: Once tests pass locally, integrate into GitHub Actions workflow to run on PRs.
- **Coverage**: Start with minimal coverage targets; increase incrementally as test suite grows.
