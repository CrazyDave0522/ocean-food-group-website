````markdown
```markdown
## ADDED Requirements

### Requirement: Main Public Pages
The website SHALL provide the following top-level pages reachable via header navigation: Home, Media Reviews, Franchise, Careers, Contact.

#### Scenario: Header navigation reaches each page
- **WHEN** a user clicks the header link for any of the main pages
- **THEN** the browser navigates to the corresponding URL and the page returns an HTTP 200 response

### Requirement: Legal Pages
The website SHALL provide `Terms & Conditions` and `Privacy Policy` pages accessible from the footer.

#### Scenario: Footer legal links
- **WHEN** a user clicks `Terms & Conditions` in the footer
- **THEN** the browser navigates to `/terms` and displays the legal content with HTTP 200


```

````
