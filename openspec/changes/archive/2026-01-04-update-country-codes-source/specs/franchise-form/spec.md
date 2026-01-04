## MODIFIED Requirements

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

## ADDED Requirements

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
