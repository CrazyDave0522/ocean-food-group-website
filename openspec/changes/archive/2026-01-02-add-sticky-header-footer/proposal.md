# Change: Pin header to top and footer to bottom

## Why
Users should always see the navigation while scrolling and avoid empty space or floating footers on short pages.

## What Changes
- Make the header sticky at the top of the viewport across all pages.
- Ensure the footer stays at the bottom of the viewport even when page content is short.
- Update layout structure/styles to support sticky positioning without overlapping main content.

## Impact
- Affected specs: site-layout (new capability)
- Affected code: layout structure and styles (e.g., app/layout.tsx, app/globals.css, Header/Footer components)
