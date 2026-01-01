# Design Notes: Default Font Strategy

## Approach

1. Provide a single token (CSS custom property) for the site font-family that can be reused across components and style tokens.
   - Example value: `"Montserrat", Georgia, serif`.
2. Load Montserrat via a trusted provider (e.g., Google Fonts) in the global stylesheet or via a small link tag in the app layout.
3. Use `font-display: swap` to avoid invisible text (reduce CLS) and only include the weights that are required by the site (e.g., 400, 600).

## Implementation Options

- Option A (recommended): Add a short `<link rel="preconnect">` + Google Fonts `link` in `app/layout.tsx` and define a CSS variable in `styles/tokens` or `globals.css`.
- Option B: Self-host font files in `public/fonts/` and reference them via `@font-face` if privacy/performance requirements dictate.

## Performance & Accessibility
- Limit font weights to the minimum needed.
- Use `font-display: swap`.
- Consider preloading critical fonts for faster first render on key pages.

## Examples

- CSS token (in tokens or globals):

  --font-family-base: "Montserrat", Georgia, serif;

- Implementation in global stylesheet: set `body { font-family: var(--font-family-base); }`.
