# home-page-sections Specification Delta

## Purpose

TBD - created by change add-section-background-images. Update Purpose after implementation.

## ADDED Requirements

### Requirement: Section Background Images

Home page sections SHALL support responsive background images for enhanced visual appeal.

#### Scenario: Section Background Image Display

- **GIVEN** a home page section with background image configuration
- **WHEN** the section renders on desktop devices (>768px)
- **THEN** the desktop background image is displayed
- **AND** the image covers the full section area
- **AND** content is properly layered above the background

#### Scenario: Mobile Background Image Display

- **GIVEN** a home page section with background image configuration
- **WHEN** the section renders on mobile devices (≤768px)
- **THEN** the mobile-optimized background image is displayed
- **AND** the image is appropriately sized for mobile screens
- **AND** content remains readable and accessible

#### Scenario: Background Image Accessibility

- **GIVEN** a section with background images
- **WHEN** screen readers access the content
- **THEN** background images are marked as decorative (`aria-hidden="true"`)
- **AND** content accessibility is not affected by background images
- **AND** sufficient contrast is maintained between content and background

#### Scenario: Responsive Image Loading

- **GIVEN** a section with responsive background images
- **WHEN** the page loads on different devices
- **THEN** only the appropriate image (desktop or mobile) is loaded
- **AND** unnecessary images are not downloaded
- **AND** page performance is optimized

### Requirement: Why Choose Ocean Food Group Section Background

The "Why Choose Ocean Food Group" section SHALL display background images using `public/images/section-backgrounds/home-card-grid.png` for desktop and `public/images/section-backgrounds/home-card-grid-mb.png` for mobile.

#### Scenario: Why Choose Section Background Implementation

- **GIVEN** the "Why Choose Ocean Food Group" section
- **WHEN** displayed on desktop
- **THEN** `home-card-grid.png` background image is used
- **AND** the image provides visual context for the feature cards
- **AND** text readability is maintained

#### Scenario: Why Choose Section Mobile Background

- **GIVEN** the "Why Choose Ocean Food Group" section
- **WHEN** displayed on mobile
- **THEN** `home-card-grid-mb.png` background image is used
- **AND** the mobile image is optimized for smaller screens
- **AND** the CardGrid component displays properly over the background

### Requirement: Why Work With Us Section Background

The "Why Work With Us" section SHALL display background images using `public/images/section-backgrounds/career-card-grid.png` for desktop and `public/images/section-backgrounds/contact-form-mb.png` for mobile.

#### Scenario: Why Work With Us Section Background Implementation

- **GIVEN** the "Why Work With Us" section
- **WHEN** displayed on desktop
- **THEN** `career-card-grid.png` background image is used
- **AND** the image provides visual context for the career feature cards
- **AND** text readability is maintained

#### Scenario: Why Work With Us Section Mobile Background

- **GIVEN** the "Why Work With Us" section
- **WHEN** displayed on mobile
- **THEN** `contact-form-mb.png` background image is used
- **AND** the mobile image is optimized for smaller screens
- **AND** the CardGrid component displays properly over the background

### Requirement: Contact Form Background

The contact form section SHALL display background images using `public/images/section-backgrounds/contact-form.png` for desktop and `public/images/section-backgrounds/contact-form-mb.png` for mobile.

#### Scenario: Contact Form Background Implementation

- **GIVEN** the contact form section
- **WHEN** displayed on desktop
- **THEN** `contact-form.png` background image is used
- **AND** the image provides visual context for the contact form
- **AND** form readability is maintained

#### Scenario: Contact Form Mobile Background

- **GIVEN** the contact form section
- **WHEN** displayed on mobile
- **THEN** `contact-form-mb.png` background image is used
- **AND** the mobile image is optimized for smaller screens
- **AND** the contact form displays properly over the background

#### Scenario: Contact Form Responsive Behavior

- **GIVEN** the contact form section
- **WHEN** the viewport changes between desktop and mobile breakpoints
- **THEN** the background smoothly transitions between desktop and mobile images
- **AND** no layout shifts occur during the transition
- **AND** form functionality is maintained across all screen sizes

### Requirement: Brand Item Background Images

The "Our Brands" section SHALL conditionally display full-width background images that span the entire container width, while individual brand items maintain horizontal padding.

#### Scenario: Single Brand Background Application

- **GIVEN** the "Our Brands" section displays exactly one brand
- **WHEN** the brands container renders
- **THEN** background images are applied to the entire brands container
- **AND** `public/images/section-backgrounds/home-brand-item.png` is used for desktop
- **AND** `public/images/section-backgrounds/home-brand-item-mb.png` is used for mobile
- **AND** background spans full container width while brand item maintains padding

#### Scenario: Multiple Brands Background Application

- **GIVEN** the "Our Brands" section displays multiple brands
- **WHEN** the brands container renders
- **THEN** background images are applied to the entire brands container
- **AND** background spans full container width while all brand items maintain padding
- **AND** the appropriate responsive images are used

#### Scenario: Brand Container Background Positioning

