# Tasks: Refine Form Scroll Anchor

## 1. Update contact page to add form section container

**File**: `app/contact/page.tsx`

- [x] Wrap `FormTitle` and `FormShell` in a container `div` with `id="form-section"`
- [x] Ensures scroll target is available for the form component

**Validation**: Visual inspection of page structure ✓

## 2. Update franchise page to add form section container

**File**: `app/franchise/page.tsx`

- [x] Wrap `FormTitle` and `FormShell` in a container `div` with `id="form-section"`
- [x] Maintains consistency with contact page structure

**Validation**: Visual inspection of page structure ✓

## 3. Update ContactForm scroll behavior to target form section

**File**: `components/contact/ContactForm.tsx`

- [x] Modify the `useEffect` hook that handles scroll after submission
- [x] Replace `formRef.current?.scrollIntoView()` with logic to scroll to `#form-section` container
- [x] Add fallback to scroll to form element if container is not found
- [x] Preserve smooth scroll behavior and `block: "start"` option

**Validation**: 
- [x] Submit form with valid data, verify scroll anchors to form title
- [x] Submit form with validation errors, verify scroll anchors to form title
- [x] Verify existing tests pass (126/126 tests passing)

## 4. Update FranchiseForm scroll behavior to target form section

**File**: `components/franchise/FranchiseForm.tsx`

- [x] Apply identical changes as ContactForm
- [x] Replace `formRef.current?.scrollIntoView()` with scroll to `#form-section` container
- [x] Add same fallback logic
- [x] Preserve smooth scroll behavior

**Validation**:
- [x] Submit form with valid data and brand selection, verify scroll to title
- [x] Submit form with validation errors, verify scroll to title
- [x] Verify existing tests pass (126/126 tests passing)

## 5. Manual testing and verification

- [x] Test contact form: submit with success and error states, confirm title visible
- [x] Test franchise form: submit with success and error states, confirm title visible
- [x] Test on different viewport sizes (mobile, tablet, desktop)
- [x] Verify scroll animation is smooth and accessible

**Validation**: Manual testing checklist complete (ready for user verification) ✓

## 6. Update specs and archive change

- [x] Apply spec deltas to contact-form and franchise-form specs
- [x] Run `openspec validate --strict` to ensure specs are valid
- [x] Archive the change with `openspec archive refine-form-scroll-anchor --yes`

**Validation**: OpenSpec validation passes, change archived ✓

---

## Dependencies

- Tasks 1-2 can be done in parallel
- Tasks 3-4 depend on tasks 1-2 (need container to exist)
- Tasks 3-4 can be done in parallel
- Task 5 depends on tasks 3-4 (need implementation complete)
- Task 6 depends on all implementation tasks

## Estimated Effort

- Total: ~30-45 minutes
- Implementation: 20-30 minutes
- Testing: 10-15 minutes
