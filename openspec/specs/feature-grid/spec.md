# feature-grid Specification

## Purpose
TBD - created by archiving change add-feature-grid-component. Update Purpose after archive.
## Requirements
### Requirement: FeatureGrid Component Structure

The FeatureGrid component SHALL be a new React component that displays features in a complex grid layout with a merged first column and alternating content-image units in subsequent columns.

#### Scenario: Component Creation

- **WHEN** a FeatureGrid component is created
- **THEN** it accepts `intro` props for the first column (title, text, button) and `features` array for subsequent units
- **AND** each feature object contains `id`, `title`, `description`, and `image` properties
- **AND** exactly 3 feature units are displayed

#### Scenario: Three Unit Requirement

- **GIVEN** the FeatureGrid component is used
- **WHEN** fewer than 3 features are provided
- **THEN** the entire component does not render
- **AND** no grid layout is displayed
- **AND** when exactly 3 or more features are provided
- **THEN** exactly 3 features are displayed in the grid (first 3 if more provided)
- **AND** the grid displays 1 intro column + 3 unit columns

#### Scenario: Dynamic Content Provision

- **GIVEN** the FeatureGrid component is used
- **WHEN** content is provided by the component user
- **THEN** unit content (title, description) and images are supplied via props
- **AND** content is not hardcoded within the component
- **AND** images are provided as URLs or paths by the component user
- **AND** each feature includes a link URL for navigation

### Requirement: First Column Layout

The first column SHALL be merged across 2 rows and display introductory content with a background image.

#### Scenario: First Column Content

- **GIVEN** the FeatureGrid has intro props
- **WHEN** the first column renders
- **THEN** it displays the intro title, text, and button
- **AND** it spans 2 rows in height
- **AND** it uses `public/images/backgrounds/bg-feature-grid-intro.png` as background (428×510px, aspect ratio ≈0.84)
- **AND** the button uses the GlassmorphismButton component
- **AND** intro content is left-aligned with equal horizontal padding for centered appearance

#### Scenario: Intro Title Styling

- **GIVEN** the intro title is rendered
- **WHEN** the title displays
- **THEN** it uses white font color
- **AND** it uses 32px font size
- **AND** it uses normal font style
- **AND** it uses 600 font weight
- **AND** it uses normal line height
- **AND** it displays no more than 2 lines of text

#### Scenario: Intro Text Styling

- **GIVEN** the intro text is rendered
- **WHEN** the text displays
- **THEN** it uses white font color
- **AND** it uses 18px font size
- **AND** it uses normal font style
- **AND** it uses 500 font weight
- **AND** it uses normal line height
- **AND** it displays no more than 6 lines of text

#### Scenario: First Column Background

- **GIVEN** the first column is rendered
- **WHEN** displaying the background
- **THEN** it uses `bg-feature-grid-intro.png` with proper aspect ratio handling
- **AND** the background covers the full merged column area

### Requirement: Unit Column Layout

Columns after the first SHALL each contain one unit with 2 rows, alternating between content-top/image-bottom and image-top/content-bottom patterns.

#### Scenario: Unit Structure

- **GIVEN** feature units are provided
- **WHEN** units are rendered
- **THEN** each unit occupies one column with 2 rows
- **AND** the first unit shows content in row 1, image in row 2
- **AND** the second unit shows image in row 1, content in row 2
- **AND** this alternating pattern continues for all units

#### Scenario: Content Row Structure

- **GIVEN** a content row in a unit
- **WHEN** rendered
- **THEN** it displays the feature title and description
- **AND** title uses #495467 color, justify alignment, 16px font size, normal style, 600 weight, 24px line height
- **AND** description uses `var(--fs-body)` font size
- **AND** there is `--space-md` (16px) gap between title and description

#### Scenario: Unit Title Styling

- **GIVEN** a unit title is rendered
- **WHEN** the title displays
- **THEN** it uses #495467 font color
- **AND** it uses justify text alignment
- **AND** it uses 16px font size
- **AND** it uses normal font style
- **AND** it uses 600 font weight
- **AND** it uses 24px line height
- **AND** the content cell maintains 324:258 aspect ratio (approximately 1.256:1)

#### Scenario: Image Row Structure

- **GIVEN** an image row in a unit
- **WHEN** rendered
- **THEN** it displays the feature image using Next.js Image component
- **AND** the image fills the row area with proper aspect ratio
- **AND** the image cell maintains 324:258 aspect ratio (approximately 1.256:1)

### Requirement: Grid Layout

The FeatureGrid component SHALL use CSS Grid with specific column and row configurations.

#### Scenario: Grid Structure

- **GIVEN** the FeatureGrid renders
- **WHEN** laying out the grid
- **THEN** the first column spans 2 rows
- **AND** subsequent columns are auto-sized units
- **AND** all rows have equal height within their respective sections

#### Scenario: Responsive Behavior

- **GIVEN** the screen size changes
- **WHEN** the grid adapts
- **THEN** on mobile, only the intro column is displayed (no units)
- **AND** the intro takes up the full mobile layout
- **AND** on tablet, the layout maintains intro column prominence with simplified units
- **AND** on desktop, the full complex grid layout is used

### Requirement: Mobile Layout

On mobile devices, the FeatureGrid component SHALL display only the intro section with a mobile-specific background image.

#### Scenario: Mobile Intro Only

- **GIVEN** the screen width is mobile size (typically < 768px)
- **WHEN** the FeatureGrid renders
- **THEN** only the intro section is displayed
- **AND** no feature units are shown on mobile
- **AND** the intro takes up the full available space

#### Scenario: Mobile Background Image

- **GIVEN** the component is rendered on mobile
- **WHEN** the intro background is displayed
- **THEN** it uses `public/images/backgrounds/bg-feature-grid-mb.png`
- **AND** the image has dimensions 750×510 pixels (aspect ratio ≈1.47:1)
- **AND** the image maintains proper aspect ratio for mobile display

### Requirement: Unit Navigation

Each unit SHALL be clickable and open the provided link in a new tab when clicked.

#### Scenario: Unit Click Navigation

- **GIVEN** a feature unit is rendered with a link URL
- **WHEN** the user clicks anywhere on the unit (content or image cell)
- **THEN** the link opens in a new browser tab
- **AND** the current tab remains open
- **AND** appropriate security attributes are applied for external links

#### Scenario: Unit Hover Effect

- **GIVEN** a feature unit is rendered
- **WHEN** the user hovers over the unit
- **THEN** a reasonable hover effect is applied
- **AND** the effect provides clear visual feedback that the unit is interactive
- **AND** the hover effect is smooth and not jarring
- **AND** the effect maintains readability of content

### Requirement: Button Navigation

The intro button SHALL use the GlassmorphismButton component and handle both internal and external URLs appropriately.

#### Scenario: Button with Internal Link

- **GIVEN** the intro button is rendered with an internal URL (starting with "/")
- **WHEN** the user clicks the button
- **THEN** it navigates to the internal route
- **AND** the navigation occurs in the same tab

#### Scenario: Button with External Link

- **GIVEN** the intro button is rendered with an external URL
- **WHEN** the user clicks the button
- **THEN** the URL opens in a new browser tab
- **AND** the current tab remains open
- **AND** appropriate security attributes are applied for external links

