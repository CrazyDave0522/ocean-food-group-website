# Design for Add Feature Grid Component

## Technical Approach

The FeatureGrid component will implement a complex grid layout with a merged first column and alternating content-image units. This requires careful CSS Grid configuration and responsive design considerations.

### Component Architecture

- **Location**: `components/FeatureGrid.tsx` (main component)
- **Types**: `lib/feature-grid/types.ts` (TypeScript interfaces)
- **Styling**: `styles/components/feature-grid.css` (component-specific styles)
- **Testing**: `__tests__/components/FeatureGrid.test.tsx` (unit tests)

### Layout Structure

The component uses a complex CSS Grid layout with exactly 4 columns:

```
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│                 │   Unit 1        │   Unit 2        │   Unit 3        │
│   Intro Column  │┌───────────────┐│┌───────────────┐│┌───────────────┐│
│   (Merged 2     ││   Content     │││   Image       │││   Content     ││
│    rows)        │├───────────────┤│├───────────────┤│├───────────────┤│
│                 ││   Image       │││   Content     │││   Image       ││
│                 │└───────────────┘│└───────────────┘│└───────────────┘│
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

**Grid Composition**: 1 intro column (merged) + exactly 3 feature units (first 3 from provided array, component doesn't render if fewer than 3 provided)

### Data Structure

The component accepts dynamic data provided by the component user:

```typescript
interface FeatureGridIntro {
  title: string;
  text: string;
  button: {
    label: string;
    url: string;
  };
}

interface FeatureItem {
  id: string;
  title: string; // Dynamic content provided by user
  description: string; // Dynamic content provided by user
  image: string; // Image URL/path provided by user
  link: string; // Navigation URL provided by user
}

interface FeatureGridProps {
  intro: FeatureGridIntro;
  features: FeatureItem[];
  className?: string;
}
```

### CSS Grid Implementation

- **Grid Template**: Complex grid with merged first column
- **First Column**: `grid-row: span 2` to merge across 2 rows
- **Unit Columns**: Each spans 1 column with 2 rows internally
- **Alternating Pattern**: CSS Grid areas or flexbox within each unit cell
- **Zero Gaps**: No gaps between grid cells for seamless layout
- **Cell Aspect Ratio**: All content and image cells maintain 324:258 aspect ratio (≈1.256:1)

### Button Navigation

- **Component**: Intro button uses `GlassmorphismButton` component
- **Internal Links**: URLs starting with "/" navigate to internal routes in same tab
- **External Links**: External URLs automatically open in new tab via GlassmorphismButton
- **Security**: External links include `rel="noopener noreferrer"` for security
- **Accessibility**: Button maintains focus management and keyboard navigation

### Intro Content Layout

- **Alignment**: Left-aligned text within the intro column
- **Centering**: Equal horizontal padding creates centered appearance while maintaining left alignment
- **Container**: Content constrained to readable width with balanced padding

### Intro Title Typography

- **Color**: White (#ffffff)
- **Font Size**: 32px
- **Font Style**: Normal
- **Font Weight**: 600 (semi-bold)
- **Line Height**: Normal (browser default)
- **Max Lines**: 2 lines maximum

### Intro Text Typography

- **Color**: White (#ffffff)
- **Font Size**: 18px
- **Font Style**: Normal
- **Font Weight**: 500 (medium)
- **Line Height**: Normal (browser default)
- **Max Lines**: 6 lines maximum

### Unit Title Typography

- **Color**: #495467 (dark gray-blue)
- **Text Align**: Justify
- **Font Size**: 16px
- **Font Style**: Normal
- **Font Weight**: 600 (semi-bold)
- **Line Height**: 24px

### Unit Spacing

- **Title to Description Gap**: `--space-md` (16px) between unit title and description text

### Unit Navigation

- **Clickable Areas**: Both content and image cells in each unit are clickable
- **New Tab**: Links open in new browser tabs with security attributes
- **Link Source**: Navigation URLs provided by component user via `link` property
- **Visual Feedback**: Hover states and cursor changes indicate interactivity
- **Hover Effect**: Reasonable hover effect (e.g., subtle opacity change, shadow, or scale) for clear interactivity feedback
- **Accessibility**: Proper ARIA labels and keyboard navigation support

### Responsive Design

- **Desktop**: Full complex grid layout
- **Tablet**: Simplified layout, maintain intro column prominence
- **Mobile**: Intro only layout, no units displayed
- **Breakpoints**: Use existing project breakpoints (768px, 1024px)

### Mobile Layout

- **Intro Only**: On mobile, only the intro section is displayed
- **Full Space**: Intro takes up the entire available mobile space
- **Background Image**: Uses `public/images/backgrounds/bg-feature-grid-mb.png` (750×510px, aspect ratio ≈1.47:1)
- **Aspect Ratio**: Maintain 750:510 ratio for proper mobile display

### Styling Approach

- **Primary**: Tailwind CSS for responsive grid and layout
- **Custom CSS**: Complex grid positioning in `styles/components/feature-grid.css`
- **Design Tokens**: Consistent use of spacing, colors, and typography
- **Background Images**: Proper handling of the intro background image

### Background Image Handling

- **Desktop Background**: `public/images/backgrounds/bg-feature-grid-intro.png` (428×510px, aspect ratio ≈0.84:1)
- **Mobile Background**: `public/images/backgrounds/bg-feature-grid-mb.png` (750×510px, aspect ratio ≈1.47:1)
- **Positioning**: Background images cover the full intro column area
- **Sizing**: Maintain aspect ratios while filling available space
- **Responsive Behavior**: Switch from desktop to mobile background at appropriate breakpoint
- **Fallback**: Graceful degradation if background images fail to load
- **Performance**: Optimize images for web delivery and loading performance

### Accessibility Considerations

- Semantic HTML structure with proper grid semantics
- ARIA labels for complex layout sections
- Keyboard navigation through grid areas
- Screen reader friendly content organization
- Focus management for interactive elements

### Performance Optimization

- Image optimization for feature images
- Lazy loading for off-screen content
- Efficient CSS Grid rendering
- Minimal re-renders with proper React optimization

### Implementation Challenges

- Complex CSS Grid layout with merged cells
- Alternating content-image pattern across units
- Responsive behavior maintaining layout integrity
- Background image aspect ratio handling
- Accessibility in complex grid structure
