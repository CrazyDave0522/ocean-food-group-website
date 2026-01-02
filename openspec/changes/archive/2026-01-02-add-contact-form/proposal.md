# Change: Add contact inquiry form to contact page

## Why
Users need a way to submit inquiries directly from the website without requiring external email clients. A form provides a structured, accessible way to capture contact information and messages.

## What Changes
- Add a contact inquiry form to the `/contact` page with fields: First name, Last name, Email, Phone, Subject, Message.
- Create Supabase client helper in `lib/supabase.ts` for server-side data operations.
- Create server action to handle form submission and insert data into `contact_message` table.
- Send a notification email via Resend after successful submission, using a configurable recipient stored outside code (e.g., env var or config file).
- Create a reusable submit button component for forms, to be shared across forms.
- Create a reusable form layout/styling pattern so future forms can share consistent structure and visual treatment while allowing different fields.
- Add client-side form validation and submission handling.
- Provide user feedback on submission success/error.

## Impact
- Affected specs: contact-form (new capability)
- Affected code:
  - `app/contact/page.tsx` — add form UI and submission logic
  - `lib/supabase.ts` (new) — Supabase client helper
  - `app/actions/contact.ts` (new) — server action for form submission
