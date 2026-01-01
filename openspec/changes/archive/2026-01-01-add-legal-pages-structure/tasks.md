- Create spec delta requiring `/privacy` and `/terms` pages that render content from `public/legal/privacy.html` and `public/legal/terms.html`.
- Validate the proposal with `openspec validate add-legal-pages-structure --strict`.
- Implement page wrappers in `app/privacy/page.tsx` and `app/terms/page.tsx` that load and render HTML from the public folder using safe rendering (sanitization or server-side rendering of trusted HTML).
- Add the two placeholder content files: `public/legal/privacy.html` and `public/legal/terms.html` (initially empty or with placeholder text) so content editors can replace them.
- Document the content update workflow in `docs/legal-content.md` (edit HTML files only, no code changes required).
- Add a visual/manual verification step: confirm both pages render correctly and HTML formatting is preserved.

Validation:
- Each task should include verification: spec validates, pages exist, and manual visual check.
