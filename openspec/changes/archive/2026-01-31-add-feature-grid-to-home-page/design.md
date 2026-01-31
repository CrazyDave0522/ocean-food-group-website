# Design for Add Feature Grid to Home Page

## Technical Approach

Integrate the existing FeatureGrid component into the home page to display the latest three media reviews, positioned below the callout section.

## Component Integration

- **Location**: Add to `app/page.tsx` below the Callout component
- **Data Source**: Server-side fetch of latest 3 published media reviews
- **Layout**: Maintains existing home page section spacing and responsive design

## Data Mapping

The media review data structure maps to FeatureGrid props as follows:

```typescript
// MediaReview (from Supabase)
interface MediaReview {
  id: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string;
  slug: string;
  // ... other fields
}

// Maps to FeatureGrid feature
interface FeatureItem {
  id: string;
  title: string;        // ← MediaReview.title
  description: string;  // ← MediaReview.excerpt (with fallback)
  image: string;        // ← MediaReview.cover_image_url
  link: string;         // ← `/media-reviews/${MediaReview.slug}`
}
```

## Server Action Design

Create `fetchLatestMediaReviews()` server action that:
- Calls existing `fetchPublishedMediaReviews(0, 3)`
- Returns exactly 3 items or handles insufficient data gracefully
- Provides fallback content when media reviews are unavailable

## Content Strategy

**Intro Section:**
- Title: "Featured in Media" or similar
- Text: Brief description of media coverage and recognition
- Button: "View All Media Reviews" → `/media-reviews`

**Feature Units:**
- Display latest 3 published media reviews
- Alternating layout: content-image, image-content, content-image
- Each unit links to individual media review page
- Excerpt provides preview of coverage

## Error Handling

- **No Media Reviews**: Graceful fallback with placeholder content
- **Missing Excerpt**: Use truncated content or generic description
- **Image Loading**: Next.js Image component handles fallbacks automatically
- **Data Fetch Errors**: Log errors but don't break page rendering

## Performance Considerations

- Server-side data fetching during page load
- Next.js Image optimization for cover images
- Minimal impact on home page load time
- Cached media review data where possible

## Responsive Design

- **Desktop**: 4-column CSS Grid layout (1 intro column + 3 feature unit columns)
- **Tablet**: Adjusted grid proportions (1.2fr intro + 1fr units)
- **Mobile**: Simplified block layout with aspect-ratio preservation
  - Uses padding-bottom technique to maintain 750:510 background image aspect ratio
  - Intro content positioned absolutely within aspect-ratio container
  - Feature units hidden on mobile (intro-only layout)
  - Container padding removed for full-width mobile experience

## Testing Strategy

- Unit tests for data mapping functions
- Integration tests for home page rendering
- Error case testing for data fetching failures
- Responsive behavior verification