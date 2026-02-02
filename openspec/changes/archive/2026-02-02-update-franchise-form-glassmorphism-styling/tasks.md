# Update Franchise Form Glassmorphism Styling - Tasks

- [x] **Update FormShell component for full-width transparent layout**
   - Remove `max-w-3xl` constraint to allow full width in all forms
   - Change background to always transparent for overlay compatibility
   - No variant prop needed (consistent across all forms)

- [x] **Update FormTitle component for consistent font sizing**
   - Update title font size to `--space-xl` (32px)
   - Update subtitle font size to `--space-md` (16px)
   - Maintain existing color props for context variations

- [x] **Update SubmitButton component for consistent pill styling**
   - Change to always use pill shape (border-radius: 100px)
   - Implement context-aware colors: white background/text for glassmorphism contexts, primary colors for standard contexts
   - Colors determined automatically by form context, no variant props needed

- [x] **Update FranchiseForm to use glassmorphism styling**
   - Apply glassmorphism label styling directly in component: font-size `--space-md`, color `rgba(255, 255, 255, 0.88)`
   - Update input styling: glassmorphism border, background, backdrop-filter
   - Update input placeholder colors: `rgba(255, 255, 255, 0.88)`
   - SubmitButton automatically uses white styling in glassmorphism context

- [x] **Create component-specific CSS file**
   - Add `styles/components/franchise-form.css` for glassmorphism styles
   - Import in `app/globals.css`
   - Ensure proper CSS custom property usage

- [x] **Update form validation error styling**
   - Adjust error text colors for glassmorphism background
   - Ensure error states remain accessible

- [x] **Test variant compatibility**
   - Verify contact form still works with default (standard) variants
   - Test franchise form with glassmorphism variants
   - Ensure no breaking changes to existing forms

- [x] **Test visual integration**
   - Verify form renders correctly on background imagery
   - Test responsive behavior across breakpoints
   - Confirm glassmorphism effects work in supported browsers

- [x] **Run accessibility and performance checks**
   - Validate contrast ratios for glassmorphism elements
   - Ensure no performance impact from backdrop-filter
   - Test keyboard navigation and screen reader support