# hero-section Specification

## Purpose

A simple hero section component that displays a background image with a content box containing title and text. This component provides a clean, focused way to highlight key content with visual impact, distinct from the more complex Hero component used for main page headers.

## ADDED Requirements

### Requirement: Hero Section displays background image with content box

The Hero Section component SHALL display a full-width background image with a positioned content box containing title and text.

#### Scenario: Basic hero section rendering

- Given a HeroSection component with background image URL, optional mobile background image URL, title, and text provided as props
- When rendered on a page
- Then the background image spans the full width of the viewport
- And a content box appears positioned over the image with the title and text
- And the content is readable with appropriate contrast
- And the section takes full width like a standard hero component

#### Scenario: Responsive content positioning

- Given a HeroSection component on different screen sizes
- When the viewport changes
- Then the content box adjusts its position and size appropriately
- And text remains readable on all screen sizes
- And the layout works on mobile, tablet, and desktop

#### Scenario: Mobile-specific background image

- Given a HeroSection component with both desktop and mobile background image URLs
- When rendered on mobile devices (≤767px)
- Then the mobile background image is displayed
- And when rendered on desktop devices (>767px)
- Then the desktop background image is displayed

### Requirement: Content length constraints

The Hero Section SHALL enforce content length limits to maintain visual consistency.

#### Scenario: Title single-line constraint

- Given a HeroSection with a long title that would normally wrap to multiple lines
- When rendered
- Then the title is constrained to a single line
- And overflow text is truncated with ellipsis
- And the title maintains proper typography sizing

#### Scenario: Text three-line maximum constraint

- Given a HeroSection with text content longer than 3 lines
- When rendered
- Then the text is limited to a maximum of 3 lines
- And overflow text is truncated with ellipsis
- And line height is optimized for readability within the 3-line limit

#### Scenario: Content box appearance

- Given a HeroSection content box
- When displayed over background image
- Then the box has semi-transparent white background (rgba(245, 245, 245, 0.60))
- And the box has backdrop blur effect (5px blur)
- And the box has rounded top corners on mobile, all corners on desktop
- And the box is 1400px wide maximum and 180px tall
- And the box has responsive horizontal padding (24px → 36px → 48px → 60px)
- And the box has 0px vertical padding
- And the box uses flexbox column layout with centered content and left-aligned items
- And there is 20px gap between title and text elements
- And text has sufficient contrast for readability

### Requirement: Background image handling

The component SHALL properly handle background images with optimization, responsive loading, and fallbacks.

#### Scenario: Image loading and optimization

- Given a HeroSection with background image URL provided as prop
- When the component loads
- Then the image is optimized using Next.js Image component with picture element for responsive sources
- And appropriate loading and error states are handled
- And the image covers the full section area

#### Scenario: Responsive image loading

- Given a HeroSection with both desktop and mobile background images
- When rendered on different devices
- Then the appropriate image is loaded based on screen size
- And mobile devices (≤767px) load the mobile-optimized image
- And desktop devices (>767px) load the desktop image

#### Scenario: Image accessibility

- Given a HeroSection with background image
- When rendered
- Then appropriate alt text or aria-hidden attributes are used
- And the image doesn't interfere with screen readers
- And focus management works correctly

### Requirement: Content box dimensions and responsive scaling

The content box SHALL have specific dimensions that scale responsively across screen sizes with appropriate aspect ratios.

#### Scenario: Responsive section aspect ratios

- Given a HeroSection on different screen sizes
- When rendered
- Then on mobile devices (≤767px) the section uses 1:1 aspect ratio (square)
- And on desktop devices (≥768px) the section uses 16:5 aspect ratio
- And the content box is positioned at the bottom with 32px gap from bottom edge
- And the content box is horizontally centered

#### Scenario: Responsive content box scaling

- Given a HeroSection on screens of different sizes
- When the content box is rendered
- Then the box dimensions scale proportionally with max width of 1400px and 90vw
- And padding scales responsively (24px → 36px → 48px → 60px horizontal)
- And the box remains readable and visually balanced on all screen sizes

### Requirement: Accessibility compliance

The Hero Section SHALL meet accessibility standards for screen readers and keyboard navigation.

#### Scenario: Screen reader support

- Given a HeroSection with content
- When accessed by screen reader
- Then all content is properly announced
- And semantic HTML structure is used
- And ARIA labels are appropriate where needed

#### Scenario: Keyboard navigation

- Given a HeroSection that may contain interactive elements
- When navigated with keyboard
- Then focus indicators are visible
- And tab order is logical
- And keyboard interactions work as expected
