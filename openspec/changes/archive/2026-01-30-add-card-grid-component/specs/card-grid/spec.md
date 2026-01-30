# Card Grid Component

## Purpose

A reusable component for displaying collections of cards in a responsive grid layout with support for multiple variants.

## ADDED Requirements

### Requirement: Responsive Grid Layout

- The Card Grid component SHALL display cards in exactly 1 row on desktop and tablet screens (≥768px), adapting the number of visible cards based on screen size while maintaining the single-row layout. On mobile screens (<768px), Feature variant SHALL use horizontal scrolling to display all cards with 1 full card and ~50% of the next card visible by default, Image and Centered variants SHALL display 2 cards per row and may use multiple rows as needed, Expandable variant SHALL display 1 card per row (full width) and may use multiple rows as needed.

#### Scenario: Large Screen Layout

- Given the Card Grid component is rendered on a large screen (≥1200px width)
- When displaying cards
- Then exactly 4 cards are shown in 1 row
- And the grid maintains consistent spacing and alignment

#### Scenario: Medium Screen Layout

- Given the Card Grid component is rendered on a medium screen (≥768px width)
- When displaying cards
- Then exactly 3 cards are shown in 1 row
- And the grid maintains consistent spacing and alignment

#### Scenario: Small Screen Layout

- Given the Card Grid component is rendered on a small screen (<768px width)
- And the component uses "feature" variant
- When displaying 3 or 4 cards
- Then the component uses horizontal scrolling layout
- And 1 full card is visible with approximately 50% of the next card
- And all cards are accessible through horizontal scrolling

#### Scenario: Small Screen Layout Other Variants

- Given the Card Grid component is rendered on a small screen (<768px width)
- And the component uses "image" or "centered" variant
- When displaying 3 or more cards
- Then exactly 2 cards are shown per row
- And excess cards are not displayed or handled according to overflow rules

#### Scenario: Expandable Mobile Full-Width Layout

- Given the Card Grid component is rendered on a small screen (<768px width)
- And the component uses "expandable" variant
- When displaying 3 or 4 cards
- Then exactly 1 card is shown per row (full width)
- And cards are displayed in 3 or 4 rows respectively
- And each card can expand to show full content when interacted with

#### Scenario: Image Mobile 2-Column Layout

- Given the Card Grid component uses "image" variant on mobile screens (<768px)
- When displaying cards
- Then exactly 2 cards are shown per row
- And the grid maintains consistent spacing and alignment

### Requirement: Three Component Variants

- The Card Grid component SHALL support exactly four distinct variants that provide different visual presentations or behaviors: Feature (icon with bullet points), Image (image with title and text), Expandable (interactive folded/unfolded states), and Centered (centered vertical layout).
- Feature variant SHALL include an optional icon (80px size at 1920px baseline, default icon used if not provided) above a left-aligned title (font size `var(--fs-h4)`), with bullet point text below (font size `var(--fs-body-lg)`), baseline dimensions of 442px × 456px when displaying 3 cards (aspect ratio ≈ 0.97:1) or 324px × 452px when displaying 4 cards (aspect ratio ≈ 0.72:1) at 1920px screen width with proportional scaling at other screen sizes while maintaining aspect ratios, on mobile screens (<768px) SHALL use horizontal scrolling container with `bg-3card.png` background for all cards showing 1 full card + ~50% of next card by default with scrollable access to all cards, border radius of `var(--radius-lg)`, default background image of `public/images/components/card-grid/v1/bg-3card.png` when displaying 3 cards or `public/images/components/card-grid/v1/bg-4card.png` when displaying 4 cards on desktop/tablet, and hover effects changing background to primary color with upward movement.
- Image variant SHALL include an image at the top, title below the image (single line), and text below the title (single line), with baseline dimensions of 318px × 388px (aspect ratio ≈ 0.82:1) at 1920px screen width with proportional scaling at other screen sizes while maintaining aspect ratio, gap of `var(--space-md)` between image and title, image border radius of `var(--radius-lg)`, and SHALL display exactly 2 cards per row on mobile screens (<768px).
- Expandable variant SHALL include interactive folded/unfolded states with hover effects (desktop/tablet) or click/tap interactions (mobile), displaying background image, optional icon (default icon used if not provided), and title when folded (442px × 456px dimensions with 0.97:1 aspect ratio when displaying 3 cards, or 324px × 452px dimensions with 0.72:1 aspect ratio when displaying 4 cards at 1920px baseline), and expanding to 2x width when unfolded (884px × 456px dimensions with 1.94:1 aspect ratio when displaying 3 cards, or 648px × 452px dimensions with 1.43:1 aspect ratio when displaying 4 cards at 1920px baseline) showing title and text content (12 lines max) with typography matching other variants, border radius of `var(--radius-lg)` for both folded and unfolded states, default background images `bg-{n}-3cards.png` for folded state and `bg-{n}-3cards-expanded.png` for unfolded state from `public/images/components/card-grid/v3/` where {n} is the card position (1-3) when displaying 3 cards, or `bg-{n}-4cards.png` for folded state and `bg-{n}-4cards-expanded.png` for unfolded state from `public/images/components/card-grid/v3/` where {n} is the card position (1-4) when displaying 4 cards. There SHALL ALWAYS be exactly one unfolded card and the rest folded - by default the first card is unfolded, and interacting with any card SHALL unfold it while folding the currently unfolded card.
- Centered variant SHALL include a centered vertical layout with optional icon (max width 150px at 1920px baseline, cycles through default icons 1.svg, 2.svg, 3.svg, 4.svg from /public/images/components/card-grid/v4/ if not provided) at the top, center-aligned title below, and center-aligned text below the title, using the same typography as other variants, border radius of `var(--radius-lg)`, and baseline dimensions of 442px × 456px (aspect ratio ≈ 0.97:1) when displaying 3 cards or 324px × 452px (aspect ratio ≈ 0.72:1) when displaying 4 cards at 1920px screen width with proportional scaling at other screen sizes while maintaining aspect ratios.

