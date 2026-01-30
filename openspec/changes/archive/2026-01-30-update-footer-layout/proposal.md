# Update Footer Layout

## Why

The current footer design includes a "Our Culinary Concepts" section with brand logos that takes up significant vertical space and may not align with the desired brand presentation. The footer needs to be simplified and restyled with a cleaner, more professional appearance.

## What Changes

- Remove the brand logos section and associated database queries
- Implement a two-part layout with logo and legal links in the top section
- Add a centered separator line between sections
- Apply dark blue background (#14224A) with white text
- Ensure responsive design with appropriate sizing on all devices

## Problem Statement

The current footer design includes a "Our Culinary Concepts" section with brand logos that takes up significant vertical space and may not align with the desired brand presentation. The footer needs to be simplified and restyled with a cleaner, more professional appearance.

## Proposed Solution

Update the footer to remove the brand logos section and implement a two-part layout:
- Top section: Ocean Food Group white logo, Terms & Conditions, Privacy Policy (all centered in same line)
- Separator: Thin white line (80% width, centered, `border-top: 1px solid rgba(255, 255, 255, 0.20);`)
- Bottom section: Copyright notice (centered)
- Background: Dark blue color (#14224A)
- Text: White color for contrast

## Goals

- Simplify footer design by removing brand portfolio section
- Improve visual hierarchy and brand consistency
- Maintain accessibility and responsive design
- Use design tokens for consistent theming

## Impact Assessment

- Reduces footer height significantly
- Improves page load performance (removes brand image loading)
- Simplifies footer maintenance (no database queries needed)
- Enhances brand focus with primary color background

## Alternatives Considered

- Keeping brand logos but making them smaller
- Moving brand logos to a separate page
- Using a single-line footer layout

The proposed solution provides the cleanest, most maintainable approach while aligning with the brand's professional presentation goals.