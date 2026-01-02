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

