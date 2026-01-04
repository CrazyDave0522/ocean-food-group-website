# Tasks: Scroll viewport to form after submission

## Implementation Tasks

### 1. Update ContactForm component
- [x] Add `useEffect` hook or extend existing effect to listen for state changes
- [x] Trigger `formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })` when `state.status === "success"` or `state.status === "error"`
- [x] Test scroll behavior on contact form submission
- [x] Verify form message is visible after scroll

### 2. Update FranchiseForm component
- [x] Add `useEffect` hook or extend existing effect to listen for state changes
- [x] Trigger `formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })` when `state.status === "success"` or `state.status === "error"`
- [x] Test scroll behavior on franchise form submission
- [x] Verify form message is visible after scroll

### 3. Test implementation
- [x] Run `pnpm test` to ensure all existing tests pass
- [x] Verify scroll behavior works on both success and error states
- [x] Test on various viewport sizes (mobile, tablet, desktop)
- [x] Verify no regressions in form validation or submission

### 4. Code quality checks
- [x] Run `pnpm typecheck` — verify no TypeScript errors
- [x] Run `pnpm lint` — verify ESLint passes
- [x] Run `pnpm check` — full quality check
- [x] No new dependencies required

### 5. Spec validation
- [x] Run `openspec validate --strict` to ensure requirements are met
- [x] Verify spec delta reflects implementation
