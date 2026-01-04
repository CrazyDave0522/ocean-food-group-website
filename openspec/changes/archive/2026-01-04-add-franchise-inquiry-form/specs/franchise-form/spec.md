## MODIFIED Requirements

### Requirement: Franchise form UI and fields
- The `/franchise` page SHALL render the franchise application form as the primary content, titled "Become Our Partner" with the provided subtitle and submit button label "Start your journey?".
- Eleven fields render in order: firstName, lastName, countryCode (with suggestions), phone, preferredContactMethod, email, conceptInterest (active brands only), preferredLocation (AU states), hasLiquidAssets, canManageFullTime, referralSource (optional).
- Country code input limits to 20 characters, suggests up to five matching country codes, and lets users click a suggestion to populate the field.
- Preferred contact method options display as "Whatsapp" and "Mobile" but submit lowercase values `whatsapp` and `mobile`.
- Concept options are sourced from `brand` rows where `is_active = true`; inactive brands are not shown.
- Preferred location options are NSW, VIC, QLD, WA, SA, TAS, ACT, NT.
#### Scenario: Render form and options
- WHEN a user visits `/franchise`
- THEN the form shows all 11 fields, country code suggestions appear as the user types, contact method options show Whatsapp/Mobile, concept options list active brands, and the state select lists AU states.

### Requirement: Validation rules
- The form SHALL enforce the following required fields: firstName, lastName, countryCode, phone, preferredContactMethod, email, conceptInterest, preferredLocation, hasLiquidAssets, canManageFullTime; referralSource is optional.
- Field length limits follow `FRANCHISE_FIELD_LIMITS` (first/last 100; countryCode 20; phone 20; preferredContactMethod 20; email 255; conceptInterest 255; preferredLocation 10; hasLiquidAssets 10; canManageFullTime 10; referralSource 500) returning `Must be {limit} characters or fewer.`
- Email must match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`; error "Enter a valid email." on failure.
- Country code must match `AA +999...` (case-insensitive); error "Enter a valid country code." on failure.
- Phone allows digits, spaces, parentheses, and dashes; error "Enter a valid phone number." on failure.
- preferredContactMethod must be one of CONTACT_METHODS; error "Please select a valid contact method." on failure.
- preferredLocation must be one of AUSTRALIAN_STATES; error "Please select a valid location." on failure.
- conceptInterest must match an active brand name; invalid or validation-fetch errors yield "Please select a valid concept." or "Could not validate concept. Please try again."
- Client and server share the same rules and on validation failure return `status: "error"`, an `errors` map, and message "Please fix the highlighted fields."
#### Scenario: Missing required field
- WHEN a required field is empty and the user submits
- THEN that field shows "This field is required." and the submission is blocked.
#### Scenario: Invalid country code
- WHEN the user enters "invalid123" as country code and submits
- THEN the form shows "Enter a valid country code." and no request is sent.
#### Scenario: Invalid contact method
- WHEN the submitted preferredContactMethod is not `whatsapp` or `mobile`
- THEN the form shows "Please select a valid contact method." and rejects the request.

### Requirement: Successful submission and notifications
- On passing validation, the server SHALL insert into `franchise_inquiry` with columns: first_name, last_name, country_code, phone, email, preferred_contact_method, interested_brand, preferred_state, has_liquid_assets_400k (Yes→true), can_manage_full_time (Yes→true), referral_source (nullable).
- After insert, the server sends email via `sendFormNotification` from `franchise_inquiry@notify.oceanfoodgroup.com.au` to `hello@oceanfoodgroup.com.au`, replyTo user email, subject `New Franchise Inquiry — {conceptInterest} — {preferredLocation}`, body containing all fields.
- If email sending fails after a successful insert, the response remains `status: "success"` with message "Thank you for your application! We'll contact you if there are any issues."
- If insert and email succeed, response is `status: "success"` with message "Thank you! We'll be in touch soon."
- The client shows the success message and resets all fields when state status is success.
#### Scenario: Successful submission
- WHEN a user submits valid data for an active brand and state
- THEN the record is stored, email is attempted, success feedback shows, and the form is cleared for another submission.

### Requirement: Error handling and UX resilience
- If Supabase client initialization fails, the server SHALL return `status: "error"` and message "Service is not configured. Please try again later."
- If Supabase insert fails, the server returns `status: "error"` and message "Failed to submit application. Please try again."
- If concept validation cannot reach Supabase, the server returns an error and message "Could not validate concept. Please try again."
- Submit button uses a loading/disabled state during submission to prevent duplicates; on errors, form values remain for correction.
- On email failure after a successful insert, the user sees the success-with-issues message and the stored data remains.
- On any error path, the form is not cleared.
#### Scenario: Supabase unavailable
- WHEN Supabase client creation throws
- THEN the user sees "Service is not configured. Please try again later." and no insert or email occurs.
#### Scenario: Insert error
- WHEN the insert returns an error
- THEN the user sees "Failed to submit application. Please try again.", no email is sent, and form data stays for editing.
#### Scenario: Email send fails
- WHEN the insert succeeds but email sending fails
- THEN the user sees "Thank you for your application! We'll contact you if there are any issues." and the stored submission remains intact.
