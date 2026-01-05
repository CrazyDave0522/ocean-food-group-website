# Proposal: Refine Form Scroll Anchor

**Status:** Proposed  
**Date:** 2026-01-05

## Problem

Currently, when users submit a form (contact or franchise), the viewport scrolls to position the `<form>` element at the top of the viewport. While this ensures the feedback message is visible, it doesn't provide optimal user experience because:

1. The form title and any introductory text above the form are scrolled out of view
2. Users lose context about which form they just submitted
3. The scroll position feels arbitrary, landing mid-content rather than at a natural section boundary

The current implementation uses `formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })` where `formRef` points to the `<form>` element itself.

## Proposed Solution

Refine the scroll anchor to target the form title position instead of the form element. After submission, the viewport should scroll to position the `FormTitle` component (which includes the heading and subtitle) at the top of the viewport.

This provides:

- Better visual context by keeping the form title visible
- More natural scroll positioning at the section heading
- Improved user understanding of where they are and what just happened

## Implementation Approach

Since `FormTitle` is rendered in the page component (`app/contact/page.tsx` and `app/franchise/page.tsx`) and the scroll behavior is managed in the form component (`ContactForm.tsx` and `FranchiseForm.tsx`), we need to:

1. Add a ref callback or container element in the page component that encompasses the form title
2. Pass this ref to the form component as a prop
3. Update the scroll behavior to use the title ref instead of the form ref

Alternative simpler approach:

- Wrap the `FormTitle` and `FormShell` in a container div in the page component
- Add an `id` attribute to the container (e.g., `id="form-section"`)
- In the form component, use `document.getElementById()` to find the container and scroll to it

The second approach is simpler and doesn't require prop drilling.

## Affected Capabilities

- **contact-form**: Scroll behavior after submission
- **franchise-form**: Scroll behavior after submission

## Breaking Changes

None. This is a UX refinement that changes scroll position but doesn't affect functionality or API.

## Dependencies

None.

## Testing Strategy

1. **Manual testing**: Submit contact form and franchise form with both success and error scenarios, verify scroll position anchors to the form title
2. **Visual verification**: Confirm the form title is visible at the top of the viewport after scroll
3. **Existing tests**: Ensure existing form tests continue to pass (tests focus on form functionality, not scroll behavior)

## Risks and Mitigations

**Risk**: If the form title is wrapped differently in some pages, the scroll target might not be found.  
**Mitigation**: Use consistent container structure in both contact and franchise pages. Add defensive code to fall back to form element if title container is not found.

## Success Criteria

- [ ] After form submission (success or error), viewport scrolls to position the form title at the top
- [ ] Scroll behavior is smooth and accessible
- [ ] Form title and subtitle remain visible after scroll
- [ ] Implementation works identically for both contact and franchise forms
- [ ] Existing form functionality and tests remain intact
