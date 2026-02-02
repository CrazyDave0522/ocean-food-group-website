# job-postings-list Specification

## Purpose
Defines the job postings list feature for the Ocean Food Group careers page, including job posting cards with alternating backgrounds, responsive layout, background images, and infinite scroll pagination.
## Requirements
### Requirement: JobPostingCard component displays job posting with metadata

The site SHALL provide a `JobPostingCard` component that renders a single job posting item with title, company name, location, employment type, and description. The entire card is clickable and navigates to the job detail page.

#### Scenario: Display job posting on desktop

- **GIVEN** a job posting object with title, company_name, suburb, state, employment_type, and description
- **WHEN** the `JobPostingCard` component is rendered on a desktop viewport (md and larger)
- **THEN** the card displays with white background, subtle border, and shadow
- **AND** the card uses a flex layout with content on the left and action indicator on the right
- **AND** the right side content has `--space-xl` (32px) horizontal spacing from the left content
- **AND** the left side displays title and company name in format: "[title] - [company_name]" (e.g., "Kitchen Manager - Ocean Food Group")
- **AND** the title and company name line is limited to 2 lines maximum with ellipsis (`...`) if text overflows
- **AND** the title and company name appear as an h2 heading with `--fs-body-lg` font size and primary blue color
- **AND** below that displays the description, truncated to 2 lines maximum with ellipsis (`...`) if longer
- **AND** below the description displays location and employment type as styled tag elements
- **AND** the location tag shows "[suburb] [state]" (e.g., "Sydney NSW")
- **AND** the employment type tag shows the formatted label (e.g., "Full Time")
- **AND** the tags have rounded corners and appropriate styling
- **AND** the right side displays a paper plane icon with "Apply Now" text below it
- **AND** the icon and text are vertically centered
- **AND** the card has `--space-md` (16px) vertical padding and `--space-xl` (32px) horizontal padding
- **AND** cards have alternating background colors for visual separation

#### Scenario: Display job posting on mobile

- **GIVEN** a job posting object with title, company_name, suburb, state, employment_type, and description
- **WHEN** the `JobPostingCard` component is rendered on a mobile viewport (< md)
- **THEN** the layout uses column layout with content stacked vertically
- **AND** displays title and company name at the top
- **AND** below that displays the description
- **AND** below the description displays location and employment type as styled tag elements
- **AND** below the tags displays the "Apply Now" button centered horizontally
- **AND** the "Apply Now" button includes a paper plane icon
- **AND** the card has `--space-md` (16px) padding on all sides
- **AND** font sizes are adjusted for mobile readability
- **AND** all content remains readable without horizontal scrolling

#### Scenario: Metadata is displayed with appropriate typography

- **GIVEN** a job posting with title, company_name, suburb, state, employment_type, and description
- **WHEN** the `JobPostingCard` component renders the employment type
- **THEN** the title displays in format "[title] - [company_name]" with `--fs-body-lg` font size and primary blue color
- **AND** the title is limited to 2 lines maximum with ellipsis (`...`) if text overflows
- **AND** the description is displayed with body text size and limited to 2 lines with ellipsis
- **AND** the location and employment type are displayed as separate styled tag elements
- **AND** the location tag shows "[suburb] [state]" with appropriate styling
- **AND** the employment type tag shows the formatted label from `formatEmploymentType` utility
- **AND** the tags have rounded corners, padding, and appropriate colors
- **AND** no company logos are displayed; the card displays only text content

#### Scenario: Clicking icon or Apply Now opens external link in new tab

- **GIVEN** a rendered `JobPostingCard` with an external_apply_url field containing a URL
- **WHEN** the user clicks on the icon or "Apply Now" text on the right side of the card
- **THEN** the browser opens the external_apply_url in a new tab using `target="_blank"`
- **AND** the link includes `rel="noopener noreferrer"` for security
- **AND** the original careers page remains open in the current tab
- **AND** only the icon and "Apply Now" text are clickable, not the rest of the card (title, company, location, employment type, description are not clickable)

#### Scenario: Card with no external URL has no clickable action

- **GIVEN** a rendered `JobPostingCard` with external_apply_url as null
- **WHEN** the card is displayed
- **THEN** the icon and "Apply Now" elements are not rendered or are disabled
- **AND** the card content (title, company, location, employment type, description) is displayed as static text with no click interaction

#### Scenario: Icon and Apply Now display hover state for visual feedback

- **GIVEN** a rendered `JobPostingCard` with an external_apply_url
- **WHEN** the user hovers over the icon or "Apply Now" text
- **THEN** the icon and text change color from slate-500 to blue-600 for visual feedback
- **AND** the cursor changes to pointer style over the clickable button
- **AND** the rest of the card (title, company, location, employment type, description) does not show hover effects and uses default cursor

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

### Requirement: Employment type formatting is consistent and reusable

