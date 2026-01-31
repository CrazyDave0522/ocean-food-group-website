# Tasks for Add Feature Grid to Home Page

- [x] **Update home page component**
   - Import FeatureGrid component in `app/page.tsx`
   - Add FeatureGrid section below the Callout component
   - Create server action to fetch latest 3 media reviews
   - Map media review data to FeatureGrid props format

- [x] **Implement media reviews data fetching**
   - Create server action `fetchLatestMediaReviews()` in `lib/actions/mediaReviews.ts`
   - Fetch exactly 3 latest published media reviews
   - Handle error cases gracefully with fallback content

- [x] **Configure FeatureGrid props**
   - Set up intro content with placeholder text about media coverage
   - Configure button to link to `/media-reviews` page
   - Map media review fields to FeatureGrid feature format:
     - title → feature title
     - excerpt → feature description (with fallback if null)
     - cover_image_url → feature image
     - `/media-reviews/${slug}` → feature link

- [x] **Add responsive styling**
   - Ensure FeatureGrid integrates properly with existing home page layout
   - Add appropriate spacing above and below the section
   - Implement mobile-specific layout with 750:510 aspect ratio preservation
   - Use padding-bottom technique for reliable aspect ratio on mobile
   - Verify responsive behavior matches other home page sections

- [x] **Handle edge cases**
   - Implement fallback when fewer than 3 media reviews exist
   - Handle missing excerpt field gracefully
   - Ensure proper error handling for data fetching failures

- [x] **Update home page tests**
   - Add tests for FeatureGrid integration in `__tests__/pages/home.test.tsx`
   - Test media reviews data fetching and mapping
   - Verify proper rendering and responsive behavior

- [x] **Code review and validation**
   - Run linting and type checking
   - Validate against OpenSpec requirements
   - Ensure code follows project conventions</content>
<parameter name="filePath">/Users/zixiao_ma/Desktop/Work/OceanFoodGroup/ocean-food-group-website/openspec/changes/add-feature-grid-to-home-page/tasks.md