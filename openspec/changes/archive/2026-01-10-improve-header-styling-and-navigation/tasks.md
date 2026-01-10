# Tasks: Header Styling and Mobile Navigation

## 1. Preparation
- [x] Review current `Header.tsx` and `header.css` files.
- [x] Verify breakpoint token (md: 768px) is available in Tailwind.
- [x] Confirm `nav-mb.svg` icon exists in `public/images/icons/` with 50×50px dimensions.
- [x] Add responsive image sizing classes for logo and hamburger icon.

## 2. Desktop Styling (Padding & Typography)
- [x] Update `Header.tsx` container to use `px-[var(--space-3xl)]` (64px desktop) with responsive fallback to `px-4` (mobile).
- [x] Add nav button gap: `gap-[var(--space-4xl)]` (--space-4xl token, 80px).
- [x] Add header CSS rules to `header.css`:
  - Nav buttons: `font-size: --fs-body-lg`, `font-weight: 500`, `font-style: normal`, `line-height: normal`.
  - Default text color: `--color-text` (gray-800).
  - Link hover state: subtle color or underline.
- [x] Run `pnpm typecheck` and `pnpm lint` to validate.

## 3. Desktop Active Navigation State
- [x] Convert `Header` to client component (`"use client"`).
- [x] Import `usePathname()` from Next.js.
- [x] Add logic to determine active link by comparing `pathname` to link `href`.
- [x] Apply active styling: `text-primary` + `border-b-4 border-primary` with `border-bottom-*-radius: var(--radius-md)` for active nav button (border indicator has rounded corners).
- [x] Test on each route (home, franchise, careers, media-reviews, contact).

## 4. Mobile Menu Overlay (Structure)
- [x] Add `useState(isMenuOpen)` to Header component.
- [x] Create hamburger button with `aria-label` and `aria-expanded`.
- [x] Render mobile nav list conditionally below header (overlay or sidebar).
- [x] Import `nav-mb.svg` icon and display in hamburger button.

## 5. Mobile Menu Overlay (Styling & Animation)
- [x] Style overlay: full-screen with backdrop `rgba(0, 0, 0, 0.90)` (90% opaque black) at `z-40`.
- [x] Add `overflow-y: auto` and `overscroll-behavior: contain` to overlay for scrollability.
- [x] Implement robust body scroll lock:
  - Add `useEffect` to set `document.body.style.position = 'fixed'`, `top = -scrollY`, `width = '100%'` when overlay opens.
  - Restore body styles and scroll position with `window.scrollTo(0, y)` when overlay closes.
- [x] Stack nav buttons vertically with:
  - Gap: responsive clamp via CSS class (`gap: clamp(var(--space-3xl), 12vw, var(--space-5xl))`)
  - Typography: `var(--fs-h1)` font size, `font-weight: 600`
- [x] Add top padding to overlay nav container: `padding-top: var(--space-8xl)` so the first item sits below the sticky header
- [x] Apply same active state styling as desktop (4px bottom border indicator with `--radius-md` rounded corners, primary color).
- [x] Add CSS fadeIn animation for overlay.
- [x] Hide overlay on link click (set `isMenuOpen = false`) and re-enable body scroll.
- [x] Test on mobile breakpoint (< 768px): verify scroll lock and overlay scrollability work.

## 6. Testing
- [x] Test desktop nav on desktop viewport (1024px+).
- [x] Verify padding, font size, and active state visually.
- [x] Test mobile menu on tablet (768px) and phone (375px).
- [x] Click hamburger to open/close overlay.
- [x] Click nav links and confirm menu closes and active state updates.
- [x] Run `pnpm test:run` for any component-level tests.

## 7. Validation & Commit
- [x] Run `pnpm check` (typecheck + lint).
- [x] Visual smoke test in dev server (`pnpm dev`).
- [x] Commit with message: `feat(header): improve styling, active nav state, and mobile menu overlay`.
