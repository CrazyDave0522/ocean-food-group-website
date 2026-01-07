# site-theme Specification

## Purpose
Ensures the Ocean Food Group website always renders in light mode regardless of user operating system preferences. Prevents dark mode activation by forcing light theme color tokens and disabling color-scheme auto-switching. This maintains brand consistency and visual identity.
## Requirements
### Requirement: Site renders in light mode regardless of user preference

The site MUST render using the light theme and color tokens regardless of the user's `prefers-color-scheme` OS setting.

#### Scenario: User has dark system preference

Given a user with OS-level dark theme preference
When the site is loaded
Then the computed color tokens and styles must match the light theme (same values as when the OS preference is light).

### Requirement: No dark media query effect

Any existing `@media (prefers-color-scheme: dark)` blocks that would change theme colors MUST be removed or overridden so they no longer affect the final rendered colors.

#### Scenario: Media queries present

Given CSS contains a `@media (prefers-color-scheme: dark)` rule
When the site is built and served
Then the dark-mode rules must not change the applied colors (they are effectively disabled or overridden).

