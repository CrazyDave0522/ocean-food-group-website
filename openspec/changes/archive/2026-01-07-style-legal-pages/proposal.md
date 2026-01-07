# Proposal: Style Legal Pages

## Why

The Privacy Policy and Terms & Conditions pages render markdown content without proper visual styling. Currently, pages use Tailwind's `.prose` utility class which provides minimal default styling. The legal content is dense with multi-level headings, lists, links, and long paragraphs that lack visual hierarchy, readability aids, and brand consistency.

Users encounter:
- Uniform font sizes across heading levels (h1, h2, h3, h4)
- Insufficient visual contrast and spacing between sections
- No visual distinction for important disclaimers or warnings
- Link styling inconsistent with the rest of the site
- Poor mobile readability

## What Changes

Implement comprehensive styling for `/privacy` and `/terms` pages to:

1. **Define typography** — Map heading levels to font-size tokens (--fs-h1, --fs-h2, --fs-h3, --fs-h4); set appropriate line-height for legal text
2. **Establish visual hierarchy** — Increase spacing between sections (via responsive margins on `h2`, `h3`); use color and weight to differentiate heading levels
3. **Improve list readability** — Style ordered and unordered lists with proper indentation, bullet/numbering clarity, and spacing between items
4. **Style inline elements** — Links use brand color with hover state; `strong`, `em` have distinct appearance
5. **Mobile optimization** — Ensure font sizes scale responsively; adjust padding and margins for small screens

## Scope

- Pages: `/privacy`, `/terms`
- Styling method: CSS in `styles/components/legal-content.css` (imported in `app/globals.css`) with new `.prose-legal` class
- Page components updated to use `<div className="prose-legal">` wrapper
- No changes to markdown content files
- No new dependencies

## Acceptance Criteria

- [ ] All heading levels (h1–h4) render with distinct sizes and spacing per font-size tokens
- [ ] Links are styled with brand color (#111827) and have hover opacity change
- [ ] Ordered/unordered lists have proper indentation and spacing
- [ ] Paragraphs have appropriate line-height (≈1.6–1.8) and letter-spacing
- [ ] Mobile font sizes scale via Tailwind responsive prefixes or clamp() where used in CSS
- [ ] All content renders within container max-width and has proper padding on all screen sizes
- [ ] No console errors or accessibility warnings (checked with axe)

## Implementation Notes

- Leverage existing design tokens: `--fs-h1`, `--fs-h2`, `--fs-h3`, `--fs-h4`, `--space-*`, `--color-*`
- Use Tailwind classes where possible (margins, padding, flex utilities); fall back to custom CSS for typography fine-tuning
- Consider using Tailwind's `prose` plugin extension (if available) or a custom CSS class (`prose-legal`) for scoped styling
- Mreate new `.prose-legal` CSS class to avoid affecting other markdown content on the site
- Mobile-first approach: base styles for mobile, use `@media (min-width: 768px)` for desktop refinements
- Defer optional disclaimer box styling to a future iteration for clearer scope