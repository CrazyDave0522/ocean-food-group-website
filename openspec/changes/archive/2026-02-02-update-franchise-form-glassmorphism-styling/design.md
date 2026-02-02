# Franchise Form Glassmorphism Styling - Design Considerations

## Architectural Challenge: Shared Form Components

The Ocean Food Group website uses shared form components (`components/forms/`) across multiple forms (franchise and contact). The current proposal requires different styling for the franchise form (glassmorphism) versus the contact form (standard styling).

## Solution: Consistent Pill Button

After analyzing the current usage patterns, we'll implement a **consistent pill-shaped submit button** across all forms while allowing color variations for different contexts:

- SubmitButton always uses pill styling (border-radius: 100px)
- Colors vary by context: white background/text for glassmorphism, primary background/text for standard forms
- FormShell always uses full width with transparent background
- Form titles and input labels remain consistent across forms (styling handled within form components)

**Key constraints:**
- **Form wrapper width**: Always extends to full outer section width
- **Form wrapper background**: Always transparent for overlay compatibility
- **Submit button shape**: Always pill-shaped (border-radius: 100px) across all forms
- **Submit button colors**: Vary by context (white for glassmorphism, primary for standard)
- **Form title font size**: `--space-xl` (32px) across all forms
- **Form subtitle font size**: `--space-md` (16px) across all forms
- **Input label consistency**: Same font sizing across all forms, color varies by context
- **Input placeholder colors**: `rgba(255, 255, 255, 0.88)` for franchise form, `rgba(51, 51, 51, 0.88)` for contact form

**Context-varying elements:**
- **Submit button colors**: White background/text for glassmorphism contexts, primary colors for standard contexts
- **Input label colors**: `rgba(255, 255, 255, 0.88)` for franchise form, standard colors elsewhere
- **Input placeholder colors**: `rgba(255, 255, 255, 0.88)` for franchise form, `rgba(51, 51, 51, 0.88)` for contact form
- **Input field styling**: Glassmorphism effects only in franchise form

## Design Constraints

**Key constraints:**
- **Form wrapper width**: Always extends to full outer section width
- **Form wrapper background**: Always transparent for overlay compatibility
- **Submit button shape**: Always pill-shaped (border-radius: 100px) across all forms
- **Submit button colors**: Vary by context (white for glassmorphism, primary for standard)
- **Form title font size**: `--space-xl` (32px) across all forms
- **Form subtitle font size**: `--space-md` (16px) across all forms
- **Input label consistency**: Same font sizing across all forms, color varies by context
- **Input placeholder colors**: `rgba(255, 255, 255, 0.88)` for franchise form, `rgba(51, 51, 51, 0.88)` for contact form

## Implementation Strategy

1. **FormShell Component**
   - Update to always use full width and transparent background
   - No variant prop needed (consistent across all forms)

2. **FormTitle Component**
   - Update title font size to `--space-xl` (32px)
   - Update subtitle font size to `--space-md` (16px)
   - Maintain existing color props for context variations

3. **SubmitButton Component**
   - Update to always use pill shape (border-radius: 100px)
   - Implement context-aware color styling: white background/text for glassmorphism contexts, primary colors for standard contexts
   - Colors determined by form context, not variant props

4. **FranchiseForm Integration**
   - Apply glassmorphism label styling directly: font-size `--space-md`, color `rgba(255, 255, 255, 0.88)`
   - Update input styling: glassmorphism border, background, backdrop-filter
   - Update input placeholder colors: `rgba(255, 255, 255, 0.88)`
   - SubmitButton automatically uses white styling in glassmorphism context
   - FormTitle uses existing `titleColor` prop for color changes

## Migration Path

- Franchise form: Update to use `variant="glassmorphism"` props
- Contact form: No changes needed (backward compatible)
- Future forms: Can choose appropriate variant or extend variants

## Testing Strategy

- Test both variants in isolation
- Ensure contact form remains unchanged
- Validate glassmorphism effects work correctly
- Accessibility testing for both variants
