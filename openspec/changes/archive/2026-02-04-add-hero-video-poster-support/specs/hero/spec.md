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
- When backgroundVideoPosterUrl is provided, the component MUST display the poster image initially
- The poster image MUST remain visible while the video loads
- The poster image MUST remain visible if the video fails to load
- The poster image MUST be replaced by the video when the video successfully loads and starts playing
- The poster image MUST follow the same aspect ratio requirements as other hero background images

#### Scenario: Hero with video background renders correctly

- GIVEN a hero is rendered with backgroundType 'video' and backgroundVideoUrl
- WHEN the component mounts
- THEN a video element is displayed with autoplay, muted, loop, and playsinline attributes
- AND no video controls are visible (no play/pause, volume, or progress bar)
- AND the video appears as a seamless background image to the user
- AND the video covers the entire hero area with object-cover behavior
- AND the video maintains the correct aspect ratio for the viewport

#### Scenario: Hero video background shows poster during loading

- GIVEN a hero is rendered with backgroundType 'video', backgroundVideoUrl, and backgroundVideoPosterUrl
- WHEN the component mounts and video is loading
- THEN the poster image is displayed immediately as the background
- AND the poster image covers the entire hero area with object-cover behavior
- AND the poster image maintains the correct aspect ratio for the viewport

#### Scenario: Hero video background transitions from poster to video

- GIVEN a hero is rendered with backgroundType 'video', backgroundVideoUrl, and backgroundVideoPosterUrl
- WHEN the video successfully loads and starts playing
- THEN the poster image is hidden or replaced by the playing video
- AND the video becomes the visible background
- AND the transition appears smooth to the user

#### Scenario: Hero video background keeps poster on failure

- GIVEN a hero is rendered with backgroundType 'video', backgroundVideoUrl, and backgroundVideoPosterUrl
- WHEN the video fails to load
- THEN the poster image remains visible as the background
- AND the poster image continues to cover the entire hero area
- AND the text content remains readable and properly positioned

#### Scenario: Hero video background without poster falls back gracefully

- GIVEN a hero is rendered with backgroundType 'video' and backgroundVideoUrl but no backgroundVideoPosterUrl
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
- The home page hero MUST use '/images/backgrounds/hero-home.png' as backgroundVideoPosterUrl
- The home page hero poster image MUST display while the video loads
- The home page hero poster image MUST be replaced by the video when it successfully loads

#### Scenario: Home page hero displays poster then video

- GIVEN the home page is loaded
- WHEN the hero section renders
- THEN the hero background initially shows the poster image
- AND the poster image covers the entire hero area
- AND when the video loads successfully, the poster is replaced by the playing video
- AND the video has autoplay, muted, loop, and playsinline attributes
