# Hero Section Component Design

## Overview
The HeroSection component provides a full-width hero section with a background image and content box. The background image spans the entire viewport width, similar to standard hero sections, with a positioned content box containing title and text.

## Architecture
- **Props Interface**: Accepts backgroundImageUrl, optional mobileBackgroundImageUrl, title, and text as props
- **Content Constraints**: Title limited to 1 line, text limited to 3 lines maximum
- **Text Truncation**: CSS line-clamp for automatic ellipsis on overflow
- **Simple API**: Clean, minimal props for easy usage
- **Responsive Design**: Content box adapts to screen size while maintaining readability
- **Image Optimization**: Uses Next.js Image component with picture element for responsive loading
- **CSS Classes**: Follows existing naming conventions and design tokens

## Content Box Styling
- **Dimensions**: 1400px max width × 180px height, constrained to 90vw width
- **Layout**: Flexbox column layout, centered content, left-aligned items
- **Background**: Semi-transparent white (rgba(245, 245, 245, 0.60)) with blur effect
- **Spacing**: Responsive horizontal padding (24px → 36px → 48px → 60px), 0px vertical padding, 20px gap between title and text
- **Border Radius**: Rounded top on mobile, all corners on desktop
- **Positioning**: Horizontally centered, positioned at bottom with 32px gap from bottom edge

## Responsive Behavior
- **Section Aspect Ratios**: 1:1 (square) on mobile, 16:5 on desktop
- **Background Images**: Responsive loading with mobile-optimized images for screens ≤767px
- **Content Box**: Horizontally centered, responsive padding scaling
- **Typography**: Uses design tokens for responsive font sizes

## Accessibility
- Proper ARIA labels for screen readers
- Sufficient color contrast for text over background images
- Keyboard navigation support where applicable
- Semantic HTML structure

## CSS Architecture
- Uses existing design tokens for spacing, typography, and colors
- Follows BEM-like naming conventions
- Responsive utilities for different screen sizes
- Consistent with existing component styling patterns