# Update Card Grid Variant 4 Mobile Layout

## Why

The current centered variant (variant 4) of the CardGrid component displays cards in a centered layout on both desktop and mobile. On mobile, this results in a 2-column grid where each card maintains the centered icon-at-top layout. However, this layout is not optimal for mobile screens where horizontal space is limited.

The proposed change introduces a responsive mobile layout for the centered variant where cards switch to a left-right structure: icon on the left, title and text stacked vertically on the right. This provides better use of horizontal space and improved readability on mobile devices.

## What Changes

### Component Changes

- **CardGrid.tsx**: Modify the `renderCenteredCard` function to implement responsive layout
- **Mobile Layout**: On screens < 768px, cards use flex-row layout with icon on left, content on right
- **Desktop Layout**: Maintains current centered layout on screens ≥ 768px

### Layout Changes

- **Mobile (< 768px)**:
  - Icon positioned on the left side (reduced size for mobile)
  - Title and text stacked vertically on the right side
  - Flex layout with appropriate spacing
  - Vertical padding: `--space-md` (16px)
  - Horizontal padding: `--space-xl` (32px)
  - Background image: `public/images/components/card-grid/v4/bg-card-mb.png` (670×251px)
- **Spacing**: Adjusted padding and margins for mobile layout
- **Typography**: Maintains current font sizes and colors

## Technical Details

### Current Implementation

- Centered variant uses `flex flex-col items-center` layout
- Icon at top (150px max width), title below, text below
- 2 cards per row on mobile, centered layout maintained

### Proposed Implementation

- Add responsive classes: `flex-col md:flex-col` for desktop, `flex-row md:flex-col` for mobile
- Icon sizing: `w-16 h-16 md:w-24 md:h-24` (smaller on mobile)
- Content layout: `flex-1 ml-4 md:ml-0 md:text-center` for right side content
- Maintain all existing styling (backgrounds, shadows, hover effects)

### Breaking Changes

- None - this is a responsive enhancement that maintains desktop behavior

### Testing Requirements

- Mobile layout verification (< 768px)
- Desktop layout unchanged (≥ 768px)
- All existing functionality preserved
- Accessibility maintained
