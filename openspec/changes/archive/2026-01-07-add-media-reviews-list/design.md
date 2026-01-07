# Design: Media Reviews List

## Architecture Overview

The Media Reviews list is composed of two React components:

1. **MediaReviewCard**: Presentational component that renders a single media review item with:
   - Cover image (left column)
   - Title, excerpt, author, and publish date (right column)
   - Responsive layout (stacks vertically on mobile)

2. **MediaReviewsList**: Container component that:
   - Accepts an array of media review items (already sorted by publish_date DESC)
   - Maps over items and renders `MediaReviewCard` for each
   - Handles single-column layout with consistent spacing

## Component Hierarchy

```
MediaReviewsList
  ├── MediaReviewCard
  │   ├── Image (Next.js <Image>)
  │   ├── Title (h2 or h3)
  │   ├── Excerpt (p)
  │   ├── Author (p)
  │   └── Publish Date (p or time)
  ├── MediaReviewCard
  └── MediaReviewCard
```

## Data Structure

Media reviews are fetched from the Supabase `media_review` table. The TypeScript type reflects the table schema:

```typescript
type MediaReview = {
  id: string; // UUID
  title: string;
  excerpt: string | null;
  author: string | null;
  cover_image_url: string;
  publish_date: string; // ISO 8601 timestamp
  slug: string;
  is_published: boolean;
  content: Record<string, unknown> | null; // JSONB field from Editor.js (rich text, displayed only in media review detail page, not in list)
  created_at: string;
  updated_at: string | null;
};
```

Only fields displayed in the card:

- `cover_image_url`: Used for the cover image
- `title`: Display as heading
- `excerpt`: Display as summary text
- `author`: Display as byline
- `publish_date`: Format and display as publication date
- `slug`: Used to construct link to media review detail page (`/media-reviews/[slug]`)

## Layout & Styling

### MediaReviewCard Layout

**Desktop (md: 768px+):** Horizontal card with two-column layout

- **Left column**: Cover image (fixed width, e.g., 200-250px)
- **Right column** (flexible width, organized vertically):
  - Title (h2 or h3, top) — max 2 lines with ellipsis (`...`) if text overflows
  - Excerpt (body text, middle) — max 2 lines with ellipsis (`...`) if text overflows
  - Author and Publish Date (small text, bottom) — displayed on the same line with spacing between them
    - Format: `Author Name    1 Jan 2025` (Australian date format, no time)

**Mobile (< md: 768px):** Vertical stack

- Cover image on top (full width, 16:9 aspect ratio maintained—height auto-calculated based on container width)
- Title below image
- Excerpt below title
- Author and publish date on same line at bottom

**Spacing & Alignment:**

- Card padding: Use spacing tokens from `tokens.css` (e.g., `--space-md` for mobile, `--space-lg` for desktop)
- Gap between image and text on desktop (md+): Use `--space-md` or `--space-lg` token
- Image aspect ratio: 16:9 (fixed, consistent across cards)
- Author and date row: Flex with space-between or justify-between to separate them
- Ensure proper vertical alignment between image and content on desktop (flex items-stretch or items-start)
- **Note**: If current spacing tokens (`--space-xs`, `--space-sm`, `--space-md`, `--space-lg`) are insufficient for card layout, new tokens can be defined in `tokens.css` (e.g., `--space-card-horizontal` for image/content gap)

### MediaReviewsList Layout

- **Layout**: Single-column vertical list (one item per row/line)
- **Ordering**: Items ordered by `publish_date` descending (most recent first, handled by server action)
- **Spacing**: No gap between cards (items placed directly adjacent vertically)
- **Container**: Wrapped in site container (consistent with other pages)
- **Mobile**: Single column, same as desktop (responsive card content within each item)
- **Empty State**: Display message "No media reviews available at this time." centered on page when no published reviews exist
- **End of List**: No explicit message when all items loaded—just visual end with appropriate spacing

### Infinite Scroll Implementation

- **Initial Load**: Render first 10 items on page load
- **Trigger**: Detect when user scrolls near bottom of list (using Intersection Observer API)
- **Load More**: Fetch next 10 items when trigger element becomes visible
- **Loading State**: Display loading spinner (centered, below current items) while fetching
  - Use rotating spinner icon from lucide-react (`Loader2` with `animate-spin`)
  - Positioned at bottom center with appropriate spacing (`--space-lg`)
