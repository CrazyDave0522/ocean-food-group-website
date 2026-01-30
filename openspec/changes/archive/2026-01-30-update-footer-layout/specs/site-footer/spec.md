# site-footer Specification

## REMOVED Requirements

### Requirement: Top section showcases brand portfolio

The footer top section SHALL display "Our Culinary Concepts" with active brand logos in a responsive grid.

#### Scenario: Brand logos display in organized grid

- **GIVEN** the footer top section
- **WHEN** brands are available in the database
- **THEN** active brand logos are displayed
- **AND** maximum 4 logos appear per row
- **AND** maximum 5 rows of logos are displayed
- **AND** the grid is horizontally centered
- **AND** logos are properly sized and spaced
- **AND** each logo is clickable and links to the brand's website
- **AND** logos have consistent sizing and aspect ratios
- **AND** logos include alt text using the brand name

#### Scenario: Brand logos handle loading failures

- **GIVEN** a brand logo image fails to load
- **WHEN** the footer renders
- **THEN** the failed logo is omitted from display
- **AND** the grid layout adjusts to remaining logos
- **AND** no broken image placeholders are shown

#### Scenario: Brand logos open external websites

- **GIVEN** a user clicks on a brand logo in the footer
- **WHEN** the logo is clicked
- **THEN** the brand's website opens in a new browser tab
- **AND** the current page remains open
- **AND** the link includes security attributes (`rel="noopener noreferrer"`)

#### Scenario: Brand logos without website URLs

- **GIVEN** a brand has no website_url in the database
- **WHEN** the footer renders
- **THEN** the brand logo is still displayed in the grid
- **AND** the logo is not clickable (no link wrapper)
- **AND** appropriate alt text is still provided

#### Scenario: Brand images are lazy-loaded

- **GIVEN** the footer brand section
- **WHEN** the page loads
- **THEN** brand images use lazy loading to improve performance
- **AND** images load only when they enter the viewport

#### Scenario: Brand grid adapts to screen size

- **GIVEN** the footer brand grid
- **WHEN** viewed on different screen sizes
- **THEN** the number of logos per row adjusts responsively
- **AND** logos remain properly aligned and sized
- **AND** grid maintains horizontal centering

### Requirement: Brand display limits grid size

The footer brand section SHALL limit the display to prevent excessive vertical space usage.

#### Scenario: Brand grid respects row and column limits

- **GIVEN** the footer brand grid
- **WHEN** more than 20 brands are available
- **THEN** only the first 20 brands are displayed (5 rows × 4 logos)
- **AND** brands are ordered by creation date (newest first)
- **AND** no scrolling or pagination is implemented

### Requirement: Brand section conditionally renders

The footer brand section SHALL only display when active brands are available.

#### Scenario: Brand section displays when brands exist

- **GIVEN** active brands are available in the database
- **WHEN** the footer loads
- **THEN** the "Our Culinary Concepts" section is displayed
- **AND** brand logos are shown in the grid

#### Scenario: Brand section is hidden when no brands exist

- **GIVEN** no active brands are available in the database
- **WHEN** the footer loads
- **THEN** the "Our Culinary Concepts" section is not displayed
- **AND** only the company information section remains
- **AND** no empty space or placeholder is shown

## MODIFIED Requirements

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

