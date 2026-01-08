# Design: Add Job Postings List

## Overview

This change implements a job postings list feature that closely follows the media-reviews-list pattern. The design prioritizes consistency, reusability, and maintainability by leveraging existing patterns and components.

## Architecture

### Data Flow

```
Supabase (job_postings table)
  ↓
lib/actions/jobPostings.ts (fetchPublishedJobPostings)
  ↓
app/careers/page.tsx (Server Component)
  ↓
components/job-postings/JobPostingCard.tsx (Display Component)
```

### Component Hierarchy

```
app/careers/page.tsx (Server Component)
├── Error boundary (error state)
└── JobPostingsList (Client Component)
    ├── Empty state (no jobs)
    ├── Job postings container (divide-y)
    │   └── JobPostingCard (repeated for each job)
    ├── Loading indicator (when fetching more)
    └── Intersection Observer sentinel (infinite scroll trigger)
```

## Technical Decisions

### 1. Database Query Strategy

**Decision**: Fetch only published jobs, ordered by `published_at DESC` (latest first)

**Rationale**:
- Matches media reviews pattern for consistency
- Most recent jobs appear first, which is standard user expectation for job boards
- **`status = 'published'` ensures only active jobs are visible** - draft jobs (not ready) and closed jobs (no longer accepting applications) are excluded
- Index on `job_postings_published_at_idx` ensures efficient queries
- DESC ordering shows the newest opportunities at the top of the list

**Implementation**:
```typescript
await supabase
  .from("job_postings")
  .select("*")
  .eq("status", "published")  // Critical: Only published jobs
  .order("published_at", { ascending: false })
```

### 2. Component Structure

**Decision**: Create `JobPostingCard` component similar to `MediaReviewCard`

**Rationale**:
- Establishes consistent card-based UI pattern
- Reusable component for potential future features (e.g., related jobs)
- Encapsulates all job display logic in one component
- Maintains separation of concerns

**Differences from MediaReviewCard**:
- No cover image (text-only display)
- Location display (suburb, state)
- Employment type badge/label
- Different metadata layout
- Conditional linking: external URL if provided, otherwise internal detail page

### 3. Type Definitions

**Decision**: Define TypeScript types based on database schema

**Location**: `lib/job-postings/types.ts`

**Rationale**:
- Type safety across the application
- Clear contract between database and application
- Follows existing pattern from `lib/media-reviews/types.ts`

```typescript
export type JobPostingStatus = "draft" | "published" | "closed";
export type EmploymentType = string; // Will match DB enum

export interface JobPosting {
  id: string;
  title: string;
  company_name: string;
  suburb: string;
  state: string;
  employment_type: EmploymentType;
  description: string;
  status: JobPostingStatus;
  created_at: string;
  published_at: string | null;
  closed_at: string | null;
  external_apply_url: string | null;
}
```

### 4. Server Action Pattern

**Decision**: Create dedicated server action for job postings with pagination support

**Location**: `lib/actions/jobPostings.ts`

**Signature**: `fetchPublishedJobPostings(offset: number = 0, limit: number = 10)`

**Return Type**: `{ items: JobPosting[], hasMore: boolean, error?: string }`

**Implementation**: Uses `getSupabaseServerClient()` from `lib/supabase.ts` to access the database with proper environment variables (`SUPABASE_URL` and `SUPABASE_SECRET_KEY`)

**Rationale**:
- Separates data fetching logic from UI
- Enables server-side rendering for initial load
- Supports client-side fetching for subsequent loads
- Consistent with franchise and media reviews patterns
- Proper error handling and type safety
- `hasMore` flag enables infinite scroll component to know when to stop loading
- Reuses existing Supabase client utility for consistency

### 5. Layout Design

**Decision**: Vertical list layout with infinite scroll pagination

**Pagination**: 
- Initial load: 10 job postings
- Subsequent loads: 10 job postings per scroll
- Uses Intersection Observer API to detect when user reaches bottom
- Follows the exact pattern from MediaReviewsList component

**Spacing**: `--space-2xl` (48px) total gap between job cards, with divider line in the middle
- Each card wrapper gets `py-(--space-lg)` (24px top + 24px bottom)
- Divider line sits between the padding
- Total gap = 24px (bottom of card 1) + border + 24px (top of card 2) = 48px
- First card gets `first:pt-0` to remove top padding
- Last card gets `last:pb-0` to remove bottom padding

**Dividers**: Horizontal lines between cards using `divide-y divide-slate-200` pattern (matches media reviews)

**Rationale**:
- Infinite scroll provides seamless browsing experience
- Loading 10 items at a time balances performance and user experience
- Consistent pattern with media reviews feature for maintainability
- Better perceived performance than showing all jobs at once
- Consistent spacing using design tokens ensures visual harmony with rest of site
- Divider lines provide clear visual separation between job postings, improving scannability
- Split padding creates balanced spacing around the divider line

**Desktop Layout**:
```
┌──────────────────────────────────────────────┐
│ Job Title - Company Name (1 line) | 32px | [Icon]     │
│ Suburb State | Employment Type    |      | Apply Now  │
│ Description (max 2 lines)...       |      |            │
└──────────────────────────────────────────────────┘
```

