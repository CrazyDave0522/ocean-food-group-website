# Design for Update Callout Background and Alignment

## Technical Approach

The changes are confined to the existing CSS file `styles/components/callout.css` and introduce a new reusable GlassmorphismButton component. No new components, patterns, or architectural changes are introduced beyond the button component.

### GlassmorphismButton Component

- Create a new reusable component with glassmorphism styling for future reuse.
- Supports both text content and optional URL props.
- Handles internal/external link navigation appropriately.
- Includes accessibility features and keyboard navigation.

### Background Images

- Use CSS `background-image` property to set the default background.
- Leverage CSS media queries for responsive image switching.
- Maintain existing fallback behavior for user-provided images via the `imageUrl` prop.
- Images are 1920x220 (desktop) and 750x220 (mobile), so use aspect-ratio to maintain proportions and prevent cropping with `background-size: cover`.

### Component Aspect Ratio

- Use CSS `aspect-ratio` property to maintain the correct proportions.
- Desktop: `aspect-ratio: 1920 / 220` (≈8.727) to match bg-callout.png.
- Mobile: `aspect-ratio: 750 / 220` (≈3.409) to match bg-callout-mb.png.
- This ensures `background-size: cover` displays the full image without cropping at any screen size.

### Content Padding

- Use responsive padding to ensure appropriate spacing at different screen sizes.
- Desktop: `padding: var(--space-xl) var(--space-lg)` for larger screens.
- Mobile: `padding: var(--space-md) var(--space-sm)` for smaller screens.
- Applied via media queries to match the aspect-ratio breakpoints.

### Button Styling

- Apply glassmorphism effect with semi-transparent white background and border.
- Include backdrop blur for modern visual effect.
- Use white text color for contrast against the background images.
- Maintain accessibility with sufficient contrast and interaction states.

### Text Styling

- Change text color to white for better contrast against background images.
- Maintain existing typography settings (font-size, weight, etc.).

### Alignment

- Position content at 80% from the left edge across all screen sizes for consistent visual hierarchy.
- Use left-aligned text for better readability.
- Apply consistent positioning regardless of device size.

### Trade-offs

- **Performance**: Background images may increase bundle size slightly, but they are static assets.
- **Maintainability**: Changes are isolated to CSS, keeping component logic unchanged.
- **Responsiveness**: Media query approach ensures clean separation of desktop/mobile styles.

## Alternatives Considered

- Inline styles: Rejected to maintain separation of concerns.
- Component-level image handling: Not needed as images are static backgrounds.
- CSS custom properties: Could be used for image URLs, but direct URLs are simpler for this use case.
