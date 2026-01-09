# Design: add-brands-section

## Reusable Section Architecture

The brands section follows a reusable **section pattern** that can be applied across the entire site. This pattern ensures consistency and makes it easy to add new content sections (media reviews, testimonials, partnerships, etc.) in the future.

### Section Pattern Structure

A reusable section consists of:

1. **Section Container** — A wrapper with:
   - Background styling (solid color, image, gradient, or transparent)
   - Vertical padding/spacing (--space-3xl, --space-4xl, --space-5xl, etc. based on content type)
   - Optional max-width container for horizontal alignment

2. **Section Title** — Reusable `SectionTitle` component displaying:
   - h2-level heading (--fs-h2)
   - Optional subtitle
   - Optional alignment control (left, center, right)

3. **Section Content** — One or more components/content blocks:
   - BrandsList component (in this case)
   - Other sections may contain JobPostingsList, MediaReviewsList, testimonials, etc.
   - Content height varies based on items and layout

4. **Background** — Flexible styling:
   - Solid color (default: white or transparent)
   - Background image (with optional overlay for contrast)
   - Gradient (defined in design tokens or inline)
   - Pattern or texture

### Implementation Approach

The brands section uses a **semantic HTML + CSS utilities approach** for the section pattern:

- Use semantic `<section>` HTML element
- Apply Tailwind classes and CSS variables for spacing/background
- Keep flexibility for varied content types
- Reusable across pages without rigid component constraints

This approach prioritizes semantic HTML structure and Tailwind utilities for styling, avoiding unnecessary wrapper components while maintaining the flexibility to extend the pattern to other sections in the future.

### Design Tokens for Sections

Leverage existing tokens in `styles/tokens.css`:
- **Spacing**: --space-3xl (64px), --space-4xl (80px), --space-5xl (96px), --space-6xl (128px)
- **Font sizes**: --fs-h2, --fs-body, --fs-body-sm
- **Colors**: --color-bg, --color-text, --color-primary
- **Radius**: --radius-md (if section has rounded corners)

Sections can define top/bottom padding independently based on visual hierarchy and surrounding content.

## Architecture Overview

The brands section integrates into the home page using this reusable pattern:

```
Home Page (app/page.tsx)
└── <section> (semantic HTML with section pattern styling)
    ├── Background (solid, image, gradient)
    ├── SectionTitle Component (reusable)
    │   └── "Our Brands" title
    └── BrandsList Component
        └── BrandCard Component (repeated for each active brand)
            └── Displays: logo, name, introduction
```

## Data Flow

1. **Home Page Server Component** (`app/page.tsx`) renders a `<section>` with brands content
2. **BrandsList** component (child of section) calls server action `fetchPublishedBrands()` on mount
3. **Server Action** queries Supabase `brand` table, filters by `is_active = true`
4. **BrandCard** renders individual brand within the grid
5. **Error/Empty States** display fallback content if no brands exist

## Component Design

### SectionTitle Component (Reusable)
- **Props**: `title: string`, optional `subtitle?: string`, optional `alignment?: 'left' | 'center'`
- **Purpose**: Displays a section heading with consistent typography and spacing across the site
- **Styling**: Uses design tokens (--fs-h2, --space-lg, --space-xl) for typography and spacing
- **Usage**: Can be reused in any page section requiring a branded section title

### BrandCard Component
- **Props**: `brand: Brand` object, `index: number` (to determine left/right layout)
- **Layout (Alternating)**:
  - **Odd items (0, 2, 4...)**: Image on left, text (name + introduction) on right
  - **Even items (1, 3, 5...)**: Text (name + introduction) on left, image on right
  - Desktop: Full horizontal layout with image and text side-by-side
  - Mobile: Stacked vertically (image above text, regardless of index)
- **External Link**:
  - Entire BrandCard is wrapped in an `<a>` tag linking to `website_url` (external link)
  - Opens in new tab (`target="_blank"` with `rel="noopener noreferrer"`)
  - Entire card is clickable for user convenience
- **Image Handling**: 
  - Fixed width container (e.g., 200–250px on desktop, full width on mobile)
  - 16:10 aspect ratio
  - Optimized with Next.js Image component
- **Text Content**:
  - Brand name as h3 heading (inside the link)
  - Introduction text (2 lines max, truncated with ellipsis)
  - Consistent padding and spacing using design tokens
  - **Gap between image and content**: gap-12 (48px = --space-2xl)
