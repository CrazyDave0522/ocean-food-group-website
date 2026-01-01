## ADDED Requirements

### Requirement: Default font-family

The site MUST use Montserrat as the default web font and Georgia as the fallback serif font when Montserrat is unavailable.

#### Scenario: Page uses the default font-family

Given the site is loaded
When a page is rendered
Then the computed `font-family` on the document root should include Montserrat first and Georgia as the fallback (e.g., `"Montserrat", Georgia, serif`).

### Requirement: Tokenized font reference

The font-family MUST be exposed as a reusable token (CSS custom property or tokens entry) so components and styles reference a single source of truth.

#### Scenario: Components use token

Given a component that displays body text
When the component CSS is applied
Then it should use the font-family token (e.g., `font-family: var(--font-family-base);`) rather than hardcoding font names.

### Requirement: Font loading strategy

The chosen loading strategy MUST avoid FOIT (flash of invisible text) and prefer `font-display: swap` when using an external provider.

#### Scenario: Fonts loaded with swap

Given Montserrat is loaded via an external provider
When the font resources are requested
Then the font-face or link usage must include `font-display: swap` or equivalent behavior to prevent invisible text.
