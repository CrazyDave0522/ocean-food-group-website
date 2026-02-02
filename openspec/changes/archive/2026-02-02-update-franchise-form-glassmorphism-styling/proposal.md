# Update Franchise Form Glassmorphism Styling

## Summary
Enhance the franchise inquiry form with glassmorphism visual effects and responsive typography to improve visual hierarchy and user experience on background imagery, while maintaining shared component reusability.

## Problem
The current franchise form uses standard white background styling that doesn't complement the background imagery. The form title is fixed-size and labels/inputs lack the glassmorphism effect needed for overlay readability. Additionally, shared form components are used across multiple forms (franchise and contact) requiring a solution that allows different styling variants.

## Solution
Implement variant props on shared form components to enable glassmorphism styling for the franchise form while maintaining backward compatibility for other forms. Apply glassmorphism styling with transparent backgrounds, backdrop blur, and white text overlays. Make the form title responsive and adjust form wrapper to full width for better layout on background images.

## Impact
- Improved visual integration with background imagery
- Better responsive typography for form titles
- Enhanced accessibility with proper contrast on glassmorphism elements
- Consistent glassmorphism design language across the site
- Maintains component reusability with variant-based styling

## Files Changed
- `components/forms/FormShell.tsx` - Update to full width with transparent background
- `components/forms/SubmitButton.tsx` - Update to consistent pill shape with context-aware colors
- `components/franchise/FranchiseForm.tsx` - Update label and input styling for glassmorphism
- `styles/components/franchise-form.css` - Add glassmorphism styles for form elements

## Testing
- Visual regression tests for both standard and glassmorphism variants
- Accessibility tests for contrast ratios on transparent backgrounds
- Responsive design tests for form title scaling
- Form functionality tests remain unchanged
- Cross-form compatibility testing