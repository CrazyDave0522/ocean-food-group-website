# Change: Refactor form heading into standalone component

## Why
The current `FormShell` component tightly couples the heading/subtitle presentation with the form container styling. Pages using forms cannot place headings outside the form card or reuse heading styles in non-form contexts. Extracting headings into a separate component enables:
- Flexible placement of headings independent of form card boundaries
- Reuse of consistent heading styles across forms and other page sections
- Better separation of concerns between content structure and form container styling

## What Changes
- Create new `FormTitle` component in `components/forms/FormTitle.tsx` that renders form title and optional subtitle/description
- Refactor `FormShell` to remove title/description props and focus solely on form container styling
- Update `/contact` page to use `FormTitle` above `FormShell`
- Ensure heading styles remain consistent with current design (title + description layout)

## Impact
- Affected specs: site-layout (modified requirement for reusable form title component)
- Affected code:
  - `components/forms/FormTitle.tsx` (new) — standalone form title component
  - `components/forms/FormShell.tsx` — remove title/description, keep container only
  - `app/contact/page.tsx` — compose `FormTitle` + `FormShell` separately
