## ADDED Requirements

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
