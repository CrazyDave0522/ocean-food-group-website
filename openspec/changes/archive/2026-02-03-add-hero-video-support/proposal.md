# Add Hero Video Support

## Why

The home page hero currently uses a static image background (`ocean-blue.jpg`). To create a more engaging and dynamic user experience, we want to support video backgrounds in the Hero component. The home page should use the new `hero-home.mp4` video file as its hero background.

Video backgrounds provide better visual storytelling and can showcase Ocean Food Group's products and atmosphere more effectively than static images.

## What Changes

### Hero Component Updates

- Extend HeroProps interface to support video backgrounds
- Add video background rendering logic to Hero component
- Implement mandatory video behaviors: **ALWAYS autoplay**, **ALWAYS muted**, **ALWAYS loop**
- Implement proper video controls (autoplay, mute, loop) with **all controls hidden**
- Ensure video appears as seamless background image - indistinguishable from image heroes
- **CRITICAL**: Video MUST NOT display any player UI elements (progress bar, loading indicator, time display, etc.)
- Ensure video maintains aspect ratio and covers the hero area
- Add fallback to image background if video fails to load

### Home Page Updates

- Update home page hero to use `hero-home.mp4` video background
- Remove current static image background
- **CRITICAL**: Optimize 400MB video file for web delivery (target < 10MB compressed)
- Ensure video loads efficiently and doesn't impact page performance
- Implement progressive loading and reliable fallbacks

### Video Optimization Requirements

- Compress `hero-home.mp4` from 400MB to < 10MB using H.264/MP4 format
- Implement video preloading strategy to minimize loading delays
- Add connection speed detection for adaptive loading
- Ensure mobile compatibility with autoplay restrictions
- Provide immediate image fallback for slow connections

### Technical Implementation

- Use HTML5 `<video>` element for video backgrounds
- Implement responsive video sizing with `object-cover`
- Add proper accessibility attributes and fallbacks
- Ensure video is optimized for web delivery

## Impact

- Enhanced visual experience on the home page with dynamic video background
- Improved brand storytelling through motion graphics
- Better engagement and conversion potential
- Hero component becomes more versatile for future video content
