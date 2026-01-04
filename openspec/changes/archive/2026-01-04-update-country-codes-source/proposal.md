# Change: Use maintained country code dataset for franchise form

## Why
- Current country code list is manually curated and incomplete, risking invalid or missing dial codes for users outside the listed countries.
- Manually maintaining codes is error-prone and costly; a maintained dataset or library provides reliable coverage and easier updates.

## What Changes
- Replace the hardcoded `COUNTRY_CODES` list with a maintained dataset/library (e.g., libphonenumber/country-telephone-data or similar) loaded in memory for suggestions.
- Ensure country code suggestions and validation use the full maintained dataset with global coverage, without per-keystroke external API calls.
- Add tests to verify broad coverage (sample countries across regions) and deterministic suggestion behavior after dataset updates.
- Introduce a reusable country code provider utility (dataset + filtering helpers) so other forms or features can consume the same source without duplication.
- Simplify dense regions (e.g., NANPA overlays sharing +1) for UX while keeping valid prefixes available.

## Impact
- Specs: franchise-form
- Code: franchise form constants/validation, country code suggestion logic, shared country code provider utility, related tests.

## Decisions
- Source: use the smallest reliable maintained dataset (e.g., country-telephone-data) unless libphonenumber metadata is required later.
- Territory scope: filter dense regions such as NANPA overlays (+1) to reduce suggestion noise while retaining valid prefixes.
- Provider shape: expose a ready-to-use suggestions array plus lookup maps by country code and dial code to support partial-input suggestions and future consumers.