#### Scenario: Feature Layout

- Given the Card Grid component uses "feature" variant
- When a card is rendered
- Then the icon appears above the title
- And the title is left-aligned and limited to one line
- And bullet points appear below the title with maximum 8 lines

#### Scenario: Feature Dimensions with 3 Cards

- Given the Card Grid component uses "feature" variant
- And exactly 3 cards are displayed at 1920px screen width
- When a card is rendered
- Then the card baseline dimensions are 442px × 456px (aspect ratio ≈ 0.97:1)
- And cards scale proportionally at other screen sizes while maintaining aspect ratio

#### Scenario: Feature Dimensions with 4 Cards

- Given the Card Grid component uses "feature" variant
- And exactly 4 cards are displayed at 1920px screen width
- When a card is rendered
- Then the card baseline dimensions are 324px × 452px (aspect ratio ≈ 0.72:1)
- And cards scale proportionally at other screen sizes while maintaining aspect ratio

#### Scenario: Feature Responsive Scaling

- Given the Card Grid component uses "feature" variant
- When the screen size changes from 1920px to smaller sizes
- Then the card dimensions scale proportionally
- And the aspect ratio is maintained (0.97:1 for 3 cards, 0.72:1 for 4 cards)
- And the background images scale appropriately without distortion

#### Scenario: Feature Mobile Horizontal Scroll

- Given the Card Grid component uses "feature" variant on mobile screens (<768px)
- When 3 or 4 cards are displayed
- Then all cards use `bg-3card.png` as background image
- And the component uses horizontal scrolling layout
- And 1 full card is visible with approximately 50% of the next card
- And users can scroll horizontally to see all cards

#### Scenario: Feature Mobile Scroll Behavior

- Given the Card Grid component uses "feature" variant on mobile screens (<768px)
- And multiple cards are displayed
- When the user scrolls horizontally
- Then scroll snap behavior positions cards appropriately
- And all cards remain accessible through scrolling

#### Scenario: Feature Styling

- Given the Card Grid component uses "feature" variant
- When a card is in default state
- Then the border radius is `var(--radius-lg)`

#### Scenario: Feature Background with 3 Cards

- Given the Card Grid component uses "feature" variant
- And exactly 3 cards are displayed
- When a card is in default state
- Then the background uses `public/images/components/card-grid/v1/bg-3card.png`

#### Scenario: Feature Background with 4 Cards

- Given the Card Grid component uses "feature" variant
- And exactly 4 cards are displayed
- When a card is in default state
- Then the background uses `public/images/components/card-grid/v1/bg-4card.png`

#### Scenario: Feature Typography and Icon Sizing

