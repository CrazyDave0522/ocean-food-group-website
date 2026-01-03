# Contributing to Ocean Food Group Website

Thank you for contributing to the Ocean Food Group website! This document outlines the conventions and workflow for contributions.

## Code Style & Quality

### Formatting & Linting

- **Prettier**: Use as the single source of truth for code formatting.
- **ESLint**: Follow project linting rules defined in `eslint.config.mjs`.
- **TypeScript**: Strict mode is enabled; prefer typed interfaces and avoid `any`.

Before committing:

```bash
pnpm check     # Run ESLint and TypeScript type checking
pnpm test:run  # Run tests (required before PR)
```

### File Naming Conventions

- **React Components**: PascalCase (`MyComponent.tsx`)
- **Hooks & Helpers**: camelCase (`useAuth.ts`, `formatDate.ts`)
- **CSS Files**: kebab-case (`button-styles.css`)
- **Test Files**: `.test.ts` or `.test.tsx` suffix (`FormTitle.test.tsx`)

### TypeScript & React

- Prefer function components over class components.
- Use server components by default in `app/`; add `"use client"` only when necessary (hooks, local state, browser APIs).
- For server operations, place code in `lib/actions/` with `"use server"` directive.

## Git Workflow

### Branching

Use trunk-based development with short-lived branches:

- `feature/<feature-name>` — New features or capabilities
- `fix/<issue>` — Bug fixes
- `chore/<task>` — Refactoring, dependencies, configuration

Example:

```bash
git checkout -b feature/add-hero-section
git checkout -b fix/contact-form-validation
git checkout -b chore/update-tailwind-config
```

### Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/) style:

```
<type>: <subject>

<optional body>
```

**Types:**

- `feat:` — New feature
- `fix:` — Bug fix
- `refactor:` — Code refactoring without behavior change
- `chore:` — Dependencies, config, build tooling
- `docs:` — Documentation updates
- `test:` — Adding or updating tests
- `style:` — Formatting, whitespace (typically handled by Prettier)

**Examples:**

```
feat: add contact form with Supabase integration
fix: correct image sizes in header
refactor: extract FormTitle component
chore: update Next.js to 16.1.1
test: add validation tests for contact form
```

If implementing an OpenSpec change, include the change ID:

```
feat: add header logo

Implements: add-header-logo
```

### Pull Requests

1. **Branch Setup**: Push your branch and open a PR against `main`.

2. **PR Description**: Include:
   - Brief summary of changes
   - Screenshots (if UI changes)
   - List of affected files or components

3. **Pre-Merge Checklist**:
   - [ ] Code follows project style (run `pnpm lint`)
   - [ ] All tests pass (`pnpm test:run`)
   - [ ] TypeScript compiles without errors
   - [ ] Commits follow Conventional Commits style
   - [ ] PR has at least one approving review

4. **Review Requirements**: Request review from at least one team member before merging.

## Testing

New features should include tests:

- **Server actions**: Unit tests for validation and data logic
- **Components**: Component tests for rendering and interactions
- **Forms**: Test validation, success, and error states

Run tests during development:

```bash
pnpm test       # Watch mode
pnpm test:run   # Single run (CI mode)
pnpm test:coverage  # Generate coverage report
```

See `openspec/project.md` for full testing guidelines.

## OpenSpec Workflow (if applicable)

If making significant changes (new features, breaking changes, architecture shifts):

1. **Create a proposal**: `openspec proposal <change-id>`
2. **Wait for approval** before implementing
3. **Apply the change**: `openspec apply <change-id>`
4. **Archive after merge**: `openspec archive <change-id>`

See `.github/prompts/openspec-*.prompt.md` for detailed instructions.

## Environment Setup

See `openspec/project.md` for required environment variables and dependencies.

## Questions?

Refer to `openspec/project.md` for detailed project conventions and architecture patterns.