The site SHALL provide a reusable utility function to format employment type enum values to human-readable labels consistently across the application.

#### Scenario: Employment type formatting utility handles all enum values

- **GIVEN** an employment type enum value (e.g., "full_time", "part_time", "casual", "contract", "intern")
- **WHEN** the `formatEmploymentType` utility function is called with the enum value
- **THEN** the function returns the human-readable label:
  - "full_time" → "Full Time"
  - "part_time" → "Part Time"
  - "casual" → "Casual"
  - "contract" → "Contract"
  - "intern" → "Intern"
- **AND** unknown values return the original value unchanged

#### Scenario: JobPostingCard uses employment type formatting utility

- **GIVEN** a job posting with employment_type field
- **WHEN** the `JobPostingCard` component renders the employment type
- **THEN** the component calls `formatEmploymentType` to convert the enum value
- **AND** displays the formatted label to the user

### Requirement: Server action fetches only published job postings from Supabase with pagination support

The site SHALL provide a server action that queries the `job_postings` table and returns only job postings with `status = 'published'`, excluding draft and closed jobs, ordered by publish date descending, with support for offset and limit parameters for pagination.

#### Scenario: Successful fetch returns published jobs with pagination

- **GIVEN** the Supabase `job_postings` table contains multiple job postings with various statuses
- **WHEN** the `fetchPublishedJobPostings` server action is called with offset and limit parameters (e.g., offset=0, limit=10)
- **THEN** the action queries the `job_postings` table
- **AND** filters for `status = 'published'`
- **AND** orders results by `published_at DESC` (latest published jobs first)
- **AND** applies offset and limit using `.range(offset, offset + limit - 1)`
- **AND** returns an object containing:
  - `items`: array of job posting objects (each with id, title, company_name, suburb, state, employment_type, description, status, created_at, published_at, closed_at, external_apply_url)
  - `hasMore`: boolean indicating if more results exist beyond current page
  - `error`: optional string for error messages
- **AND** the first item in the array has the most recent `published_at` timestamp

#### Scenario: Empty result when no published jobs exist

- **GIVEN** the Supabase `job_postings` table contains no published job postings
- **WHEN** the `fetchPublishedJobPostings` server action is called
- **THEN** the action returns an empty array
- **AND** no error is thrown

#### Scenario: Draft and closed jobs are excluded from results

- **GIVEN** the Supabase `job_postings` table contains jobs with status 'draft', 'published', and 'closed'
- **WHEN** the `fetchPublishedJobPostings` server action is called
- **THEN** the action returns only jobs where `status = 'published'`
- **AND** jobs with `status = 'draft'` are not included in the results
- **AND** jobs with `status = 'closed'` are not included in the results

#### Scenario: Error handling when Supabase query fails

- **GIVEN** the Supabase connection fails or returns an error
- **WHEN** the `fetchPublishedJobPostings` server action is called
- **THEN** the action catches the error
- **AND** logs the error to console with descriptive message
- **AND** returns an empty array to prevent page crash
- **AND** the calling component can detect the error condition

### Requirement: Careers page fetches and displays published job postings from Supabase

The site SHALL provide a careers page at `/careers` that fetches published job postings using the server action and displays them in a vertical list.

#### Scenario: Display list of published job postings

- **GIVEN** the Supabase database contains multiple published job postings
- **WHEN** a user navigates to `/careers`
- **THEN** the page calls `fetchPublishedJobPostings` server action
- **AND** renders a `JobPostingCard` component for each job posting
- **AND** displays job postings in vertical list layout with `--space-6xl` (128px) gap between cards
- **AND** the job postings section has background images that differ between desktop and mobile
- **AND** the section container has a white background with border and padding
- **AND** job postings are ordered by publish date with latest jobs appearing first
- **AND** the page title remains "Careers — Ocean Food Group"
- **AND** the page displays an h1 heading "Careers" or similar

#### Scenario: Empty state when no job postings available

- **GIVEN** the Supabase database contains no published job postings
- **WHEN** a user navigates to `/careers`
- **THEN** the page displays an empty state with a placeholder illustration
- **AND** the placeholder uses an icon or image from a library (e.g., lucide-react for icon, or a simple illustration)
- **AND** the page displays an empty state message below the placeholder
- **AND** the message reads "No job postings available at this time. Please check back later." or similar
- **AND** the placeholder and message are centered on the page with appropriate spacing
- **AND** the message has appropriate styling (centered, muted color, text-base or text-lg font size)

#### Scenario: Error state when fetch fails

- **GIVEN** the `fetchPublishedJobPostings` server action encounters an error
- **WHEN** a user navigates to `/careers`
- **THEN** the page displays an error banner
- **AND** the banner has red/error styling (e.g., bg-red-50, border-red-200, text-red-700)
- **AND** the error message reads "Error loading job postings. Please try again later." or similar
- **AND** the error banner appears above the job listings area

