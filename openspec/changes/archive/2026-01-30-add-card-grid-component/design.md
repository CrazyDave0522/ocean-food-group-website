# Design for Card Grid Component

## Architecture

The Card Grid component will be implemented as a reusable React component following the project's conventions:

- Located in `components/CardGrid.tsx`
- Uses TypeScript with strict typing
- Styled primarily with Tailwind CSS classes
- Supports server-side rendering (no "use client" unless needed)
- Follows the component organization pattern with domain-specific subfolders if variants become complex

## Component Structure

```typescript
interface CardGridProps {
  variant: "feature" | "image" | "expandable" | "centered";
  cards: CardData[]; // Maximum of 4 cards
  className?: string;
}

interface CardData {
  id: string;
  title: string;
  // Variant-specific content provided by component user
}
```

## Responsive Grid Implementation

The grid uses CSS Grid for desktop/tablet and horizontal scrolling flexbox for mobile variant 1:

- **Desktop/Tablet Constraint**: Component displays cards in exactly 1 row maximum on screens ≥768px
- **Mobile Flexibility**: Component can display multiple rows on screens <768px when needed
- **Card Count Limits**: 3 cards minimum, 4 cards maximum per row on desktop/tablet
- **Responsive Behavior**:
  - Large screens (≥1200px): 4 cards per row using CSS Grid
  - Medium screens (≥768px): 3 cards per row using CSS Grid
  - Small screens (<768px):
    - Feature: Horizontal scrolling container showing 1 full card + ~50% of next card, scrollable to see all cards
    - Image: 2 cards per row using CSS Grid (may use multiple rows)
    - Expandable: 1 card per row (full width) using CSS Grid (may use multiple rows)
    - Centered: 2 cards per row using CSS Grid (may use multiple rows)

```css
/* Desktop/Tablet Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Mobile Horizontal Scroll for Feature variant */
@media (max-width: 767px) {
  .feature-mobile-scroll {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 1rem;
    padding: 0 1rem;
  }

  .feature-mobile-scroll .card {
    flex: 0 0 70vw; /* Show ~70% of card width */
    scroll-snap-align: start;
    min-width: 280px;
  }
}

/* Mobile 2-Column Grid for Image variant */
@media (max-width: 767px) {
  .image-mobile-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    max-columns: 4;
  }
}
```

## Variant Strategy

The four variants will be implemented as conditional rendering within the same component, rather than separate components, to maintain consistency and reduce duplication. Each variant will have distinct styling and potentially different card structures.

### Variant 1 (Feature): Feature Card with Icon and Bullets

- **Layout**: Icon above title (left-aligned), title (single line), bullet points (max 8 lines)
- **Dimensions**:
  - Baseline at 1920px: 442px × 456px (aspect ratio ≈ 0.97:1) when displaying 3 cards, 324px × 452px (aspect ratio ≈ 0.72:1) when displaying 4 cards
  - Cards scale proportionally at other screen sizes while maintaining aspect ratios
- **Mobile Behavior (<768px)**: Uses horizontal scrolling container with `bg-3card.png` background for all cards. Shows 1 full card + ~50% of next card by default, scrollable to see all cards with smooth scroll snap behavior.
- **Styling** (at 1920px baseline):
  - Padding: 36px
  - Icon size: 80px
  - Title font size: `var(--fs-h4)`
  - Bullet point text font size: `var(--fs-body-lg)`
  - Border radius: `var(--radius-lg)`
  - Default background: `public/images/components/card-grid/v1/bg-3card.png` when displaying 3 cards, `public/images/components/card-grid/v1/bg-4card.png` when displaying 4 cards
  - Hover: Background becomes `var(--color-primary-base)`, card translates up by `var(--space-md)`, box-shadow becomes `0 16px 30px 7px rgba(0, 75, 160, 0.29)`
- **Content Structure** (provided by component user):
  ```typescript
  interface Variant1CardData extends CardData {
    icon?: string; // Optional icon component or URL provided by user (default icon used if not provided)
    bulletPoints: string[]; // Array of bullet point texts provided by user
  }
  ```

### Variant 2 (Image): Image Card with Title and Text

- **Layout**: Image at top, title below image (single line), text below title (single line)
- **Dimensions**: Baseline at 1920px: 318px × 388px (aspect ratio ≈ 0.82:1) with proportional scaling at other screen sizes while maintaining aspect ratio
- **Grid**: At least 3 cards per row, at most 4 cards per row on desktop/tablet
- **Mobile Behavior (<768px)**: Displays exactly 2 cards per row
- **Styling** (at 1920px baseline):
  - Padding: 36px
  - Gap between image and title: `var(--space-md)`
  - Gap between title and text: 12px
  - Title font size: `var(--fs-h4)`
  - Text font size: `var(--fs-body-lg)`
  - Image border radius: `var(--radius-lg)`
