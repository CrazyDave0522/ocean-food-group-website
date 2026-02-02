## Context

The job postings list currently displays job cards with basic styling that lacks visual hierarchy and modern design elements. The existing implementation uses simple white backgrounds and basic typography that doesn't align with the Ocean Food Group's brand guidelines. This change aims to enhance the visual appeal and user experience of the job postings section by implementing:

- Enhanced typography with brand-consistent colors and font sizes
- Alternating background colors for better visual separation
- Tag-style elements for location and employment type information
- Updated icons and improved overall styling
- A prominent "Open Positions" title above the list

The change affects the `JobPostingCard` and `JobPostingsList` components, requiring updates to styling, component props, and potentially the data flow between components.

## Goals / Non-Goals

**Goals:**
- Improve visual hierarchy and readability of job postings
- Implement brand-consistent colors and typography
- Add alternating background colors for better card separation
- Convert location and employment type to modern tag-style elements
- Replace generic icons with brand-appropriate alternatives
- Add a styled "Open Positions" title above the job list
- Maintain responsive design and accessibility standards

**Non-Goals:**
- Changing the underlying data structure or API responses
- Modifying job posting content or functionality
- Implementing new filtering or sorting features
- Changing the overall layout structure of the careers page

## Decisions

### CSS Organization
**Decision:** Create a dedicated `styles/components/job-postings.css` file for all job posting styling rules.

**Rationale:** The extensive styling changes warrant a dedicated CSS file following the project's component-based CSS organization. This keeps styles organized, maintainable, and allows for easy theming or future modifications.

**Alternatives Considered:**
- Inline styles in components: Rejected due to maintainability concerns and separation of concerns
- Adding to existing global CSS files: Rejected to avoid bloating global stylesheets

### Typography System
**Decision:** Use CSS custom properties from the design tokens system (`--fs-body-lg`, `--fs-h4`, etc.) for consistent font sizing across the application.

**Rationale:** The existing tokens.css file already defines a comprehensive typography scale that ensures consistency across all components. Using these variables instead of hardcoded pixel values makes the design more maintainable and responsive.

**Alternatives Considered:**
- Hardcoded pixel values: Rejected due to lack of responsiveness and consistency
- Tailwind classes: Not used since the project uses custom CSS properties

### Component Architecture
**Decision:** Pass an `index` prop to `JobPostingCard` components to enable alternating background colors, rather than calculating index within the card component.

**Rationale:** This keeps the alternating logic in the parent `JobPostingsList` component where the list structure is managed, making the card component more reusable and the logic more explicit.

**Alternatives Considered:**
- Using CSS `:nth-child` selectors: Rejected because it would require additional wrapper elements and make the logic less explicit
- Calculating index within the card: Rejected as it would make the component less pure and harder to test

### Tag Implementation
**Decision:** Create custom tag components for location and employment type using Tailwind classes with the specified border radius, colors, and typography.

**Rationale:** Tags provide better visual hierarchy and modern UI patterns. The specified colors and styling align with the brand guidelines and create clear visual distinction between different types of information.

**Alternatives Considered:**
- Using existing UI library components: Not applicable as the project uses custom components
- Plain text with icons: Rejected as it doesn't provide the visual separation needed

### Icon Replacement
**Decision:** Replace the ArrowRight icon with paper-plane.svg for the "Apply Now" action.

**Rationale:** The paper plane icon is more semantically appropriate for "applying" to a job and adds a friendly, action-oriented visual element that aligns with the brand's approachable tone.

**Alternatives Considered:**
- Keeping the ArrowRight icon: Rejected as it's less semantically meaningful
- Using a different icon: The paper plane was specifically chosen for its relevance

## Risks / Trade-offs

**Performance Impact:** Adding alternating backgrounds and additional styling may have minimal impact on rendering performance, but this is negligible given the small number of job cards typically displayed.

**Maintenance Complexity:** Using custom CSS properties and specific color values increases the coupling to the design system, but this is actually beneficial for brand consistency.

**Accessibility:** The new color combinations and font sizes need to maintain proper contrast ratios. The design uses established brand colors that have been validated for accessibility.

**Browser Compatibility:** The use of CSS custom properties and modern CSS features is well-supported in current browsers, but may require fallbacks for very old browser versions (not a concern for this project).

## Migration Plan

1. Update `JobPostingCard` component with new typography and styling
2. Modify `JobPostingsList` to pass index props and add title
3. Update component tests to reflect new styling
4. Test responsive behavior and accessibility
5. Deploy and validate in production environment

**Rollback Strategy:** If issues arise, the changes can be reverted by restoring the previous component versions from git, as the changes are isolated to specific components without database or API modifications.</content>
<parameter name="filePath">/Users/zixiao_ma/Desktop/Work/OceanFoodGroup/ocean-food-group-website/openspec/changes/update-job-postings-styling/design.md