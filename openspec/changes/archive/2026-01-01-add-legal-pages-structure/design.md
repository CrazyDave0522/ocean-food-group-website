# Design: Legal pages stored as standalone HTML files

## Overview
Legal page content (Privacy and Terms) will be stored as static HTML files in the repository under `public/legal/`. The site will expose two routes: `/privacy` and `/terms`. Each route will render the corresponding static HTML content inside the site's layout.

## Implementation Approach

- Place files at `public/legal/privacy.html` and `public/legal/terms.html` so they are served as static assets and editable without code changes.
- Implement lightweight page wrappers (`app/privacy/page.tsx` and `app/terms/page.tsx`) that fetch the corresponding HTML on the server (using Next.js server-side fetch or reading the file at build time) and render it with `dangerouslySetInnerHTML` in a controlled container.
- Security: Since these are trusted internal content files, using `dangerouslySetInnerHTML` is acceptable. If additional safety is needed, sanitize HTML at build-time or runtime with a trusted sanitizer.
- Editing workflow: content editors update files in `public/legal/*.html` and deploy; no code changes are required for content-only edits.

## Trade-offs

- Pros: Simple, precise formatting control, easy content updates.
- Cons: Requires discipline to avoid embedding untrusted script tags; recommend repository access controls or a build-time sanitizer if non-developers edit files.
