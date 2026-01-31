# callout-component Specification Delta

## MODIFIED Requirements

### Requirement: Callout Component Rendering

The Callout component SHALL render a container with one line of text, a GlassmorphismButton component, and a background that defaults to bg-callout.png on desktop and bg-callout-mb.png on mobile, with an optional user-provided image URL that falls back to the default if it fails to load.

#### Scenario: Callout with default background on desktop

- **WHEN** a Callout component is rendered with text, button text, button URL, and no image URL on desktop screens
- **THEN** it displays the text and GlassmorphismButton with the bg-callout.png background image

#### Scenario: Callout with default background on mobile

- **WHEN** a Callout component is rendered with text, button text, button URL, and no image URL on mobile screens
- **THEN** it displays the text and GlassmorphismButton with the bg-callout-mb.png background image

#### Scenario: Callout with user-provided image background

- **WHEN** a Callout component is rendered with text, button text, button URL, and an image URL
- **THEN** it displays the text and GlassmorphismButton overlaid on the provided image background, with alt text if provided

#### Scenario: Image background fallback

- **WHEN** the provided image URL fails to load
- **THEN** it falls back to the default background image (bg-callout.png on desktop, bg-callout-mb.png on mobile)

### Requirement: Callout Component Layout

The Callout component SHALL be full width within its container, have an aspect ratio of 1920:220 (approximately 8.727:1) on desktop screens and 750:220 (approximately 3.409:1) on mobile screens to match the background image aspect ratios and prevent cropping, have responsive padding around the content (larger on desktop, smaller on mobile), have a vertical gap of var(--space-lg) between the text and the GlassmorphismButton, and position the text and GlassmorphismButton at 80% from the left edge.

#### Scenario: Full width rendering

- **WHEN** the Callout component is rendered
- **THEN** it spans the full width of its parent container

#### Scenario: Component aspect ratio on desktop

- **WHEN** the Callout component is rendered on desktop screens (width >= 768px)
- **THEN** it maintains an aspect ratio of 1920:220 to match the desktop background image and prevent cropping

#### Scenario: Component aspect ratio on mobile

- **WHEN** the Callout component is rendered on mobile screens (width < 768px)
- **THEN** it maintains an aspect ratio of 750:220 to match the mobile background image and prevent cropping

#### Scenario: Content padding on desktop

- **WHEN** the Callout component is rendered on desktop screens (width >= 768px)
- **THEN** the content has padding of var(--space-xl) top/bottom and var(--space-lg) left/right

#### Scenario: Content padding on mobile

- **WHEN** the Callout component is rendered on mobile screens (width < 768px)
- **THEN** the content has padding of var(--space-md) top/bottom and var(--space-sm) left/right

#### Scenario: Vertical gap between text and button

- **WHEN** the Callout component is rendered with text and GlassmorphismButton
- **THEN** there is a vertical gap of var(--space-lg) between the text and the GlassmorphismButton

#### Scenario: Left-aligned text and button at 80% position

- **WHEN** the Callout component is rendered
- **THEN** the text and GlassmorphismButton are positioned at 80% from the left edge of the component, with text aligned to the left

### Requirement: Callout Text Styling

The text in the Callout component SHALL be styled with white color, font-size using --fs-h3, normal font-style, 600 font-weight, and normal line-height.

#### Scenario: Text styling application

- **WHEN** the Callout text is rendered
- **THEN** it uses the specified styling: color white, font-size var(--fs-h3), font-style normal, font-weight 600, line-height normal
