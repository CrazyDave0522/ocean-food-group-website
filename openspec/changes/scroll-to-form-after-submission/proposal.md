# Change: Scroll viewport to form after submission

## Why
After users submit a form (contact or franchise inquiry), they cannot see the success/error message at the top of the form because the viewport remains at its pre-submission position. This creates confusion about whether submission succeeded or what action is needed next. Users must manually scroll up to see the feedback message, reducing usability and clarity.

## What Changes
- Modify `ContactForm.tsx` to scroll the form into view when submission completes (success or error state is set).
- Modify `FranchiseForm.tsx` to scroll the form into view when submission completes (success or error state is set).
- Use the form ref (already present in both components) to trigger a smooth scroll-into-view behavior when `state.status` changes to `"success"` or `"error"`.
- Ensure scroll behavior is smooth and accessible (respects user's prefers-reduced-motion setting if applicable).

## Impact
- Affected specs: contact-form, franchise-form (updated behavior)
- Affected code:
  - `components/contact/ContactForm.tsx` — add scroll-to-form effect
  - `components/franchise/FranchiseForm.tsx` — add scroll-to-form effect
  - No changes to `lib/contact/form.ts`, `lib/franchise/form.ts`, or server actions required

## Notes
- Both form components already use `useRef` and have a `formRef` instance, making this a low-risk change.
- The existing `useEffect` hook in both components already listens to `state.status`, so we can extend it or add a new one.
- No new dependencies required; uses native `scrollIntoView()` API available in all modern browsers.
- Scope: limited to UI behavior in form components, no data flow or business logic changes.
