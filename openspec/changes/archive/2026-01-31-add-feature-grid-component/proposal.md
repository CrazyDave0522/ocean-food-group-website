# Add Feature Grid Component

## Summary

Create a new FeatureGrid component with a complex grid layout: the first column is merged across 2 rows displaying intro content (title, text, button) with a background image, while exactly 3 subsequent columns contain alternating content-image units in a 2-row pattern (using the first 3 features if more are provided, component doesn't render if fewer than 3 are provided).

## Why

The existing CardGrid component provides comprehensive functionality but is overly complex for specific layout needs. The FeatureGrid will implement a unique layout pattern with a prominent merged intro column and alternating content-image units that isn't available in the current component library.

## Motivation

The design requires a specific layout where the first column serves as an introduction with merged rows and background image, followed by feature units that alternate between content-top/image-bottom and image-top/content-bottom patterns. This creates visual interest and proper content hierarchy for feature presentations.

## Impact

- **New Component**: Introduces FeatureGrid with complex grid layout
- **Unique Layout**: Merged first column with alternating unit patterns
- **Background Images**: Uses specific background image for intro column
- **Responsive**: Adapts layout for different screen sizes
- **No Breaking Changes**: New component doesn't affect existing functionality

## Implementation Notes

- First column uses `bg-feature-grid-intro.png` (428×510px, aspect ratio 0.84)
- CSS Grid with merged first column spanning 2 rows
- Exactly 3 feature units in alternating pattern: Unit 1 (content-top/image-bottom), Unit 2 (image-top/content-bottom), Unit 3 (content-top/image-bottom)
- Zero gaps between all grid cells for seamless layout
- Intro button uses GlassmorphismButton component for navigation (internal links in same tab, external links in new tab with security attributes)
- All content and image cells maintain 324:258 aspect ratio (approximately 1.256:1) for visual harmony
- Intro title uses white color, 32px font size, normal style, 600 weight, normal line height, max 2 lines
- Intro text uses white color, 18px font size, normal style, 500 weight, normal line height, max 6 lines
- Intro content is left-aligned with equal horizontal padding for centered appearance
- Unit titles use #495467 color, justify alignment, 16px font size, normal style, 600 weight, 24px line height
- All units have `--space-md` (16px) gap between title and description text
- Each unit (both content and image cells) is clickable and opens provided link in new tab
- Units have reasonable hover effects for visual interactivity feedback
- Mobile layout shows only intro section with `bg-feature-grid-mb.png` background (750×510px, aspect ratio ≈1.47:1)
- Responsive behavior maintains layout integrity across breakpoints
- Component accepts `intro` object and `features` array with exactly 3 features displayed (using first 3 if more provided), component doesn't render if fewer than 3 features are provided

## Dependencies

- Background image: `public/images/backgrounds/bg-feature-grid-intro.png`
- Mobile background image: `public/images/backgrounds/bg-feature-grid-mb.png`

## Risks

- Complex CSS Grid implementation may have browser compatibility issues
- Alternating pattern logic increases component complexity
- Background image aspect ratio handling across different screen sizes
- Responsive layout may break on edge cases