- **Hover State**: Visual feedback on hover (opacity change, shadow, or subtle scale)
- **Spacing Between Items**: gap-12 on mobile (48px), gap-16 on desktop (64px = --space-3xl)

### BrandsList Component
- **Layout**: Vertical list of BrandCard items (not a grid)
- **Alternating Layout**: 
  - Pass `index` prop to each BrandCard to control left/right positioning
  - BrandCard adjusts layout based on index (odd: left image, even: right image on desktop)
- **Spacing**: gap-12 on mobile (48px), gap-16 on desktop (64px = --space-3xl) between items for visual breathing room
- **Mobile Responsive**: All items stack vertically (image above text) regardless of index
- **Data Fetching**: Server-side using server action
- **Loading State**: Optional skeleton loader while fetching
- **Empty State**: If no active brands exist, the entire section should not render (conditional rendering at section level)
- **Error Handling**: User-friendly error message with retry option

## Supabase Schema

The `brand` table has the following structure:
- `id` (UUID, primary key)
- `name` (text, required, unique)
- `introduction` (text, required) — brand description/introduction text
- `logo_url` (text, required, unique)
- `website_url` (text, required, unique) — link to brand's website
- `is_active` (boolean, required, default: true)
- `created_at` (timestamp with time zone, required)
- `updated_at` (timestamp with time zone, required)

Data fetching filters by `is_active = true` to retrieve only active brands.

## Styling Strategy

### Section-Level Styling
- **Container**: Semantic `<section>` element with flexible padding/spacing
- **Background**: CSS class or inline styles for background image, color, or gradient
- **Max-width**: Optional centered container (use Tailwind's `container` class or custom width)
- **Responsive**: Padding adjusts with screen size (e.g., py-[--space-2xl] md:py-[--space-3xl])

### Component-Level Styling
- **Primary Method**: Tailwind CSS classes (grid, flexbox, responsive utilities)
- **Custom CSS**: If needed for complex layouts, animations, or patterns, create `styles/components/brands.css` and import in `app/globals.css`
- **Design Tokens**: Leverage existing tokens in `styles/tokens.css` for spacing, colors, typography

### Accessibility & Semantic HTML
- Use semantic `<section>` for the section wrapper (not just a `<div>`)
- Use `<article>` or `<div>` for individual BrandCard items within the grid
- Proper heading hierarchy: `<h2>` for section title, `<h3>` for brand names
- Alt text for all images (logo images in this case)

## Future Section Pattern Extension

This section pattern can be applied to other site sections:
- **Media Reviews Section** — title + media review cards + background
- **Testimonials Section** — title + testimonial cards + background
- **Partnership Section** — title + partner logos + background
- **Careers/Jobs Section** — title + job listings + background

Each section reuses the `SectionTitle` component and follows the same semantic structure, ensuring consistent styling and maintainability across the site.

## Error Handling Strategy

1. **Fetch Errors**: Log to console, return empty array with error message
2. **Missing Images**: Display logo with fallback styling (not needed per schema; logo_url required)
3. **Empty Result Set**: Display friendly message like "No brands available at this time"
4. **Type Safety**: Use TypeScript types for all brand objects to catch mismatches early

## Testing Coverage

- **SectionTitle**: Props rendering, alignment variations, typography (unit tests)
- **BrandCard**: Props rendering, responsive layout (unit tests)
- **BrandsList**: Grid layout, empty state, error handling (component tests)
- **Server Action**: Supabase query execution, is_active filtering, error scenarios (integration tests)
- **Home Page Section**: Brands section renders in page with proper semantic HTML (E2E or integration test)

Target: 70%+ line coverage for all new files.

## Responsive Behavior

| Viewport | Layout | Image Width | Card Gap | Image-Content Gap |
|----------|--------|-----------|---------|-------------------|
| Mobile (<640px) | Stacked vertically (image above text) | Full width (160px height) | gap-12 (48px) | gap-8 (32px) |
| Desktop (>640px) | Alternating left-right (odd: left image, even: right image) | 220px fixed (16:10 aspect) | gap-16 (64px) | gap-12 (48px) |

## Performance Considerations

- **Server-Side Rendering**: BrandsList fetches data server-side to avoid client-side delays
- **Image Optimization**: Use Tailwind's `aspect` and `object-cover` for consistent sizing
- **Load All Brands**: Fetch and display all active brands (typically fewer than 10, no pagination needed)
- **Caching**: Consider leveraging ISR (Incremental Static Regeneration) if brand list rarely changes
