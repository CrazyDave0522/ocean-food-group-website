# Proposal: Add Media Reviews List

**Change ID:** `add-media-reviews-list`  
**Status:** Proposal  
**Date:** 5 January 2026

## Summary

Add a media reviews list to the Media Reviews page (`/media-reviews`). Each item displays a cover image on the left, with title, excerpt, author, and publish date (in Australian format: `1 Jan 2025`) on the right—similar to a news/article listing layout.

## Context & Motivation

The Media Reviews page currently shows only placeholder content. Adding a structured list of media reviews enables Ocean Food Group to showcase press coverage, news mentions, and media appearances. The card-based layout with image and metadata makes reviews scannable and visually engaging.

## Scope

### In Scope

- Create a reusable `MediaReviewCard` component displaying:
  - Cover image (left side)
  - Title (right side)
  - Excerpt (right side)
  - Author (right side)
  - Publish date (right side)
  - Clickable card that opens media review detail page in new tab using `slug`
- Create a `MediaReviewsList` component to display a single-column vertical list of media review cards
- Implement infinite scroll: load 10 items initially, then load 10 more items when user scrolls near bottom
- Update the Media Reviews page to fetch published media reviews from Supabase and render the list
- Create a server action to fetch published media reviews from Supabase with offset/pagination support
- Add CSS styling for responsive layout (image and content alignment)
- Add loading indicator when fetching more items

### Out of Scope

- Admin interface or CMS for managing media reviews (assume data is managed elsewhere)
- Search/filter functionality
- Email integration or notifications
- Media review detail page (`/media-reviews/[slug]`) — this is a separate feature that will display full content from Editor.js
- Content field processing in the list view (content is stored but only displayed on detail page)

## Dependencies & Risks

### Dependencies

- Relies on existing Tailwind CSS and layout patterns from contact-form and franchise-form specs
- Assumes Next.js Image component is available (already in use)
- Requires Supabase client configured in `lib/supabase.ts` (already available)
- Requires `media_review` table to exist in Supabase database with proper schema

### Risks

- None identified; this is a presentational feature with low risk

## Design Decisions

1. **Card Layout**: Horizontal card with image on left (fixed width), content on right (flexible)
   - Right side content structure (top to bottom): Title → Excerpt → Author + Publish Date (same line)
   - Author and publish date aligned horizontally with spacing between them
2. **Responsive Design**: Stack vertically on mobile (image on top, content below), side-by-side on larger screens
3. **List Layout**: Single-column vertical layout (each item on its own line)
4. **Ordering**: Display by publish date descending (latest first)
5. **Responsive Design**: Stack vertically on mobile (image on top, content below), side-by-side on larger screens
6. **Data Structure**: TypeScript type matching Supabase `media_review` table schema
7. **Server-Side Fetching**: Fetch published reviews server-side on page load (no client-side API calls)

## Acceptance Criteria

- [ ] `MediaReviewCard` component renders correctly with all fields
- [ ] `MediaReviewsList` component displays cards in single-column vertical layout
- [ ] Initial page load displays 10 media review items
- [ ] Infinite scroll loads 10 more items when user scrolls near bottom
- [ ] Title truncates to maximum 2 lines with ellipsis (`...`) if text overflows
- [ ] Excerpt truncates to maximum 2 lines with ellipsis (`...`) if text overflows
- [ ] Loading indicator displays while fetching more items
- [ ] Media Reviews page (`/media-reviews`) replaces placeholder content with the list
- [ ] Responsive design works on mobile and desktop
- [ ] All text content is semantic and accessible (alt text for images, proper heading hierarchy)
- [ ] TypeScript types are properly defined and enforced
- [ ] Unit tests cover `MediaReviewCard` and `MediaReviewsList` components including infinite scroll
- [ ] Page metadata is correctly exported

## Implementation Notes

- Store media review card component in `components/media-reviews/MediaReviewCard.tsx`
- Store media review list component in `components/media-reviews/MediaReviewsList.tsx` (client component for infinite scroll state management)
- Define types in `lib/media-reviews/types.ts` matching Supabase schema
- Create a reusable date formatting utility in `lib/utils/formatDate.ts` to convert ISO timestamps to Australian format (`1 Jan 2025`)
- Create a server action in `lib/actions/mediaReviews.ts` to fetch published reviews with pagination support (offset/limit parameters)
- Implement infinite scroll using Intersection Observer API or scroll event listener
- Add loading state management with React hooks (useState for items, loading, hasMore states)
- Use Tailwind CSS for styling; create `styles/components/media-review-card.css` if custom CSS is needed
- Fetch data server-side initially, then use client-side server actions for loading more items

## Spec Deltas

This change introduces one new capability:

1. **media-reviews-list**: Define the component interfaces, layout requirements, and rendering behavior for displaying media review cards.

See `specs/media-reviews-list/spec.md` for detailed requirements and scenarios.
