# Proposal: Add Media Review Detail Page

## Why

We have a media reviews list with cards that link to details, but there is no dedicated detail page documented/implemented. A proper detail page improves SEO, sharing, and user engagement, and provides a consistent, accessible view of each media review.

## What

Add a server-rendered detail page at `/media-reviews/[slug]` that displays the selected review with title, cover image, author, publish date, and body content when available. Align styling and tokens with existing components and typography.

## Scope

- New route/page: `app/media-reviews/[slug]/page.tsx`
- Server-side fetch: Supabase query by `slug` and `is_published=true`
- Render details: title, cover image (16:9), author, date (Australian format), and body content from `content` (Editor.js JSON) when present; fallback to excerpt if `content` is null
- Error handling: 404 for missing/unpublished slug
- SEO: set page `metadata.title` and `metadata.description`
- Accessibility: alt text on image, focus-visible link, semantic headings

## Acceptance Criteria

- [ ] `/media-reviews/[slug]` loads from Supabase matching slug and published status; slug has UNIQUE constraint
- [ ] Page sets `revalidate = 0` for fresh content on each request
- [ ] Title, author (when present), date, and cover image (always present) render with correct tokens and format
- [ ] Body content renders from `content` JSONB (always present, NOT NULL)
- [ ] Editor.js blocks supported: paragraph, header (h2–h4), list, table (with/without headings), image; unknown blocks (quote, code, delimiter, embed, link, raw) gracefully ignored or documented for future expansion
- [ ] Rendered HTML is sanitized via DOMPurify with allowed tags (`p`, `h2`, `h3`, `h4`, `ul`, `ol`, `li`, `table`, `thead`, `tbody`, `tr`, `th`, `td`, `figure`, `img`, `figcaption`, `a`) and blocked dangerous tags (`script`, `style`, `on*` handlers, `iframe`)
- [ ] Tables use `<th scope="col">` for column headers when `withHeadings=true`
- [ ] Tables on mobile viewports wrap in container with `overflow-x: auto` to prevent layout breaks
- [ ] Links in rendered content include focus-visible styles and safe attributes (`rel="noopener noreferrer"`)
- [ ] Invalid slug displays a 404 Not Found state; Supabase errors return 500 or generic error message
- [ ] Page sets `metadata.title` and description (excerpt or title)
- [ ] Clicking a `MediaReviewCard` opens the detail page in a new tab
- [ ] No TypeScript/ESLint errors; tests updated and pass

## Clarifications Needed

- Click behavior on card: open in a new tab (confirmed)
- Rendering approach for `content` (Editor.js JSON): confirmed — support paragraph, header (h2–h4), list, table (with/without headings), image; sanitize output with DOMPurify; defer quote, code, delimiter, embed, link, raw blocks
