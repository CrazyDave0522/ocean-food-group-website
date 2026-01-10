# Design: create-hero-component

## Goals

- Provide a reusable hero section component that accepts title, subtitle, and a configurable background (image or styled variant).
- Keep layout responsive and token-driven, with safe contrast when images are used.

## Proposed Approach

- **Component**: `Hero` in `components/Hero.tsx`; server component by default, client-free unless future interactivity is added.
- **Variants**: Two distinct text alignment variants—
  1. **Center variant** (default): Title + subtitle centered, no content image.
  2. **Left variant**: Title + subtitle left-aligned, optional content image on right (desktop); stacked on mobile (image above text if present).
- **Background options**: Both variants can use either an image background or styled background (solid/gradient), independently of the layout variant.
- **Props**:
  - `title: string`
  - `subtitle?: string`
  - `variant?: 'center' | 'left'` (default: `'center'`)
  - `backgroundType?: 'image' | 'styled'` (default: `'styled'`)
  - `backgroundImageUrl?: string` (used when backgroundType is 'image')
  - `backgroundVariant?: 'solid' | 'gradient'` (default: `'solid'`; used when backgroundType is 'styled')
  - `contentImageUrl?: string` (optional, used in left variant; when provided, image displays on right/below)
  - `overlay?: boolean` (optional; defaults to `true` when `backgroundType` is 'image', can be explicitly set to `false` to disable)
- **Styling**:
  - Use Tailwind utilities for layout, spacing, and typography; reserve `styles/components/hero.css` for overlay/background helpers.
  - **Typography**:
    - Title: `text-[length:var(--fs-h1)]` (32px–48px responsive).
    - Subtitle: `text-[length:var(--fs-h4)]` (18px–24px responsive).
  - **Center variant**: Flexbox column-centered, text-center, responsive padding.
  - **Left variant**:
    - Without content image: Flexbox row, text left-aligned, responsive padding.
    - With content image: Flexbox row on desktop (gap between text and content image), stacked on mobile (gap-8 between content image and text), content image fixed width with cover/center.
    - **Content image sizing** (when present): 414px width × 332px height at 1920px baseline; scale proportionally on other viewports.
  - Background (image or styled): Applied to the hero section container; if image, uses `object-cover` with optional overlay; if styled, uses solid color or gradient.
  - Responsive spacing driven by tokens (e.g., `--space-4xl` top/bottom).
  - Height guidance: baseline 540px at 1920px width (0.28125 ratio) and scale proportionally via responsive classes (e.g., clamp on min/max heights).
- **Accessibility**:
  - Semantic `<section>` with optional `aria-label` or `id` passed through props if needed.
  - Maintain sufficient contrast (overlay on images by default; can be disabled via `overlay: false` if image has sufficient contrast or other considerations apply).
- **Testing**:
  - Render with/without background image.
  - Alignment variants.
  - Overlay enabled/disabled.
  - Snapshot of classnames for background variant selection.

## Alternatives Considered

- **Inline styles**: Rejected to keep styling centralized and token-driven.
- **Client component**: Not necessary; keep server component to avoid extra bundle cost.

## Risks & Mitigations

- **Contrast on busy images**: Default overlay on when background image is provided; overlay can be explicitly disabled via `overlay: false` for images with sufficient contrast.
- **Content image sizing in left variant**: Fix image width and apply cover/center; test responsiveness on mobile when content image is present.
- **Layout with/without content image**: Ensure left variant displays correctly both with and without content image.
- **API creep**: Start with these two variants; extend only if needed (CTA buttons could be added later).
