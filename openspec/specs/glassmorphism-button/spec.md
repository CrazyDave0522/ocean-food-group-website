# glassmorphism-button Specification

## Purpose
TBD - created by archiving change update-callout-background-alignment. Update Purpose after archive.
## Requirements
### Requirement: GlassmorphismButton Component Rendering

The GlassmorphismButton component SHALL render a button element that accepts two props: `label` (string) for the button text and `url` (optional string) for navigation, supporting both internal and external links.

#### Scenario: Button with text content

- **WHEN** a GlassmorphismButton is rendered with a `label` prop
- **THEN** it displays the label text in a styled button

#### Scenario: Button with internal link

- **WHEN** a GlassmorphismButton is rendered with an internal URL (starting with "/")
- **THEN** it navigates to the internal route when clicked

#### Scenario: Button with external link

- **WHEN** a GlassmorphismButton is rendered with an external URL
- **THEN** it opens the external URL in a new tab with security attributes

### Requirement: GlassmorphismButton Component Styling

The GlassmorphismButton component SHALL be styled with glassmorphism effect including border-radius 20px, border 1px solid rgba(255, 255, 255, 0.50), background rgba(255, 255, 255, 0.50), box-shadow 0 2px 0 0 rgba(4, 20, 51, 0.30), backdrop-filter blur(2px), display inline-flex, padding var(--space-sm) var(--space-md), flex-direction column, align-items flex-start, font-size var(--fs-body), font-weight 400, color white.

#### Scenario: Glassmorphism styling application

- **WHEN** the GlassmorphismButton is rendered
- **THEN** it uses the specified glassmorphism styling: border-radius 20px, border 1px solid rgba(255, 255, 255, 0.50), background rgba(255, 255, 255, 0.50), box-shadow 0 2px 0 0 rgba(4, 20, 51, 0.30), backdrop-filter blur(2px), display inline-flex, padding var(--space-sm) var(--space-md), flex-direction column, align-items flex-start, font-size var(--fs-body), font-weight 400, and color white

### Requirement: GlassmorphismButton Accessibility

The GlassmorphismButton component SHALL be accessible with proper ARIA attributes and keyboard navigation support.

#### Scenario: Keyboard navigation

- **WHEN** the GlassmorphismButton receives focus
- **THEN** it can be activated using Enter or Space keys

#### Scenario: Screen reader support

- **WHEN** a GlassmorphismButton is rendered
- **THEN** screen readers can announce it as a button or link appropriately</content>
<parameter name="filePath">/Users/zixiao_ma/Desktop/Work/OceanFoodGroup/ocean-food-group-website/openspec/changes/update-callout-background-alignment/specs/glassmorphism-button/spec.md

