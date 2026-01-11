# site-footer Specification

## Purpose
TBD - created by archiving change 2026-01-11-improve-footer-layout. Update Purpose after archive.
## Requirements
### Requirement: Footer displays two-section layout

The site footer SHALL be divided into two vertical sections separated by a visual line.

#### Scenario: Footer sections display correctly

- **GIVEN** a user views any page with a footer
- **WHEN** they scroll to the bottom
- **THEN** the footer shows two distinct sections
- **AND** a visual separator line appears between sections
- **AND** the top section displays brand information
- **AND** the bottom section displays company information

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

### Requirement: Bottom section provides company information

The footer bottom section SHALL display Ocean Food Group information with logo and legal links.

#### Scenario: Company information displays correctly

- **GIVEN** the footer bottom section
- **WHEN** the page loads
- **THEN** the Ocean Food Group logo is displayed
- **AND** Terms & Conditions link is available
- **AND** Privacy Policy link is available
- **AND** copyright information is shown
- **AND** all elements are properly styled and aligned

### Requirement: Footer maintains visual design standards

The footer SHALL follow specified visual design guidelines for consistency.

#### Scenario: Footer separator line styled correctly

- **GIVEN** the footer separator between sections
- **WHEN** the page renders
- **THEN** the separator displays as `1px solid rgba(255, 255, 255, 0.20);`
- **AND** the line spans the full width of the footer content

#### Scenario: Company logo sized appropriately

- **GIVEN** the Ocean Food Group logo in the footer
- **WHEN** the footer renders
- **THEN** the company logo uses the same sizing as the header logo
- **AND** the logo maintains proper aspect ratio

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

