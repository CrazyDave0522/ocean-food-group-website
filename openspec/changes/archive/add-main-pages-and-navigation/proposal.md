````markdown
```markdown
# Change: add-main-pages-and-navigation

## Why
The public website needs a consistent header and footer navigation and dedicated pages so visitors can find core information. This change adds the main navigable pages (Home, Media Reviews, Franchise, Careers, Contact) and legal pages (Terms & Conditions, Privacy Policy) plus shared header/footer components to enable site-wide navigation.

## What Changes
- Add top-level pages and routes under `app/`: `/`, `/media-reviews`, `/franchise`, `/careers`, `/contact`, `/terms`, `/privacy`.
- Add shared `Header` and `Footer` components and include them in the root layout (`app/layout.tsx`).
- Ensure header links to main pages and footer links to legal pages.
- Add minimal page content and SEO metadata for each page.
- Add navigation unit tests and accessibility checks.

**BREAKING:** None — additive public pages and components only.

## Impact
- Affected specs: `site-pages`, `site-navigation` (new spec deltas included in this change)
- Affected code paths: `app/layout.tsx`, new `app/*/page.tsx` routes, `components/Header.tsx`, `components/Footer.tsx`, potential stylesheet updates in `styles/` or Tailwind config.
- Other impact: Update deployment/sitemap if automated; update any header/footer content managed externally.

## Rollout
- Implement new pages and components behind feature toggles are not required; this is safe to deploy directly because it only adds routes and UI components.


```

````
