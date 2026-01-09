# Proposal: add-brands-section

## Why

Ocean Food Group manages a diverse portfolio of brands. The home page currently lacks visibility of this brand portfolio, missing an opportunity to:

- Highlight the company's diverse brand offerings to visitors
- Build trust through showcasing multiple successful brands
- Improve home page engagement and content depth
- Establish clear navigation pathways for brand-specific information

Adding a dedicated brands section will address this gap and establish a reusable pattern for brand content across the site.

## What

Add a brands section to the home page that displays brands fetched from the `brand` table in Supabase. This section will showcase Ocean Food Group's portfolio of brands in a visually appealing, alternating left-right layout where each brand card is clickable and links to the brand's external website.

## Scope

### In Scope

- Create `BrandCard` component to display individual brand with logo, name, and introduction text
- Create `BrandsList` component to render a vertical list of brands with alternating left-right layout
- Create server action `fetchPublishedBrands()` to query Supabase `brand` table (filtering is_active = true)
- Create brand-related types and utilities
- Integrate brands section into home page (`app/page.tsx`)
- Add comprehensive tests for components and server action
- Implement brand cards as clickable links to external website URLs

### Out of Scope

- Creating the `brand` Supabase table (assumed to exist)
- Brand detail pages or drill-down features
- Dynamic brand management or admin interface
- Internationalization or multi-language support

## Implementation Notes

- Follow existing patterns from `job-postings-list` and `media-reviews-list` specifications
- Use Tailwind CSS for styling with custom CSS files in `styles/components/` for complex layouts if needed
- Implement server-side data fetching in server components for optimal performance
- Include error handling and empty state messaging
- Ensure responsive design for mobile, tablet, and desktop viewports
- Add loading skeleton or state indication while data is fetching

## Success Criteria

1. Brands section displays on home page with fetched data from Supabase (only active brands where is_active = true)
2. BrandCard component renders brand logo, name, and introduction text
3. BrandsList component displays cards in vertical list with alternating left-right layout (odd items: left image/right text, even items: right image/left text on desktop; all items stack vertically on mobile)
4. Each brand card is clickable and opens the external website_url in a new tab with proper security attributes (rel="noopener noreferrer")
5. If no active brands exist, the entire brands section does not render on the home page
6. Server action handles missing data gracefully with error messages
7. All components and utilities have comprehensive test coverage (70%+ lines)
8. Design matches site typography and color scheme

## Approval Required

This proposal must be reviewed and approved before implementation begins.
