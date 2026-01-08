# Tasks: Add Job Postings List

## Implementation Tasks

- [ ] **Define TypeScript types for job postings**
  - Create `lib/job-postings/types.ts` with `JobPosting`, `JobPostingStatus`, and `EmploymentType` types
  - Mirror database schema structure including `external_apply_url: string | null`
  - Validation: Types compile without errors

- [ ] **Create employment type formatting utility**
  - Create `lib/job-postings/employmentType.ts` with `formatEmploymentType` function
  - Handle enum values: `full_time`, `part_time`, `casual`, `contract`, `intern`
  - Return human-readable labels
  - Validation: Write unit test in `__tests__/lib/job-postings/employmentType.test.ts`

- [ ] **Implement server action to fetch published job postings with pagination**
  - Create `lib/actions/jobPostings.ts` with `"use server"` directive
  - Implement `fetchPublishedJobPostings(offset: number = 0, limit: number = 10)` function
  - Use `getSupabaseServerClient()` from `lib/supabase.ts` to access database
  - Query `job_postings` table where `status = 'published'` (exclude draft and closed)
  - Order by `published_at DESC` (latest jobs first)
  - Apply pagination using `.range(offset, offset + limit - 1)` and `.select('*', { count: 'exact' })`
  - Calculate `hasMore` flag: `offset + limit < totalCount`
  - Return object: `{ items: JobPosting[], hasMore: boolean, error?: string }`
  - Handle errors with try-catch and return empty items array with error message on failure
  - Validation: Write tests in `__tests__/lib/actions/jobPostings.test.ts` including pagination scenarios

- [ ] **Create JobPostingsList component with infinite scroll**
  - Create `components/job-postings/JobPostingsList.tsx` as client component ("use client")
  - Accept props: `initialItems`, `initialHasMore`, `onFetchMore` (following MediaReviewsList pattern)
  - Implement state management: items, hasMore, isLoading, offset, error
  - Implement Intersection Observer for infinite scroll (threshold: 0.1)
  - Create `loadMore` function that:
    - Calls `onFetchMore` with current offset and limit=10
    - Appends new items to existing list
    - Updates hasMore and offset state
    - Handles errors and displays error message
  - Wrap job postings in `divide-y divide-slate-200` container
  - Map items and render each in wrapper div with `py-(--space-lg) first:pt-0 last:pb-0`
  - Render JobPostingCard for each item
  - Display loading indicator (Loader2 icon from lucide-react) when isLoading
  - Display empty state when items.length === 0
  - Render sentinel div at bottom when hasMore is true
  - Validation: Write tests in `__tests__/components/job-postings/JobPostingsList.test.tsx`
  - Create `components/job-postings/JobPostingCard.tsx` as client component
  - Accept `JobPosting` prop
  - Use flex layout with content on left and action indicator on right
  - Add `--space-xl` (32px) horizontal spacing/gap between left content and right content
  - Display first line in format: "[title] - [company_name]" as h2 heading
  - Truncate title line to 1 line maximum with ellipsis (use `line-clamp-1` or `truncate`)
  - Display second line in format: "[suburb] [state] | [employment_type]" with formatted employment type using `formatEmploymentType`
  - Display description, truncated to 2 lines maximum with ellipsis (use `line-clamp-2`)
  - On the right side, display an icon (e.g., ArrowRight or ExternalLink from lucide-react)
  - Below the icon, display "Apply Now" text with smaller font and muted color
  - Implement conditional logic based on external_apply_url:
    - If `external_apply_url` exists: Only the icon and "Apply Now" are clickable links to external URL with `target="_blank"` and `rel="noopener noreferrer"` (opens in new tab)
    - If `external_apply_url` is null: Icon and "Apply Now" are not rendered; card is static text only
  - Job metadata (title, company, location, employment type, description) are NOT clickable
  - Add hover state: icon and "Apply Now" text change from slate-500 to blue-600 on hover
  - Implement responsive layout (mobile: full width, desktop: consistent padding)
  - Validation: Write tests in `__tests__/components/job-postings/JobPostingCard.test.tsx`

- [ ] **Update careers page to use JobPostingsList component**
  - Modify `app/careers/page.tsx` to fetch initial 10 job postings via `fetchPublishedJobPostings(0, 10)`
  - Import and render `JobPostingsList` component
  - Pass `initialItems`, `initialHasMore`, and `onFetchMore={fetchPublishedJobPostings}` props
  - Add server-side error state with styled error banner if initial fetch fails
  - Maintain existing metadata (title, description)
  - Validation: Manual testing in browser, verify infinite scroll works correctly

- [ ] **Add tests for careers page rendering**
  - Update or create `__tests__/pages/careers.test.ts`
  - Test: renders list of job postings
  - Test: shows error state when fetch fails
  - Test: shows empty state when no jobs
  - Validation: All tests pass with `pnpm test`

- [ ] **Run type checking and linting**
  - Execute `pnpm check` to run TypeScript and ESLint
  - Fix any type errors or linting issues
  - Validation: Exit code 0, no errors

- [ ] **Manual QA testing**
  - Start dev server with `pnpm dev`
  - Navigate to `/careers` page
  - Verify initial 10 job postings display correctly
  - Test infinite scroll:
    - Scroll to bottom of list
    - Verify loading indicator appears
    - Verify next 10 jobs load and append to list
    - Continue scrolling until all jobs loaded (hasMore becomes false)
    - Verify loading stops when no more jobs available
  - Test responsive layout on mobile and desktop viewports
  - Test hover states on job cards (only on icon/"Apply Now" elements)
  - Test clicking job cards:
    - Click title, description, location text: Should NOT open any link
    - Click icon or "Apply Now" text with external_apply_url:
      - Opens external URL in **new tab**
      - Careers page remains open in original tab
      - rel="noopener noreferrer" security attributes present
    - Card with no external_apply_url: Icon and "Apply Now" not rendered
  - Test error handling (temporarily break Supabase connection, scroll to trigger load more)
  - Test empty state (temporarily filter out all jobs in query)
  - Validation: All scenarios work as expected

## Validation Criteria

- [ ] All TypeScript compilation passes without errors
- [ ] ESLint shows no warnings or errors
- [ ] All unit tests pass with minimum 70% coverage for new code
- [ ] Careers page loads within 2 seconds
- [ ] **Only published jobs are displayed** (draft and closed jobs never appear)
- [ ] Job postings display in correct order (most recent published_at first)
- [ ] Responsive design works on mobile (<768px) and desktop (>=768px)
- [ ] Error state displays when Supabase connection fails
- [ ] Empty state displays with placeholder image/icon when no published jobs exist
- [ ] Employment type labels are human-readable (including "Intern")
- [ ] Job descriptions are properly truncated
- [ ] Only icon and "Apply Now" text are clickable, not job metadata
- [ ] External links open in new tab with correct security attributes

## Dependencies

- Must complete all tasks in order (sequential dependencies)
- Server action must be implemented before page can fetch data
- Types must be defined before implementing server action
- Component must be created before page can render it

## Estimated Effort

- Types and utilities: 30 minutes
- Server action with pagination: 1 hour
- JobPostingCard component: 1.5 hours
- JobPostingsList component with infinite scroll: 2 hours
- Page integration: 45 minutes
- Testing: 2 hours
- QA and fixes: 1.5 hours
- **Total: ~9 hours**
