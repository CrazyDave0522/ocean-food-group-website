# Update Job Postings Styling - Tasks

## Implementation Tasks

### 0. Create Job Postings CSS File

- [x] Create `styles/components/job-postings.css` with all styling rules
- [x] Import the CSS file in the appropriate component or layout

### 1. Update JobPostingCard Typography

- [x] Change title color to `#0F75BC` (primary blue)
- [x] Set title font size to `--fs-body-lg`
- [x] Limit title to no more than 2 lines with ellipsis
- [x] Change description color to `#5D6C7D`
- [x] Set description font size to `--fs-body`
- [x] Limit description to no more than 4 lines with ellipsis
- [x] Set gap between title, location+job type, and description to 12px

### 2. Implement Alternating Background Colors

- [x] Add index prop to JobPostingCard component
- [x] Update JobPostingsList to pass index to each JobPostingCard
- [x] Implement alternating background logic:
  - Even index (0, 2, 4...): `background: rgba(57, 98, 242, 0.02)`
  - Odd index (1, 3, 5...): `background: #F3F6FE`
- [x] Remove default white background from cards
- [x] Remove separator lines between job cards
- [x] Add outer wrapper styling:
  - Fill: `#FFF`
  - Stroke width: `1.2px`
  - Stroke: `#DBDEED`
- [x] Add section background images:
  - Desktop: `public/images/section-backgrounds/job-list.png`
  - Mobile: `public/images/section-backgrounds/job-list-mb.png`

### 3. Create Tag-Style Elements

- [x] Replace location text with tag-style element:
  - Border radius: 48px
  - Border: 1.2px solid #015AED
  - Background: #F3F8FF
  - Font size: `--fs-caption`
  - Text color: `#0F75BC`
- [x] Replace employment type text with tag-style element:
  - Border radius: 56px
  - Background: #D6F2ED
  - Font size: `--fs-caption`
  - Text color: `#0E493F`
- [x] Add `--space-md` gap between the two tags

### 4. Update Apply Now Icon

- [x] Replace ArrowRight icon with paper-plane.svg image
- [x] Ensure icon maintains hover states and proper sizing
- [x] Update "Apply Now" text styling:
  - Color: `#0F75BC`
  - Text align: center
  - Font size: `--fs-body-sm`
  - Font style: normal
  - Font weight: 500
  - Line height: normal
  - Text transform: capitalize
- [x] Update import statements as needed

### 5. Update Component Tests

- [x] Update JobPostingCard tests to account for new styling
- [x] Add tests for alternating background colors
- [x] Update tests for new tag elements
- [x] Verify icon changes work correctly

### 6. Validate Implementation

- [x] Test responsive design on mobile and desktop
- [x] Verify color contrast meets accessibility standards
- [x] Check that all existing functionality still works
- [x] Run full test suite to ensure no regressions

### 7. Add List Title

- [x] Add "Open Positions" title above the job postings list
- [x] Style the title with:
  - Color: `#153E5E`
  - Font size: `--fs-h4`
  - Font style: normal
  - Font weight: 600
  - Line height: 100%
  - Border radius: 8px
  - Background: `#E7ECFD`
  - Background spans full width of outer wrapper
  - Padding: 16px
- [x] Consider using SectionTitle component or create custom styling
- [x] Ensure proper spacing between title and job list

### 8. Implement Responsive Layout

- [x] Maintain desktop layout: info (title, description, tags) on left, apply now on right
- [x] Implement mobile layout: title, description, tags, apply now stacked vertically
- [x] On mobile, apply now should have icon on left and text on right
- [x] Ensure responsive breakpoints work correctly