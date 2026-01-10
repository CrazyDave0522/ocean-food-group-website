# Design: Header Styling and Mobile Navigation

## Architecture Overview

The header improvements span two layers:
1. **Desktop styling**: padding, font, active state via CSS/Tailwind.
2. **Mobile navigation**: client-side state (overlay open/close) and overlay UI.

## Desktop Header

- **Container padding**: Use `px-[var(--space-3xl)]` (64px) to replace `px-4`.
- **Logo**: Unchanged.
- **Nav buttons**: 
  - Apply `text-fs-body-lg` (Tailwind utility mapped to `--fs-body-lg`).
  - Add `font-medium` (500 weight).
  - Gap between buttons: `gap-[var(--space-4xl)]` (80px token).
  - Use `text-gray-800` for default, `text-primary` + `border-b-4 border-primary` with `border-bottom-*-radius: var(--radius-md)` for active (border indicator has rounded corners).
  - Active state triggered by `usePathname()` comparison (client component).

## Mobile Header (≤768px)

- **Layout**: flex, logo left, hamburger icon right.
- **Logo sizing**: Responsive `width: clamp(96px, 28vw, 140px)` with `height: auto` (via `.header-logo` class).
- **Hamburger icon**: Responsive `width/height: clamp(var(--space-xl), 10vw, 50px)` (via `.hamburger-icon` class).
- **Overlay menu**: 
  - Hidden by default, shown when `isMenuOpen === true`.
  - Full-screen with backdrop: `rgba(0, 0, 0, 0.90)` (90% opaque black).
  - Z-index: `z-40` (sits below sticky header which is `z-50`).
  - Scrollable: `overflow-y: auto` with `overscroll-behavior: contain` to prevent scroll chaining.
  - Body scroll locked: apply `position: fixed` on body via `useEffect` with scroll position preservation.
  - Container top padding: `padding-top: var(--space-8xl)` to clear the sticky header
  - Nav buttons stacked vertically with:
    - Gap: responsive clamp `gap: clamp(var(--space-3xl), 12vw, var(--space-5xl))` (64px–96px; 96px at ~750px)
    - Typography: `--fs-h1` font size, 600 weight, normal style/line-height
    - Same active styling as desktop (4px bottom border indicator with `--radius-md` rounded corners, primary color)
  - Close on link click or explicit close button.
  - CSS animation for fade-in.

## State Management

- Client component with `useState(isMenuOpen)`.
- Toggle on hamburger click.
- Close on link click inside overlay.
- Body scroll lock via `useEffect` when `isMenuOpen` changes (iOS-friendly):
  - Open: `document.body.style.position = 'fixed'`, `top = -scrollY`, `width = '100%'`
  - Close: restore body styles and `window.scrollTo(0, y)` to preserve scroll position

## Accessibility

- Hamburger button has `aria-label="Toggle menu"` and `aria-expanded={isMenuOpen}`.
- Overlay uses `role="navigation"` and `aria-label="Mobile navigation"`.
- ESC key closes menu (optional enhancement).

## Implementation Notes

- Keep a single `Header.tsx` with responsive conditionals (`md:` breakpoint).
- Reuse nav links and active logic between desktop and mobile.
- CSS for header styling (padding, spacing) in `header.css`.
