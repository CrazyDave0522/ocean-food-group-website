# Project Context

## Purpose

Ocean Food Group public website — marketing and product information site for Ocean Food Group. The repository contains the Next.js application used to present company information, product listings, and contact channels. The site prioritizes performance, accessibility, and easy content updates for non-technical editors.

## Tech Stack

- Framework: Next.js 16.1.1 (App Router, `app/` directory) with Turbopack.
- Language: TypeScript (strict mode enabled via `tsconfig.json`).
- UI: React 19 with server and client components, `useActionState` for form state management.
- Styling: Tailwind CSS v4 + PostCSS + global stylesheet at `app/globals.css`.
- State & UI libs: `@headlessui/react`, `framer-motion`, `lucide-react` for icons.
- Backend / Data: Supabase (`@supabase/supabase-js`) for data storage and service role server actions.
- Email: Resend API for transactional email notifications.
- Tooling: ESLint, Prettier, TypeScript, PostCSS, OpenSpec for spec-driven development. Build and dev scripts use Next.js CLI from `package.json`.
- Image Processing: Python PIL (installed locally) for logo optimization and asset cropping.

## Project Conventions

### Code Style

- Formatting: Use Prettier as the single source of truth. Format code before commits.
- **Type Checking & Linting**: Run `pnpm check` before commits — this runs both TypeScript type checking and ESLint:
  - `pnpm typecheck` — TypeScript static analysis (catches type errors, missing properties, mismatches).
  - `pnpm lint` — ESLint rules (catches style, best practices, unused variables).
  - `pnpm check` — Both type checking and linting combined (recommended pre-commit).
- TypeScript: `strict: true` — prefer typed interfaces and avoid `any` where possible.
- File naming: PascalCase for React components (`MyComponent.tsx`), camelCase for hooks and helpers, kebab-case for CSS files if needed.
- React: Prefer function components. Use server components by default in `app/` and add `"use client"` only when hooks/local state or browser-only APIs are required.
- Server Actions: Place data mutations and validated server operations in `lib/actions/` with `"use server"` directive. Only async functions should be exported from server files.

### Architecture Patterns

- App Router: Use the Next.js `app/` directory for routes, layouts and nested layouts.
- Component organization: Keep shared UI in `components/`, separated into domain subfolders when needed (e.g., `components/contact/`, `components/forms/`).
  - Reusable form components go in `components/forms/` (e.g., `FormShell`, `FormTitle`, `SubmitButton`).
  - Domain-specific components in their own folders (e.g., `components/contact/ContactForm`).
- `lib/`: Place API wrappers, Supabase helpers, validators, types, and shared utilities here.
  - `lib/actions/`: Server actions with `"use server"` (data mutations, validation, external API calls).
  - `lib/supabase.ts`: Centralized Supabase client helper for service role operations.
- Data fetching: Prefer server-side fetching (server components) for public data; use client components + server actions for form submissions and interactive features.
- Form handling: Use React 19 `useActionState` hook with server actions for validation and submission. Client-side validation mirrors server rules. Types and constants shared in `lib/` files.
- Design tokens & styles: Centralize tokens under `styles/base/tokens` and use Tailwind configuration for design system utilities.

### Testing Strategy

- Testing framework: **vitest** (fast unit testing with excellent TypeScript support) + **@testing-library/react** (component testing best practices).
- Environment: happy-dom for lightweight DOM simulation.
- Test file placement: `__tests__/` directory mirroring source structure, e.g., `__tests__/components/forms/FormTitle.test.tsx`, `__tests__/lib/actions/contact.test.ts`.
- File naming: Use `.test.ts` or `.test.tsx` suffix for test files.
- Available commands:
  - `pnpm test` — Run tests in watch mode (development).
  - `pnpm test:ui` — Open vitest UI dashboard (optional).
  - `pnpm test:run` — Run tests once (CI mode).
  - `pnpm test:coverage` — Generate code coverage report.
- Priority test targets (in order):
  1. **Server actions** (validation, Supabase integration, Resend email logic).
  2. **Form components** (ContactForm with useActionState, validation behavior).
  3. **Reusable UI components** (FormTitle, FormShell, SubmitButton).
  4. **Page metadata exports** (ensure all pages have metadata.title).
- Coverage goal: Start at 70% lines; increase incrementally as test suite grows.
- CI/CD: Integrate `pnpm test:run` into GitHub Actions for PRs (optional; can be deferred).

### Git Workflow

- Branching: Use trunk-based flow. Create short-lived branches named `feature/<feature-name>`, `fix/<issue>`, or `chore/<task>`.
- Commits: Use Conventional Commits style (e.g., `feat: add hero section`, `fix: correct image sizes`). Include brief spec-related notes if implementing an OpenSpec change.
- Pull Requests: Open PRs against `main`. Include a short description, screenshots if UI changes, and list of changes. Require at least one approving review before merge when possible.

## Domain Context

- Audience: Site visitors, partners, and customers seeking information about Ocean Food Group offerings and services.
- Content: Product information, sustainability statements, franchise opportunities, careers, media reviews, legal info (privacy, terms), and contact channels.
- Pages: Home (`/`), Careers (`/careers`), Contact (`/contact`), Franchise (`/franchise`), Media Reviews (`/media-reviews`), Privacy (`/privacy`), Terms (`/terms`).
- Features: Contact form with server-side validation, Supabase storage, Resend email notifications to configured recipient.
- Internationalization: Not currently needed; revisit if expanding to multiple regions.

## Important Constraints

- Performance: pages should be optimized for Core Web Vitals; prioritize static rendering or caching where feasible.
- Accessibility: follow WCAG AA standards; run axe or similar checks during development.
- Privacy & Security: avoid storing sensitive keys in the repo; use environment variables (Next.js `process.env`) and secure Supabase configuration.

## External Dependencies

- Supabase (`@supabase/supabase-js`) — Backend data storage (contact messages table) with service role server-side client.
- Resend — Email service for transactional notifications (contact inquiry confirmations).
- Headless UI, Framer Motion, Lucide — UI libraries used across components.
- Next.js Image Optimization — Used for logo and image assets.

## Environment Variables (Required)

- `SUPABASE_URL` — Supabase project URL.
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key for server actions.
- `RESEND_API_KEY` — Resend API key for email service.
- `CONTACT_INQUIRY_RECIPIENT` — Email address to receive contact form submissions.

---

If you want, I can also:

- Add a minimal `CONTRIBUTING.md` with the Git and commit conventions.
- Create CI config (GitHub Actions) to run lint, format check, and (optionally) tests on PRs.
