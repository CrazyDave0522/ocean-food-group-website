# brands-list Specification

## Purpose
TBD - created by archiving change add-brands-section. Update Purpose after archive.
## Requirements
### Requirement: FeatureCard component displays brand with alternating left-right layout

The site SHALL provide a `FeatureCard` component that renders a single brand item with alternating layout: odd items display image on left with text on right, even items display text on left with image on right. On mobile, items stack vertically regardless of position.

#### Scenario: Display odd brand card (image left, text right) on desktop

- **GIVEN** a brand object with id, name, logo_url, and introduction at an odd index (0, 2, 4...)
- **WHEN** the `FeatureCard` component is rendered on a desktop viewport (md and larger)
- **THEN** the card displays with logo image on the left side
- **AND** the brand name and introduction text appear on the right side
- **AND** the logo image has a fixed width (e.g., 200–250px)
- **AND** the brand name appears as an h3 heading
- **AND** the introduction text is displayed below the brand name
- **AND** the introduction text is limited to 2 lines maximum with ellipsis (`...`) if text overflows
- **AND** the text is vertically centered with the image (or top-aligned)
- **AND** there is consistent horizontal spacing between image and text (e.g., --space-xl or --space-2xl)

#### Scenario: Display even brand card (text left, image right) on desktop

- **GIVEN** a brand object with id, name, logo_url, and introduction at an even index (1, 3, 5...)
- **WHEN** the `FeatureCard` component is rendered on a desktop viewport (md and larger)
- **THEN** the brand name and introduction text appear on the left side
- **AND** the logo image appears on the right side
- **AND** the logo image has a fixed width (e.g., 200–250px)
- **AND** the brand name appears as an h3 heading on the left
- **AND** the introduction text is displayed below the brand name on the left
- **AND** the introduction text is limited to 2 lines maximum with ellipsis (`...`) if text overflows
- **AND** the text is vertically centered with the image (or top-aligned)
- **AND** there is consistent horizontal spacing between text and image (e.g., --space-xl or --space-2xl)

#### Scenario: Display brand card on mobile (stacked vertically)

- **GIVEN** a brand object with id, name, logo_url, and introduction at any index
- **WHEN** the `FeatureCard` component is rendered on a mobile viewport (< md)
- **THEN** the layout stacks vertically
- **AND** the logo image appears at the top
- **AND** the brand name and introduction text appear below the logo
- **AND** all content is centered or left-aligned consistently
- **AND** the image width adjusts to mobile viewport (full width or constrained)
- **AND** padding is adjusted appropriately for mobile (e.g., px-4 py-3)

#### Scenario: Logo image is displayed with proper aspect ratio and alt text

- **GIVEN** a brand with a logo_url (always present per schema)
- **WHEN** the `FeatureCard` is rendered
- **THEN** the logo image is displayed with a consistent aspect ratio (16:10)
- **AND** the image has a descriptive alt text (derived from brand name or filename)
- **AND** the image is optimized using Next.js Image component (lazy loading, responsive sizing)
- **AND** the image width is fixed on desktop (200–250px) and full width on mobile

#### Scenario: Metadata is displayed with appropriate typography

- **GIVEN** a brand with name and introduction text
- **WHEN** the `FeatureCard` is rendered
- **THEN** the brand name is displayed with heading typography (h3, font-semibold, text-lg or text-xl)
- **AND** the introduction text is displayed with body text size (text-sm or text-base)
- **AND** the introduction text color is muted (e.g., text-slate-600)
- **AND** the introduction text is limited to 2 lines maximum with ellipsis (`...`) if text overflows (use `line-clamp-2`)

#### Scenario: Clicking brand card opens external website in new tab

- **GIVEN** a rendered `FeatureCard` with a website_url field (external link)
- **WHEN** the user clicks anywhere on the card
- **THEN** the browser opens a new tab navigating to the brand's website_url
- **AND** the original page remains open in the previous tab
- **AND** the entire card area is clickable (image, name, introduction all trigger the link)
- **AND** the link uses `rel="noopener noreferrer"` for security (prevents access to window.opener)
- **AND** the card displays cursor: pointer on hover to indicate interactivity

#### Scenario: Card displays hover state for visual feedback

- **GIVEN** a rendered `FeatureCard`
- **WHEN** the user hovers over the card on desktop
- **THEN** the card displays visual feedback (opacity change, shadow increase, or subtle scale)
- **AND** the cursor changes to pointer style
- **AND** the entire card area is clearly interactive

#### Scenario: Card displays hover state for visual feedback

- **GIVEN** a rendered `FeatureCard`
- **WHEN** the user hovers over the card
- **THEN** the card displays visual feedback (opacity change, shadow increase, or subtle scale)
- **AND** the cursor changes to default (pointer if card is clickable in future)

### Requirement: FeatureList component displays vertical list with alternating layouts

The site SHALL provide a `FeatureList` component that renders a vertical list of FeatureCard components with alternating left-right layouts. Each brand item alternates position based on its index in the list.

#### Scenario: Display brands in alternating layout

- **GIVEN** published brands fetched from Supabase
- **WHEN** the `FeatureList` component is rendered
- **THEN** the brands are displayed in a vertical list (not a grid)
- **AND** each FeatureCard receives an `index` prop to control layout alternation
- **AND** odd-indexed items (0, 2, 4...) display image on left, text on right (desktop)
- **AND** even-indexed items (1, 3, 5...) display text on left, image on right (desktop)
- **AND** items are spaced vertically with consistent gap (e.g., --space-3xl or --space-4xl)
- **AND** on mobile (< md), all items stack vertically regardless of index

#### Scenario: Mobile layout stacks all items vertically

