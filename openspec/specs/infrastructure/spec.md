# infrastructure Specification

## Purpose
TBD - created by archiving change update-supabase-env-variables. Update Purpose after archive.
## Requirements
### Requirement: System uses current Supabase environment variable naming

The application SHALL use Supabase's current environment variable naming convention (`SUPABASE_SECRET_KEY`) and SHALL NOT rely on the deprecated naming (`SUPABASE_SERVICE_ROLE_KEY`).

#### Scenario: Supabase client initializes with updated environment variable

- **GIVEN** the environment has `SUPABASE_URL` and `SUPABASE_SECRET_KEY` configured
- **WHEN** the application initializes the Supabase server client
- **THEN** the client successfully connects using the secret key from `SUPABASE_SECRET_KEY`
- **AND** the connection uses the service role permissions for server-side operations

#### Scenario: Documentation reflects current Supabase naming

- **GIVEN** a developer reviews project documentation
- **WHEN** they read environment variable requirements in `openspec/project.md`
- **THEN** the documentation shows `SUPABASE_SECRET_KEY` as the required variable
- **AND** notes that this aligns with Supabase's "Secret key" in the dashboard
-- **AND** clarifies that the old `SUPABASE_SERVICE_ROLE_KEY` naming is no longer used

### Requirement: Example environment file uses current naming

The `.env.local` example file SHALL demonstrate the current Supabase environment variable naming convention.

#### Scenario: Developer sets up local environment from example

- **GIVEN** a developer is setting up the project locally
- **WHEN** they reference `.env.local` for required environment variables
- **THEN** they see `SUPABASE_SECRET_KEY` as the variable name
- **AND** the naming matches what they see in Supabase dashboard ("Secret key")
- **AND** no confusion arises from outdated naming conventions

