# Add Section Background Images

## Summary

Add background images and CSS background effects to home page sections to enhance visual appeal and user experience. Include the "Why Choose Ocean Food Group" and "Why Work With Us" section background images, conditional brand item backgrounds, styled backgrounds for "Our Team", "Featured in Media", and "Job Postings" sections, franchise form background with responsive image and styled mobile background, and contact form background with responsive images.

## Why

The current home page sections lack visual depth and engagement. Adding background images and effects will:

- Improve visual hierarchy and section separation
- Enhance the overall aesthetic appeal of the home page
- Provide better visual context for each section's content
- Create a more immersive and professional user experience
- Add special visual treatment to brand items and sections with varied effects

## Motivation

Background images and effects are commonly used in modern web design to add visual interest and improve user engagement. The "Why Choose Ocean Food Group" and "Why Work With Us" sections need background images to complement the feature cards, the "Our Brands" section needs conditional background images on individual brand items to highlight specific brands based on the total count, the "Our Team" section needs a subtle gradient overlay, the "Featured in Media" section needs a blurred background effect for visual impact, the franchise form needs a background image on desktop with a styled background on mobile for visual consistency, the "Job Postings" section needs a gradient background effect for enhanced visual appeal, and the contact form needs background images for visual consistency across devices.

The implementation will combine image backgrounds (following HeroSection pattern) with CSS background effects for varied visual treatments.

## Impact

- **Enhanced Visual Design**: More engaging and visually appealing home page with varied background treatments
- **Improved User Experience**: Better visual hierarchy and content organization
- **Smart Branding**: Conditional background images for brand items based on count
- **Diverse Effects**: Mix of image backgrounds, gradients, and blend mode effects
- **Performance**: Images and effects optimized for smooth rendering
- **Accessibility**: Proper contrast and readability maintained
- **Maintainability**: Consistent patterns for different background types

## Implementation Notes

- Use `<picture>` element with `<source>` for responsive image backgrounds
- Apply CSS background effects using gradients, opacity, blend modes, and filters
- Follow the HeroSection component pattern for image backgrounds
- Ensure background effects don't interfere with text readability
- Add proper CSS for background positioning and layering
- Implement conditional logic for brand item backgrounds
- Test on various screen sizes to ensure proper display

## Dependencies

- Background images:
  - "Why Choose Ocean Food Group" section: `public/images/section-backgrounds/home-card-grid.png` (1920x680, ratio: 2.82:1) and `public/images/section-backgrounds/home-card-grid-mb.png` (750x682, ratio: 1.10:1)
  - Career section: `public/images/section-backgrounds/career-card-grid.png` (1920x690, ratio: 2.78:1) and `public/images/section-backgrounds/contact-form-mb.png` (750x850, ratio: 0.88:1)
  - Brand items: `public/images/section-backgrounds/home-brand-item.png` (1920x400, ratio: 4.8:1) and `public/images/section-backgrounds/home-brand-item-mb.png` (750x945, ratio: 0.79:1)
  - Franchise form: `public/images/section-backgrounds/franchise-form.png` (1920x1050, ratio: 1.83:1) and `public/images/section-backgrounds/franchise-form-mb.png` (750x1542, ratio: 0.49:1)
  - Franchise form footer: `public/images/section-backgrounds/franchise-form-footer.png` (750x118, ratio: 6.36:1)
  - Contact form: `public/images/section-backgrounds/contact-form.png` (1920x850, ratio: 2.26:1) and `public/images/section-backgrounds/contact-form-mb.png` (750x850, ratio: 0.88:1)
- Existing home page structure, CardGrid component, brands functionality, and franchise form
- CSS utilities for responsive design, gradients, blend modes, and filters

## Risks

- Background effects might affect text readability
- Performance impact from CSS effects and additional image assets
- Complex layering of multiple background types
- Cross-browser compatibility with blend modes and filters
- Mobile rendering performance for blur effects
