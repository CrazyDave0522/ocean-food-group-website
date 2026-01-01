- Draft proposal and spec delta for font defaults
- Validate the proposal with `openspec validate add-default-fonts --strict`
- Implement CSS tokens and import strategy (Montserrat via Google Fonts, `font-display: swap`)
- Add font-family tokens to styles/tokens and reference in global stylesheet
- Test render fallback to Georgia, verify accessibility and performance (Lighthouse)
- Update README or style tokens documentation

Validation:
- Each task should include a verification step: file present, spec passes `openspec validate`, stylesheet uses tokens, and visual check on at least one page.
