````markdown
```markdown
## Context
This change adds primary navigational structure and public pages for the marketing site. It spans routing, layout, and shared UI components but remains localized to the frontend app boundaries.

## Goals / Non-Goals
- Goals:
  - Provide header navigation to Home, Media Reviews, Franchise, Careers, Contact.
  - Provide footer links to Terms & Conditions and Privacy Policy.
  - Ensure pages are reachable by direct URL and included in the sitemap.
- Non-Goals:
  - No CMS integrations or dynamic content flows in this change. Content will be static placeholders where necessary.

## Decisions
- Router: Use Next.js App Router and place page routes under `app/<route>/page.tsx`.
- Components: Create `components/Header.tsx` and `components/Footer.tsx` as presentational components. Keep `Header` minimal; responsive layout and mobile menu can be added later.
- Rendering: Prefer server components for pages and layout. Mark `Header`/`Footer` as client components only if they require client-only behavior (e.g., mobile menu toggle).
- Styling: Use existing Tailwind CSS config and `app/globals.css` for global styles. Keep new styles minimal and utility-first.

## Risks / Trade-offs
- Adding navigation is low risk; ensure link labels and paths match marketing requirements to avoid broken links.
- If `Header` requires client-side interactivity for mobile, include a small client bundle split to avoid performance regressions.

## Migration Plan
- No migration required; new pages are additive. Update sitemap generator (if present) to include new routes.

## Open Questions
- Do you want localized routes (i18n) now, or only if required later?
- Any specific SEO titles or descriptions for the new pages now, or will content writers provide them?


```

````
