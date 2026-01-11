# site-layout Specification

## Purpose
Defines the global layout structure for the Ocean Food Group website including sticky header and footer positioning. Ensures the header remains pinned at the top during scroll while the footer stays anchored at the bottom of the viewport or content, whichever is lower. Establishes consistent page structure with proper z-index layering.
## Requirements
### Requirement: Header remains pinned to top during scroll

The site SHALL keep the main header visible at the top of the viewport while users scroll page content.

#### Scenario: Scrolling long content with updated header styling

- **GIVEN** a user is on a page with content exceeding viewport height
- **WHEN** they scroll down
- **THEN** the header remains visible at the top with the updated 60px padding and active nav styling
- **AND** the header does not scroll out of view
- **AND** content starts below the header without occlusion

### Requirement: Footer anchors to bottom on short pages
The site SHALL place the footer at the bottom of the viewport when page content is shorter than the viewport height.

#### Scenario: Short page content
- **GIVEN** a page whose content height is less than the viewport height
- **WHEN** the page is rendered
- **THEN** the footer is positioned at the bottom edge of the viewport with no empty gap below it
- **AND** the footer still appears after the main content (not overlapping it)

### Requirement: Reusable form title component for form headings
The site SHALL provide a standalone `FormTitle` component that renders form titles and optional subtitles/descriptions with consistent typography and spacing, independent of form containers or other layout wrappers.

#### Scenario: Display form title outside form container
- **GIVEN** a page with a form (e.g., contact page)
- **WHEN** the form title is rendered using `FormTitle` component
- **THEN** the title and optional subtitle appear with consistent styling (h1 text-3xl font-semibold, subtitle text-gray-600)
- **AND** the title can be placed outside or inside any layout container as needed

#### Scenario: Reuse form title across multiple forms
- **GIVEN** multiple forms requiring titles and subtitles
- **WHEN** they use the `FormTitle` component
- **THEN** all form titles share the same visual treatment and spacing without duplicating markup or styles

### Requirement: Form container provides consistent layout wrapper
The site SHALL provide a `FormShell` component that wraps form content with consistent container styling (card, padding, border, shadow) without embedding titles or subtitles.

#### Scenario: Form container used with external form title
- **GIVEN** a page with a form
- **WHEN** the form is wrapped in `FormShell` and preceded by a separate `FormTitle`
- **THEN** the form container provides card-style layout with appropriate spacing
- **AND** the form title and form container can be composed independently
- **AND** the form container does not accept title or description props

### Requirement: Header displays brand logo with navigation

The site header SHALL display the Ocean Food Group logo image as a clickable link to the home page, alongside primary navigation links, with professional spacing and typography.

#### Scenario: Desktop header with active navigation

- **GIVEN** a user is on a desktop viewport (≥768px)
- **WHEN** they view any page (e.g., `/franchise`)
- **THEN** the header displays with --space-3xl horizontal padding (64px left/right)
- **AND** the logo remains left-aligned and clickable
- **AND** navigation buttons are right-aligned with:
  - Consistent typography (font-size: --fs-body-lg, font-weight: 500, normal style, normal line-height)
  - Gap between buttons: --space-4xl (80px)
