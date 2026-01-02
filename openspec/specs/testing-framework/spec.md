# testing-framework Specification

## Purpose
TBD - created by archiving change add-testing-setup. Update Purpose after archive.
## Requirements
### Requirement: Testing framework configured with vitest and React Testing Library
The project SHALL provide a fully configured testing framework using vitest as the test runner and @testing-library/react for component and integration testing, with consistent setup across all test files.

#### Scenario: Run unit tests in watch mode during development
- **WHEN** a developer runs `pnpm test`
- **THEN** vitest starts in watch mode
- **AND** test files matching `**/__tests__/**/*.test.{ts,tsx}` are discovered automatically
- **AND** tests re-run when source or test files change
- **AND** TypeScript types are resolved with path aliases (e.g., `@/components`)

#### Scenario: Run tests once in CI environment
- **WHEN** CI pipeline executes `pnpm test:run`
- **THEN** all tests execute once and exit with status 0 if all pass
- **AND** exit with non-zero status if any test fails
- **AND** no watch mode is active

#### Scenario: Generate code coverage report
- **WHEN** a developer runs `pnpm test:coverage`
- **THEN** all tests execute with coverage instrumentation
- **AND** a coverage report is generated in the `coverage/` directory
- **AND** coverage fails if lines fall below 70% threshold
- **AND** the report can be viewed via HTML report in `coverage/index.html`

#### Scenario: View tests with visual dashboard
- **WHEN** a developer runs `pnpm test:ui`
- **THEN** vitest UI opens in a browser or terminal
- **AND** shows real-time test results with pass/fail indicators
- **AND** allows filtering and re-running specific tests

### Requirement: Global test setup with matchers and utilities
The project SHALL provide a global test setup file that registers common testing utilities and extended matchers, ensuring consistent test behavior across all test files without duplication.

#### Scenario: Testing library matchers available in all tests
- **GIVEN** any test file in the project
- **WHEN** a test uses an extended matcher from @testing-library/jest-dom (e.g., `toBeInTheDocument()`)
- **THEN** the matcher is available without explicit import
- **AND** the test executes correctly

#### Scenario: Happy DOM environment configured
- **GIVEN** a component test
- **WHEN** the test renders a React component using `render()`
- **THEN** the component renders in a happy-dom environment
- **AND** DOM queries (getByRole, getByText, etc.) work correctly
- **AND** tests execute quickly (happy-dom is faster than jsdom)

### Requirement: Example component tests demonstrate best practices
The project SHALL provide example tests for reusable form components (FormTitle, FormShell, SubmitButton) showing proper testing patterns and accessibility considerations.

#### Scenario: FormTitle component is tested for correct rendering
- **GIVEN** the FormTitle component
- **WHEN** tests render the component with title and subtitle props
- **THEN** the title appears as a heading element
- **AND** the subtitle appears as descriptive text
- **AND** tests verify accessibility (e.g., correct heading level)

#### Scenario: SubmitButton component is tested for loading state
- **GIVEN** the SubmitButton component
- **WHEN** tests verify button state during form submission
- **THEN** the button is disabled while form is pending
- **AND** the loading label is displayed instead of default label
- **AND** onClick handler is not called when button is disabled

#### Scenario: FormShell container is tested for layout
- **GIVEN** the FormShell component
- **WHEN** tests render FormShell with child content
- **THEN** children are rendered inside the container
- **AND** container has card styling classes applied
- **AND** container can accept className prop for customization

### Requirement: Server action validation is unit tested
The project SHALL provide unit tests for server actions (e.g., submitContact) verifying validation logic without external service dependencies.

#### Scenario: Contact form validation is tested for required fields
- **GIVEN** the submitContact server action
- **WHEN** tests call the action with missing required fields
- **THEN** the action returns a validation error
- **AND** no database insert or email is sent
- **AND** error message indicates which field is invalid

#### Scenario: Contact form validation tests email format
- **GIVEN** the submitContact server action
- **WHEN** tests call the action with an invalid email
- **THEN** the action returns an email format error
- **AND** validation prevents submission to backend

#### Scenario: Contact form validation tests field length limits
- **GIVEN** the submitContact server action with field limit constants
- **WHEN** tests submit a form where a field exceeds the limit
- **THEN** the action returns a field-too-long error
- **AND** the error specifies the field and limit

### Requirement: Testing conventions documented and discoverable
The project SHALL document testing conventions, file placement, and priority test targets in project documentation.

#### Scenario: Developers understand where to place tests
- **GIVEN** a developer adding a new component or feature
- **WHEN** they check the project documentation
- **THEN** they find clear guidance on test file location (e.g., `__tests__/components/ComponentName.test.tsx`)
- **AND** the documentation includes examples of correctly placed test files

#### Scenario: Testing commands are documented
- **GIVEN** a developer who is new to the project
- **WHEN** they check the project documentation or package.json scripts
- **THEN** they discover the available test commands: `pnpm test`, `pnpm test:ui`, `pnpm test:run`, `pnpm test:coverage`
- **AND** each command's purpose is documented

#### Scenario: Priority test targets are clear
- **GIVEN** a developer prioritizing what to test first
- **WHEN** they check the project documentation
- **THEN** they see the recommended priority order: server actions → form components → reusable UI → page metadata
- **AND** they understand why these areas are prioritized

