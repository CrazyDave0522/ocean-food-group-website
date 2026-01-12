# callout-component Specification

## Purpose
TBD - created by archiving change add-callout-component. Update Purpose after archive.
## Requirements
### Requirement: Callout Component Rendering

The Callout component SHALL render a container with one line of text, a button, and a background that defaults to a linear gradient using brand colors (linear-gradient(135deg, var(--color-primary-lighter), var(--color-primary-light))), with an optional user-provided image URL that falls back to the default if it fails to load.

#### Scenario: Callout with default background

- **WHEN** a Callout component is rendered with text, button text, button URL, and no image URL
- **THEN** it displays the text and button with the default linear gradient background

#### Scenario: Callout with user-provided image background

- **WHEN** a Callout component is rendered with text, button text, button URL, and an image URL
- **THEN** it displays the text and button overlaid on the provided image background, with alt text if provided

#### Scenario: Image background fallback

- **WHEN** the provided image URL fails to load
- **THEN** it falls back to the default gradient background

### Requirement: Callout Component Layout

The Callout component SHALL be full width within its container, have a height of var(--space-7xl) at 1920px baseline UI (adjusting proportionally at other sizes including mobile), have padding of var(--space-xl) top/bottom and var(--space-lg) left/right around the content, have a vertical gap of var(--space-lg) between the text and the button, and center both the text and button horizontally.

#### Scenario: Full width rendering

- **WHEN** the Callout component is rendered
- **THEN** it spans the full width of its parent container

#### Scenario: Component height

- **WHEN** the Callout component is rendered at 1920px baseline UI
- **THEN** it has a height of var(--space-7xl) and adjusts proportionally at other screen sizes

#### Scenario: Content padding

- **WHEN** the Callout component is rendered
- **THEN** the content has padding of var(--space-xl) top/bottom and var(--space-lg) left/right

#### Scenario: Vertical gap between text and button

- **WHEN** the Callout component is rendered with text and button
- **THEN** there is a vertical gap of var(--space-lg) between the text and the button

#### Scenario: Centered text and button

- **WHEN** the Callout component is rendered
- **THEN** the text and button are centered horizontally within the component

### Requirement: Callout Text Styling

The text in the Callout component SHALL be styled with black color (#000), font-size using --fs-h3, normal font-style, 600 font-weight, and normal line-height.

#### Scenario: Text styling application

- **WHEN** the Callout text is rendered
- **THEN** it uses the specified styling: color #000, font-size var(--fs-h3), font-style normal, font-weight 600, line-height normal

### Requirement: Callout Button Styling

The button in the Callout component SHALL be styled with display inline-flex, padding var(--space-sm) var(--space-md), flex-direction column, align-items flex-start, border-radius var(--radius-sm), font-size var(--fs-body), font-weight 400.

#### Scenario: Button styling application

- **WHEN** the Callout button is rendered
- **THEN** it uses the specified styling: display inline-flex, padding var(--space-sm) var(--space-md), flex-direction column, align-items flex-start, border-radius var(--radius-sm), font-size var(--fs-body), and font-weight 400

### Requirement: Callout Button Functionality

The Callout component SHALL include a button that navigates to the provided URL when clicked, supporting both internal and external links.

#### Scenario: Internal link navigation

- **WHEN** the user clicks the button with an internal URL
- **THEN** the application navigates to the internal route

#### Scenario: External link navigation

- **WHEN** the user clicks the button with an external URL
- **THEN** the browser navigates to the external URL

### Requirement: Callout Accessibility

The Callout component SHALL be accessible, including proper ARIA attributes for the button and text content.

#### Scenario: Screen reader support

- **WHEN** a Callout is rendered
- **THEN** screen readers can announce the text and button appropriately

