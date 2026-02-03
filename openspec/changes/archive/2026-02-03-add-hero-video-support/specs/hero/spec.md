# hero Specification Delta

## MODIFIED Requirements

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