- **GIVEN** the `FeatureList` component is rendered on a mobile viewport (< md)
- **WHEN** multiple brands are displayed
- **THEN** all items display with image above text (vertical stack)
- **AND** the alternating left-right layout is ignored on mobile
- **AND** all items maintain consistent vertical spacing
- **AND** content is readable and properly sized for mobile

#### Scenario: Loading or skeleton state while fetching data

- **GIVEN** the `FeatureList` component is mounting
- **WHEN** the data fetch is in progress
- **THEN** a loading indication may be displayed (optional skeleton loaders or spinner)
- **AND** the user understands that content is being loaded

#### Scenario: Empty state when no brands are active

- **GIVEN** a successful fetch from Supabase returns zero active brands
- **WHEN** the `FeatureList` component is rendered
- **THEN** a friendly empty state message is displayed (e.g., "No brands available at this time")
- **AND** the message uses appropriate typography and color (text-slate-500 or similar)
- **AND** the message is centered and spaced appropriately

#### Scenario: Error state displays user-friendly message

- **GIVEN** the fetch from Supabase fails
- **WHEN** the `FeatureList` component is rendered
- **THEN** an error message is displayed (e.g., "Failed to load brands. Please try again later.")
- **AND** the error message uses warning or error color (text-red-600 or similar)
- **AND** the message is centered and provides clear user feedback
- **AND** no broken or partial content is displayed

#### Scenario: List styling is consistent with site design

- **GIVEN** rendered `FeatureList` component
- **WHEN** the component is displayed on the home page
- **THEN** the list uses consistent spacing and padding (leveraging design tokens)
- **AND** the list integrates visually with surrounding page content
- **AND** the component respects the site's color scheme and typography

### Requirement: fetchPublishedBrands server action retrieves brands from Supabase

The site SHALL provide a server action `fetchPublishedBrands()` that queries the Supabase `brand` table and returns published brands with proper error handling.

#### Scenario: Fetch active brands from Supabase

- **GIVEN** the Supabase `brand` table contains entries with `is_active = true`
- **WHEN** `fetchPublishedBrands()` is called
- **THEN** the function queries Supabase: `select * from brand where is_active = true`
- **AND** the results are returned as an array of `Brand` objects
- **AND** the return object includes `items: Brand[]` and optional `error: string`

#### Scenario: Filter returns only active brands

- **GIVEN** the Supabase `brand` table contains both active and inactive brands
- **WHEN** `fetchPublishedBrands()` is called
- **THEN** only brands with `is_active = true` are returned
- **AND** inactive brands are excluded
- **AND** the filter is applied server-side for security and performance

#### Scenario: Empty result set is handled gracefully

- **GIVEN** the Supabase `brand` table exists but contains no active brands
- **WHEN** `fetchPublishedBrands()` is called
- **THEN** the function returns `{ items: [], hasMore?: false }`
- **AND** no error is thrown
- **AND** the calling component can display the empty state appropriately

#### Scenario: Supabase errors are caught and returned

- **GIVEN** Supabase connection fails or query encounters an error
- **WHEN** `fetchPublishedBrands()` is called
- **THEN** the error is caught and logged to console for debugging
- **AND** the function returns `{ items: [], hasMore?: false, error: "Failed to load brands. Please try again later." }`
- **AND** a user-friendly error message is provided to the caller
- **AND** the error does not crash the application or page

#### Scenario: Pagination is supported for large brand lists

- **GIVEN** `fetchPublishedBrands(offset, limit)` is called with optional pagination parameters
- **WHEN** the function is invoked with `offset = 0, limit = 12`
- **THEN** the function returns the first 12 active brands
- **AND** a `hasMore: boolean` field indicates if additional results exist
- **AND** the caller can use offset/limit for infinite scroll or pagination (future feature)

### Requirement: Brand types are properly defined and exported

The site SHALL provide TypeScript types for brand objects and server action results.

#### Scenario: Brand type includes all required fields from schema

- **GIVEN** the `Brand` type is defined in `lib/brands/types.ts`
- **WHEN** the type is imported and used
- **THEN** the type includes:
  - `id: string` (UUID)
  - `name: string` (required)
  - `introduction: string` (required) — brand description/introduction
  - `logo_url: string` (required)
  - `website_url: string` (required) — link to brand's website
  - `is_active: boolean` (required)
  - `created_at: string` (required)
  - `updated_at: string` (required)
- **AND** TypeScript enforces the type structure in all consuming code

#### Scenario: FetchBrandsResult type includes success and error paths

- **GIVEN** the `FetchBrandsResult` type is defined
- **WHEN** the type is imported and used in server action return values
- **THEN** the type includes:
  - `items: Brand[]` (required)
  - `hasMore?: boolean` (optional)
  - `error?: string` (optional error message)
- **AND** all consuming code properly handles both success and error cases via TypeScript narrowing

### Requirement: FeatureList component does not render when no active brands exist

The site SHALL NOT display the brands section if no active brands are available in the database. The entire section should conditionally not render, leaving no trace of the section on the home page.

#### Scenario: Section does not render when no active brands exist

- **GIVEN** the Supabase `brand` table contains zero records with `is_active = true`
- **WHEN** the home page is loaded
- **THEN** the FeatureList component returns `null`
- **AND** the brands section (including section title and FeatureList) shall not render
- **AND** no empty state message or placeholder appears
- **AND** the page layout continues seamlessly without the section
- **AND** the home page DOM does not contain any brands section elements

#### Scenario: Section renders when at least one active brand exists

- **GIVEN** the Supabase `brand` table contains at least one record with `is_active = true`
- **WHEN** the home page is loaded
- **THEN** the FeatureList component renders the brands in a vertical list
- **AND** the brands section (section title and FeatureList) appears on the home page
- **AND** all active brands are displayed with alternating left-right layout on desktop
- **AND** all items stack vertically on mobile