- Given the Card Grid component uses "feature" variant at 1920px baseline
- When a card is rendered
- Then the icon has a size of 80px
- And the title uses font size `var(--fs-h4)`
- And the bullet point text uses font size `var(--fs-body-lg)`

#### Scenario: Feature Hover Effects

- Given the Card Grid component uses "feature" variant
- When a user hovers over a card
- Then the background changes to `var(--color-primary-base)`
- And the card moves upward by `var(--space-md)`
- And the box-shadow becomes `0 16px 30px 7px rgba(0, 75, 160, 0.29)`

#### Scenario: Image Layout

- Given the Card Grid component uses "image" variant
- When a card is rendered
- Then the image appears at the top
- And the title appears below the image and is limited to one line
- And the text appears below the title and is limited to one line
- And the card has baseline dimensions of 318px × 388px (aspect ratio ≈ 0.82:1) at 1920px screen width

#### Scenario: Image Spacing

- Given the Card Grid component uses "image" variant
- When a card is rendered
- Then there is a gap of `var(--space-md)` between the image and title
- And there is a gap of 12px between the title and text

#### Scenario: Image Grid Constraints

- Given the Card Grid component uses "image" variant
- When rendered on desktop screens
- Then exactly 3-4 cards are shown in 1 row
- And the layout follows the component's single-row grid constraints

#### Scenario: Image Responsive Scaling

- Given the Card Grid component uses "image" variant
- When the screen size changes from 1920px to smaller sizes
- Then the card dimensions scale proportionally
- And the aspect ratio is maintained (0.82:1)
- And images scale appropriately without distortion

#### Scenario: Expandable Folded State with 3 Cards

- Given the Card Grid component uses "expandable" variant at 1920px baseline
- And exactly 3 cards are displayed
- When a card is in unhovered state
- Then the card displays in folded state with dimensions 442px × 456px (aspect ratio ≈ 0.97:1)
- And the background image is partially visible
- And the icon (user-provided or default) is displayed
- And the user-provided title is displayed

#### Scenario: Expandable Folded State with 4 Cards

- Given the Card Grid component uses "expandable" variant at 1920px baseline
- And exactly 4 cards are displayed
- When a card is in unhovered state
- Then the card displays in folded state with dimensions 324px × 452px (aspect ratio ≈ 0.72:1)
- And the background image is partially visible
- And the icon (user-provided or default) is displayed
- And the user-provided title is displayed

#### Scenario: Expandable Unfolded State with 3 Cards

- Given the Card Grid component uses "expandable" variant at 1920px baseline
- And exactly 3 cards are displayed
- When a card is hovered
- Then the card expands to unfolded state with dimensions 884px × 456px (aspect ratio ≈ 1.94:1)
- And the icon is not displayed
- And the user-provided title is displayed as a single line
- And the user-provided text content is displayed with maximum 12 lines

#### Scenario: Expandable Unfolded State with 4 Cards

- Given the Card Grid component uses "expandable" variant at 1920px baseline
- And exactly 4 cards are displayed
- When a card is hovered
- Then the card expands to unfolded state with dimensions 648px × 452px (aspect ratio ≈ 1.43:1)
- And the icon is not displayed
- And the user-provided title is displayed as a single line
- And the user-provided text content is displayed with maximum 12 lines

#### Scenario: Expandable Typography

- Given the Card Grid component uses "expandable" variant
- When a card is rendered
- Then the title uses font size `var(--fs-h4)`
- And the text content uses font size `var(--fs-body-lg)`

#### Scenario: Expandable Default State

- Given the Card Grid component uses "expandable" variant
- When initially rendered
- Then the first card is in unfolded state
- And all other cards are in folded state

#### Scenario: Expandable Single Expanded Card

- Given the Card Grid component uses "expandable" variant with multiple cards
- And one card is currently unfolded
- When interacting with a different folded card (hovering on desktop or clicking/tapping on mobile)
- Then the previously unfolded card folds
- And the interacted card unfolds
- And only one card remains unfolded

#### Scenario: Expandable Maintains Expanded State

- Given the Card Grid component uses "expandable" variant on desktop/tablet screens (≥768px)
- And a card is unfolded
- When the mouse moves away without hovering another card
- Then the unfolded card remains unfolded
- And no other card unfolds automatically

#### Scenario: Expandable Mobile Click Interaction

