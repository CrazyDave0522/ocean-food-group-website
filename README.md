# Ocean Food Group Website

Marketing site for Ocean Food Group, built with Next.js App Router. The app highlights products, franchise opportunities, media reviews, careers, and contact channels. Performance, accessibility, and spec-driven development (OpenSpec) are priorities.

## Quick Start

1. Install dependencies (pnpm preferred):
   ```bash
   pnpm install
   ```
2. Configure environment variables in `.env.local`:
   ```bash
   SUPABASE_URL=
   SUPABASE_SECRET_KEY=
   RESEND_API_KEY=
   CONTACT_INQUIRY_RECIPIENT=
   ```
3. Run the dev server:
   ```bash
   pnpm dev
   ```
   App runs at http://localhost:3000.

## Scripts

- `pnpm dev` — start Next.js in development (Turbopack).
- `pnpm build` — production build.
- `pnpm start` — serve the production build.
- `pnpm lint` — ESLint.
- `pnpm typecheck` — TypeScript `--noEmit`.
- `pnpm check` — typecheck + lint (recommended before commit).
- `pnpm test` — Vitest in watch mode.
- `pnpm test:run` — Vitest once (CI-friendly).
- `pnpm test:coverage` — coverage report.

## Tooling & Conventions

- Next.js 16.1 (App Router), React 19, TypeScript (strict).
- Tailwind CSS v4: theme defined in `app/globals.css` via `@theme`, design tokens in `styles/tokens.css`, and source globs via `@source`. Add new folders to `@source` instead of editing a tailwind config file.
- Styling: prefer Tailwind utilities; shared CSS lives under `styles/` and is imported in `app/globals.css`.
- Forms: server actions under `lib/actions/` with "use server" and client components using `useActionState`.
- Email: Resend; data storage: Supabase service role client in `lib/supabase.ts`.
- Specs: see `openspec/specs/` for capabilities and `openspec/changes/` for active proposals.

## Testing

- Component and unit tests: Vitest + Testing Library (happy-dom environment).
- Run `pnpm test:run` for CI-style runs or `pnpm test` while iterating.

## Project Structure

- `app/` — routes, layouts, and pages.
- `components/` — shared UI (domain subfolders for forms, contact, franchise, media reviews).
- `lib/` — server actions, Supabase helpers, validation, utilities.
- `styles/` — design tokens, base/layout/utilities, component CSS; aggregated in `app/globals.css`.
- `openspec/` — project conventions, specs, and change proposals.
