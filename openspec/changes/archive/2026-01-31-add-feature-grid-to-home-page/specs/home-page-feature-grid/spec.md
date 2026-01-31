# home-page-feature-grid Specification Delta

## ADDED Requirements

### Requirement: Home Page Feature Grid Section

The home page SHALL include a FeatureGrid component section positioned below the callout, displaying the latest three published media reviews.

#### Scenario: Feature Grid Positioning

- **GIVEN** the home page is rendered
- **WHEN** the page layout is displayed
- **THEN** a FeatureGrid component appears below the callout section
- **AND** it maintains consistent spacing with other home page sections

#### Scenario: Media Reviews Data Display

- **GIVEN** published media reviews exist in the database
- **WHEN** the home page loads
- **THEN** the latest 3 published media reviews are fetched server-side
- **AND** each review's title, excerpt, and cover image are displayed
- **AND** each review links to its individual media review page

#### Scenario: Content Unit Links to Media Review Details

- **GIVEN** a FeatureGrid content unit displaying a media review
- **WHEN** the user clicks on the unit
- **THEN** they are navigated to the media review details page at `/media-reviews/${slug}`
- **AND** the page displays the full media review content

#### Scenario: Feature Grid Content Mapping

- **GIVEN** a media review with title, excerpt, cover_image_url, and slug
- **WHEN** mapped to FeatureGrid feature format
- **THEN** title becomes the feature title
- **AND** excerpt becomes the feature description (with fallback if null)
- **AND** cover_image_url becomes the feature image
- **AND** `/media-reviews/${slug}` becomes the feature link

#### Scenario: Intro Section Content

- **GIVEN** the FeatureGrid intro section
- **WHEN** displayed on the home page
- **THEN** it shows appropriate placeholder text about media coverage
- **AND** the button links to the media reviews page (`/media-reviews`)
- **AND** the button text encourages exploration of media coverage

#### Scenario: Mobile Layout Optimization

- **GIVEN** the home page is viewed on mobile devices (≤768px)
- **WHEN** the FeatureGrid section renders
- **THEN** only the intro section is displayed
- **AND** the background image maintains its 750:510 aspect ratio
- **AND** the container uses full viewport width without padding
- **AND** content is constrained to prevent horizontal overflow

#### Scenario: Insufficient Media Reviews

- **GIVEN** fewer than 3 published media reviews exist
- **WHEN** the home page loads
- **THEN** the FeatureGrid component does not render
- **AND** the page layout remains intact without the section

#### Scenario: Media Review Excerpt Handling

- **GIVEN** a media review with a null excerpt field
- **WHEN** displayed in the FeatureGrid
- **THEN** a fallback description is used
- **AND** the layout remains consistent with other reviews

### Requirement: Home Page Data Fetching

The home page SHALL fetch media review data server-side during page load.

#### Scenario: Server-Side Data Fetching

- **GIVEN** the home page component
- **WHEN** rendered server-side
- **THEN** it calls `fetchPublishedMediaReviews(0, 3)` or equivalent
- **AND** the data is available during initial page load
- **AND** no client-side data fetching occurs for this section

#### Scenario: Error Handling

- **GIVEN** media review data fetching fails
- **WHEN** the home page renders
- **THEN** the FeatureGrid section is omitted gracefully
- **AND** the rest of the home page renders normally
- **AND** errors are logged appropriately