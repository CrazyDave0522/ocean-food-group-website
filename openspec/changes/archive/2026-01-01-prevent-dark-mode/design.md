# Design: Force Light Theme

## Overview
This change ensures the site always renders using the project's light theme tokens and styling, regardless of a user's OS-level `prefers-color-scheme` setting.

## Options
- Option A (recommended, minimal): Remove or override `@media (prefers-color-scheme: dark)` blocks so `:root` light tokens always apply. Add a `meta` or `html` attribute note documenting the site is light-only.
- Option B: Add a top-level CSS rule that resets color-scheme and forces light variables, e.g. `:root { color-scheme: light; }` and explicitly set the light token values in `:root` with `!important` if necessary.

## Trade-offs
- Option A is clean but requires auditing styles for all dark-mode blocks. Option B is a quick fail-safe but may be brittle if many components rely on media queries.

## Implementation Notes
- Search for `prefers-color-scheme` in the codebase and catalog occurrences.
- Update `app/globals.css` to ensure `:root` contains the final light token values and consider removing the dark media query block.
