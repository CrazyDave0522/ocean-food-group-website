# site-footer Specification

## Purpose
TBD - created by archiving change 2026-01-11-improve-footer-layout. Update Purpose after archive.
## Requirements
### Requirement: Footer displays two-section layout

The site footer SHALL be divided into two vertical sections with a clean, professional design using brand colors.

#### Scenario: Footer sections display correctly

- **GIVEN** a user views any page with a footer
- **WHEN** they scroll to the bottom
- **THEN** the footer shows two distinct sections separated by a thin white line
- **AND** the top section displays the Ocean Food Group white logo and legal links in the same line
- **AND** the separator line is 80% width and centered with `border-top: 1px solid rgba(255, 255, 255, 0.20);`
- **AND** the bottom section displays copyright information
- **AND** the background uses the dark blue color (#14224A)
- **AND** all text is white for proper contrast
- **AND** the layout is responsive with appropriate sizing on mobile and desktop

### Requirement: Bottom section provides company information

The footer bottom section SHALL display the copyright notice centered.

#### Scenario: Copyright information displays correctly

- **GIVEN** the footer bottom section
- **WHEN** the page loads
- **THEN** the copyright text "© 2026 Ocean Food Group Pty Ltd. All Rights Reserved." is displayed
- **AND** the text is centered horizontally
- **AND** the text is white against the blue background
- **AND** appropriate padding is applied for visual balance

### Requirement: Footer maintains visual design standards

The footer SHALL use design tokens for consistent theming and accessibility.

#### Scenario: Color scheme follows design tokens

- **GIVEN** the footer component
- **WHEN** the page renders
- **THEN** the background color is set to #14224A (dark blue)
- **AND** all text colors are white (#ffffff)
- **AND** link colors are white with appropriate hover states
- **AND** the color contrast meets WCAG AA accessibility standards
- **AND** legal links are accessible with proper ARIA labels and keyboard navigation
- **AND** links navigate to correct pages (/terms, /privacy)

- **GIVEN** the footer component
- **WHEN** the page renders
- **THEN** the background color is set to #14224A (dark blue)
- **AND** all text colors are white (#ffffff)
- **AND** link colors are white with appropriate hover states
- **AND** the color contrast meets WCAG AA accessibility standards

