# Implementation Tasks: add-brands-section

## Prerequisites
- [x] Supabase `brand` table schema is confirmed and accessible
- [x] Team approval of proposal.md and design.md
- [x] Reviewed design.md section pattern architecture for future reuse

## Phase 1: Section Pattern Documentation

- [x] Document reusable section pattern in project guidelines (if not already documented)
  - Section structure: title + content + background
  - Spacing conventions: use design tokens (--space-3xl, --space-4xl, etc.)
  - Semantic HTML guidelines (use `<section>`, `<article>`, proper heading hierarchy)
  - This becomes a reference for future sections (media reviews, testimonials, etc.)
  - **Pattern established**: SectionTitle + content component (reusable for all future sections)

## Phase 2: Types and Utilities

- [x] Create `lib/brands/types.ts` with `Brand` and `FetchBrandsResult` types
- [x] Create brand-related type tests in `__tests__/lib/brands/types.test.ts`

## Phase 3: Reusable SectionTitle Component

- [x] Create `components/SectionTitle.tsx` component (reusable across site for all sections)
  - Accept `title: string` prop (required)
  - Accept optional `subtitle?: string` prop
  - Accept optional `alignment?: 'left' | 'center'` prop (default: 'center')
  - Display title with heading typography (h2 level, --fs-h2)
  - Display subtitle with body text if provided
  - Use design tokens for spacing (--space-md, --space-lg, --space-xl)
- [x] Create tests in `__tests__/components/SectionTitle.test.tsx`
  - Test rendering with title only
  - Test rendering with title and subtitle
  - Test alignment variations (left, center)
  - Test responsive typography

## Phase 4: Server Action

- [x] Create `lib/actions/brands.ts` with `fetchPublishedBrands()` server action
  - Query Supabase `brand` table
  - Filter by `is_active = true`
  - Handle errors gracefully
  - Return typed result with items and error fields
- [x] Create tests for server action in `__tests__/lib/actions/brands.test.ts`
  - Test successful fetch
  - Test empty result set
  - Test is_active filtering
  - Test Supabase error handling

## Phase 5: BrandCard Component

- [x] Create `components/brands/BrandCard.tsx` component
  - Accept `brand: Brand` prop
  - Accept `index: number` prop (to determine left/right layout)
  - Wrap entire card in an `<a>` tag linking to `website_url` (external link)
    - Link opens in new tab (`target="_blank"` with `rel="noopener noreferrer"`)
    - Entire card is clickable
  - Render alternating layout on desktop:
    - Odd indexes (0, 2, 4...): Image left, text right
    - Even indexes (1, 3, 5...): Text left, image right
  - Display logo with Next.js Image component (fixed width 200–250px on desktop)
  - Display brand name as h3 heading (inside the link)
  - Display introduction text (truncate to 2 lines)
  - Stack vertically on mobile (image above text, ignore index)
  - Use consistent padding and spacing from design tokens (--space-xl, --space-2xl gap between image and text)
  - Hover state: opacity change, shadow, or subtle scale to indicate interactivity
- [x] Create tests in `__tests__/components/brands/BrandCard.test.tsx`
  - Test rendering with all props
  - Test entire card is wrapped in `<a>` tag (link renders correctly)
  - Test link href points to correct website_url
  - Test link opens in new tab (target="_blank")
  - Test link has rel="noopener noreferrer" for security
  - Test odd index layout (image left, text right)
  - Test even index layout (text left, image right)
  - Test mobile layout (stacked vertically)
  - Test text truncation
  - Test hover state styling

## Phase 6: BrandsList Component

- [x] Create `components/brands/BrandsList.tsx` component
  - Fetch data using `fetchPublishedBrands()` server action
  - Render BrandCard for each brand in a vertical list (not grid)
  - Pass `index` prop to each BrandCard for layout alternation
  - Return `null` if no active brands exist (entire section should not render at home page level)
  - Display error message if fetch fails
  - Use consistent vertical spacing (--space-3xl or --space-4xl gap) between items
  - All items stack vertically on mobile (image above text)
- [x] Create tests in `__tests__/components/brands/BrandsList.test.tsx`
  - Test rendering with multiple brands
  - Test alternating layout on desktop (odd/even index variations)
  - Test mobile layout (all items stacked)
  - Test returns null when no active brands exist
  - Test error state display

## Phase 7: Home Page Section Integration

- [x] Update `app/page.tsx` to include brands section
  - Add semantic `<section>` element with appropriate background styling
  - Add SectionTitle component with "Our Brands" or similar title
  - Add BrandsList component below section title
  - Define section padding using design tokens (--space-3xl, --space-4xl)
  - Ensure styling consistency with site layout and typography
- [x] Create/update tests in `__tests__/pages.test.ts` to verify brands section renders on home page
  - Test section title displays
  - Test brands list renders within section

## Phase 8: Optional Styling Enhancements

- [x] If custom CSS is needed:
  - Create `styles/components/brands.css` with any complex card styles or animations
  - Import in `app/globals.css`
  - Add comments documenting design intent

## Phase 9: Testing & Validation

- [x] Run `pnpm test` to verify all unit tests pass
- [x] Run `pnpm test:coverage` to ensure 70%+ line coverage
- [x] Run `pnpm typecheck` to validate TypeScript
- [x] Run `pnpm lint` to check code style
- [x] Manual testing:
  - View home page in browser (local dev)
  - Verify section title displays correctly
  - Verify brands section renders with real or mock Supabase data
  - **Desktop**: Verify alternating layout (first item: left image/right text, second item: right image/left text, etc.)
  - **Mobile**: Verify all items stack vertically (image above text)
  - Test responsive breakpoint transitions between desktop and mobile layouts
  - Test error and empty states
  - Verify section pattern can be reused for other sections (document findings)
  - **Result**: All layouts and states working correctly; section pattern validated for reuse

## Phase 10: Documentation & Cleanup

- [x] Update README or docs if brands section is user-facing or relevant to contributors
- [x] Document section pattern findings in openspec/project.md for future sections
  - **Pattern documented**: Reusable section architecture with SectionTitle + content components
  - **Future sections**: Can follow the same semantic HTML + design tokens approach
- [x] Verify all comments are clear and code is well-documented
  - **Documentation**: All components have clear JSDoc comments explaining purpose and layout
  - **Font sizes**: Using design tokens (--fs-h1, --fs-h3, --fs-body) with proper Tailwind syntax
  - **Spacing**: Using design tokens (--space-3xl, gap-12, gap-16) consistently
- [x] Final code review against design.md and project conventions in openspec/project.md
  - **Reviewed**: All specs aligned with design.md
  - **Conventions**: Following semantic HTML, design tokens, and project patterns

## Completion Checklist

Once all tasks above are complete:
- [x] All tests pass with 70%+ coverage
- [x] No TypeScript errors or ESLint warnings
- [x] Home page displays brands section with title and brand list correctly
- [x] Responsive design verified on multiple viewports
  - **Mobile (< 640px)**: Stacked layout (image above text, gap-8)
  - **Desktop (>= 640px)**: Alternating layout (odd: left image, even: right image, gap-12 between image and content, gap-16 between cards)
  - **Breakpoint transitions**: Verified smooth responsive behavior
- [x] Code follows project style and conventions
- [x] Ready for PR review and merge
  - **Archived**: 2026-01-09-add-brands-section
  - **Specs created**: openspec/specs/brands-list/spec.md
  - **All validation**: Passed strict validation
