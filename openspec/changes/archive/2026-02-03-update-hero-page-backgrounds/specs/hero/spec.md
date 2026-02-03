# hero Specification Delta

## MODIFIED Requirements

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
