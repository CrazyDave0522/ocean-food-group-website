# Add Feature Grid to Home Page

## Summary

Add a FeatureGrid component instance to the home page below the callout section, displaying the latest three media reviews with a button linking to the media reviews page.

## Why

The home page currently ends with a callout section, but lacks engaging content to showcase recent media coverage. Adding a FeatureGrid with the latest media reviews will provide social proof and encourage users to explore press coverage about Ocean Food Group.

## Motivation

The FeatureGrid component provides an excellent way to showcase media reviews in an alternating layout that creates visual interest. By displaying the three most recent published media reviews with their cover images, titles, and excerpts, users can quickly see the breadth of coverage Ocean Food Group receives. The intro section will provide context about the media coverage, and the button will direct users to the full media reviews page.

## Impact

- **Enhanced Home Page**: Adds engaging content below the callout section
- **Social Proof**: Showcases recent media coverage and press mentions
- **User Engagement**: Encourages exploration of media reviews section
- **Content Strategy**: Leverages existing media review content dynamically

## Implementation Notes

- Position the FeatureGrid component below the existing Callout component on the home page
- Fetch the latest 3 published media reviews using `fetchPublishedMediaReviews(0, 3)`
- Map media review data to FeatureGrid props:
  - `title` → feature title
  - `excerpt` → feature description
  - `cover_image_url` → feature image
  - `/media-reviews/${slug}` → feature link
- Intro content: Placeholder text about media coverage and recognition
- Button links to `/media-reviews` page
- Responsive behavior matches existing home page sections

## Dependencies

- FeatureGrid component (already implemented)
- Media reviews data from Supabase
- `fetchPublishedMediaReviews` server action

## Risks

- Media review data availability (graceful fallback if no reviews)
- Image loading performance for cover images
- Content length consistency across media reviews