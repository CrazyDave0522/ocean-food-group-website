# franchise-form Specification Delta

## MODIFIED Requirements

### Requirement: Form provides user feedback on submission outcome

The franchise form SHALL display a success or error message upon submission and scroll the viewport to ensure the message is visible to the user.

#### Scenario: User submits valid franchise inquiry and sees success message

- **GIVEN** a user has filled all required fields with valid data
- **WHEN** the user submits the franchise inquiry form
- **THEN** the system displays a green success message at the top of the form
- **AND** the viewport smoothly scrolls to position the form and success message in view
- **AND** the message text reads "Thank you! We'll be in touch soon."

#### Scenario: User submits form with validation errors and sees error feedback

- **GIVEN** a user has entered invalid data or left required fields empty
- **WHEN** the user attempts to submit the form
- **THEN** the system displays validation errors specific to each field
- **AND** the viewport smoothly scrolls to position the form and error messages in view
- **AND** the errors are clearly visible without requiring manual scroll

#### Scenario: User sees feedback message without scrolling

- **GIVEN** a user has submitted the form (successfully or with errors)
- **WHEN** the form state updates with success or error status
- **THEN** the browser automatically scrolls to position the form at the top of the viewport
- **AND** the feedback message (success or error) is immediately visible
- **AND** the scroll behavior is smooth and accessible
