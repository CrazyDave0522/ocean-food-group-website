# Proposal: Add default site fonts (Montserrat, then Georgia)

## Change-id
add-default-fonts

## Summary
Add a small, scoped change that defines the default typography for the site: use Montserrat as the primary web font and Georgia as the serif fallback. Provide an openspec proposal, spec delta, tasks, and design notes for review before implementing the CSS and font imports.

## Goals
- Provide a clear spec for default site typography.
- Ensure a maintainable, tokenized approach (CSS/token variable) to reference fonts across the project.
- Document loading strategy and accessibility/performance considerations.

## Non-Goals
- Directly editing the runtime CSS or components in this proposal stage.

## Deliverables
- `tasks.md` — ordered work items.
- `design.md` — rationale and implementation options.
- `specs/site-typography/spec.md` — requirement deltas.

## Risks & Considerations
- Licensing: Montserrat is available via Google Fonts (SIL Open Font License); confirm license is acceptable.
- Performance: prefer `font-display: swap` and limited weights to reduce CLS and load cost.
- Fallback: ensure Georgia is specified as a serif fallback for graceful degradation.

Prepared-by: GitHub Copilot (openspec proposal)
