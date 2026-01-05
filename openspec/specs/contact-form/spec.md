# contact-form Specification

## Purpose

TBD - created by archiving change add-contact-form. Update Purpose after archive.
## Requirements
### Requirement: Contact form displays all required fields

The contact page SHALL display a form with fields for first name, last name, email, phone (optional), subject, and message.

#### Scenario: Contact form fields visible

- **WHEN** a user navigates to `/contact`
- **THEN** the form shows inputs for first name, last name, email, phone, subject, and message
- **AND** the phone field is present alongside the required fields

### Requirement: Required/optional indicators are shown

The form SHALL mark required fields with an asterisk (*) label and mark optional fields as "(Optional)" (e.g., phone).

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

### Requirement: Loading state during submission

The form SHALL display appropriate loading feedback and prevent duplicate submissions during processing.

#### Scenario: Loading state shown

- **GIVEN** form validation passes
- **WHEN** the user clicks the submit button
- **THEN** the submit button is disabled during submission
- **AND** the submit button shows a loading indicator (spinner or "Submitting..." text)

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

The contact form SHALL display a success or error message upon submission and scroll the viewport to ensure the message is visible to the user.

#### Scenario: User submits valid form and sees success message

- **GIVEN** a user has filled all required fields with valid data
- **WHEN** the user submits the form
- **THEN** the system displays a green success message at the top of the form
- **AND** the viewport smoothly scrolls to position the form and success message in view
- **AND** the message text reads "Thank you! We'll be in touch soon."

#### Scenario: User submits form with errors and sees error feedback

- **GIVEN** a user has entered invalid data or left required fields empty
- **WHEN** the user attempts to submit the form
- **THEN** the system displays validation errors
- **AND** the viewport smoothly scrolls to position the form and error messages in view
- **AND** the errors are clearly visible without requiring manual scroll

#### Scenario: User sees feedback message without scrolling

- **GIVEN** a user has submitted the form (successfully or with errors)
- **WHEN** the form state updates with success or error status
- **THEN** the browser automatically scrolls to position the form at the top of the viewport
- **AND** the feedback message (success or error) is immediately visible
- **AND** the scroll behavior is smooth and accessible

