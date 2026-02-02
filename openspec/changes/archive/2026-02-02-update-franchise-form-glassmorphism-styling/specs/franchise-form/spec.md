## MODIFIED Requirements

### Requirement: Franchise form UI and fields
- The `/franchise` page SHALL render the franchise application form as the primary content, titled "Become Our Partner" with responsive typography (clamp function with maximum `--space-xl`) and the provided subtitle and submit button label "Start your journey?".
- The form wrapper SHALL span the full width of its containing section with transparent background for glassmorphism overlay effects.
- Form labels SHALL use font-size `--space-md` and color `rgba(255, 255, 255, 0.88)` for glassmorphism readability.
- Form input fields SHALL use glassmorphism styling: border-radius `--radius-lg`, border `1px solid rgba(255, 255, 255, 0.15)`, background `rgba(255, 255, 255, 0.08)`, and backdrop-filter `blur(10px)`.
- The submit button SHALL use pill styling: border-radius `100px`, border `1.5px solid #FFF`, and background `#FFF`.
- Form components SHALL support variant props to enable different styling modes while maintaining reusability across forms.

#### Scenario: Form renders with glassmorphism styling on background
- WHEN a user visits `/franchise`
- THEN the form title uses responsive sizing with maximum `--space-xl`
- AND the form wrapper spans full width with transparent background
- AND form labels use `--space-md` font-size and white semi-transparent color
- AND form inputs display with glassmorphism border, background, and blur effects
- AND the submit button displays with pill shape, white border, and white background

#### Scenario: Shared components maintain backward compatibility
- WHEN other forms (like contact form) use the same components without variant props
- THEN they render with standard styling unchanged
- AND the franchise form can use glassmorphism variants without affecting other forms