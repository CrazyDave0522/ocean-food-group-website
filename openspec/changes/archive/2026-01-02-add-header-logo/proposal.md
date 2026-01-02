# Change: Replace header text with logo image

## Why
The header currently displays "Ocean Food Group" as plain text. Using the brand logo image instead provides better brand identity, visual consistency, and professional appearance across the site.

## What Changes
- Replace text "Ocean Food Group" in header with logo image from `public/images/logos/Ocean-Food-bg.png`
- Use Next.js Image component for optimized loading
- Ensure logo maintains link functionality to home page
- Add appropriate alt text for accessibility
- Adjust sizing and spacing to fit header layout

## Impact
- Affected specs: site-layout (modified header requirement for logo display)
- Affected code:
  - `components/Header.tsx` — replace text link with Image component wrapped in Link
