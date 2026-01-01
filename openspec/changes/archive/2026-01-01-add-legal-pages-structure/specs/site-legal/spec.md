## ADDED Requirements


### Requirement: Privacy and Terms pages rendered from static Markdown

The site MUST expose `/privacy` and `/terms` pages that render their content from static Markdown files stored in the repository at `public/legal/privacy.md` and `public/legal/terms.md`.

#### Scenario: Page renders content from static file

Given the static file `public/legal/privacy.md` exists
When a user requests `/privacy`
Then the page must render the Markdown content from that file inside the site's layout and preserve author formatting.

### Requirement: Content-only updates do not require code changes

Editors MUST be able to update the legal text by editing the HTML files in `public/legal/` without modifying application code.

#### Scenario: Update content file only

Given the file `public/legal/terms.md` is edited and committed
When the site is deployed
Then the `/terms` page must reflect the updated HTML without any code changes.

### Requirement: Trusted content handling

Legal HTML files are trusted authored content; the rendering implementation MUST ensure the files are not exposed to cross-site scripting risks by avoiding rendering arbitrary remote HTML. Rendering via server-side inclusion or trusted static assets is acceptable.

#### Scenario: Render trusted static asset

Given `public/legal/privacy.html` contains HTML tags and inline formatting
When the site renders `/privacy`
Then the content is displayed as authored and no remote or untrusted scripts are executed.
