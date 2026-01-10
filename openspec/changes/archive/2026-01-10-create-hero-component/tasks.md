# Implementation Tasks: create-hero-component

## Phase 1: Alignment & Design Tokens

- [x] Review typography and spacing tokens to ensure hero uses existing sizes and spacing.

## Phase 2: Component API & Types

- [x] Define Hero props:
  - `title: string`
  - `subtitle?: string`
  - `variant?: 'center' | 'left'` (default: 'center')
  - `backgroundType?: 'image' | 'styled'` (default: 'styled')
  - `backgroundImageUrl?: string` (for image background)
  - `backgroundVariant?: 'solid' | 'gradient'` (for styled background)
  - `contentImageUrl?: string` (optional content image on right in left variant)
  - `overlay?: boolean` (optional; defaults to true when backgroundType is 'image', can be explicitly disabled)
- [x] Add TypeScript types/interfaces for the component props.

## Phase 3: Hero Component Implementation

- [x] Build reusable `components/Hero.tsx` (semantic `<section>`).
- [x] Implement center variant: title + subtitle centered, no content image.
- [x] Implement left variant: title + subtitle left-aligned, optional content image on right (desktop); stacked on mobile.
  - **Content image sizing** (when present): 414px × 332px at 1920px baseline, scaling proportionally.
- [x] Support both background types (image and styled) independently for each layout variant.
- [x] Apply background image handling with cover/center and safe text contrast via overlay.
- [x] Implement responsive layout with proper gaps and spacing using design tokens.
- [x] Implement height guidance: ~540px at 1920px width, scaling proportionally across breakpoints.

## Phase 4: Styling

- [x] Add or update `styles/components/hero.css` for any non-utility styling (overlay, background handling).
- [x] Wire styles via `app/globals.css` if needed.

## Phase 5: Testing & Validation

- [x] Add unit tests for Hero rendering in `__tests__/components/Hero.test.tsx`:
  - Center variant with styled background.
  - Center variant with image background.
  - Left variant with styled background and content image.
  - Left variant with styled background without content image.
  - Left variant with image background and content image.
  - Left variant with image background without content image.
  - Overlay renders when background is an image (default enabled).
  - Overlay can be disabled via overlay: false prop even with image background.
  - Left variant stacks on mobile.
  - Content image sizing at 1920px baseline (414×332).
  - Content image scales proportionally on different viewports.
  - Hero section height ratio maintained at different viewport widths.
  - Typography uses design tokens correctly.
- [x] Run `pnpm test`, `pnpm lint`, and `pnpm typecheck` to validate.

## Phase 6: Documentation & Adoption

- [x] Document usage and props in README or component docs.
- [x] Optional: integrate Hero into home page for demonstration (behind change flag or as default hero).
