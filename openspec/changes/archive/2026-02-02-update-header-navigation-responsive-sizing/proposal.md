# Update Header Navigation Responsive Sizing

## Summary

Refine the existing responsive header and navigation styling to address touch target accessibility, optimize mobile spacing, and enhance visual hierarchy. This change builds on the current responsive implementation while fixing specific UX issues with hamburger icon sizing, mobile navigation spacing, and active state emphasis.

## Motivation

The current header implementation has a good foundation with responsive CSS using clamp() functions, but several issues impact user experience:

- Hamburger icon touch targets may not meet 44px minimum accessibility requirements on smaller screens
- Mobile navigation button spacing could be optimized for better vertical rhythm
- Logo scaling range needs refinement to balance brand visibility with mobile constraints
- Mobile navigation font scaling is too aggressive, creating inconsistent visual hierarchy
- Desktop active navigation lacks sufficient visual emphasis through font weight
- Mobile header padding remains fixed at 16px instead of scaling responsively

These targeted refinements will improve accessibility, visual consistency, and overall responsive design quality without disrupting the existing solid foundation.

## Impact

- **Mobile users**: Better touch targets, improved spacing, and more consistent typography scaling
- **Desktop users**: Clearer active navigation state with enhanced font weight emphasis
- **Accessibility**: WCAG AA compliant touch targets and improved contrast ratios
- **Design consistency**: Refined responsive scaling that maintains visual hierarchy
- **Performance**: Minimal impact, building on existing CSS custom property system

## Scope

This change modifies the existing `site-layout` specification to update responsive sizing calculations and add font weight styling. No new components or architectural changes are required.

## Dependencies

None - this builds on existing header/navigation implementation.

## Timeline

Estimated: 1-2 days for implementation and testing across all breakpoints.
