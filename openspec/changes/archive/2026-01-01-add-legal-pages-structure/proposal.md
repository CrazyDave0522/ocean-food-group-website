# Proposal: Add legal pages structure (Privacy & Terms) with external HTML content

## Change-id
add-legal-pages-structure

## Summary
Add a minimal, maintainable structure for the site's legal pages so the page content (Privacy, Terms) is stored as independent HTML files separate from application code. This allows content updates by editing the HTML files alone, without code changes or deploys to change formatting/text.

## Why
Legal copy often changes and frequently requires precise formatting that is easier to author in HTML. Storing legal content as standalone HTML files keeps content editing separate from application code, reduces developer work for copy-only updates, and prevents accidental formatting regressions.

## What Changes
- Add an openspec delta that requires `/privacy` and `/terms` pages with content loaded from standalone HTML files located under `public/legal/` (or equivalent static content folder).
- Document the implementation approach and simple content update workflow for non-developers.

## Scope
- Small site-level change touching routing and static content placement. Implementation will include page wrappers that render sanitized HTML from the static files.

## Deliverables
- `tasks.md`, `design.md`, and a spec delta under `specs/site-legal/spec.md`.

Prepared-by: GitHub Copilot (openspec proposal)