- **End State**: Stop loading when no more items available (no visual indicator, just natural list end)
- **Error Handling**: If fetch fails:
  - Retry automatically once after 2 second delay
  - If retry fails, display toast notification: "Failed to load more reviews. Please try again."
  - Keep existing items visible (don't clear list)
  - Allow user to manually trigger reload by scrolling again
- **State Management**: Use React hooks (useState) to manage:
  - `items`: Array of loaded media reviews
  - `isLoading`: Boolean flag for loading state
  - `hasMore`: Boolean flag to track if more items exist
  - `offset`: Current pagination offset
  - `error`: Error state for failed loads

## Responsive Breakpoints

Following the project's Tailwind configuration (`tailwind.config.ts`):

- **Mobile** (< 768px / < md): Single column, image on top, content below
  - Covers: xs (375px), sm (640px)
- **Tablet** (768px-1023px / md): Single column, image on left (50/50 split or flexible)
  - Covers: md (768px)
- **Desktop** (1024px+ / lg+): Single column, image on left (fixed width ~200-250px / flexible content split)
  - Covers: lg (1024px), xl (1280px), 2xl (1440px)

## Integration Points

1. **Media Reviews Page**: Server component that:
   - Calls server action `fetchPublishedMediaReviews()` on initial render
   - Reviews are returned pre-sorted by publish_date DESC
   - Passes fetched data to `MediaReviewsList` component
   - Handles loading/error states

2. **Server Action** (`lib/actions/mediaReviews.ts`):
   - Queries Supabase for media reviews where `is_published = true`
   - Orders by `publish_date DESC` (most recent first)
   - Returns typed array of media reviews

3. **Global Styles**: Leverage existing `styles/` (tokens.css, utilities.css, etc.)

4. **Image Handling**: Use Next.js Image component with proper alt text (fallback or extract from cover_image_url)

5. **Supabase Client**: Use existing `lib/supabase.ts` helper for database queries

## Styling Approach

- **Tailwind CSS**: Primary styling (flexbox, spacing, typography)
- **CSS Module / Component CSS** (optional): Create `styles/components/media-review-card.css` if custom layouts or animations are needed (e.g., hover effects, transitions)
- **No inline styles**: Follow project convention of separating CSS from component code

## Utilities & Helpers

### Date Formatting Utility (`lib/utils/formatDate.ts`)

A reusable utility function to format ISO 8601 timestamps to Australian date format:

```typescript
export function formatAustralianDate(isoDate: string): string;
```

- Input: ISO 8601 timestamp (e.g., `"2025-01-01T10:30:00Z"`)
- Output: Formatted date string in Australian format (e.g., `"1 Jan 2025"`)
- Handles invalid dates gracefully (returns original string or "N/A")
- Uses JavaScript `Intl.DateTimeFormat` or date-fns for formatting
- Can be reused elsewhere in the application for consistent date formatting

## Edge Cases & Considerations

1. **Title Truncation**: Limit to 2 lines with ellipsis using Tailwind `line-clamp-2` class
2. **Excerpt Truncation**: Limit to 2 lines with ellipsis using Tailwind `line-clamp-2` class
3. **Long Author Names**: May wrap or truncate gracefully depending on layout space
4. **Missing Image**: Display a fallback placeholder maintaining 16:9 aspect ratio with:
   - Gray background (`bg-slate-200`)
   - Centered `ImageOff` icon from lucide-react (48px size, text-slate-400 color)
   - "No Image Available" text below icon (text-sm, text-slate-500)
   - Entire placeholder uses flexbox centering (flex flex-col items-center justify-center)
5. **Missing Metadata**: Omit field gracefully
6. **Accessibility**: Ensure image alt text is descriptive, use semantic HTML (time element for dates), ensure sufficient color contrast
7. **Empty List**: Display appropriate message when no published reviews exist

## Future Extensibility

- Could add filtering by category or tag (stored in `content` JSONB field via Editor.js)
- Could add pagination if dataset grows large
- Could support featured/pinned reviews (add `featured` boolean column)
- Detail page feature (`/media-reviews/[slug]`) is a separate implementation that will render the `content` field
