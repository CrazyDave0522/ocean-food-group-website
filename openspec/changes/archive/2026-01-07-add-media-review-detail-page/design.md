# Design: Media Review Detail Page

## Architecture

- Route: `/media-reviews/[slug]` implemented as a Next.js App Router server component (`page.tsx`)
- Data: Fetch single review via Supabase using `slug` and `is_published=true`
- Rendering: Server-render content for SEO and performance; no client-side fetch
- Styling: Reuse design tokens (`--fs-*`, `--space-*`, `--color-*`) and Tailwind utilities

Sequence:

```
User clicks a review card (opens in a new tab)
  → Navigates to /media-reviews/[slug]
      → Server action/query: fetch review by slug
      → If found: render detail view (title, meta, image, link)
      → If not found: render 404 Not Found
```

## Data Model (Actual Schema)

- `media_review` table fields:
  - Required: `id` (uuid), `slug` (text, unique), `title` (text), `content` (jsonb), `cover_image_url` (text), `publish_date` (timestamptz), `is_published` (boolean), `created_at` (timestamptz)
  - Optional: `excerpt` (text), `author` (text), `updated_at` (timestamptz)
- `slug` has UNIQUE constraint
- `content` is always present (NOT NULL) — Editor.js JSONB format
- `cover_image_url` is always present (NOT NULL)
- If optional fields missing: omit author from meta display, omit excerpt from SEO description fallback

## UI Layout

- Title: `h1` with `--fs-h1`
- Meta: author (when present) · date (Australian format)
- Cover Image: 16:9 responsive, alt=`title` (always present)
- Body Content: render from `content` (Editor.js JSONB, always present) to HTML

## Accessibility

- Semantic headings and landmarks
- Image alt from title
- Focus-visible on CTA

## Editor.js Rendering Strategy

We will render `content` (Editor.js JSON) via a dedicated server-side helper that converts supported blocks to HTML and sanitizes output before insertion.

Supported blocks (initial subset):

- paragraph → `<p>`
- header (level 2-4) → `<h2>`, `<h3>`, `<h4>` mapped to site tokens
- list (ordered/unordered) → `<ol>` / `<ul>` with `<li>` items
- image → `<figure><img alt="..." /><figcaption>...</figcaption></figure>` (caption optional)
- table → semantic `<table>` with optional `<thead>` when `withHeadings` is true; rows mapped to `<tr>` and cells to `<th>`/`<td>`

Rendering pipeline:

1. Parse Editor.js JSON, map supported blocks to HTML strings
2. Sanitize the concatenated HTML via DOMPurify (server-side) — allowed tags: `p`, `h2`, `h3`, `h4`, `ul`, `ol`, `li`, `table`, `thead`, `tbody`, `tr`, `th`, `td`, `figure`, `img`, `figcaption`, `a`; blocked: `script`, `style`, `on*` handlers, `iframe`
3. Inject into the page using a scoped container (e.g., `.prose-legal` or similar)

Fallbacks / Unsupported blocks:

- If a block type is unsupported (quote, code, delimiter, embed, link, raw), omit it or render a safe text-only fallback; document these for future expansion
- If `content.blocks` is empty, render a minimal message or omit body section (rare edge case)
- `excerpt` is only used for SEO metadata description when present; body always renders from `content` JSONB

Notes:

- Prefer minimal dependencies; if a library like `editorjs-html` is used, still sanitize output
- Ensure links within content (if present) are safe: add `rel="noopener noreferrer"` and validate href
- Tables MUST avoid inline styles; rely on a small CSS snippet for table spacing/borders within the scoped container
- Tables use `<th scope="col">` for column headers when `withHeadings=true`
- On mobile viewports, tables wrap in a container with `overflow-x: auto` to prevent layout breaks
- `slug` field must be unique and indexed in the database
- Page sets `revalidate = 0` to ensure fresh content on each request

## Risks & Trade-offs

- Editor.js JSON requires a renderer; start with a minimal subset and expand as needed
- Confirm click behavior to avoid conflicting UX (same tab vs new tab)
