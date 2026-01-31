# Tasks for Update Callout Background and Alignment

- [x] **Verify background image dimensions**
   - Check dimensions of bg-callout.png and bg-callout-mb.png to ensure aspect ratio compatibility.
   - Confirm both images are 220px height to prevent cropping.

- [x] **Create GlassmorphismButton component**
   - Create a new reusable component in `components/GlassmorphismButton.tsx`.
   - Implement the glassmorphism styling with backdrop-filter blur effect.
   - Support both text content and optional URL props for internal/external links.

- [x] **Update component aspect-ratio in callout.css**
   - Set aspect-ratio: 1920 / 220 for desktop to match image aspect ratio and prevent cropping.
   - Use media query to set aspect-ratio: 750 / 220 for mobile screens.

- [x] **Update default background image in callout.css**
   - Replace the linear gradient with `url('/images/backgrounds/bg-callout.png')` for desktop.
   - Ensure background-size, position, and repeat are set appropriately.

- [x] **Add mobile-specific background image**
   - Use CSS media query to switch to `url('/images/backgrounds/bg-callout-mb.png')` on mobile screens (max-width: 768px or appropriate breakpoint).

- [x] **Update content padding for responsiveness**
   - Set padding to var(--space-xl) var(--space-lg) for desktop.
   - Use media query to set padding to var(--space-md) var(--space-sm) for mobile.

- [x] **Update text color**
   - Change text color from black (#000) to white in .callout-content.

- [x] **Adjust content alignment**
   - Position content at 80% from left edge for all screen sizes.
   - Set text-align: left in .callout-content.

- [x] **Update Callout component to use GlassmorphismButton**
   - Import and use the new GlassmorphismButton component instead of inline button styling.
   - Pass appropriate props (text, url) to the GlassmorphismButton.

- [x] **Test responsive behavior**
    - Verify background images switch correctly on desktop/mobile.
    - Ensure alignment looks correct on various screen sizes.
    - Check that text and GlassmorphismButton are properly positioned.

- [x] **Validate accessibility and performance**
    - Ensure sufficient contrast with new backgrounds and white text.
    - Check image loading performance.
    - Run existing tests to confirm no regressions.

- [x] **Update component documentation if needed**
    - Review and update any comments or docs reflecting the new styling.
