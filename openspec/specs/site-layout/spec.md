# site-layout Specification

## Purpose
TBD - created by archiving change add-sticky-header-footer. Update Purpose after archive.
## Requirements
### Requirement: Header remains pinned to top during scroll
The site SHALL keep the main header visible at the top of the viewport while users scroll page content.

#### Scenario: Scrolling long content
- **WHEN** a user scrolls down a page with content exceeding one viewport height
- **THEN** the header stays visible at the top of the viewport and does not scroll out of view
- **AND** the header does not occlude main content (content starts below the header)

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
The site header SHALL display the Ocean Food Group logo image as a clickable link to the home page, alongside primary navigation links.

#### Scenario: Logo displayed in header
- **WHEN** a user views any page
- **THEN** the header displays the Ocean Food Group logo image
- **AND** the logo is clickable and navigates to the home page
- **AND** the logo has appropriate alt text for accessibility
- **AND** the logo maintains proper sizing and alignment within the header layout

