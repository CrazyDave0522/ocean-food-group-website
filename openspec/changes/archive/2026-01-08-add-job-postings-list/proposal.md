# Proposal: Add Job Postings List

## Context

The careers page currently displays only placeholder content. Ocean Food Group needs to display active job postings fetched from the Supabase `job_postings` table, allowing job seekers to browse available positions. This feature should follow the existing pattern established by the media reviews list, providing a consistent user experience across content types.

## Goals

- Enable users to view all published job postings on the careers page
- **Only display jobs with `status = 'published'`** (exclude draft and closed jobs)
- Display job metadata: title, company name, location (suburb, state), employment type, and description
- Provide an interactive card-based UI that opens job detail pages
- Follow existing patterns from media-reviews-list for consistency and maintainability
- Support responsive design for mobile and desktop viewports
- Implement proper error handling and empty states

## Non-Goals

- Job application functionality (contact form integration or application tracking)
- Filtering or search functionality
- Admin interface for managing job postings (handled externally in Supabase)
- Email notifications for new job postings

## Scope

This change introduces a new capability `job-postings-list` that:

1. **Data Layer**: Create server action to fetch published job postings from Supabase with pagination support (offset/limit)
2. **Component Layer**: Build reusable `JobPostingCard` component for displaying individual job postings and `JobPostingsList` component for infinite scroll
3. **Page Layer**: Update careers page to fetch and display job postings list with initial 10 items
4. **Type Safety**: Define TypeScript types for job posting data structure
5. **Pagination**: Implement infinite scroll to load 10 additional jobs when user scrolls to bottom

The implementation will follow the established patterns:

- Server actions in `lib/actions/jobPostings.ts` with `"use server"` directive
- Components in `components/job-postings/` directory
- Types in relevant library files
- Tests mirroring the structure in `__tests__/`

## Impact

### User Impact

- Job seekers can browse available positions without navigating away from the site
- Clear presentation of job details helps candidates identify suitable opportunities
- Mobile-responsive design ensures accessibility across devices

### Developer Impact

- New reusable components for job posting display
- Consistent patterns with existing media reviews feature
- Additional test coverage for job postings functionality

### Performance Impact

- Server-side data fetching ensures fast initial page load (10 items)
- Infinite scroll loads additional items on-demand, improving perceived performance
- No images in job cards, ensuring fast rendering
- Minimal client-side JavaScript for infinite scroll functionality

## Risks and Mitigations

### Risk: Database schema changes

**Mitigation**: The provided schema is stable; types will be defined based on this schema.

### Risk: Inconsistent data in Supabase

**Mitigation**: Implement robust error handling and validation in server action.

## Dependencies

- Existing Supabase connection (`lib/supabase.ts`)
- `job_postings` table with defined schema
- Intersection Observer API for infinite scroll (browser native)

## Alternatives Considered

### Alternative 1: Use external job board integration

**Rejected**: Adds external dependency and doesn't leverage existing Supabase infrastructure.

### Alternative 2: Implement advanced filtering first

**Rejected**: Over-engineering for initial release; can add filtering based on user feedback.

### Alternative 3: Show all job statuses (draft, closed)

**Rejected**: Only published jobs should be visible to public users. Draft jobs are works-in-progress not ready for public viewing, and closed jobs are no longer accepting applications.

## Success Metrics

- Careers page displays initial 10 published job postings within 2 seconds
- Infinite scroll loads additional 10 jobs smoothly when user reaches bottom
- Zero console errors or warnings during rendering
- All tests pass with minimum 70% coverage
- TypeScript compilation succeeds with no type errors
- Responsive design works correctly on mobile (< 768px) and desktop (>= 768px)
- Title truncates to 1 line and description truncates to 2 lines with ellipsis
