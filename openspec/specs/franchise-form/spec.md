# franchise-form Specification

## Purpose
TBD - created by archiving change add-franchise-inquiry-form. Update Purpose after archive.
## Requirements
### Requirement: Franchise form UI and fields
- The `/franchise` page SHALL render the franchise application form as the primary content, titled "Become Our Partner" with the provided subtitle and submit button label "Start your journey?".
- Eleven fields render in order: firstName, lastName, countryCode (with suggestions), phone, preferredContactMethod, email, conceptInterest (active brands only), preferredLocation (AU states), hasLiquidAssets, canManageFullTime, referralSource (optional).
- Country code input limits to 20 characters, suggests up to five matching country codes, and lets users click a suggestion to populate the field.
- Country code suggestions SHALL be populated from a maintained external dataset/library with global coverage (not a manually curated list) and filtered client-side for matches.
- Preferred contact method options display as "Whatsapp" and "Mobile" but submit lowercase values `whatsapp` and `mobile`.
- Concept options are sourced from `brand` rows where `is_active = true`; inactive brands are not shown.
- Preferred location options are NSW, VIC, QLD, WA, SA, TAS, ACT, NT.
#### Scenario: Render form and options with maintained country codes
- WHEN a user visits `/franchise`
- THEN the form shows all 11 fields, country code suggestions appear as the user types using the maintained dataset, contact method options show Whatsapp/Mobile, concept options list active brands, and the state select lists AU states.

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

### Requirement: Country code dataset maintenance
- The franchise form SHALL source country code options from a maintained external dataset/library (e.g., libphonenumber/country-telephone-data) rather than a manually managed list in source code.
- The dataset SHALL include all active ITU country dialing codes and territories provided by the chosen library to avoid omissions.
- The dataset SHALL load in memory (build or server runtime) and be filtered locally for suggestions; no per-keystroke external API calls are permitted.
- Updating the dataset version SHALL refresh available codes without requiring code changes beyond dependency/version updates.
- Dense regions (e.g., NANPA overlays sharing +1) SHALL be filtered or grouped to reduce suggestion noise while preserving access to valid prefixes.
#### Scenario: Country codes sourced from maintained dataset
- WHEN the franchise form builds country code suggestions
- THEN it uses the maintained dataset covering all active dialing codes and territories, not a hand-curated subset
- AND updating the dataset/version updates available country codes without modifying application code.
#### Scenario: Dense regions simplified
- WHEN the provider prepares suggestions for regions with many overlays on the same dial prefix (e.g., +1 NANPA)
- THEN suggestions are simplified/grouped to avoid overwhelming the user while still allowing valid prefixes to be selected.

### Requirement: Reusable country code provider
- A shared country code provider utility SHALL expose the maintained dataset and filtering helpers for reuse by multiple forms/features (franchise form is one consumer).
- The provider SHALL avoid franchise-specific logic so additional consumers can import it without modification.
- The provider SHALL support suggestion filtering and lookup by country/dial code via a ready-to-use suggestions array plus lookup maps to enable future reuse cases.
#### Scenario: Country code provider reused
- WHEN another form or feature imports the country code provider
- THEN it can retrieve the same maintained dataset and filtering helpers without duplicating country code data or logic
- AND the franchise form uses this provider instead of defining its own list.

