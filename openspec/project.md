# Project Context

## Purpose
Ocean Food Group public website — marketing and product information site for Ocean Food Group. The repository contains the Next.js application used to present company information, product listings, and contact channels. The site prioritizes performance, accessibility, and easy content updates for non-technical editors.

## Tech Stack
- Framework: Next.js (App Router, `app/` directory) — currently pinned to `16.x`.
- Language: TypeScript (strict mode enabled via `tsconfig.json`).
- UI: React 19 with server and client components.
- Styling: Tailwind CSS v4 + PostCSS + global stylesheet at `app/globals.css`.
- State & UI libs: `@headlessui/react`, `framer-motion`, `lucide-react` for icons.
- Backend / Data: Supabase client (`@supabase/supabase-js`) for auth and data APIs where needed.
- Tooling: ESLint, Prettier, TypeScript, PostCSS. Build and dev scripts use Next.js CLI from `package.json`.

## Project Conventions

### Code Style
- Formatting: Use Prettier as the single source of truth. Run `npm run lint` (or `pnpm` equivalent) and apply Prettier formatting before commits.
- Linting: ESLint with `eslint-config-next` for Next.js rules. Fix lint errors before merging PRs.
- TypeScript: `strict: true` — prefer typed interfaces and avoid `any` where possible.
- File naming: PascalCase for React components (`MyComponent.tsx`), camelCase for hooks and helpers, kebab-case for CSS files if needed.
- React: Prefer function components. Use server components by default in `app/` and add `"use client"` only when hooks/local state or browser-only APIs are required.

### Architecture Patterns
- App Router: Use the Next.js `app/` directory for routes, layouts and nested layouts.
- Component organization: keep shared UI in `components/`, separated into presentational and domain-specific subfolders when needed.
- `lib/`: place API wrappers, Supabase helpers, and shared utilities in `lib/`.
- Data fetching: Prefer server-side fetching (server components) for public data; use client components for interactions requiring client state.
- Design tokens & styles: centralize tokens under `styles/base/tokens` and use Tailwind configuration for design system utilities.

### Testing Strategy
- No test framework is currently present in the repo. Recommended default: add `vitest` + `@testing-library/react` for unit and component tests.
- Write tests for critical components and any complex logic in `lib/` or API wrappers. Aim for focused unit tests and a small set of integration tests covering main flows.
- Run tests in CI on PRs; require passing tests before merging.

### Git Workflow
- Branching: Use trunk-based flow. Create short-lived branches named `feature/<feature-name>`, `fix/<issue>`, or `chore/<task>`.
- Commits: Use Conventional Commits style (e.g., `feat: add hero section`, `fix: correct image sizes`).
- Pull Requests: Open PRs against `main` (or `trunk`). Include a short description, screenshots if UI changes, and list of changes. Require at least one approving review before merge when possible.

## Domain Context
- Audience: site visitors, partners, and customers seeking information about Ocean Food Group offerings.
- Content: product info, sustainability statements, corporate contact and regional information.
- Internationalization: if needed, prefer Next.js i18n or route-based localized pages; flag any content that must be localized.

## Important Constraints
- Performance: pages should be optimized for Core Web Vitals; prioritize static rendering or caching where feasible.
- Accessibility: follow WCAG AA standards; run axe or similar checks during development.
- Privacy & Security: avoid storing sensitive keys in the repo; use environment variables (Next.js `process.env`) and secure Supabase configuration.

## External Dependencies
- Supabase (`@supabase/supabase-js`) — used for any backend/data and auth integrations.
- Headless UI, Framer Motion, Lucide — UI libraries used across components.
- CDN / Image Hosting: use Next.js Image Optimization or an external CDN for large assets.

---

If you want, I can also:
- Add a minimal `CONTRIBUTING.md` with the Git and commit conventions.
- Create CI config (GitHub Actions) to run lint, format check, and (optionally) tests on PRs.
