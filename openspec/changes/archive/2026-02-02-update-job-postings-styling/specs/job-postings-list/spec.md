## MODIFIED Requirements

### Requirement: JobPostingCard component displays job posting with enhanced styling

The site SHALL provide a `JobPostingCard` component that renders a single job posting item with improved visual design including alternating background colors, tag-style elements, and enhanced typography.

#### Scenario: Display job posting with alternating background colors

- **GIVEN** a job posting object with title, company_name, suburb, state, employment_type, and description
- **WHEN** the `JobPostingCard` component is rendered with an index prop
- **THEN** the card uses alternating background colors:
  - Even index (0, 2, 4...): light blue background `rgba(57, 98, 242, 0.02)`
  - Odd index (1, 3, 5...): light gray background `#F3F6FE`
- **AND** the card maintains shadow and rounded corner styling

#### Scenario: Display job title with enhanced typography

- **GIVEN** a job posting with title and company_name
- **WHEN** the `JobPostingCard` component renders the title
- **THEN** the title displays in format "[title] - [company_name]" (e.g., "Seafood Processing Worker - Pacific Seafood Co")
- **AND** the title uses color `#0F75BC` (primary blue)
- **AND** the title uses font size `--fs-body-lg`
- **AND** the title remains limited to 2 line with ellipsis
- **AND** there is 12px gap between title, location+job type, and description

#### Scenario: Display location and employment type as tag elements

- **GIVEN** a job posting with suburb, state, and employment_type
- **WHEN** the `JobPostingCard` component renders location and employment type
- **THEN** the location "[suburb] [state]" displays as a tag with:
  - Border radius: 48px
  - Border: 1.2px solid #015AED
  - Background: #F3F8FF
  - Font size: `--fs-caption`
  - Text color: `#0F75BC`
- **AND** the employment type displays as a tag with:
  - Border radius: 56px
  - Background: #D6F2ED
  - Font size: `--fs-caption`
  - Text color: `#0E493F`
- **AND** the tags have `--space-md` gap between them

#### Scenario: Display description with enhanced typography

- **GIVEN** a job posting with description
- **WHEN** the `JobPostingCard` component renders the description
- **THEN** the description uses color `#5D6C7D`
- **AND** the description uses font size `--fs-body`
- **AND** the description remains limited to 4 lines with ellipsis

#### Scenario: Display apply now with paper plane icon

- **GIVEN** a job posting with external_apply_url
- **WHEN** the `JobPostingCard` component renders the apply action
- **THEN** the icon uses `public/images/icons/paper-plane.svg` instead of arrow
- **AND** the icon maintains hover states and proper sizing
- **AND** the "Apply Now" text has color `#0F75BC`
- **AND** the "Apply Now" text has text align center
- **AND** the "Apply Now" text has font size `--fs-body-sm`
- **AND** the "Apply Now" text has font style normal
- **AND** the "Apply Now" text has font weight 500
- **AND** the "Apply Now" text has line height normal
- **AND** the "Apply Now" text has text transform capitalize

### Requirement: Job postings use alternating background colors

The site SHALL display job posting cards with alternating background colors for visual separation.

#### Scenario: Job posting cards have alternating background colors

- **GIVEN** a list of job posting cards
- **WHEN** the cards are rendered
- **THEN** even-indexed cards (1st, 3rd, 5th...) have light blue background `rgba(57, 98, 242, 0.02)`
- **AND** odd-indexed cards (2nd, 4th, 6th...) have light gray background `#F3F6FE`
- **AND** the alternating colors are implemented using CSS nth-child selectors

### Requirement: Job posting cards have styled outer wrapper

The site SHALL style the outer wrapper of job posting cards with specific fill and stroke properties.

#### Scenario: Job posting card wrapper has styled border and fill

- **GIVEN** a job posting card component
- **WHEN** the card wrapper is rendered
- **THEN** the wrapper has fill color `#FFF` (white)
- **AND** the wrapper has stroke width `1.2px`
- **AND** the wrapper has stroke color `#DBDEED` (light gray)
- **AND** the styling maintains rounded corners and shadow effects

### Requirement: Job posting section has background images

The site SHALL display background images for the job posting section with different images for desktop and mobile.

#### Scenario: Job posting section has background images

- **GIVEN** the job postings section
- **WHEN** the section is rendered
- **THEN** the section has background image `public/images/section-backgrounds/job-list.png` on desktop
- **AND** the section has background image `public/images/section-backgrounds/job-list-mb.png` on mobile

### Requirement: Job postings list has no separator lines

The site SHALL remove separator lines between job posting cards in the list.

#### Scenario: Job postings list displays without separator lines

- **GIVEN** a job postings list with multiple job cards
- **WHEN** the `JobPostingsList` component is rendered
- **THEN** there are no separator lines between job cards
- **AND** the alternating background colors provide visual separation

### Requirement: Job postings list displays title above job cards

The site SHALL display a title "Open Positions" above the job postings list within the outer wrapper.

#### Scenario: Job postings list shows title at the top

- **GIVEN** a job postings list with job cards
- **WHEN** the `JobPostingsList` component is rendered
- **THEN** the title "Open Positions" appears above the job cards
- **AND** the title is positioned within the outer wrapper
- **AND** the title has color `#153E5E`
- **AND** the title has font size `--fs-h4`
- **AND** the title has font style normal
- **AND** the title has font weight 600
- **AND** the title has line height 100%
- **AND** the title has border radius 8px
- **AND** the title has background `#E7ECFD`
- **AND** the title background spans the full width of its outer wrapper
- **AND** the title has padding 16px
- **AND** there is appropriate spacing between the title and the first job card

### Requirement: Job posting cards have responsive layout

The site SHALL display job posting cards with different layouts on desktop and mobile.

#### Scenario: Desktop layout maintains side-by-side structure

- **GIVEN** a job posting card displayed on desktop (screen width >= 768px)
- **WHEN** the `JobPostingCard` component is rendered
- **THEN** the layout shows info (title, description, tags) on the left side
- **AND** the apply now section appears on the right side
- **AND** the elements maintain horizontal alignment

#### Scenario: Mobile layout stacks elements vertically

- **GIVEN** a job posting card displayed on mobile (screen width < 768px)
- **WHEN** the `JobPostingCard` component is rendered
- **THEN** the layout stacks elements vertically: title, description, tags, apply now
- **AND** the apply now section shows icon on the left and text on the right
- **AND** all elements are centered or left-aligned appropriately