# hero Specification

## Purpose
TBD - created by archiving change create-hero-component. Update Purpose after archive.
## Requirements
### Requirement: Hero component supports two text layout variants with independent background options
- The hero component MUST support two distinct text layouts (center and left) that can each be paired with either an image background or a styled background.

#### Scenario: Center variant with styled background
- Given a hero is rendered with center variant and styled background (solid or gradient)
- Then the title is displayed and center-aligned
- And if a subtitle is provided it is also displayed and center-aligned
- And no content image is displayed
- And the background uses the selected styled variant
- And the layout is responsive with proportional height scaling

#### Scenario: Center variant with image background
- Given a hero is rendered with center variant and an image background URL
- Then the title is displayed and center-aligned
- And if a subtitle is provided it is also displayed and center-aligned
- And no content image is displayed
- And the background image appears behind the text with object-cover behavior (may crop for full coverage)
- And an optional overlay appears to ensure text readability

#### Scenario: Left variant with styled background and without content image
- Given a hero is rendered with left variant, styled background, and no content image
- Then the title is left-aligned on desktop
- And if a subtitle is provided it is also left-aligned on desktop
- And the background uses the selected styled variant
- And the layout is responsive with proportional height scaling

#### Scenario: Left variant with styled background and content image
- Given a hero is rendered with left variant, styled background, and a content image URL
- Then the title is left-aligned on desktop
- And if a subtitle is provided it is also left-aligned on desktop
- And the content image appears on the right side on desktop with fixed width
- And the background uses the selected styled variant
- And on mobile the layout stacks vertically (content image above text)

#### Scenario: Left variant with image background and without content image
- Given a hero is rendered with left variant, an image background URL, and no content image
- Then the title is left-aligned on desktop
- And if a subtitle is provided it is also left-aligned on desktop
- And the background image appears behind the entire section with object-cover behavior (may crop for full coverage)
- And an optional overlay ensures text readability on desktop
- And on mobile the layout maintains left alignment

#### Scenario: Left variant with image background and content image
- Given a hero is rendered with left variant, an image background URL, and a content image URL
- Then the title is left-aligned on desktop
- And if a subtitle is provided it is also left-aligned on desktop
- And the content image appears on the right side on desktop
- And the background image appears behind the entire section with object-cover behavior (may crop for full coverage)
- And an optional overlay ensures text readability on desktop
- And on mobile the layout stacks vertically (content image above text)

### Requirement: Hero component supports video backgrounds

- The hero component MUST support 'video' as a backgroundType option
- When backgroundType is 'video', the component MUST display a video background using the backgroundVideoUrl
- The video MUST ALWAYS autoplay when the component mounts
- The video MUST ALWAYS be muted (required for autoplay in most browsers)
- The video MUST ALWAYS loop continuously
- The video MUST play inline on mobile devices (playsinline attribute)
- The video MUST have all controls hidden - no play/pause, volume, or progress controls visible
- The video MUST NOT display any player UI elements (progress bar, loading indicator, time display, etc.)
- The video MUST appear as a pure background image with no visible player controls or overlays
- The video hero MUST appear identical to image heroes from the user's perspective
- The video MUST maintain proper aspect ratios (2.74:1 desktop, 1.39:1 mobile)
- The video MUST use object-cover behavior for full coverage

#### Scenario: Hero with video background renders correctly

- GIVEN a hero is rendered with backgroundType 'video' and backgroundVideoUrl
- WHEN the component mounts
- THEN a video element is displayed with autoplay, muted, loop, and playsinline attributes
- AND no video controls are visible (no play/pause, volume, or progress bar)
- AND the video appears as a seamless background image to the user
- AND the video covers the entire hero area with object-cover behavior
- AND the video maintains the correct aspect ratio for the viewport

#### Scenario: Hero video background falls back gracefully

- GIVEN a hero is rendered with backgroundType 'video'
- WHEN the video fails to load or is unsupported
- THEN the hero falls back to a styled background or poster image
- AND the text content remains readable and properly positioned

#### Scenario: Hero video respects aspect ratios

- GIVEN a hero is rendered with video background
- WHEN the viewport changes size
- THEN the video maintains the correct aspect ratio (2.74:1 on desktop, 1.39:1 on mobile)
- AND the video covers the hero area without distortion

### Requirement: Home page hero uses video background

- The home page hero MUST use backgroundType 'video'
- The home page hero MUST use '/images/backgrounds/hero-home.mp4' as backgroundVideoUrl
- The home page hero video MUST ALWAYS autoplay when the page loads
- The home page hero video MUST ALWAYS be muted
- The home page hero video MUST ALWAYS loop continuously
- The home page hero MUST have all video controls hidden - appears as seamless background
- The home page hero video MUST NOT display any player UI elements (progress bar, loading indicator, time display, etc.)
- The home page hero MUST appear as a pure background image with no visible player controls or overlays
- The home page hero MUST maintain proper aspect ratios and video controls

