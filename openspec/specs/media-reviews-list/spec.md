# media-reviews-list Specification

## Purpose
TBD - created by archiving change add-media-reviews-list. Update Purpose after archive.
## Requirements
### Requirement: MediaReviewCard component displays media review with image and metadata

The site SHALL provide a `MediaReviewCard` component that renders a single media review item with a cover image on the left and content (title, excerpt, author, publish date) on the right. The entire card is clickable and opens the media review detail page in a new browser tab.

#### Scenario: Display media review on desktop

- **GIVEN** a media review object with title, excerpt, author, publish date, and image URL
- **WHEN** the `MediaReviewCard` component is rendered on a desktop viewport (md and larger)
- **THEN** the cover image appears on the left side (fixed width)
- **AND** the content appears on the right side with:
  - Title at the top
  - Excerpt in the middle
  - Author and Publish Date on the same line at the bottom, separated by spacing (e.g., `Editorial Team    1 Jan 2025`)
- **AND** the layout is vertically centered within the card
- **AND** the card has consistent padding and border styling (e.g., white background, subtle shadow)

#### Scenario: Display media review on mobile

- **GIVEN** a media review object with title, excerpt, author, publish date, and image URL
- **WHEN** the `MediaReviewCard` component is rendered on a mobile viewport (< md)
- **THEN** the layout stacks vertically
- **AND** the cover image appears at the top
- **AND** the title, excerpt, author, and publish date appear below the image
- **AND** the component maintains readability and proper spacing

#### Scenario: Image is displayed with proper aspect ratio and alt text

- **GIVEN** a media review with a cover image URL
- **WHEN** the `MediaReviewCard` is rendered
- **THEN** the image is displayed with a consistent aspect ratio (16:9)
- **AND** the image has a descriptive alt text (derived from title or cover_image_url filename)
- **AND** the image is optimized using Next.js Image component (lazy loading, responsive sizing)

#### Scenario: Fallback placeholder displays when image is missing

- **GIVEN** a media review with missing or invalid cover_image_url
- **WHEN** the `MediaReviewCard` is rendered
- **THEN** a fallback placeholder is displayed maintaining 16:9 aspect ratio
- **AND** the placeholder has gray background (bg-slate-200)
- **AND** the placeholder shows centered ImageOff icon from lucide-react (48px, text-slate-400)
- **AND** the placeholder displays "No Image Available" text below icon (text-sm, text-slate-500)
- **AND** the placeholder uses flexbox for centering (flex flex-col items-center justify-center)

#### Scenario: Metadata is displayed with appropriate typography

- **GIVEN** a media review with title, excerpt, author, and publish date
- **WHEN** the `MediaReviewCard` is rendered
- **THEN** the title is displayed with heading typography (h2 or h3, larger font weight)
- **AND** the title is limited to a maximum of 2 lines, with ellipsis (`...`) if text overflows
- **AND** the excerpt is displayed with body text size (or omitted if null)
- **AND** the excerpt is limited to a maximum of 2 lines, with ellipsis (`...`) if text overflows
- **AND** the author is displayed with smaller, muted typography if available (or omitted if null)
- **AND** the publish date is formatted in Australian format without time (e.g., "1 Jan 2025" from ISO timestamp)

#### Scenario: Clicking card opens media review detail page in new tab

