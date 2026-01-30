# Hero Section Component

## Why
The existing Hero component is complex with multiple variants and layout options. We need a simpler component that provides a clean, full-width hero section with a background image and content box for title and text. This component will be used for secondary hero sections that appear below the main page hero, providing a focused way to highlight key content with visual impact across the full viewport width.

## What Changes
- Add new `HeroSection` component in `components/HeroSection.tsx`
- Add TypeScript types in `lib/hero-section/types.ts` with props for backgroundImageUrl, title, and text
- Add component to exports in appropriate index files
- Add unit tests in `__tests__/components/HeroSection.test.tsx`
- Add integration tests in `__tests__/components/HeroSection.integration.test.tsx`
- Update component documentation

## Impact
- New reusable component for hero sections with background images
- Consistent styling with existing design system
- Responsive behavior across all screen sizes
- Accessibility compliant with proper ARIA labels
- No breaking changes to existing components