#### Scenario: Page metadata is defined

- **GIVEN** the careers page component
- **WHEN** the page is loaded
- **THEN** the page exports metadata with title "Careers — Ocean Food Group"
- **AND** the metadata includes a description "Careers and job opportunities at Ocean Food Group." or similar

### Requirement: JobPostingsList component implements infinite scroll pagination

The site SHALL provide a `JobPostingsList` client component that displays job postings with infinite scroll, automatically loading more items when the user scrolls to the bottom.

#### Scenario: Initial render displays 10 job postings

- **GIVEN** the careers page has fetched 10 initial job postings
- **WHEN** the `JobPostingsList` component is rendered
- **THEN** the component displays all 10 job postings in the list
- **AND** each job posting is rendered using the `JobPostingCard` component
- **AND** an Intersection Observer sentinel element is placed at the bottom of the list

#### Scenario: Load more jobs when scrolling to bottom

- **GIVEN** the `JobPostingsList` is displaying job postings and `hasMore` is true
- **WHEN** the user scrolls down and the sentinel element becomes visible (intersection threshold 0.1)
- **THEN** the component calls `fetchPublishedJobPostings` with the next offset (e.g., offset=10, limit=10)
- **AND** displays a loading indicator (e.g., spinning icon) while fetching
- **AND** appends the newly fetched job postings to the existing list
- **AND** updates the `hasMore` flag based on the response
- **AND** the sentinel remains at the bottom for potential further loading

#### Scenario: Stop loading when no more jobs available

- **GIVEN** the `JobPostingsList` has loaded all available job postings and `hasMore` is false
- **WHEN** the user scrolls to the bottom
- **THEN** the component does not make additional fetch requests
- **AND** no loading indicator is displayed
- **AND** the sentinel element is not rendered

#### Scenario: Display error message when fetch fails

- **GIVEN** the `JobPostingsList` is attempting to load more job postings
- **WHEN** the `fetchPublishedJobPostings` server action returns an error
- **THEN** the component displays an error message (e.g., "Failed to load more job postings. Please try again.")
- **AND** the error message has red/error styling (e.g., text-red-600)
- **AND** the component stops the loading indicator
- **AND** the component may retry once automatically after a delay (optional, following media reviews pattern)

### Requirement: Job posting section has background images

The site SHALL display background images for the job posting section with different images for desktop and mobile.

#### Scenario: Job posting section has background images

- **GIVEN** the job postings section
- **WHEN** the section is rendered
- **THEN** the section has background image `public/images/section-backgrounds/job-list.png` on desktop
- **AND** the section has background image `public/images/section-backgrounds/job-list-mb.png` on mobile

### Requirement: Job postings have alternating background colors

The site SHALL display job posting cards with alternating background colors for visual separation.

#### Scenario: Job posting cards have alternating background colors

- **GIVEN** a list of job posting cards
- **WHEN** the cards are rendered
- **THEN** even-indexed cards have light blue background `rgba(57, 98, 242, 0.02)`
- **AND** odd-indexed cards have light gray background `#F3F6FE`
- **AND** the alternating colors are implemented using CSS nth-child selectors

### Requirement: Job posting section has styled container

The site SHALL display the job postings section with a white background, border, and appropriate padding.

#### Scenario: Job posting section has styled container

- **GIVEN** the job postings section
- **WHEN** the section is rendered
- **THEN** the section container has a white background
- **AND** the section container has a border with `--color-border` color and `--radius-md` border radius
- **AND** the section container has `--space-xl` padding
- **AND** the section displays an "Open Positions" title

The site SHALL define TypeScript types for job posting data that match the Supabase database schema.

#### Scenario: JobPosting type matches database schema

- **GIVEN** the `job_postings` table schema in Supabase
- **WHEN** TypeScript types are defined in `lib/job-postings/types.ts`
- **THEN** the `JobPosting` interface includes all fields:
  - id: string (uuid)
  - title: string
  - company_name: string
  - suburb: string
  - state: string
  - employment_type: EmploymentType
  - description: string
  - status: JobPostingStatus
  - created_at: string (ISO 8601 timestamp)
  - published_at: string | null (ISO 8601 timestamp)
  - closed_at: string | null (ISO 8601 timestamp)
  - external_apply_url: string | null (URL for external application forms)
- **AND** the `JobPostingStatus` type is defined as union: "draft" | "published" | "closed"
- **AND** the `EmploymentType` type is defined to match database enum values

#### Scenario: Types are imported and used across the application

- **GIVEN** the `JobPosting` type is defined in `lib/job-postings/types.ts`
- **WHEN** components and server actions reference job posting data
- **THEN** they import and use the `JobPosting` type for type safety
- **AND** TypeScript compilation succeeds without type errors

