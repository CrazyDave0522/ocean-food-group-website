# Hero Section Component Tasks

## Component Development
- [x] Create TypeScript types in `lib/hero-section/types.ts`
- [x] Implement `HeroSection` component in `components/HeroSection.tsx`
- [x] Add responsive styling with CSS classes
- [x] Implement background image handling with Next.js Image
- [x] Add content box with title and text styling
- [x] Implement content constraints: title 1 line max, text 3 lines max with truncation
- [x] Ensure proper accessibility with ARIA labels

## Updates Made
- [x] Add mobile-specific background image support with picture element
- [x] Update aspect ratios: square (1:1) on mobile, 16:5 on desktop
- [x] Implement responsive padding scaling (24px → 36px → 48px → 60px)
- [x] Center content box horizontally and position with bottom gap
- [x] Update border radius to rounded-top on mobile, all corners on desktop
- [x] Update tests to reflect new implementation
- [x] Update documentation to match current reality

## Testing
- [x] Create unit tests in `__tests__/components/HeroSection.test.tsx`
- [x] Create integration tests in `__tests__/components/HeroSection.integration.test.tsx`
- [x] Test responsive behavior across breakpoints
- [x] Test background image loading and fallbacks
- [x] Test accessibility features

## Integration
- [x] Add component to main exports
- [x] Update any relevant documentation
- [x] Test component usage in different page contexts

## Validation
- [x] Run all tests and ensure they pass
- [x] Test component in development environment
- [x] Verify responsive design works correctly
- [x] Confirm accessibility compliance