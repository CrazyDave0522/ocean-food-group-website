# Proposal: Always render site in light mode

## Change-id
prevent-dark-mode

## Why
Users and stakeholders have requested the site always render in light mode for brand consistency. The application currently includes a `prefers-color-scheme: dark` rule that flips colors for users with dark system preferences. This change documents the requirement and provides a small, scoped plan to make the site always use light-mode tokens and CSS.

## What Changes
- Add an openspec delta that requires the site to render in light mode regardless of `prefers-color-scheme` settings.
- Document implementation approaches and tests.

## Scope
- This is a small site-level UI change confined to CSS and tokens (no behavioral or server changes).

## Deliverables
- `tasks.md`, `design.md`, and a spec delta under `specs/site-theme/spec.md`.

Prepared-by: GitHub Copilot (openspec proposal)
