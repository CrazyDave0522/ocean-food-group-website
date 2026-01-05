# Change: Update Supabase environment variable naming

## Why
Supabase's new version has updated terminology for API keys:
- Old: `anon key` and `service_role key`
- New: `Publishable key` and `Secret key`

The current codebase uses outdated naming (`SUPABASE_SERVICE_ROLE_KEY`) which creates confusion and inconsistency with Supabase's current dashboard UI. This also caused deployment issues on Vercel where environment variables were misconfigured due to unclear naming.

## What Changes
- Update environment variable naming in `.env.local` to align with Supabase's current terminology:
  - `SUPABASE_SERVICE_ROLE_KEY` → `SUPABASE_SECRET_KEY`
- Update `lib/supabase.ts` to use the new variable name
- Update `openspec/project.md` documentation to reflect new variable names
- Maintain backward compatibility during transition by checking both old and new variable names with a fallback
- Update deployment documentation/instructions to reference correct variable names

## Impact
- Affected specs: None directly (infrastructure change)
- Affected code:
  - `lib/supabase.ts` — update environment variable reference
  - `.env.local` — update variable naming (example file)
  - `openspec/project.md` — update documentation
- Deployment impact: Requires updating environment variables in Vercel/production

## Notes
- This is a breaking change for existing deployments — environment variables must be renamed in Vercel
- The actual secret values remain unchanged, only the variable names are updated
- Consider adding both old and new variable checks with deprecation warnings for smooth transition
- No database schema or API changes required
- Scope: limited to environment variable naming and references
