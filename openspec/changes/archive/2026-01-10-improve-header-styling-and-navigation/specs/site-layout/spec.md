# spec.md delta for site-layout

## MODIFIED Requirements

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

### Requirement: Header remains pinned to top during scroll

The site SHALL keep the main header visible at the top of the viewport while users scroll page content.

#### Scenario: Scrolling long content with updated header styling

- **GIVEN** a user is on a page with content exceeding viewport height
- **WHEN** they scroll down
- **THEN** the header remains visible at the top with the updated 60px padding and active nav styling
- **AND** the header does not scroll out of view
- **AND** content starts below the header without occlusion

## ADDED Requirements

### Requirement: Mobile navigation overlay accessible via hamburger menu

The site SHALL provide a mobile-friendly navigation overlay that appears on small screens, triggered by a hamburger menu button.

#### Scenario: Mobile navigation with keyboard and screen reader support

- **GIVEN** a user on a mobile viewport with assistive technology enabled
- **WHEN** they interact with the header
- **THEN** the hamburger button is properly labeled with `aria-label`
- **AND** the menu overlay has `role="navigation"` and `aria-label="Mobile navigation"`
- **AND** ESC key closes the overlay (optional enhancement for power users)
- **AND** focus management keeps focus within the overlay while open (optional)
