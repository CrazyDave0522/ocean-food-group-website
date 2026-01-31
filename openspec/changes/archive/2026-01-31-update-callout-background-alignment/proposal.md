# Update Callout Background and Alignment

## Summary

Update the Callout component to use specific background images for desktop and mobile, adjust the component aspect ratio to match image proportions and prevent cropping, implement responsive padding for content (larger on desktop, smaller on mobile), create a reusable GlassmorphismButton component with glassmorphism effect, change text colors to white for better contrast, and position the title and button at 80% from the left edge across all screen sizes.

## Motivation

The current Callout component uses a default gradient background or optional user-provided images. To enhance the visual design and consistency with other components, we need to use predefined background images for desktop and mobile. The images have specific aspect ratios (1920:220 for desktop, 750:220 for mobile), so the component must maintain these proportions to avoid cropping. Since the component scales responsively, padding must also be responsive to maintain appropriate spacing at different sizes. The button styling with glassmorphism effect is valuable for reuse across the application, so it should be extracted into a dedicated component. Text colors need to be white for proper contrast against the background images. The alignment should consistently position content at 80% from the left edge across all devices for visual consistency.

## Impact

- **New Component**: Introduces reusable GlassmorphismButton component for future use.
- **Visual Changes**: Background images will change from gradient to specific PNG images, button gets glassmorphism styling with backdrop blur, text colors change to white.
- **Layout Changes**: Component uses aspect-ratio for responsive scaling, responsive padding (larger on desktop), consistent 80% left alignment across all screen sizes.
- **Responsive**: Different images, aspect ratios, and padding for desktop and mobile breakpoints, with consistent alignment.
- **No Breaking Changes**: Component API remains the same; changes are internal styling.

## Implementation Notes

- Update CSS to use background-image instead of gradient for default.
- Add responsive background images using CSS media queries.
- Modify text-align and justify-content for alignment.
- Ensure images are optimized and available in public/images/backgrounds/.

## Dependencies

None.

## Risks

- Image loading performance: Ensure images are optimized.
- Visual regression: Test on various screen sizes.
- Accessibility: Ensure contrast remains adequate with new backgrounds.