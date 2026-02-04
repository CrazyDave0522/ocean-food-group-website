# Hero Video Poster Support - Tasks

## 1. Update TypeScript Interface

- [x] Add `backgroundVideoPosterUrl?: string` to HeroProps interface
- [x] Update Hero component prop destructuring to include new prop
- [x] Verify TypeScript compilation passes

## 2. Add Component State Management

- [x] Add `videoLoaded` state to Hero component (boolean, default false)
- [x] Add `onCanPlay` event handler to video element to set videoLoaded = true
- [x] Reset videoLoaded state when videoError occurs

## 3. Implement Poster Image Rendering

- [x] Add poster image container in Hero component JSX
- [x] Render poster image when backgroundType === "video" && backgroundVideoPosterUrl
- [x] Position poster image using existing hero__background class
- [x] Apply object-cover styling consistent with other background images

## 4. Implement Loading State Logic

- [x] Show poster image by default when video background is requested
- [x] Hide/replace poster image when videoLoaded becomes true
- [x] Ensure poster remains visible during video loading failures

## 5. Add CSS Transitions (Optional Enhancement)

- [x] Add CSS class for smooth poster-to-video transitions
- [x] Implement opacity transition when video loads successfully
- [x] Test transition timing and visual smoothness

## 6. Update Home Page Usage

- [x] Add backgroundVideoPosterUrl prop to home page Hero component
- [x] Create or identify appropriate poster image for hero-home.mp4
- [x] Test poster display and video transition on home page

## 7. Add Comprehensive Tests

- [x] Test poster image displays initially for video backgrounds
- [x] Test poster image hides when video loads successfully
- [x] Test poster image remains visible when video fails to load
- [x] Test video backgrounds without poster (backward compatibility)
- [x] Test poster image aspect ratios and responsive behavior

## 8. Update Documentation

- [x] Update Hero component JSDoc comments to document poster functionality
- [x] Add usage examples in component documentation
- [x] Document poster image requirements (aspect ratios, optimization)

## Dependencies

- Task 6 depends on having an appropriate poster image created
- Tasks 1-4 are independent and can be done in parallel
- Task 7 requires Tasks 1-4 to be completed