- **GIVEN** the brands container with background images
- **WHEN** the container renders
- **THEN** the background image covers the full container width
- **AND** brand items are properly layered above the background with horizontal padding
- **AND** text readability is maintained over the background image

#### Scenario: Brand Container Background Accessibility

- **GIVEN** the brands container with background images
- **WHEN** screen readers access the brand content
- **THEN** background images are marked as decorative
- **AND** brand information remains fully accessible
- **AND** sufficient contrast is maintained between text and background

### Requirement: Our Team Section Background Effect

The "Our Team" section SHALL display a gradient background effect with specified opacity.

#### Scenario: Our Team Gradient Background

- **GIVEN** the "Our Team" section
- **WHEN** the section renders
- **THEN** a linear gradient background is applied
- **AND** the gradient uses linear-gradient(180deg, #B4D2FF 0%, rgba(219, 241, 255, 0.00) 97.96%, rgba(195, 219, 255, 0.00) 100%)
- **AND** the background has 0.6 opacity
- **AND** content remains readable over the gradient

#### Scenario: Our Team Background Positioning

- **GIVEN** the "Our Team" section with gradient background
- **WHEN** displayed on any screen size
- **THEN** the gradient covers the full section area
- **AND** the gradient direction is 180 degrees (top to bottom)
- **AND** content is properly layered above the background effect

### Requirement: Featured in Media Section Background Effect

The "Featured in Media" section SHALL display a solid color background with blend mode and blur effects.

#### Scenario: Featured in Media Background Effect

- **GIVEN** the "Featured in Media" section
- **WHEN** the section renders
- **THEN** a solid color background is applied with rgba(0, 84, 255, 0.50)
- **AND** mix-blend-mode multiply is applied
- **AND** a blur filter of 107.69px is applied
- **AND** the effect creates a visual backdrop for the section

#### Scenario: Featured in Media Effect Performance

- **GIVEN** the "Featured in Media" section with blur effect
- **WHEN** rendered on various devices
- **THEN** the blur effect performs well without impacting scroll performance
- **AND** the effect is disabled or optimized on lower-performance devices if needed
- **AND** content remains readable and accessible

### Requirement: Job Postings Section Background Effect

The "Job Postings" section SHALL display a gradient background effect with opacity 0.6 and linear-gradient(180deg, #B4D2FF 0%, rgba(219, 241, 255, 0.00) 97.96%, rgba(195, 219, 255, 0.00) 100%) on both desktop and mobile.

#### Scenario: Job Postings Background Effect

- **GIVEN** the "Job Postings" section
- **WHEN** the section renders on any screen size
- **THEN** a gradient background is applied with linear-gradient(180deg, #B4D2FF 0%, rgba(219, 241, 255, 0.00) 97.96%, rgba(195, 219, 255, 0.00) 100%)
- **AND** opacity of 0.6 is applied to the background
- **AND** the effect creates a visual backdrop for the job postings content

#### Scenario: Job Postings Effect Consistency

- **GIVEN** the "Job Postings" section with gradient background effect
- **WHEN** viewed on desktop and mobile devices
- **THEN** the same gradient effect is applied consistently across all screen sizes
- **AND** no responsive variations are applied to the background effect
- **AND** content remains readable and accessible over the gradient background

### Requirement: Franchise Form Background

The franchise form section SHALL display background images using `public/images/section-backgrounds/franchise-form.png` for desktop and `public/images/section-backgrounds/franchise-form-mb.png` for mobile.

#### Scenario: Franchise Form Desktop Background

- **GIVEN** the franchise form section
- **WHEN** viewed on desktop screens (>768px)
- **THEN** `public/images/section-backgrounds/franchise-form.png` is displayed as background image
- **AND** the image covers the full section area
- **AND** form content is properly layered above the background

#### Scenario: Franchise Form Mobile Background

- **GIVEN** the franchise form section
- **WHEN** viewed on mobile screens (≤768px)
- **THEN** `public/images/section-backgrounds/franchise-form-mb.png` is displayed as background image
- **AND** the mobile image is optimized for smaller screens
- **AND** form content is properly layered above the background

#### Scenario: Franchise Form Responsive Behavior

- **GIVEN** the franchise form section
- **WHEN** the viewport changes between desktop and mobile breakpoints
- **THEN** the background smoothly transitions between desktop and mobile images
- **AND** no layout shifts occur during the transition
- **AND** form functionality is maintained across all screen sizes

### Requirement: Franchise Form Footer Background

The franchise form footer SHALL display `public/images/section-backgrounds/franchise-form-footer.png` as a full-width background image below the form section.

#### Scenario: Franchise Form Footer Background

- **GIVEN** the franchise form footer section
- **WHEN** the footer renders
- **THEN** `public/images/section-backgrounds/franchise-form-footer.png` is displayed as background image
- **AND** the image spans the full width of the section
- **AND** the footer provides visual continuity below the form

#### Scenario: Franchise Form Footer Positioning

- **GIVEN** the franchise form footer
- **WHEN** positioned below the franchise form
- **THEN** the footer image is properly aligned with the form section
- **AND** no gaps or misalignments occur between sections
- **AND** the visual flow from form to footer is seamless
