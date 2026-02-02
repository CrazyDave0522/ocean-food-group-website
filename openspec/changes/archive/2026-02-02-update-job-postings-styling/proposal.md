# Update Job Postings Styling

## Summary

Update the job postings list styling to improve visual design and user experience with enhanced typography, alternating background colors, tag-style elements for location and employment type, updated icons, and styled card wrappers.

## Why

The current job postings list has basic styling that doesn't provide optimal visual hierarchy or engagement. The updates will:

- Improve readability with better typography colors and sizes
- Add visual interest with alternating background colors
- Create better information architecture with tag-style elements for location and employment type
- Enhance the call-to-action with a more appropriate icon
- Provide better visual separation and organization of job metadata
- Add polished card wrapper styling with fill and stroke effects

## Motivation

Modern job board interfaces use visual design patterns that improve scannability and user engagement. The proposed changes align with current UI/UX best practices:

- Color-coded typography for better information hierarchy
- Alternating row colors for easier scanning of long lists
- Tag-style elements for categorical information (location, employment type)
- Consistent spacing and visual rhythm
- Appropriate iconography for actions

## Impact

- **Enhanced Visual Design**: More polished and professional appearance
- **Improved Readability**: Better typography hierarchy and color contrast
- **Better Information Architecture**: Clear separation of job metadata into scannable tags
- **Increased User Engagement**: More visually appealing interface encourages exploration
- **Consistent Design Language**: Aligns with modern job board design patterns

## Implementation Notes

- Update JobPostingCard component with new styling
- Add alternating background logic based on item index
- Implement tag-style components for location and employment type
- Replace arrow icon with paper-plane.svg
- Ensure responsive design maintains visual hierarchy
- Test color contrast and accessibility

## Dependencies

- Existing JobPostingCard and JobPostingsList components
- CSS custom properties for consistent spacing and typography
- paper-plane.svg icon in public/images/icons/
- Tailwind CSS utilities for styling