# Footer Layout Improvement

## Why

The current footer is minimal and doesn't showcase the company's brand portfolio or provide clear company information hierarchy. This limits the site's ability to:

- Highlight Ocean Food Group's diverse culinary concepts and brand offerings
- Build trust through showcasing multiple successful brands
- Provide clear navigation to legal pages and company information
- Improve overall site engagement and professional appearance

Implementing a two-section footer layout will address these gaps and create a more comprehensive site foundation.

## What Changes

Enhance the footer with a two-section layout:

1. **Top Section**: "Our Culinary Concepts" heading with active brand logos displayed in a responsive grid (maximum 4 logos per row, 5 rows total)
2. **Bottom Section**: Ocean Food Group company information including logo, legal links, and copyright
3. **Visual Separator**: Clean line between the two sections

### Footer Structure Changes
- Two vertical sections with clear separation
- Top section: Brand showcase with responsive grid
- Bottom section: Company info and legal links
- Visual separator between sections

### Brand Display Implementation
- Show only active brands from database using existing `fetchPublishedBrands()` action
- Maximum 4 logos per row on desktop, responsive adjustments for mobile
- Maximum 5 rows of brand logos (20 logos total)
- Horizontally centered grid layout
- Section only displays if active brands exist
- Logos are clickable and open brand websites in new tabs with security attributes
- Failed logo images are omitted from display
- Consistent logo sizing and aspect ratios
- Brand logos include alt text using brand name
- Brand images are lazy-loaded for performance
- Brands without website URLs are displayed but non-clickable
- Brand ordering by creation date (newest first)

### Company Information Implementation
- Ocean Food Group logo (sized same as header logo)
- Terms & Conditions link
- Privacy Policy link
- Copyright information
- Clean, professional layout with proper spacing

## Technical Details

- Fetch active brands using existing `fetchPublishedBrands()` action
- Maintain existing footer styling patterns
- Ensure responsive behavior across all breakpoints
- Keep accessibility standards (ARIA labels, keyboard navigation)
- No specific caching strategy required for brand data
- Separator line: `1px solid rgba(0, 0, 0, 0.1);`
- No hover effects on brand logos
- No loading states or skeleton loaders

## Dependencies

- Existing brand data structure and fetching logic
- Current footer component and styling
- Legal page routes (/terms, /privacy)

## Success Criteria

- Footer displays brand logos in organized grid
- Company information clearly presented
- Responsive layout works on all screen sizes
- Maintains existing functionality and accessibility