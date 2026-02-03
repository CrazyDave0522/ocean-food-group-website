# Tasks: Add Hero Video Support

## ✅ Prerequisites - COMPLETED

- [x] **CRITICAL**: Compress hero-home.mp4 from 400MB to < 10MB for web delivery
- [x] Choose video compression format (H.264 MP4 recommended)
- [x] Test compressed video quality and file size
- [x] Update video file in public/images/backgrounds/ directory

## ⏳ Component Updates - COMPLETED

- [x] Extend HeroProps interface to include video background properties
- [x] Add video background rendering logic to Hero component
- [x] Implement mandatory video behaviors: **ALWAYS autoplay**, **ALWAYS muted**, **ALWAYS loop**
- [x] Implement video controls (autoplay, mute, loop, playsinline) with **all controls hidden**
- [x] Ensure video background appears seamless and identical to image backgrounds from user perspective
- [x] **CRITICAL**: Verify no player UI elements are visible (progress bar, loading indicator, time display, etc.)
- [x] Add responsive video sizing with object-cover behavior
- [x] Implement fallback to image background if video fails
- [x] Update Hero component tests to cover video background functionality

## ⏳ Page Updates - COMPLETED

- [x] Update home page hero to use compressed hero-home.mp4 video background
- [x] Remove static image background from home page hero
- [x] Test video loading and performance on home page
- [x] Verify video works across different devices and browsers

## ✅ Specification Updates - COMPLETED

- [x] Create hero spec delta with video background requirements
- [x] Update hero spec to include video background scenarios
- [x] Validate spec changes with openspec validate

## ⏳ Testing & Validation - PARTIALLY COMPLETED

- [x] Test video background rendering and controls
- [x] Verify fallback behavior when video unavailable
- [x] Test responsive behavior and aspect ratio preservation
- [x] Run full test suite to ensure no regressions
- [x] Manual testing of home page video on mobile devices
- [x] Performance testing to ensure video doesn't impact page load