- Given the Card Grid component uses "expandable" variant on mobile screens (<768px)
- And one card is currently unfolded
- When clicking/tapping a different folded card
- Then the previously unfolded card folds
- And the clicked/tapped card unfolds
- And only one card remains unfolded

#### Scenario: Expandable Background with 4 Cards Folded

- Given the Card Grid component uses "expandable" variant
- And exactly 4 cards are displayed
- When a card is in folded state at position {n} (1-4)
- Then the background uses `bg-{n}-4cards.png` from `public/images/components/card-grid/v3/`

#### Scenario: Expandable Background with 4 Cards Unfolded

- Given the Card Grid component uses "expandable" variant
- And exactly 4 cards are displayed
- When a card is in unfolded state at position {n} (1-4)
- Then the background uses `bg-{n}-4cards-expanded.png` from `public/images/components/card-grid/v3/`

#### Scenario: Expandable Background with 3 Cards Folded

- Given the Card Grid component uses "expandable" variant
- And exactly 3 cards are displayed
- When a card is in folded state at position {n} (1-3)
- Then the background uses `bg-{n}-3cards.png` from `public/images/components/card-grid/v3/`

#### Scenario: Expandable Background with 3 Cards Unfolded

- Given the Card Grid component uses "expandable" variant
- And exactly 3 cards are displayed
- When a card is in unfolded state at position {n} (1-3)
- Then the background uses `bg-{n}-3cards-expanded.png` from `public/images/components/card-grid/v3/`

#### Scenario: Centered Layout

- Given the Card Grid component uses "centered" variant
- When a card is rendered
- Then the icon (user-provided or default) appears at the top and is center-aligned
- And the title appears below the icon and is center-aligned
- And the text appears below the title and is center-aligned

#### Scenario: Centered Dimensions with 3 Cards

- Given the Card Grid component uses "centered" variant at 1920px baseline
- And exactly 3 cards are displayed
- When a card is rendered
- Then the card has baseline dimensions of 442px × 456px (aspect ratio ≈ 0.97:1) at 1920px screen width

#### Scenario: Centered Dimensions with 4 Cards

- Given the Card Grid component uses "centered" variant at 1920px baseline
- And exactly 4 cards are displayed
- When a card is rendered
- Then the card has baseline dimensions of 324px × 452px (aspect ratio ≈ 0.72:1) at 1920px screen width

#### Scenario: Centered Icon Sizing

- Given the Card Grid component uses "centered" variant at 1920px baseline
- When a card is rendered
- Then the icon has a maximum width of 150px
- And maintains its aspect ratio

#### Scenario: Centered Typography

- Given the Card Grid component uses "centered" variant
- When a card is rendered
- Then the title uses font size `var(--fs-h4)`
- And the text uses font size `var(--fs-body-lg)`

#### Scenario: Image Border Radius

- Given the Card Grid component uses "image" variant
- When a card is rendered
- Then the image has a border radius of `var(--radius-lg)`

#### Scenario: Expandable Border Radius

- Given the Card Grid component uses "expandable" variant
- When a card is in folded state
- Then the border radius is `var(--radius-lg)`
- And when a card is in unfolded state
- Then the border radius is `var(--radius-lg)`

#### Scenario: Centered Border Radius

- Given the Card Grid component uses "centered" variant
- When a card is rendered
- Then the border radius is `var(--radius-lg)`

#### Scenario: Centered Box Shadow

- Given the Card Grid component uses "centered" variant
- When a card is rendered
- Then the box shadow is `0 9.6px 52.8px 0 rgba(0, 0, 0, 0.10)`

#### Scenario: Centered Background with 3 Cards

- Given the Card Grid component uses "centered" variant
- When 3 cards are provided
- Then the background uses `public/images/components/card-grid/v4/bg-3cards.png`

#### Scenario: Centered Background with 4 Cards

- Given the Card Grid component uses "centered" variant
- When 4 cards are provided
- Then the background uses `public/images/components/card-grid/v4/bg-4cards.png`

#### Scenario: Variant Selection

- Given the Card Grid component accepts a variant prop
- When variant is set to "feature", "image", "expandable", or "centered"
- Then the component renders with the appropriate styling and layout for that variant

#### Scenario: Variant Consistency

- Given multiple Card Grid instances use the same variant
- When rendered on the same page
- Then they maintain visual and behavioral consistency

### Requirement: Card Padding

