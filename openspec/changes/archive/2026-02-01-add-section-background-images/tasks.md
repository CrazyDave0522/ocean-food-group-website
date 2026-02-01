# Tasks for Add Section Background Images

- [x] **Update home page component**
  - Modify `app/page.tsx` to add background images to the "Why Choose Ocean Food Group" section
  - Use `<picture>` element with responsive sources for mobile/desktop
  - Follow the same pattern as HeroSection component
  - Ensure proper positioning and z-index for content overlay

- [x] **Implement brand item background logic**
  - Modify the brands container component to add full-width background images
  - Apply background to the entire brands container when brands exist (single or multiple)
  - Use responsive images: `home-brand-item.png` for desktop, `home-brand-item-mb.png` for mobile
  - Ensure background spans full container width while brand items maintain horizontal padding
  - Ensure background images don't interfere with brand content readability

- [ ] **Add CSS styling for section and item backgrounds**
  - Create or update CSS for section background positioning
  - Add CSS for brand item background positioning and overlay
  - Ensure background images don't interfere with content readability
  - Add responsive behavior for different screen sizes
  - Test background image scaling and positioning

- [x] **Verify image assets**
  - Confirm `public/images/section-backgrounds/home-card-grid.png` exists and is optimized (1920x680, ratio: 2.82:1)
  - Confirm `public/images/section-backgrounds/home-card-grid-mb.png` exists and is optimized (750x682, ratio: 1.10:1)
  - Confirm `public/images/section-backgrounds/career-card-grid.png` exists and is optimized (1920x690, ratio: 2.78:1)
  - Confirm `public/images/section-backgrounds/contact-form-mb.png` exists and is optimized (750x850, ratio: 0.88:1) - used for career mobile
  - Confirm `public/images/section-backgrounds/home-brand-item.png` exists and is optimized (1920x400, ratio: 4.8:1)
  - Confirm `public/images/section-backgrounds/home-brand-item-mb.png` exists and is optimized (750x945, ratio: 0.79:1)
  - Confirm `public/images/section-backgrounds/franchise-form.png` exists and is optimized (1920x1050, ratio: 1.83:1)
  - Confirm `public/images/section-backgrounds/franchise-form-mb.png` exists and is optimized (750x1542, ratio: 0.49:1)
  - Confirm `public/images/section-backgrounds/franchise-form-footer.png` exists and is optimized (750x118, ratio: 6.36:1)
  - Confirm `public/images/section-backgrounds/contact-form.png` exists and is optimized (1920x850, ratio: 2.26:1)
  - Confirm `public/images/section-backgrounds/contact-form-mb.png` exists and is optimized (750x850, ratio: 0.88:1)
  - Check image dimensions and aspect ratios for proper display

- [ ] **Test conditional brand background logic**
  - Test with single brand scenario - background applied to the brands container
  - Test with multiple brands scenario - background applied to the brands container
  - Test with no brands scenario - no background applied
  - Verify background spans full container width while brand items maintain padding
  - Test edge cases (no brands, many brands)

- [ ] **Test responsive behavior**
  - Verify desktop background displays correctly on large screens
  - Verify mobile background displays correctly on small screens
  - Test breakpoint transitions between mobile and desktop images
  - Ensure content remains readable on all screen sizes

- [x] **Implement career section background**
  - Add background image `public/images/section-backgrounds/career-card-grid.png` for desktop
  - Add background image `public/images/section-backgrounds/contact-form-mb.png` for mobile
  - Use `<picture>` element with `<source>` for responsive behavior
  - Ensure proper background positioning and content layering
  - Test visual appearance and content readability

- [x] **Implement contact form background**
  - Add background image `public/images/section-backgrounds/contact-form.png` for desktop
  - Add background image `public/images/section-backgrounds/contact-form-mb.png` for mobile
  - Use `<picture>` element with `<source>` for responsive behavior
  - Ensure proper background positioning and form readability
  - Test visual appearance and form functionality

- [ ] **Accessibility and performance review**
  - Add appropriate ARIA labels and alt text for background images
  - Verify images load efficiently and don't impact page performance
  - Test with screen readers and ensure proper semantic structure
  - Check for any contrast issues with overlaid content

- [ ] **Cross-browser testing**
  - Test `<picture>` element support across target browsers
  - Verify fallback behavior for older browsers
  - Ensure consistent display across Chrome, Firefox, Safari, and Edge

- [x] **Implement CSS background effects**
  - Add gradient background to "Our Team" section with opacity 0.6
  - Add solid color background with mix-blend-mode multiply and blur filter to "Featured in Media" section
  - Add gradient background to "Job Postings" section with opacity 0.6 and linear-gradient(180deg, #B4D2FF 0%, rgba(219, 241, 255, 0.00) 97.96%, rgba(195, 219, 255, 0.00) 100%)
  - Ensure effects are applied correctly and don't interfere with content readability
  - Test visual appearance across different screen sizes

- [x] **Implement franchise form background**
  - Add background image `public/images/section-backgrounds/franchise-form.png` for desktop
  - Add background image `public/images/section-backgrounds/franchise-form-mb.png` for mobile
  - Ensure responsive behavior between desktop and mobile
  - Test form readability and accessibility over the background

- [x] **Implement franchise form footer background**
  - Add background image `public/images/section-backgrounds/franchise-form-footer.png` below the form section
  - Ensure footer image spans full width and is positioned correctly
  - Test visual continuity between form and footer sections
