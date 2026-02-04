# Add Video Poster Support to Hero Component

## Problem

When using video backgrounds in the Hero component, users experience a blank or styled background fallback while the video loads. This creates a poor user experience with layout shifts and missing visual context. Additionally, when video loading fails, users only see a generic styled background instead of a meaningful fallback image.

## Solution

Add poster image support to video backgrounds in the Hero component. The poster image will:

- Display immediately when the video background is requested
- Remain visible while the video loads
- Remain visible if the video fails to load
- Be replaced by the video once it successfully loads and starts playing

## Requirements

- Add `backgroundVideoPosterUrl` prop to HeroProps interface
- Display poster image as background while video loads
- Keep poster image visible on video load failure
- Replace poster with video when video successfully loads
- Maintain existing video loading error handling
- Ensure poster images follow same aspect ratio requirements as other hero backgrounds

## Impact

- Improved user experience with immediate visual feedback for video backgrounds
- Consistent visual presentation across loading states
- Better accessibility with meaningful fallback images
- No breaking changes to existing video background usage

## Dependencies

- Hero component video background functionality (already implemented)
- Image optimization and aspect ratio handling (already implemented)