#### Scenario: Home page hero displays video background

- GIVEN the home page is loaded
- WHEN the hero section renders
- THEN the hero background is a video playing hero-home.mp4
- AND the video has autoplay, muted, loop, and playsinline attributes
- AND no video controls are visible to the user
- AND the video appears identical to an image background
- AND the video maintains the correct aspect ratio for the viewport

### Requirement: Video background performance optimization

- The video file MUST be compressed to < 10MB for acceptable loading performance
- The video MUST use efficient web formats (H.264 MP4 preferred)
- The video MUST implement progressive loading to minimize initial page load impact
- The hero MUST provide immediate visual feedback while video loads
- The video MUST have reliable fallback for slow connections or large file sizes

#### Scenario: Video loads efficiently

- GIVEN a hero with video background
- WHEN the page loads
- THEN the video file size is < 10MB
- AND the video begins loading after critical page content
- AND users see immediate visual feedback (poster image or loading state)
- AND the video doesn't block page rendering or interaction

#### Scenario: Video provides fallbacks for performance

- GIVEN a hero with video background on a slow connection
- WHEN the video takes too long to load
- THEN the hero falls back to an image background
- AND the page remains fully functional
- AND users can still read and interact with hero content

### Requirement: Hero component supports mobile-specific background images

- The hero component MUST support an optional mobileBackgroundImageUrl prop for different images on mobile devices
- When mobileBackgroundImageUrl is provided, the component MUST display the mobile image on screens smaller than 768px and the desktop image on larger screens
- The hero MUST maintain proper aspect ratios for both desktop and mobile background images

#### Scenario: Hero with mobile-specific background image

- GIVEN a hero is rendered with both backgroundImageUrl and mobileBackgroundImageUrl
- WHEN the viewport width is less than 768px
- THEN the mobileBackgroundImageUrl image is displayed
- AND the image maintains its proper aspect ratio

#### Scenario: Hero falls back to desktop image when no mobile image provided

- GIVEN a hero is rendered with only backgroundImageUrl
- WHEN rendered on any screen size
- THEN the backgroundImageUrl image is displayed on all screen sizes
- AND backward compatibility is maintained

#### Scenario: Hero maintains aspect ratios for different image formats

- GIVEN hero background images have different aspect ratios for desktop and mobile
- WHEN the hero is rendered
- THEN each image variant maintains its correct aspect ratio
- AND the hero container height adjusts accordingly

### Requirement: Hero maintains different aspect ratios for desktop and mobile viewports

- The hero MUST use different aspect ratios for desktop and mobile viewports to match the dimensions of their respective background images
- On desktop viewports (768px and above), the hero MUST maintain a 1920x700 aspect ratio (approximately 2.74:1) to match `hero-fishing.png`
- On mobile viewports (below 768px), the hero MUST use a 750x540 aspect ratio (approximately 1.39:1) to match `hero-future-mb.png`
- The aspect ratios MUST be maintained regardless of whether mobile-specific background images are used

#### Scenario: Desktop viewport maintains 1920x700 aspect ratio

- GIVEN the hero is rendered on a desktop viewport (768px and above)
- THEN the hero height follows the 1920x700 baseline ratio
- AND the aspect ratio is preserved at approximately 2.74:1

#### Scenario: Mobile viewport uses 750x540 aspect ratio

- GIVEN the hero is rendered on a mobile viewport (below 768px)
- THEN the hero uses a 750x540 aspect ratio (approximately 1.39:1)
- AND the mobile aspect ratio differs from the desktop 1920x700 ratio

### Requirement: Hero image variant content image maintains sizing ratio
- The hero image variant MUST display a content image with a baseline size of 414px width × 332px height at 1920px width, scaling proportionally on other viewports.

#### Scenario: Content image at 1920px baseline
- Given a hero image variant is rendered at 1920px width
- Then the content image displays at approximately 414px width and 332px height
- And the image uses object-cover to maintain aspect ratio

#### Scenario: Content image scales proportionally
- Given a hero image variant is rendered at different viewport widths
- Then the content image width and height scale proportionally from the 414×332 baseline
- And the aspect ratio (414:332 ≈ 1.25:1) is preserved

### Requirement: Hero uses responsive typography and spacing
- The hero MUST use design tokens for typography (h1, body sizes) and spacing to ensure readability and consistency.

#### Scenario: Responsive typography on different viewports
- Given the hero is rendered on mobile and desktop
- Then the title uses --fs-h1 token (32px–48px responsive) and scales responsively
- And the subtitle uses --fs-h4 token (18px–24px responsive) and remains readable on all viewports