- All cards in the Card Grid component SHALL have consistent internal padding of 36px applied to all sides.

#### Scenario: Card Padding Application

- Given the Card Grid component renders any variant
- When a card is displayed
- Then the card has 36px padding on all sides
- And the padding is consistent across all variants

### Requirement: Card Content Flexibility

- The Card Grid component SHALL accept an array of at most 4 card data objects provided by the component user, containing various content types including icons and bullet points for variant 1, images with title and text for variant 2, background images, icons, titles, and text for variant 3, and background images, icons, titles, and text for variant 4.

#### Scenario: Feature Card Content

- Given card data for "feature" variant provided by the component user includes icon, title, and bulletPoints array
- When the Card Grid renders
- Then the user-provided icon displays above the title
- And the user-provided title displays as a single line
- And user-provided bullet points display below the title with proper formatting

#### Scenario: Feature Card Content Without Icon

- Given card data for "feature" variant provided by the component user includes title and bulletPoints array but no icon
- When the Card Grid renders
- Then a default icon displays above the title
- And the user-provided title displays as a single line
- And user-provided bullet points display below the title with proper formatting

#### Scenario: Image Card Content

- Given card data for "image" variant provided by the component user includes image, title, and text
- When the Card Grid renders
- Then the user-provided image displays at the top
- And the user-provided title displays below the image as a single line
- And the user-provided text displays below the title as a single line

#### Scenario: Image Card Requires Image

- Given card data for "image" variant provided by the component user includes title and text but no image
- When the Card Grid attempts to render
- Then the component throws an error or displays a placeholder
- And the card layout is not rendered properly

#### Scenario: Expandable Card Content

- Given card data for "expandable" variant provided by the component user includes backgroundImage, icon, title, and text
- When the Card Grid renders
- Then the user-provided backgroundImage is used as the card background
- And the user-provided icon is available for folded state display
- And the user-provided title is available for both states
- And the user-provided text is available for unfolded state display

#### Scenario: Expandable Card Content Without Icon

- Given card data for "expandable" variant provided by the component user includes backgroundImage, title, and text but no icon
- When the Card Grid renders
- Then the user-provided backgroundImage is used as the card background
- And a default icon is available for folded state display
- And the user-provided title is available for both states
- And the user-provided text is available for unfolded state display

#### Scenario: Centered Card Content

- Given card data for "centered" variant provided by the component user includes icon, title, and text
- When the Card Grid renders
- Then the user-provided icon displays at the top
- And the user-provided title displays below the icon
- And the user-provided text displays below the title

#### Scenario: Centered Card Content Without Icon

- Given card data for "centered" variant provided by the component user includes title and text but no icon
- When the Card Grid renders
- Then one of the default icons (1.svg, 2.svg, 3.svg, 4.svg) displays at the top
- And the component cycles through available default icons for cards without user-provided icons
- And the user-provided title displays below the icon
- And the user-provided text displays below the title

#### Scenario: Basic Card Content

- Given card data includes id, title, and description
- When the Card Grid renders
- Then each card displays the title and description appropriately

#### Scenario: Card with Image

- Given card data includes an image URL
- When the Card Grid renders
- Then images are displayed using Next.js Image component with optimization

#### Scenario: Card Interaction

- Given card data includes optional action handlers
- When a user interacts with a card
- Then the appropriate action is triggered

#### Scenario: Maximum Card Limit

- Given the Card Grid component is provided with more than 4 cards
- When the component renders
- Then only the first 4 cards are displayed
- And excess cards are not rendered

### Requirement: Accessibility Compliance

- The Card Grid component SHALL be fully accessible to users with disabilities.

#### Scenario: Screen Reader Support

- Given a screen reader user navigates the Card Grid
- When encountering the component
- Then semantic HTML structure provides clear navigation and content announcement

#### Scenario: Keyboard Navigation

- Given a keyboard-only user
- When navigating through cards
- Then focus management works correctly with Tab key
- And Enter/Space keys trigger card actions

### Requirement: Performance Optimization

- The Card Grid component SHALL be optimized for performance with large numbers of cards.

#### Scenario: Image Loading

- Given cards contain images
- When the grid is rendered
- Then images load lazily to improve initial page load performance

#### Scenario: Large Dataset

- Given 50+ cards in the grid
- When rendered
- Then the component maintains smooth scrolling and interaction performance
