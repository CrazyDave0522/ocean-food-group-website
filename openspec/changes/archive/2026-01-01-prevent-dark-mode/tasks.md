- Add spec delta requiring site to always render in light mode
- Validate the proposal with `openspec validate prevent-dark-mode --strict`
- Implement minimal CSS changes: remove or override `prefers-color-scheme: dark` blocks and set theme tokens to light values
- Add visual regression test or manual verification steps to confirm site remains light under dark OS theme
- Update documentation/tokens README to state site is light-only

Validation:
- Each task should include verification: specs validate, CSS changes present in `app/globals.css`, and manual visual check.