- **GIVEN** a rendered `MediaReviewCard` with a slug field
- **WHEN** the user clicks anywhere on the card
- **THEN** the browser opens a new tab navigating to `/media-reviews/[slug]` (where `[slug]` is the review's slug value)
- **AND** the original page remains open in the previous tab
- **AND** the entire card area is clickable (image, title, excerpt, author, date all trigger the link)

#### Scenario: Card displays hover state for visual feedback

- **GIVEN** a rendered `MediaReviewCard`
- **WHEN** the user hovers over the card
- **THEN** the card displays visual feedback (opacity change or shadow increase)
- **AND** the cursor changes to pointer style
- **AND** hover state clearly indicates the card is interactive

### Requirement: Date formatting is consistent and reusable

The site SHALL provide a reusable utility function to format ISO 8601 timestamps to Australian date format consistently across the application.

#### Scenario: Date formatting utility handles various inputs

- **GIVEN** an ISO 8601 timestamp string
- **WHEN** passed to `formatAustralianDate()` utility function
- **THEN** the function returns a formatted date string in Australian format (e.g., "1 Jan 2025")
- **AND** the function handles invalid dates gracefully (returns fallback or "N/A")
- **AND** the function can be reused in other components or pages requiring Australian date formatting

#### Scenario: MediaReviewCard uses date formatting utility

- **GIVEN** a media review card rendering a publish date
- **WHEN** the card is rendered
- **THEN** the publish date is formatted using the `formatAustralianDate()` utility
- **AND** all media review dates display consistent formatting

### Requirement: MediaReviewsList component renders multiple media review cards

The site SHALL provide a `MediaReviewsList` component that accepts an array of media reviews and renders a vertical list of `MediaReviewCard` components with consistent spacing.

#### Scenario: Display multiple media reviews in vertical list

- **GIVEN** an array of media review items ordered by publish_date descending
- **WHEN** the `MediaReviewsList` component is rendered
- **THEN** each item is rendered as a separate `MediaReviewCard`
- **AND** the cards are laid out in a single column (one item per line/row)
- **AND** there is no gap between cards (items placed directly adjacent)
- **AND** items appear in the order provided (most recent first)

#### Scenario: Empty media reviews list

- **GIVEN** an empty array of media reviews
- **WHEN** the `MediaReviewsList` component is rendered
- **THEN** a message is displayed: "No media reviews available at this time."
- **AND** the message is centered on the page with appropriate spacing

#### Scenario: Responsive grid layout

- **GIVEN** a list of media reviews
- **WHEN** rendered on various screen sizes
- **THEN** the layout remains a single column on all viewport sizes
- **AND** each card adapts responsively (image left/top, content right/below)
- **AND** cards remain readable and properly aligned on all viewport sizes

### Requirement: Infinite scroll loads more items when user scrolls down

The site SHALL implement infinite scroll to load additional media reviews when the user scrolls near the bottom of the list.

#### Scenario: Initial page load displays 10 items

- **GIVEN** the Media Reviews page is loaded
- **WHEN** the page renders
- **THEN** the `MediaReviewsList` displays the first 10 published media reviews
- **AND** reviews are ordered by `publish_date` descending (latest first)

#### Scenario: Load more items on scroll

- **GIVEN** a user is viewing the media reviews list with initial 10 items
- **WHEN** the user scrolls down and a trigger element near the bottom becomes visible
- **THEN** the next 10 media reviews are fetched from Supabase
- **AND** a loading spinner (Loader2 from lucide-react with animate-spin) is displayed centered at bottom with appropriate spacing
- **AND** the new items are appended to the existing list once loaded
- **AND** the list scrolls smoothly without jumping or flickering

#### Scenario: Stop loading when no more items exist

- **GIVEN** all published media reviews have been loaded
- **WHEN** the user scrolls to the bottom
- **THEN** no more items are fetched
- **AND** the loading indicator does not appear
- **AND** the list ends naturally without explicit message

#### Scenario: Handle fetch errors gracefully

- **GIVEN** a user triggers infinite scroll to load more items
- **WHEN** the fetch request fails
- **THEN** the system automatically retries once after 2 second delay
- **AND** if retry also fails, a toast notification displays: "Failed to load more reviews. Please try again."
- **AND** existing items remain visible in the list
- **AND** user can manually trigger reload by scrolling to bottom again

### Requirement: Text content is truncated with ellipsis when exceeding line limits

The site SHALL truncate title and excerpt text to a maximum of 2 lines, displaying ellipsis (`...`) when text overflows.

#### Scenario: Title truncation with ellipsis

- **GIVEN** a media review with a title longer than 2 lines
- **WHEN** the `MediaReviewCard` is rendered
- **THEN** the title is displayed using only 2 lines
- **AND** text exceeding 2 lines is truncated with ellipsis (`...`) at the end of the second line
- **AND** the truncated title remains readable and properly aligned

#### Scenario: Excerpt truncation with ellipsis

- **GIVEN** a media review with an excerpt longer than 2 lines
- **WHEN** the `MediaReviewCard` is rendered
- **THEN** the excerpt is displayed using only 2 lines
- **AND** text exceeding 2 lines is truncated with ellipsis (`...`) at the end of the second line
- **AND** the truncated excerpt remains readable and properly aligned
- **AND** if excerpt is null or empty, the excerpt field is omitted from display

### Requirement: Media Reviews page fetches and displays published media reviews from Supabase

The Media Reviews page (`/media-reviews`) SHALL fetch published media reviews from the Supabase `media_review` table and render them using the `MediaReviewsList` component.

#### Scenario: Media Reviews page loads with initial batch

- **GIVEN** a user navigates to `/media-reviews`
- **WHEN** the page loads
- **THEN** the page server-side fetches the first 10 media reviews where `is_published = true`
- **AND** reviews are ordered by `publish_date` descending (most recent first)
- **AND** the `MediaReviewsList` component receives the fetched reviews in the correct order
- **AND** the list is displayed with media review cards, latest first

#### Scenario: Media Reviews page fetches published reviews

- **GIVEN** a user navigates to `/media-reviews` and scrolls to trigger loading more items
- **WHEN** the infinite scroll trigger is activated
- **THEN** a server action fetches the next batch of media reviews (with offset) where `is_published = true`
- **AND** reviews are ordered by `publish_date` descending
- **AND** the next batch of items is appended to the list

#### Scenario: Page displays published reviews only

- **GIVEN** the Supabase `media_review` table contains both published and unpublished reviews
- **WHEN** the Media Reviews page fetches data
- **THEN** only reviews where `is_published = true` are fetched and displayed
- **AND** unpublished reviews are excluded from the page

#### Scenario: Page metadata is correctly set to match Supabase schema

The site SHALL define a TypeScript type for media review items that matches the Supabase `media_review` table schema.

#### Scenario: MediaReview type is defined and enforced

- **GIVEN** media review components and data handlers
- **WHEN** processing media review data from Supabase
- **THEN** a `MediaReview` type is defined with fields matching the schema:
  - `id` (uuid as string)
  - `title` (string, required)
  - `excerpt` (string | null, optional)
  - `author` (string | null, optional)
  - `cover_image_url` (string, required)
  - `publish_date` (string, ISO 8601 timestamp)
  - `slug` (string, unique identifier)
  - `is_published` (boolean)
  - `content` (Record<string, unknown> | null, JSONB field)
  - `created_at`, `updated_at` (timest cover image
- **WHEN** the component is rendered
- **THEN** the image has a descriptive `alt` attribute (derived from title or cover_image_url)

#### Scenario: MediaReview type is defined and enforced

- **GIVEN** media review components and data handlers
- **WHEN** processing media review data
- **THEN** a `MediaReview` type is defined with fields: `id`, `title`, `excerpt`, `author`, `publishDate`, `imageUrl`, `imageAlt`
- **AND** all components and functions that handle media reviews use this type
- **AND** TypeScript strict mode catches missing or incorrectly typed fields

### Requirement: Accessibility requirements are met

Media review cards SHALL follow WCAG AA accessibility standards.

#### Scenario: Images have descriptive alt text

- **GIVEN** a `MediaReviewCard` with an image
- **WHEN** the component is rendered
- **THEN** the image has a descriptive `alt` attribute that conveys the content and context
- **AND** screen readers can announce the image purpose

#### Scenario: Semantic HTML structure

- **GIVEN** media review cards
- **WHEN** rendered
- **THEN** headings use semantic heading elements (h1, h2, h3) in proper hierarchy
- **AND** dates use the `<time>` element where appropriate
- **AND** content is readable by assistive technologies (no images used for text, proper contrast)

#### Scenario: Color contrast meets standards

- **GIVEN** media review card typography
- **WHEN** rendered
- **THEN** all text (title, excerpt, author, date) meets WCAG AA color contrast ratios (4.5:1 for small text, 3:1 for larger text)

