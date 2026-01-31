# Tasks for Add Feature Grid Component

- [x] **Create FeatureGrid component structure**
   - Create `components/FeatureGrid.tsx` with TypeScript interfaces for intro and features
   - Define props for `intro` object (title, text, button) and `features` array (displays first 3)
   - Implement conditional rendering: component doesn't render if fewer than 3 features provided
   - Set up basic component structure with complex grid layout

- [x] **Implement merged first column**
   - Create intro column that spans 2 rows in the grid
   - Add background image `bg-feature-grid-intro.png` with proper aspect ratio (428×510px)
   - Display intro title with white color, 32px font size, normal style, 600 weight, normal line height (max 2 lines)
   - Display intro text with white color, 18px font size, normal style, 500 weight, normal line height (max 6 lines)
   - Implement left-aligned layout with equal horizontal padding for centered appearance
   - Display button using GlassmorphismButton component with appropriate styling

- [x] **Implement alternating unit pattern**
   - Create exactly 3 unit columns that each contain 2 rows
   - Implement logic to use only the first 3 features from the provided array
   - Implement alternating pattern: Unit 1 (content-top/image-bottom), Unit 2 (image-top/content-bottom), Unit 3 (content-top/image-bottom)
   - Make each unit clickable with link navigation to new tab
   - Ensure pattern continues correctly for all 3 units

- [x] **Create component types**
   - Create `lib/feature-grid/types.ts` with FeatureGridIntro, FeatureItem, and FeatureGridProps interfaces
   - Define proper TypeScript types for all props and data structures

- [x] **Implement CSS Grid layout**
   - Create `styles/components/feature-grid.css` for complex grid positioning
   - Set up grid template with merged first column
   - Configure responsive behavior for different screen sizes
   - Ensure zero gaps between all grid cells (no margins, no gaps)

- [x] **Implement button navigation**
   - Use GlassmorphismButton component for the intro button
   - Configure button to handle both internal (same tab) and external (new tab) URLs
   - Ensure proper security attributes for external links (handled by GlassmorphismButton)
   - Verify button maintains accessibility features

- [x] **Implement unit navigation**
   - Make each unit (both content and image cells) clickable
   - Configure units to open provided link URLs in new tabs
   - Add proper security attributes for external links
   - Implement visual feedback for hover states
   - Add reasonable hover effect (e.g., subtle opacity, shadow, or transform)
   - Ensure accessibility with keyboard navigation and ARIA labels

- [x] **Add responsive behavior**
   - Implement desktop layout with full complex grid
   - Add tablet layout maintaining intro column prominence
   - Create mobile layout that shows only intro section (no units)
   - Use mobile background image `bg-feature-grid-mb.png` (750×510px, aspect ratio ≈1.47:1) with proper aspect ratio

- [x] **Style content and image rows**
   - Style content rows with title and description typography
   - Style unit titles with #495467 color, justify alignment, 16px font size, normal style, 600 weight, 24px line height
   - Apply `--space-md` (16px) gap between unit title and description text
   - Style image rows with proper image display and aspect ratios
   - Ensure all cells maintain 324:258 aspect ratio (approximately 1.256:1)
   - Ensure consistent spacing and alignment within each unit

- [x] **Implement accessibility features**
    - Add proper ARIA labels and semantic HTML structure
    - Ensure keyboard navigation works through the complex grid
    - Add screen reader support for the alternating pattern

- [x] **Create component tests**
    - Add unit tests in `__tests__/components/FeatureGrid.test.tsx`
    - Test conditional rendering: component doesn't render with fewer than 3 features
    - Test alternating pattern logic and merged column behavior
    - Test unit navigation opens links in new tabs
    - Verify responsive layout and accessibility features
    - Test button navigation opens new tab

- [x] **Integration testing**
    - Test component with real background image and feature data
    - Verify responsive behavior across different screen sizes
    - Check performance with various numbers of features
    - Confirm zero gap layout works correctly

- [x] **Code review and validation**
    - Run linting and type checking
    - Validate against OpenSpec requirements
    - Ensure code follows project conventions
