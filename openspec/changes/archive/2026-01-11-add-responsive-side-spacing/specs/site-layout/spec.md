# site-layout Specification Delta

## ADDED Requirements

### Requirement: Main content area has responsive horizontal padding

The site SHALL apply responsive horizontal padding to the main content area to provide breathing space on left and right sides across all viewport sizes, scaling appropriately at defined breakpoints (xs: 375px, sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1440px).

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
