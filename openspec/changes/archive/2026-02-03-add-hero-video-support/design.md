# Design: Add Hero Video Support

## Architecture Overview

The Hero component will be extended to support video backgrounds alongside the existing image and styled background options. Video backgrounds will use HTML5 `<video>` elements with proper controls and fallbacks.

## Component Changes

### HeroProps Interface Extension

```typescript
export interface HeroProps {
  // ... existing props
  backgroundType?: "image" | "video" | "styled";
  backgroundVideoUrl?: string;
  // ... existing props
}
```

### Video Background Implementation

- **Video Element**: Use HTML5 `<video>` with `autoplay`, `muted`, `loop`, `playsinline`, and `controls="false"` attributes
- **Mandatory Behaviors**: Video MUST ALWAYS autoplay, MUST ALWAYS be muted, MUST ALWAYS loop
- **No User Control**: Users cannot pause, stop, or control the video in any way
- **Hidden Controls**: Video controls (play/pause, volume, progress bar) MUST be completely hidden - video should appear as a seamless background image
- **No Player UI**: Video MUST NOT display any player interface elements (progress bar, loading spinner, time display, fullscreen button, etc.)
- **Pure Background**: Video should appear as a living image background with zero visible player controls or overlays
- **User Experience**: Video hero should be indistinguishable from image hero from user's perspective
- **Responsive Sizing**: Apply `object-cover` class for proper aspect ratio and coverage
- **Performance**: Videos should be optimized for web delivery (H.264/MP4 format)
- **Fallback**: If video fails to load, fall back to a poster image or styled background
- **Accessibility**: Add proper `aria-label` and ensure video doesn't interfere with screen readers

### CSS Considerations

- Video elements will use the same `.hero__background` container as images
- Maintain existing aspect ratio calculations (2.74:1 desktop, 1.39:1 mobile)
- Ensure video covers the entire hero area without distortion

## Implementation Options

### Option 1: Extend backgroundType (Chosen)

- Add 'video' as a new backgroundType option
- Add backgroundVideoUrl prop
- Use conditional rendering based on backgroundType

**Pros:** Clean API, follows existing patterns, backward compatible
**Cons:** Adds complexity to background type logic

### Option 2: Separate videoBackground prop

- Add videoBackground as a separate boolean prop
- Use backgroundImageUrl for video URL when videoBackground=true

**Pros:** Simpler API
**Cons:** Less explicit, potential confusion with image URLs

## Performance Considerations

- **File Size**: Current video file is 400MB, which is extremely large for web delivery
- **Critical Issue**: 400MB video will cause severe loading delays and poor user experience
- **Required Actions**: Video must be heavily compressed or use alternative delivery methods
- **Target Size**: Aim for < 10MB compressed video (ideally < 5MB) for acceptable loading times
- **Loading Strategy**: Use `preload="metadata"` initially, then load video on user interaction or after page load
- **Progressive Loading**: Consider video streaming or chunked loading approaches
- **Compression Options**: Convert to H.264 with reduced bitrate, consider WebM format for better compression
- **Mobile Considerations**: 400MB file will likely fail to autoplay on mobile networks
- **Bandwidth Awareness**: Implement connection speed detection and adaptive quality
- **Fallback Strategy**: Must have reliable image fallback due to video size constraints

### Performance Mitigation Strategies

#### Option A: Video Compression (Recommended)

- Compress hero-home.mp4 to H.264 MP4 with 2-3 Mbps bitrate
- Target file size: 5-10MB for 10-20 second loop
- Use tools like HandBrake or FFmpeg for compression
- Maintain visual quality while drastically reducing file size

#### Option B: Video Streaming

- Host video on CDN with adaptive bitrate streaming (HLS/DASH)
- Load only necessary quality based on connection speed
- Reduces initial load but requires streaming infrastructure

#### Option C: Progressive Enhancement

- Load poster image first
- Load low-quality video preview
- Upgrade to full quality video on demand
- Provides immediate visual feedback while video loads

#### Option D: Alternative Media

- Consider using animated WebP/GIF for smaller file sizes
- Use CSS animations or Lottie animations as lighter alternatives
- Evaluate if video is necessary vs. other dynamic background options

## Browser Compatibility

- **Modern Browsers**: Full HTML5 video support
- **Fallback**: Graceful degradation to image background on unsupported browsers
- **Mobile**: `playsinline` attribute for iOS compatibility

## Testing Strategy

- **Unit Tests**: Test video rendering and fallback behavior
- **Integration Tests**: Test video loading and performance
- **Cross-browser**: Test on Chrome, Firefox, Safari, Edge
- **Mobile**: Test autoplay behavior on iOS and Android