Note: `32px` represents `--space-xl` horizontal spacing between left and right content.

**Mobile Layout**: Same structure, adjusted padding and font sizes

### 6. Error Handling

**Decision**: Display error banner similar to media reviews page

**Rationale**:
- Consistent error UX
- Non-blocking (shows error but doesn't crash page)
- Clear feedback to users

### 7. Empty State

**Decision**: Show placeholder image/icon with message when no published jobs exist

**Message**: "No job postings available at this time. Please check back later."

**Placeholder**: Use icon from lucide-react library (e.g., `Briefcase`, `Users`, or similar) centered above the message

**Rationale**:
- Clear visual indicator that the page loaded but has no content
- Placeholder prevents confusion - users know functionality works
- Professional appearance with icon + message
- Follows common UX patterns for empty states

### 8. Employment Type Display

**Decision**: Create utility function to format enum values

**Location**: `lib/job-postings/employmentType.ts`

**Example**:
- `full_time` → "Full Time"
- `part_time` → "Part Time"
- `casual` → "Casual"
- `contract` → "Contract"
- `intern` → "Intern"

**Rationale**:
- Database stores machine-readable enums
- UI displays human-readable labels
- Centralized formatting logic

### 9. External Application URLs

**Decision**: Support external_apply_url for jobs that redirect to third-party application systems

**Clickable Elements**:
- Only the icon and "Apply Now" text on the right side are clickable
- The job metadata (title, company, location, employment type, description) are NOT clickable

**Behavior**:
- If `external_apply_url` exists and is not null: Clicking icon or "Apply Now" opens URL in new tab with `target="_blank"` and `rel="noopener noreferrer"`
- If `external_apply_url` is null: Icon and "Apply Now" are not rendered; card content is static text only

**Rationale**:
- Focused interaction model - users know exactly where to click to apply
- New tab behavior preserves user context - users don't lose their place in the job listing
- Security attributes (`rel="noopener noreferrer"`) prevent external sites from accessing the opener window
- Prevents accidental clicks on job metadata while reading
- Keeps card design clean and mobile-friendly

## Testing Strategy

### Unit Tests

1. **Server Action** (`__tests__/lib/actions/jobPostings.test.ts`):
   - Successful fetch returns published jobs only
   - Error handling for Supabase failures
   - Correct ordering by published_at DESC

2. **JobPostingCard Component** (`__tests__/components/job-postings/JobPostingCard.test.tsx`):
   - Renders all job metadata correctly
   - Truncates long descriptions
   - Displays employment type formatted correctly
   - Renders location (suburb, state)

3. **Format Utility** (`__tests__/lib/job-postings/employmentType.test.ts`):
   - Converts enum values to display labels
   - Handles unknown enum values gracefully

### Integration Tests

4. **Careers Page** (`__tests__/pages/careers.test.ts`):
   - Renders list of job postings
   - Shows error state when fetch fails
   - Shows empty state when no jobs available

## Migration Path

### Initial Implementation (This Change)
- Infinite scroll with 10 items per fetch
- Server-side initial data fetch
- Client-side subsequent fetches

### Future Enhancements (Separate Changes)
- Job detail pages at `/careers/[id]`
- Filter by location, employment type
- Search functionality
- Application form integration
- Email alerts for new postings

## File Changes

### New Files
- `lib/actions/jobPostings.ts` - Server action for fetching jobs with pagination
- `lib/job-postings/types.ts` - TypeScript type definitions
- `lib/job-postings/employmentType.ts` - Formatting utilities
- `components/job-postings/JobPostingCard.tsx` - Card component
- `components/job-postings/JobPostingsList.tsx` - List component with infinite scroll
- `__tests__/lib/actions/jobPostings.test.ts` - Server action tests
- `__tests__/lib/job-postings/employmentType.test.ts` - Format utility tests
- `__tests__/components/job-postings/JobPostingCard.test.tsx` - Component tests
- `__tests__/components/job-postings/JobPostingsList.test.tsx` - List component tests

### Modified Files
- `app/careers/page.tsx` - Update with job postings list rendering

## Performance Considerations

### Initial Load
- Server-side rendering ensures fast First Contentful Paint (FCP)
- No client-side JavaScript required for initial render
- All data fetched in single Supabase query

### Scalability
- If job count exceeds 50, consider pagination
- Current approach acceptable for typical job posting volume (5-20 jobs)

### Caching
- Next.js automatically caches page at build time
- Use ISR (Incremental Static Regeneration) if dynamic updates needed
- Consider adding `revalidate` export if jobs update frequently

## Accessibility

- Semantic HTML structure (use `<article>` for job cards)
- Proper heading hierarchy (h1 for page title, h2 for job titles)
- Sufficient color contrast for text and badges
- Keyboard navigation support (cards are clickable links)
- ARIA labels for employment type badges

## Security

- All data fetching through Supabase service role (server-side only)
- No sensitive data exposed to client
- Environment variables for Supabase credentials
- Row-level security policies enforce status filtering (if configured in Supabase)
