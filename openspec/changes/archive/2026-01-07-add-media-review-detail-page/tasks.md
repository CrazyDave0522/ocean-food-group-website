# Tasks: Add Media Review Detail Page

1. [x] Create route `app/media-reviews/[slug]/page.tsx` (server component)
2. [x] Add server query `lib/actions/mediaReviewsDetail.ts` to fetch by `slug` and `is_published=true`
3. [x] Render detail page: title (h1), author · date, cover image 16:9, and body content
4. [x] Handle 404: return Not Found state (Next.js notFound()) when no record found
5. [x] Set `metadata` on the page: title and description
6. [x] Implement Editor.js renderer helper `lib/media-reviews/renderEditorJs.ts` supporting paragraph, header (h2–h4), list, table (with/without headings), image
7. [x] Sanitize rendered HTML via DOMPurify before insertion
8. [x] Update `MediaReviewCard` link behavior to open `/media-reviews/[slug]` in a new tab (`target=_blank`)
9. [x] Tests: unit tests for block rendering (paragraph/header/list/table/image) and sanitization; 404 behavior; integration test for navigation from list to detail
10. [x] Validate: `pnpm check` and `pnpm test:run` pass; `openspec validate add-media-review-detail-page --strict` passes
11. [x] Review: accessibility checks (alt text, focus-visible, heading structure)
