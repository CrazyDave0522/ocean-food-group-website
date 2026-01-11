# Add Responsive Side Spacing

## Summary

Introduce responsive horizontal padding to the main content area to provide breathing space on left and right sides, improving visual balance and readability across all device sizes.

## Why

The current layout lacks consistent horizontal spacing, leading to content that feels cramped against the viewport edges on larger screens. Adding responsive padding will create better visual hierarchy and improve the overall user experience by providing appropriate breathing room.

## What Changes

- Add --space-9xl spacing token (256px) to styles/tokens.css
- Update .container-main in styles/layout.css to use responsive padding: --space-9xl at 1920px baseline, --space-xl at 750px baseline, proper scaling for other viewports
- Apply container-main class to the main element in app/layout.tsx
- Maintain existing max-width constraint of 1920px

## Impact

- **Layout**: Modifies the global layout wrapper to include responsive horizontal padding
- **Styling**: Adds new spacing token (--space-9xl) and updates layout CSS
- **Responsiveness**: Ensures proper spacing across desktop (1920px baseline), tablet, and mobile (750px baseline) viewports

## Implementation Notes

- Add --space-9xl token (256px) to tokens.css
- Update layout.css to apply responsive padding using clamp or similar
- Apply the container-main class to the main element in layout.tsx
- Maintain existing max-width constraint of 1920px
