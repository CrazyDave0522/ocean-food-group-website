# Change: Improve Header Styling and Mobile Navigation

## Why

The current header lacks professional styling details and mobile responsiveness:
- Horizontal padding is too narrow (16px) for desktop spacing standards.
- Navigation buttons lack consistent font styling and active state indicators, reducing UX clarity.
- Mobile layout has no menu, creating a poor experience on small screens.

These improvements enhance visual hierarchy, brand consistency, and mobile usability.

## What Changes

- **Header horizontal padding**: Increase left/right padding from 16px to 60px on desktop.
- **Navigation button styling**: Apply consistent font styling (fs-body-lg, 500 weight, normal style/line-height).
- **Active navigation state**: Highlight current page nav button with active styling.
- **Mobile menu**: Replace visible nav buttons with a hamburger menu icon; overlay opens on click with vertical nav.

## Impact

- **Affected specs**: `site-layout` (header layout and navigation).
- **Affected code**: `components/Header.tsx`, `styles/components/header.css`.
- **Breaking changes**: None; backward compatible redesign.
- **Mobile**: Significant UX improvement; nav becomes accessible on small screens.