- **AND** the button for the current page (e.g., "Franchise") is highlighted with:
  - Text color: primary (#0f75bc)
  - Bottom border indicator: 4px solid primary (#0f75bc) with border-radius: --radius-md (8px)
- **AND** other buttons show default text color with no border
- **AND** buttons support hover/focus states for accessibility

#### Scenario: Mobile header with hamburger menu

- **GIVEN** a user is on a mobile viewport (<768px)
- **WHEN** they view any page
- **THEN** the header displays with responsive padding (reduced for mobile)
- **AND** the logo remains left-aligned and clickable
- **AND** navigation buttons are hidden, replaced with a hamburger menu icon on the right (`nav-mb.svg`)
- **AND** the menu icon sizing: width 50px, height 50px (at 750px baseline, responsive scaling for other viewports)
- **AND** the hamburger button has `aria-label="Toggle menu"` and `aria-expanded` attribute

#### Scenario: Mobile menu overlay opens on hamburger click

- **GIVEN** a user is on a mobile viewport
- **WHEN** they click the hamburger menu button
- **THEN** a full-screen overlay appears with backdrop fill: `rgba(0, 0, 0, 0.90)` (dark semi-transparent black)
- **AND** the overlay sits at `z-40` (below the sticky header at `z-50`)
- **AND** the overlay is scrollable (`overflow-y: auto`) when nav items exceed viewport height
- **AND** the underlying page scroll is locked (body `position: fixed` with scroll position preserved)
- **AND** overlay scrolling does not chain to the page behind (`overscroll-behavior: contain`)
- **AND** the overlay menu content has top padding `--space-8xl` so the first item sits below the sticky header
- **AND** navigation buttons are stacked vertically with:
  - Gap between buttons: responsive clamp (64px–96px, 96px at ~750px baseline)
  - Typography:
    - Font size: `--fs-h1`
    - Font style: normal
    - Font weight: 600
    - Line height: normal
- **AND** the active page button is highlighted with:
  - Text color: primary (#0f75bc)
  - Bottom border indicator: 4px solid primary (#0f75bc) with border-radius: --radius-md (8px)
- **AND** the menu has smooth slide-in animation (Framer Motion)

#### Scenario: Mobile menu closes on link click

- **GIVEN** the mobile menu overlay is open
- **WHEN** a user clicks a navigation link
- **THEN** the overlay closes with smooth animation
- **AND** the underlying page scroll is re-enabled
- **AND** the page navigates to the selected link
- **AND** the active state updates for the new page

### Requirement: Mobile navigation overlay accessible via hamburger menu

The site SHALL provide a mobile-friendly navigation overlay that appears on small screens, triggered by a hamburger menu button.

#### Scenario: Mobile navigation with keyboard and screen reader support

- **GIVEN** a user on a mobile viewport with assistive technology enabled
- **WHEN** they interact with the header
- **THEN** the hamburger button is properly labeled with `aria-label`
- **AND** the menu overlay has `role="navigation"` and `aria-label="Mobile navigation"`
- **AND** ESC key closes the overlay (optional enhancement for power users)
- **AND** focus management keeps focus within the overlay while open (optional)

### Requirement: Main content area has responsive horizontal padding

The site SHALL apply responsive horizontal padding to page content sections (below Hero areas) to provide breathing space on left and right sides across all viewport sizes, scaling appropriately at defined breakpoints (xs: 375px, sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1440px). Hero sections SHALL remain full-width without padding.

#### Scenario: Desktop layout at xl breakpoint and above (1280px+)

- **GIVEN** a user views the site on a desktop viewport at xl breakpoint (1280px) or larger
- **WHEN** the page renders
- **THEN** the main content area has horizontal padding that scales from appropriate values at xl breakpoint up to --space-9xl (256px) at the 1920px baseline
- **AND** content is centered with max-width of 1920px
- **AND** padding provides proportional breathing space that increases with viewport width

#### Scenario: Mobile layout at md breakpoint (768px)

- **GIVEN** a user views the site on a mobile/tablet viewport at md breakpoint (768px)
- **WHEN** the page renders
- **THEN** the main content area has --space-xl (32px) horizontal padding on left and right sides at the 750px baseline
- **AND** padding scales down appropriately for smaller viewports (sm: 640px, xs: 375px) to provide suitable breathing space

#### Scenario: Responsive scaling across all breakpoints

- **GIVEN** a user views the site on any viewport size
- **WHEN** the page renders
- **THEN** the horizontal padding scales smoothly from --space-xl at md breakpoint up to --space-9xl at 1920px using clamp() or similar responsive functions
- **AND** no content touches viewport edges inappropriately at any breakpoint
- **AND** padding provides consistent breathing space across xs, sm, md, lg, xl, and 2xl breakpoints

