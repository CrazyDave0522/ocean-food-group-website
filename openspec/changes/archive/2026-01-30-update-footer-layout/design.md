# Update Footer Layout - Design

## Architecture Overview

The footer update simplifies the component architecture by removing complex brand fetching and grid rendering logic. The new design focuses on essential legal and brand information with a clean, professional presentation.

## Component Structure

### Before (Current)
```
Footer
├── Brand Logos Section ("Our Culinary Concepts")
│   ├── Dynamic brand fetching from database
│   ├── Responsive grid layout (up to 20 logos)
│   ├── Error handling for failed images
│   └── External link management
├── Separator line
└── Company Info Section
    ├── Copyright notice
    └── Legal links (Terms, Privacy)
```

### After (Proposed)
```
Footer
├── Top Section (Centered in same line)
│   ├── Ocean Food Group white logo (centered)
│   ├── Terms & Conditions link (centered)
│   └── Privacy Policy link (centered)
├── Separator Line
│   └── 80% width, centered: border-top: 1px solid rgba(255, 255, 255, 0.20);
└── Bottom Section (Centered)
    └── Copyright notice: "© 2026 Ocean Food Group Pty Ltd. All Rights Reserved."
```

## Design Decisions

### Color Scheme
- **Background**: Dark blue (#14224A) for professional appearance
- **Text**: White (#ffffff) for optimal contrast
- **Links**: White with appropriate hover states

### Layout Strategy
- **Centered Horizontal Layout**: All three elements (logo, terms, privacy) centered in the same line
- **Equal Spacing**: Logo and links spaced evenly across the footer width
- **Responsive**: Elements may stack on very small screens if needed

### Performance Considerations
- **Removed**: Database queries for brand data
- **Removed**: Multiple image loading operations
- **Simplified**: Component logic and dependencies

## Accessibility Considerations

- **Contrast**: White text on blue background meets WCAG AA standards
- **Navigation**: Proper ARIA labels and semantic HTML
- **Focus**: Visible focus indicators for keyboard navigation
- **Screen Readers**: Clear heading structure and link descriptions

## Responsive Behavior

### Desktop (≥768px)
- All three elements centered horizontally in the same line
- Logo: 120px width (maximum size), auto height
- Links: text-sm font size
- Copyright: text-sm font size, centered at bottom

### Mobile (<768px)
- All three elements centered horizontally in the same line
- Logo: 80px width (scaled down), auto height
- Links: text-xs font size
- Copyright: text-xs font size, centered at bottom

## Dependencies

- **Design Tokens**: Uses `var(--color-primary-base)` for theming
- **Assets**: Requires `public/images/logos/Ocean-Food-white.png`
- **Components**: Next.js Image and Link components
- **Styling**: Tailwind CSS with custom properties

## Migration Strategy

1. **Component Update**: Replace brand section with new layout
2. **Asset Verification**: Ensure white logo variant exists
3. **Styling Migration**: Update CSS classes for new color scheme
4. **Testing**: Validate across all breakpoints and devices