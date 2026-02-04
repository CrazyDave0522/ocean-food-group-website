# Hero Video Poster Support - Design

## Architecture Overview

The video poster support will extend the existing video background functionality without changing the core architecture. The Hero component will manage three visual states for video backgrounds:

1. **Poster State**: Initial state showing poster image
2. **Loading State**: Video element loading (poster still visible)
3. **Playing State**: Video successfully loaded and playing
4. **Error State**: Video failed to load (poster remains visible)

## Component State Management

The Hero component already uses `videoError` state for error handling. We'll add `videoLoaded` state to track when the video has successfully loaded and started playing.

```typescript
const [videoError, setVideoError] = useState(false);
const [videoLoaded, setVideoLoaded] = useState(false);
```

## Video Event Handling

We'll leverage HTML5 video events:

- `onCanPlay`: Video is ready to play (set videoLoaded = true)
- `onError`: Video failed to load (existing error handling)

## Rendering Logic

```typescript
// Poster image (always rendered for video backgrounds)
{backgroundType === "video" && backgroundVideoPosterUrl && (
  <div className={`hero__background ${videoLoaded ? 'hero__background--hidden' : ''}`}>
    <Image src={backgroundVideoPosterUrl} ... />
  </div>
)}

// Video element (rendered when not errored)
{backgroundType === "video" && backgroundVideoUrl && !videoError && (
  <div className="hero__background">
    <video onCanPlay={() => setVideoLoaded(true)} ... />
  </div>
)}
```

## CSS Considerations

Add CSS class for smooth transitions:

```css
.hero__background--hidden {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
```

## Performance Considerations

- Poster images should be optimized like other hero background images
- Video preload="metadata" ensures poster loads before video attempts
- No impact on existing non-video hero usage

## Backward Compatibility

- New `backgroundVideoPosterUrl` prop is optional
- Existing video background usage continues to work unchanged
- Falls back to styled background when no poster provided
