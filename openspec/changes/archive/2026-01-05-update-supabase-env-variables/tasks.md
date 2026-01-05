# Tasks: Update Supabase environment variable naming

## Implementation Tasks

### 1. Update environment variable references in code
- [x] Update `lib/supabase.ts` to use `SUPABASE_SECRET_KEY` instead of `SUPABASE_SERVICE_ROLE_KEY`
- [x] Remove fallback logic for old variable name
- [x] Ensure error messaging reflects required variables

### 2. Update example environment files
- [x] Update `.env.local` to use new variable naming scheme
- [x] Ensure both public and secret variables follow new naming convention

### 3. Update documentation
- [x] Update `openspec/project.md` to document new environment variable names
- [x] Update any README or deployment instructions that reference old variable names
- [x] Document migration path for existing deployments

### 4. Test implementation
- [x] Run `pnpm test` to ensure all tests pass
- [x] Verify Supabase client initializes correctly with new variable name
- [x] Test server actions that use Supabase (contact form, franchise form)
- [x] Verify local development works with updated `.env.local`

### 5. Code quality checks
- [x] Run `pnpm typecheck` — verify no TypeScript errors
- [x] Run `pnpm lint` — verify ESLint passes
- [x] Run `pnpm check` — full quality check

### 6. Deployment preparation
- [x] Document Vercel environment variable updates needed
- [x] Note that production deployments require updating environment variables
- [x] Add migration notes to commit message

### 7. Spec validation
- [x] Run `openspec validate --strict` to ensure proposal is valid
- [x] Verify all documentation updates are complete
