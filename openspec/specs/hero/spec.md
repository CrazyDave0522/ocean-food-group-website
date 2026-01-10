# hero Specification

## Purpose
TBD - created by archiving change create-hero-component. Update Purpose after archive.
## Requirements
### Requirement: Hero component supports two text layout variants with independent background options
- The hero component MUST support two distinct text layouts (center and left) that can each be paired with either an image background or a styled background.

#### Scenario: Center variant with styled background
- Given a hero is rendered with center variant and styled background (solid or gradient)
- Then the title is displayed and center-aligned
- And if a subtitle is provided it is also displayed and center-aligned
- And no content image is displayed
- And the background uses the selected styled variant
- And the layout is responsive with proportional height scaling

#### Scenario: Center variant with image background
- Given a hero is rendered with center variant and an image background URL
- Then the title is displayed and center-aligned
- And if a subtitle is provided it is also displayed and center-aligned
- And no content image is displayed
- And the background image appears behind the text with cover/center behavior
- And an optional overlay appears to ensure text readability

#### Scenario: Left variant with styled background and without content image
- Given a hero is rendered with left variant, styled background, and no content image
- Then the title is left-aligned on desktop
- And if a subtitle is provided it is also left-aligned on desktop
- And the background uses the selected styled variant
- And the layout is responsive with proportional height scaling

#### Scenario: Left variant with styled background and content image
- Given a hero is rendered with left variant, styled background, and a content image URL
- Then the title is left-aligned on desktop
- And if a subtitle is provided it is also left-aligned on desktop
- And the content image appears on the right side on desktop with fixed width
- And the background uses the selected styled variant
- And on mobile the layout stacks vertically (content image above text)

#### Scenario: Left variant with image background and without content image
- Given a hero is rendered with left variant, an image background URL, and no content image
- Then the title is left-aligned on desktop
- And if a subtitle is provided it is also left-aligned on desktop
- And the background image appears behind the entire section with cover/center behavior
- And an optional overlay ensures text readability on desktop
- And on mobile the layout maintains left alignment

#### Scenario: Left variant with image background and content image
- Given a hero is rendered with left variant, an image background URL, and a content image URL
- Then the title is left-aligned on desktop
- And if a subtitle is provided it is also left-aligned on desktop
- And the content image appears on the right side on desktop
- And the background image appears behind the entire section with cover/center behavior
- And an optional overlay ensures text readability on desktop
- And on mobile the layout stacks vertically (content image above text)

### Requirement: Hero maintains 1920x540 height ratio
- The hero MUST preserve a height consistent with a 1920px-wide baseline of 540px (approx. 0.28125 ratio) and scale proportionally on other viewports.

#### Scenario: Maintains baseline height ratio
- Given the viewport width is 1920px
- Then the hero height is approximately 540px
- And at other viewport widths the hero height scales proportionally to preserve the same aspect ratio

### Requirement: Hero image variant content image maintains sizing ratio
- The hero image variant MUST display a content image with a baseline size of 414px width × 332px height at 1920px width, scaling proportionally on other viewports.

#### Scenario: Content image at 1920px baseline
- Given a hero image variant is rendered at 1920px width
- Then the content image displays at approximately 414px width and 332px height
- And the image uses object-cover to maintain aspect ratio

#### Scenario: Content image scales proportionally
- Given a hero image variant is rendered at different viewport widths
- Then the content image width and height scale proportionally from the 414×332 baseline
- And the aspect ratio (414:332 ≈ 1.25:1) is preserved

### Requirement: Hero uses responsive typography and spacing
- The hero MUST use design tokens for typography (h1, body sizes) and spacing to ensure readability and consistency.

#### Scenario: Responsive typography on different viewports
- Given the hero is rendered on mobile and desktop
- Then the title uses --fs-h1 token (32px–48px responsive) and scales responsively
- And the subtitle uses --fs-h4 token (18px–24px responsive) and remains readable on all viewports

