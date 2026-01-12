# Change: Add Callout Component

## Why

To provide a reusable UI component for displaying short informational messages with a call-to-action button, enhancing user engagement and content emphasis on pages.

## What Changes

- Add a new `Callout` component in `components/Callout.tsx` with props for text, button text, button URL (internal or external), optional background image URL (defaults to a gradient using brand colors), and optional alt text for images
- Add corresponding styles in `styles/components/callout.css` for layout and default styling, with background applied via user-provided image or default gradient
- Integrate styles into the global CSS system
- Add TypeScript types if needed

## Impact

- Affected specs: New capability "callout-component"
- Affected code: New files in `components/` and `styles/components/`, update `app/globals.css`
