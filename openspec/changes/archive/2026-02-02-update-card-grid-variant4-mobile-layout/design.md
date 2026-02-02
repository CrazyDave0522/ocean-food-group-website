# Update Card Grid Variant 4 Mobile Layout - Design

## Architectural Considerations

### Responsive Design Strategy

The centered variant currently uses a single layout approach (centered column) across all screen sizes. This change introduces responsive behavior where the layout fundamentally changes between mobile and desktop.

**Decision**: Use CSS Flexbox with responsive direction changes rather than separate mobile/desktop components. This maintains code simplicity while achieving the desired responsive behavior.

### Layout Structure Changes

#### Current Desktop Layout (≥ 768px)

```
┌─────────────────┐
│                 │
│       Icon      │  ← Centered, 150px max width
│                 │
│                 │
├─────────────────┤
│     Title       │  ← Centered
├─────────────────┤
│                 │
│      Text       │  ← Centered, justified
│                 │
└─────────────────┘
```

#### Proposed Mobile Layout (< 768px)

```
┌─────────────────────────────────────┐
│  ┌─────────┬───────────────────────┐  │
│  │         │                       │  │
│  │  Icon   │        Title          │  │  ← Icon: 64px, Content: flex-1
│  │ 64px    │                       │  │     Background: bg-card-mb.png (670×251px)
│  │         ├───────────────────────┤  │
│  │         │                       │  │
│  │         │         Text          │  │  ← Text: justified
│  │         │                       │  │
│  └─────────┴───────────────────────┘  │
└─────────────────────────────────────┘
```

### Technical Implementation Details

#### CSS Classes Strategy

- **Container**: `flex flex-col items-center md:flex-col md:items-center` → `flex flex-row md:flex-col md:items-center`
- **Icon**: `w-24 h-24 max-w-37.5` → `w-16 h-16 md:w-24 md:h-24 md:max-w-37.5`
- **Content**: Add `flex-1 ml-4 md:ml-0 md:text-center`
- **Padding**: `p-9` → `py-4 px-6 md:py-9 md:px-8` (mobile: 16px vertical, 24px horizontal; desktop: 36px vertical, 32px horizontal)

#### Icon Sizing Rationale

- **Mobile**: 64px (w-16 h-16) - balances visibility with horizontal space constraints
- **Desktop**: Maintains 96px (w-24 h-24) with 150px max-width for large screens
- **Rationale**: Mobile needs smaller icons to leave room for content; desktop can accommodate larger icons

#### Spacing Considerations

- **Mobile Padding**: Vertical padding `--space-md` (16px), horizontal padding `--space-xl` (32px)
- **Mobile Gap**: 16px (ml-4) between icon and content
- **Vertical Spacing**: Maintain existing margins between title/text
- **Desktop Padding**: Maintains existing `p-9` (36px all around)

### Performance Impact

- **Minimal Impact**: Only adds responsive CSS classes, no additional JavaScript or assets
- **Layout Stability**: Uses consistent flexbox approach, reduces potential for layout shift
- **Bundle Size**: No change - leverages existing Tailwind classes

### Accessibility Considerations

- **Reading Order**: Icon first (left), then title, then text - maintains logical content flow
- **Screen Readers**: No changes needed - semantic HTML structure preserved
- **Touch Targets**: Icon and content areas remain appropriately sized for touch interaction
- **Focus Management**: Existing focus behavior maintained

### Testing Strategy

- **Visual Regression**: Screenshot tests for mobile (< 768px) and desktop (≥ 768px) layouts
- **Responsive Breakpoints**: Test at 767px, 768px, and common device widths
- **Content Overflow**: Verify text truncation and icon scaling work correctly
- **Interaction States**: Ensure hover/focus states work in both layouts

### Fallback Strategy

- **Progressive Enhancement**: Desktop layout serves as fallback if mobile styles fail
- **CSS-Only Solution**: No JavaScript dependencies for layout changes
- **Browser Support**: Uses well-supported flexbox properties

### Future Considerations

- **Scalability**: Pattern could be extended to other card variants if needed
- **Design System**: Consider adding responsive layout utilities to design system
- **Component API**: No API changes needed - layout is internal to component
