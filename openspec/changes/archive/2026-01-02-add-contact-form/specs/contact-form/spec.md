## ADDED Requirements

### Requirement: Contact form displays all required fields
The contact page SHALL display a form with fields for first name, last name, email, phone (optional), subject, and message.

#### Scenario: User views contact page
- **WHEN** a user navigates to `/contact`
- **THEN** a form is displayed with labeled input fields for first name, last name, email, phone, subject, and message
- **AND** the phone field is marked as optional while all other fields are required

### Requirement: Form validates input before submission
The form SHALL validate user input and prevent submission if required fields are empty or email format is invalid.

#### Scenario: User submits empty required fields
- **GIVEN** a user has not filled required fields
- **WHEN** the user attempts to submit the form
- **THEN** the form displays validation errors for empty required fields
- **AND** submission is prevented until errors are resolved

#### Scenario: User submits invalid email
- **GIVEN** a user enters text that is not a valid email format in the email field
- **WHEN** the user attempts to submit the form
- **THEN** the form displays an error indicating invalid email format
- **AND** submission is prevented until a valid email is entered

### Requirement: Form fields enforce reasonable length limits
The form SHALL enforce maximum character length limits on each input field to prevent excessively long inputs and ensure data integrity.

#### Scenario: Field length limits enforced
- **GIVEN** the form input fields have the following maximum lengths:
  - First name: 100 characters
  - Last name: 100 characters
  - Email: 255 characters
  - Phone: 20 characters
  - Subject: 200 characters
  - Message: 2000 characters
- **WHEN** a user attempts to enter text exceeding the limit
- **THEN** the input is prevented from exceeding the maximum length
- **OR** the form displays a validation error indicating the character limit

### Requirement: Form submission stores data in database
Upon valid form submission, the system SHALL store the contact inquiry data in the `contact_message` table in Supabase.

#### Scenario: User submits valid form
- **GIVEN** a user has filled all required fields with valid data
- **WHEN** the user submits the form
- **THEN** the system inserts a new row into the `contact_message` table with the provided data
- **AND** the `id` is auto-generated and `created_at` is set to the current timestamp

### Requirement: Form submission sends notification email
Upon successful storage, the system SHALL send an email via Resend containing the submitted contact data to a configurable recipient stored outside source code (e.g., environment variable or managed config).

#### Scenario: Send notification email
- **GIVEN** the form submission is valid and data is stored
- **AND** a recipient email address is configured outside code
- **WHEN** the submission completes successfully
- **THEN** an email is sent via Resend to the configured recipient with the submitted fields
- **AND** the recipient can be changed without modifying source code
- **AND** the sender address used is `contact_inquiry@notify.oceanfoodgroup.com`

### Requirement: Reusable submit button component
The form SHALL use a shared submit button component that can be reused across other forms to provide consistent styling and behavior.

#### Scenario: Shared submit button reused
- **GIVEN** multiple forms exist (including the contact form)
- **WHEN** they render their submit actions
- **THEN** they use the shared submit button component for consistent styling and states (normal, loading, disabled)

### Requirement: Reusable form layout/styling
The form SHALL use a shared form layout/styling wrapper so future forms can adopt the same structure and visual treatment while allowing different fields.

#### Scenario: Form layout reuse
- **GIVEN** additional forms are added to the site
- **WHEN** they are built
- **THEN** they can adopt the shared form layout/styling wrapper to maintain consistent spacing, typography, and field alignment

### Requirement: Form provides submission feedback
The form SHALL display clear feedback to users about submission success or failure.

#### Scenario: Successful submission
- **GIVEN** form data is successfully saved to the database
- **WHEN** the submission completes
- **THEN** the user sees a success message
- **AND** the form fields are cleared or the user is shown a confirmation view

#### Scenario: Submission failure
- **GIVEN** form submission fails due to network or database error
- **WHEN** the error occurs
- **THEN** the user sees an error message explaining the issue
- **AND** the form data remains populated so the user can retry
