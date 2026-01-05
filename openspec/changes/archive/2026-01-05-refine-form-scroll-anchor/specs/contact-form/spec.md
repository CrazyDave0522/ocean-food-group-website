# contact-form Spec Delta

## MODIFIED Requirements

### Requirement: Form provides submission feedback

The contact form SHALL display a success or error message upon submission and scroll the viewport to anchor at the form title position, ensuring both the title and feedback message are visible.

#### Scenario: User submits form and viewport scrolls to form title

- **GIVEN** a user has submitted the contact form (successfully or with errors)
- **WHEN** the form state updates with success or error status
- **THEN** the browser automatically scrolls to position the form section container at the top of the viewport
- **AND** the form title "Reach Out To Us" and subtitle remain visible
- **AND** the feedback message (success or error) is visible below the title
- **AND** the scroll behavior is smooth and accessible
- **AND** if the form section container is not found, the system falls back to scrolling to the form element
