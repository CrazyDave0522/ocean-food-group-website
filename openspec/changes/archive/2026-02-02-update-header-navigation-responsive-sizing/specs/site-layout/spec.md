# site-layout Specification Delta

## Implementation Guidelines

### Responsive Design Approach

Building on the existing responsive CSS implementation using clamp() functions:

- **Refine existing ranges**: Adjust current clamp() values rather than replace them
- **Accessibility first**: Ensure 44px minimum touch targets with padding
- **Progressive enhancement**: Maintain existing functionality while improving UX
- **Visual hierarchy**: Balance mobile constraints with brand recognition needs

## MODIFIED Requirements

### Requirement: Header displays brand logo with navigation

The site header SHALL display the Ocean Food Group logo image as a clickable link to the home page, alongside primary navigation links, with professional spacing and typography.

#### MODIFIED Scenario: Mobile header with hamburger menu

- **GIVEN** a user is on a mobile viewport (<768px)
- **WHEN** they view any page
- **THEN** the header displays with responsive horizontal padding `clamp(16px, 4vw, 32px)` scaling smoothly across mobile devices
- **AND** the logo remains left-aligned and clickable with refined responsive sizing `clamp(96px, 24vw, 128px)`
- **AND** navigation buttons are hidden, replaced with a hamburger menu icon on the right with optimized touch targets
- **AND** the menu icon sizing: `clamp(32px, 10vw, 48px)` with 8px padding ensuring 44px+ touch target
- **AND** the hamburger button has `aria-label="Toggle menu"` and `aria-expanded` attribute

#### MODIFIED Scenario: Mobile menu overlay opens on hamburger click

- **GIVEN** a user is on a mobile viewport
- **WHEN** they click the hamburger menu button
- **THEN** a full-screen overlay appears with backdrop fill: `rgba(0, 0, 0, 0.90)` (dark semi-transparent black)
- **AND** the overlay sits at `z-40` (below the sticky header at `z-50`)
- **AND** the overlay is scrollable (`overflow-y: auto`) when nav items exceed viewport height
- **AND** the underlying page scroll is locked (body `position: fixed` with scroll position preserved)
- **AND** overlay scrolling does not chain to the page behind (`overscroll-behavior: contain`)
- **AND** the overlay menu content has top padding `--space-8xl` so the first item sits below the sticky header
- **AND** navigation buttons are stacked vertically with optimized spacing:
  - Gap between buttons: refined `clamp(72px, 10vw, 100px)` for better vertical rhythm
  - Typography:
    - Font size: gentler scaling `clamp(24px, 4vw, 48px)` instead of aggressive `clamp(32px, 4vw, 48px)`
    - Font style: normal
    - Font weight: 600
    - Line height: normal
- **AND** the active page button is highlighted with:
  - Text color: primary (#0f75bc)
  - Bottom border indicator: 4px solid primary (#0f75bc) with border-radius: --radius-md (8px)
- **AND** the menu has smooth slide-in animation (Framer Motion)

#### MODIFIED Scenario: Desktop header with active navigation

- **GIVEN** a user is on a desktop viewport (≥768px)
- **WHEN** they view any page (e.g., `/franchise`)
- **THEN** the header displays with --space-3xl horizontal padding (64px left/right)
- **AND** the logo remains left-aligned and clickable with responsive sizing `clamp(96px, 24vw, 128px)`
- **AND** navigation buttons are right-aligned with:
  - Consistent typography (font-size: --fs-body-lg, font-weight: 500, normal style, normal line-height)
  - Gap between buttons: --space-4xl (80px)
- **AND** the button for the current page (e.g., "Franchise") is highlighted with enhanced emphasis:
  - Text color: primary (#0f75bc)
  - Font weight: 600 (semibold for stronger visual hierarchy)
  - Bottom border indicator: 4px solid primary (#0f75bc) with border-radius: --radius-md (8px)
- **AND** other buttons show default text color with no border
- **AND** buttons support hover/focus states for accessibility