- **Content Structure** (provided by component user):
  ```typescript
  interface Variant2CardData extends CardData {
    image: string; // Image URL or path provided by user
    title: string; // Single line title provided by user
    text: string; // Single line description text provided by user
  }
  ```

### Variant 3 (Expandable): Interactive Expandable Card

- **Layout**: Interactive card with folded/unfolded states based on hover (desktop) or click/tap (mobile) with single expanded card constraint
- **Default State**: First card is unfolded by default
- **Interaction Rules**:
  - There is ALWAYS exactly one unfolded card and the rest remain folded
  - On desktop/tablet (≥768px): When hovering over a folded card, it unfolds and the currently unfolded card folds simultaneously
  - On mobile (<768px): When clicking/tapping a folded card, it unfolds and the currently unfolded card folds simultaneously
  - The component never displays all cards in folded state
- **Mobile Behavior (<768px)**: Displays exactly 1 card per row (full width), so 3 cards display in 3 rows and 4 cards display in 4 rows
- **Folded State** (unhovered, at 1920px baseline):
  - Dimensions: 442px × 456px (aspect ratio ≈ 0.97:1) when displaying 3 cards, 324px × 452px (aspect ratio ≈ 0.72:1) when displaying 4 cards
  - Padding: 36px
  - Border radius: `var(--radius-lg)`
  - Partial background image display
  - Icon and title visible
  - Default background: `bg-{n}-3cards.png` from `public/images/components/card-grid/v3/` where {n} is the card position (1-3) when displaying 3 cards (MUST maintain 0.97:1 aspect ratio), or `bg-{n}-4cards.png` from `public/images/components/card-grid/v3/` where {n} is the card position (1-4) when displaying 4 cards (MUST maintain 0.72:1 aspect ratio)
- **Unfolded State** (hovered):
  - Dimensions: 884px × 456px (aspect ratio ≈ 1.94:1) when displaying 3 cards, 648px × 452px (aspect ratio ≈ 1.43:1) when displaying 4 cards
  - Padding: 36px
  - Border radius: `var(--radius-lg)`
  - No icon displayed
  - Title (single line max) and text content (12 lines max)
  - Default background: `bg-{n}-3cards-expanded.png` from `public/images/components/card-grid/v3/` where {n} is the card position (1-3) when displaying 3 cards (MUST maintain 1.94:1 aspect ratio), or `bg-{n}-4cards-expanded.png` from `public/images/components/card-grid/v3/` where {n} is the card position (1-4) when displaying 4 cards (MUST maintain 1.43:1 aspect ratio)
- **Typography** (same as other variants):
  - Title font size: `var(--fs-h4)`
  - Text font size: `var(--fs-body-lg)`
- **Content Structure** (provided by component user):
  ```typescript
  interface Variant3CardData extends CardData {
    backgroundImage: string; // Background image URL provided by user
    icon?: string; // Optional icon for folded state provided by user (default icon used if not provided)
    title: string; // Title for both states provided by user
    text: string; // Text content for unfolded state provided by user
  }
  ```

### Variant 4 (Centered): Centered Content Card

- **Layout**: Vertical stack with center alignment - icon at top, title below icon, text below title
- **Dimensions**: Baseline at 1920px: 442px × 456px (aspect ratio ≈ 0.97:1) when displaying 3 cards, 324px × 452px (aspect ratio ≈ 0.72:1) when displaying 4 cards with proportional scaling at other screen sizes while maintaining aspect ratios
- **Styling** (at 1920px baseline):
  - Padding: 36px
  - Border radius: `var(--radius-lg)`
  - Box shadow: `0 9.6px 52.8px 0 rgba(0, 0, 0, 0.10)`
  - Background image: `public/images/components/card-grid/v4/bg-3cards.png` when 3 cards (MUST maintain 0.97:1 aspect ratio), `public/images/components/card-grid/v4/bg-4cards.png` when 4 cards (MUST maintain 0.72:1 aspect ratio)
  - Icon max width: 150px
  - Title font size: `var(--fs-h4)`
  - Text font size: `var(--fs-body-lg)`
  - All content center-aligned
- **Content Structure** (provided by component user):
  ```typescript
  interface Variant4CardData extends CardData {
    icon?: string; // Optional icon component or URL provided by user. If not provided, cycles through default icons: 1.svg, 2.svg, 3.svg, 4.svg from /public/images/components/card-grid/v4/
    title: string; // Title text provided by user
    text: string; // Body text provided by user
  }
  ```

## Performance Considerations

- Use Next.js Image component for card images
- Implement lazy loading for cards below the fold
- Minimize re-renders with proper memoization if needed

## Accessibility

- Proper semantic HTML structure
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast color schemes

## Testing Strategy

- Unit tests for component logic
- Visual regression tests for different screen sizes
- Accessibility testing with axe-core
- Integration tests in page contexts
