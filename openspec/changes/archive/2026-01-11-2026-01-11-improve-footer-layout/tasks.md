# Footer Layout Improvement - Tasks

## 1. Update Footer Component Structure
- [x] Modify `components/Footer.tsx` to support two-section layout
- [x] Add section containers for brands and company info
- [x] Add visual separator between sections
- [x] Ensure responsive layout structure

## 2. Implement Brand Logos Section
- [x] Create "Our Culinary Concepts" heading
- [x] Add brand fetching logic using `fetchPublishedBrands()` action
- [x] Implement responsive grid layout (max 4 logos per row, adjust for mobile)
- [x] Limit display to maximum 5 rows (20 logos total)
- [x] Add conditional rendering - only show section if brands exist
- [x] Make logos clickable with external links (target="_blank", rel="noopener noreferrer")
- [x] Handle brands without website_url (display but make non-clickable)
- [x] Add lazy loading for brand images
- [x] Handle failed image loads by omitting logos from display
- [x] Ensure consistent logo sizing and aspect ratios
- [x] Add alt text using brand names for accessibility
- [x] Order brands by creation date (newest first)
- [x] Add horizontal centering for brand grid
- [x] Handle loading and error states for brand data

## 3. Implement Company Information Section
- [x] Add Ocean Food Group logo (`public/images/logos/Ocean-Food-bg-cropped.png`)
- [x] Include Terms & Conditions link
- [x] Include Privacy Policy link
- [x] Add copyright information
- [x] Style company info layout

## 4. Update Footer Styling
- [x] Add CSS for two-section layout in `styles/components/footer.css`
- [x] Style brand grid with proper spacing and alignment
- [x] Style company info section
- [x] Size company logo same as header logo
- [x] Style separator line: `1px solid rgba(255, 255, 255, 0.20);`
- [x] Add responsive breakpoints for mobile/tablet layouts
- [x] Ensure visual separator styling

## 5. Test and Validate
- [x] Test responsive behavior across all breakpoints
- [x] Verify brand logos display correctly
- [x] Check accessibility (ARIA labels, keyboard navigation)
- [x] Validate loading states and error handling
- [x] Run build and check for TypeScript/ESLint errors