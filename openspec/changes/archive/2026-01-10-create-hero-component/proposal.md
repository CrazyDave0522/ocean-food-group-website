# Proposal: create-hero-component

## Why

- Home and future pages need a reusable hero to present title/subtitle with a styled or image background without duplicating layouts.
- Centralizing hero layout ensures consistent typography, spacing, and accessibility across sections.

## What Changes

- Add a reusable `Hero` component that accepts title, subtitle, and either a background image or styled background.
- Provide props for alignment and optional overlay when using an image background.
- Ensure responsive typography and spacing using existing design tokens.
- Add tests and documentation to support reuse across pages.
