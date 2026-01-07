# Tasks: Style Legal Pages

## Implementation Checklist

- [ ] **Create legal content CSS file** (`styles/components/legal-content.css`)
  - Define `.prose-legal` class as wrapper for styled content
  - Implement h2, h3, h4 heading styles using font-size tokens
  - Implement paragraph, list, link, and inline element styles
  - Test responsive behavior at mobile, tablet, desktop breakpoints

- [ ] **Update page components** (`app/privacy/page.tsx`, `app/terms/page.tsx`)
  - Wrap rendered content in `<div className="prose-legal max-w-prose">`
  - Ensure proper container margin centering

- [ ] **Import CSS in globals** (`app/globals.css`)
  - Add `@import './components/legal-content.css';` to ensure styles are loaded

- [ ] **Test rendering**
  - [ ] Headings (h1–h4) render with correct sizes and spacing
  - [ ] Links render with brand color and hover feedback
  - [ ] Lists (ordered/unordered) render with proper indentation
  - [ ] Mobile: font sizes scale, padding is sufficient
  - [ ] Desktop: line lengths are comfortable, no overflow

- [ ] **Accessibility validation**
  - [ ] Run axe scan — no color contrast or link issues
  - [ ] Keyboard navigation: all links focusable, focus visible
  - [ ] Screen reader test: headings announced properly, list structure intact

- [ ] **Code quality**
  - [ ] Run `pnpm check` — no TypeScript or ESLint errors
  - [ ] Run `pnpm test:run` — no regressions in existing tests

- [ ] **Review and finalize**
  - [ ] Compare rendered pages against design spec
  - [ ] Verify cross-browser consistency (Chrome, Safari, Firefox)

---

## Notes

- Styling is CSS-only; no component or markdown content changes.
- Reuse existing design tokens (`--fs-*`, `--color-*`, `--space-*`) from `styles/tokens.css`.
- Mobile-first approach: base styles work on small screens, media queries refine for larger screens.
- Optional enhancement (future): Add disclaimer box styling for important warnings.
