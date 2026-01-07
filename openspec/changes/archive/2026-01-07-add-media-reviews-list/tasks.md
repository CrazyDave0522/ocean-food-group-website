# Tasks: Add Media Reviews List

## Implementation Checklist

- [x] **Define TypeScript types** (`lib/media-reviews/types.ts`)
  - Define `MediaReview` type matching Supabase `media_review` table schema
  - Include all fields: `id`, `title`, `excerpt`, `author`, `cover_image_url`, `publish_date`, `slug`, `is_published`, `content`, `created_at`, `updated_at`
  - **Note**: `content` field is rich text from Editor.js (JSONB format) and is only displayed in the media review detail page (`/media-reviews/[slug]`), not in the media reviews list
  - Ensure all fields are properly typed with null/optional as needed

- [x] **Create date formatting utility** (`lib/utils/formatDate.ts`)
  - Create reusable function `formatAustralianDate(isoDate: string): string`
  - Convert ISO 8601 timestamps to Australian format (e.g., "1 Jan 2025")
  - Handle invalid dates gracefully (return "N/A" or original string)
  - Use JavaScript `Intl.DateTimeFormat` or date-fns library
  - Write unit tests for edge cases (null, invalid dates, various formats)

- [x] **Create MediaReviewCard component** (`components/media-reviews/MediaReviewCard.tsx`)
  - Accept `MediaReview` as prop
  - Render cover image on left (desktop), top (mobile) using Next.js Image
  - Extract alt text from title or cover_image_url filename
  - **Handle missing image**: Display fallback placeholder with gray background (`bg-slate-200`), centered camera/image icon (lucide-react), and "No Image Available" text, maintaining 16:9 aspect ratio
  - Render title as h3 with proper font styling
  - Limit title to maximum 2 lines with ellipsis using Tailwind `line-clamp-2` class
  - Render excerpt (if available) with body text size
  - Limit excerpt to maximum 2 lines with ellipsis using Tailwind `line-clamp-2` class
  - Render author (if available) and publish date with appropriate typography
  - Use `formatAustralianDate()` utility to format `publish_date` timestamp (e.g., "1 Jan 2025")
  - Arrange author and publish date on same line with spacing between them
  - **Make entire card clickable** - wrap entire card content in `<a>` tag linking to `/media-reviews/[slug]` with `target="_blank"` and `rel="noopener noreferrer"`
  - Add `cursor-pointer` class to anchor wrapper
  - Add hover state with `hover:opacity-80` or subtle shadow increase for visual feedback
  - For fallback image: use lucide-react `ImageOff` icon (48px, text-slate-400) with "No Image Available" text (text-sm, text-slate-500)
  - Implement responsive layout using Tailwind (flexbox row on md+, column on mobile)
  - On mobile: image maintains 16:9 aspect ratio at full container width (height auto-calculated)
  - **Use spacing tokens from `tokens.css`**: Apply `--space-md` and `--space-lg` for padding/gaps instead of arbitrary Tailwind classes
  - Handle null/optional fields gracefully (excerpt, author)
  - Ensure semantic HTML structure and accessibility (anchor wraps all content, proper heading hierarchy)

- [x] **Create MediaReviewsList component** (`components/media-reviews/MediaReviewsList.tsx`)
  - Make this a CLIENT component (use "use client") for state management and scroll detection
  - Accept initial `items` array and `hasMore` boolean as props
  - Implement state management with React hooks:
    - `items`: array of loaded media reviews
    - `isLoading`: boolean for loading state
    - `hasMore`: boolean tracking if more items exist
    - `offset`: current pagination offset
  - Map over items and render `MediaReviewCard` for each
  - Implement infinite scroll using Intersection Observer API:
    - Create a "sentinel" element at the bottom of the list
    - When sentinel becomes visible, call server action to load next batch
  - Display loading indicator (lucide-react `Loader2` with `animate-spin`, centered at bottom with `--space-lg` spacing) while fetching more items
  - Implement error handling: auto-retry once after 2s delay, show toast notification if both attempts fail, allow manual retry on scroll
  - Implement single-column vertical layout with no gap between items (items placed directly adjacent)
  - Handle empty state: display "No media reviews available at this time." centered on page
  - End of list: no explicit message, just natural visual end
  - Ensure proper semantic structure and accessibility

- [x] **Create server action to fetch media reviews** (`lib/actions/mediaReviews.ts`)
  - Create async function `fetchPublishedMediaReviews(offset: number = 0, limit: number = 10)` with `"use server"` directive
  - Accept offset and limit parameters for pagination
  - Query Supabase `media_review` table for reviews where `is_published = true`
  - Order results by `publish_date DESC` (most recent first)
  - Return object with `{ items: MediaReview[], hasMore: boolean, error?: string }`
  - Handle Supabase errors gracefully: log error, return empty items array with error message
  - Call `fetchPublishedMediaReviews(0, 10)` server action on initial render to get first 10 items
  - Pass initial items and `hasMore` flag to `<MediaReviewsList items={items} hasMore={hasMore} />`
  - Ensure page metadata is correct (title, description)
  - Handle error states from server actionrd.css` for custom hover effects or animations
  - Ensure cards have consistent padding, border, and shadow (e.g., white bg, subtle shadow)
  - Ensure responsive breakpoints work correctly (test on mobile, tablet, desktop)

- [x] **Update Media Reviews page** (`app/media-reviews/page.tsx`)
  - Make page a server component
  - Call `fetchPublishedMediaReviews()` server action on initial render
  - Pass fetched data to `<MediaReviewsList items={mediaReviews} />`
  - Ensure page metadata is correct (title, description)
  - Handle empty state (no published reviews) gracefully
  - Ensure page layout follows site conventions (container, spacing)

- [x] **Add unit tests**
  - Test `MediaReviewCard` rendering (image, title, excerpt, author, date)
  - Test responsive layout (check class presence for mobile/desktop)
  - Test `MediaReviewsList` rendering (multiple cards, empty state)
  - Create test files in `__tests__/components/media-reviews/`
Test infinite scroll behavior (sentinel element, load more trigger)
  - Test loading state display during fetch
  - Test hasMore flag controls when to stop loading
  - Create test files in `__tests__/components/media-reviews/`
  - Mock server action `fetchPublishedMediaReviews` for unit tests
- [x] **Accessibility validation**
  - Verify image alt text is present and descriptive
  - Verify heading hierarchy is correct (use axe or similar tool)
  - Verify color contrast meets WCAG AA standards
  - Test keyboard navigation and screen reader behavior (if applicable)

- [x] **Code review & validation**
  - Run `pnpm check` (TypeScript + ESLint)
  - Run `pnpm test:run` to ensure tests pass
  - Review component code for consistency with project conventions
  - Validate that all requirements from spec are met

## Validation Criteria

- All components render correctly with mock data
- Responsive layout works on mobile (< md), tablet (md), and desktop (lg+)
- No TypeScript errors or ESLint warnings
- Tests pass with reasonable coverage (aim for 70%+)
- Page metadata is correctly exported
- Accessibility requirements are met (alt text, semantic HTML, color contrast)
- Code follows project naming conventions and styling approach
