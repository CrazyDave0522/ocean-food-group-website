# Media Reviews Detail — Spec Delta

## ADDED Requirements

### Requirement: Detail route exists at `/media-reviews/[slug]`

The system SHALL serve a detail page at `/media-reviews/[slug]` for published media reviews.

#### Scenario: Valid slug

- GIVEN a published media review with `slug="best-lobster-review"`
- WHEN the user navigates to `/media-reviews/best-lobster-review`
- THEN the server responds with 200 OK
- AND renders the media review details

#### Scenario: Invalid or unpublished slug

- GIVEN a slug that does not exist or is not published
- WHEN the user navigates to `/media-reviews/unknown-slug`
- THEN the server responds with 404 Not Found

### Requirement: Server-side data fetch by slug

The system SHALL fetch the media review from Supabase by matching `slug` and `is_published=true` on the server. The `slug` field MUST be unique and indexed in the database.

#### Scenario: Fetch detail data

- GIVEN a request to `/media-reviews/[slug]`
- WHEN the page is rendered on the server
- THEN the system queries Supabase `media_review` table by `slug`
- AND only returns a record if `is_published=true`
- AND the page sets `revalidate = 0` to ensure fresh content on each request

#### Scenario: Database error during fetch

- GIVEN a Supabase error occurs while fetching the review
- WHEN the page attempts to render
- THEN the system returns a 500 error or displays a generic error message
- AND the error is logged for diagnostics

### Requirement: Cover image renders with 16:9 ratio

The detail page SHALL render the cover image at a 16:9 aspect ratio using the configured image domains.

#### Scenario: Image rendering

- GIVEN a media review with `cover_image_url` (always present, NOT NULL)
- WHEN the detail page renders
- THEN the image displays at 16:9 aspect ratio
- AND uses alt text derived from the media review title
- AND the image loads from configured Next.js image domains

### Requirement: Title, author, and date formatting

The detail page SHALL render the title as `h1` and display author and published date below it.

#### Scenario: Metadata formatting

- GIVEN a media review with `title`, `author`, and `publish_date`
- WHEN the detail page renders
- THEN title renders as `h1` using `--fs-h1`
- AND author and date render inline with a middle dot separator
- AND date is formatted in Australian format (e.g., "1 Jan 2025")

### Requirement: Body content rendering

The detail page SHALL render the body content from the `content` JSONB field (Editor.js format, always present).

#### Scenario: Content rendering

- GIVEN a media review with `content` (Editor.js JSONB, NOT NULL)
- WHEN the detail page renders
- THEN the system converts `content` to safe HTML and displays it below the metadata
- AND headings, paragraphs, lists, tables, and images render with appropriate typography
- AND if `content.blocks` is empty, the body section may be omitted or show a minimal placeholder

### Requirement: Editor.js block support

The system SHALL support a minimal subset of Editor.js blocks for reliable rendering.

#### Scenario: Supported blocks render correctly

- GIVEN `content` containing `paragraph`, `header` (levels 2–4), `list` (ordered/unordered), `table` (with/without headings), and `image` blocks
- WHEN the detail page renders
- THEN `paragraph` renders as `<p>` with legal typography
- AND `header` renders as `<h2>`, `<h3>`, or `<h4>` aligned with site tokens
- AND `list` renders as `<ul>`/`<ol>` with `<li>` items and proper indentation
- AND `table` renders as semantic `<table>`; when `withHeadings=true`, the first row renders as `<thead><tr><th>…</th></tr></thead>`
- AND `image` renders within `<figure>` with `<img alt="title">` and optional `<figcaption>`

### Requirement: Table rendering

The system SHALL render Editor.js `table` blocks as accessible semantic tables.

#### Scenario: Table with headings

- GIVEN a `table` block where `withHeadings=true` and `content` is a 2D array
- WHEN the detail page renders
- THEN the first row renders as table headers `<thead><tr><th scope="col">…</th></tr></thead>`
- AND remaining rows render within `<tbody>` using `<tr><td>…</td></tr>`
- AND the table is keyboard navigable and readable by screen readers
- AND on mobile viewports, the table container allows horizontal scroll without breaking layout

#### Scenario: Table without headings

- GIVEN a `table` block where `withHeadings=false`
- WHEN the detail page renders
- THEN all rows render within `<tbody>` using `<tr><td>…</td></tr>`
- AND the table displays consistent cell padding and borders via scoped CSS

#### Scenario: Unsupported blocks

- GIVEN `content` contains a block type not in the supported set
- WHEN the detail page renders
- THEN the block is omitted or rendered as plain text fallback
- AND the page remains readable without broken markup

### Requirement: Sanitization

The system MUST sanitize rendered HTML derived from Editor.js JSON to prevent XSS and unsafe markup.

#### Scenario: Sanitization applied

- GIVEN `content` includes HTML-unsafe characters or potential link attributes
- WHEN converting to HTML
- THEN the output is sanitized via DOMPurify with a safe-list configuration
- AND allowed tags include: `p`, `h2`, `h3`, `h4`, `ul`, `ol`, `li`, `table`, `thead`, `tbody`, `tr`, `th`, `td`, `figure`, `img`, `figcaption`, `a`
- AND dangerous tags/attributes are blocked: `script`, `style`, `on*` event handlers, `iframe`
- AND links include safe attributes (`rel="noopener noreferrer"`)

#### Scenario: Malicious content blocked

- GIVEN `content` contains `<script>` tags or `onclick` attributes
- WHEN the renderer processes the JSON
- THEN DOMPurify strips the malicious markup
- AND the page renders safely without executing the script

### Requirement: SEO metadata

The detail page SHALL set `metadata.title` and `metadata.description` for SEO.

#### Scenario: SEO fields

- GIVEN a media review with `title` (NOT NULL) and optional `excerpt`
- WHEN the page renders
- THEN `metadata.title` is set to `Media Review — {title}`
- AND `metadata.description` uses the `excerpt` if present (non-null), otherwise falls back to the `title`

### Requirement: Accessibility conformance

The detail page MUST meet basic accessibility standards for headings, alt text, and focus visibility.

#### Scenario: Accessible layout

- GIVEN the detail page renders content with links inside rendered body
- WHEN navigating with keyboard
- THEN all links (including those in rendered content) show focus-visible styles
- AND the page uses semantic HTML with correct heading levels
- AND images have descriptive alt text

### Requirement: Deferred block types

The system SHALL document unsupported Editor.js block types that may be added in future iterations.

#### Scenario: Deferred blocks

- GIVEN block types `quote`, `code`, `delimiter`, `embed`, `link`, `raw` are not in the initial supported set
- WHEN encountered in `content`
- THEN these blocks are omitted or rendered as plain text
- AND implementation notes identify these as candidates for future expansion
