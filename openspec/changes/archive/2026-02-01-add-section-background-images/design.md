# Design for Add Section Background Images

## Technical Approach

Add responsive background images to home page sections and individual brand items using the same pattern established by the HeroSection component. Start with the "Why Choose Ocean Food Group" section background and conditional brand item backgrounds.

## Implementation Pattern

Follow the HeroSection component's approach for background images:

```tsx
<section className="relative">
  {/* Background Image */}
  <picture className="absolute inset-0">
    {/* Mobile image */}
    <source
      media="(max-width: 767px)"
      srcSet="/images/section-backgrounds/home-card-grid-mb.png"
    />
    {/* Desktop image (fallback) */}
    <Image
      src="/images/section-backgrounds/home-card-grid.png"
      alt=""
      fill
      className="object-cover"
      aria-hidden="true"
    />
  </picture>

  {/* Content */}
  <div className="relative z-10">{/* Section content */}</div>
</section>
```

## Component Structure Changes

**Current Structure:**

```tsx
<div className="container-main py-12">
  <section className="py-[--space-3xl] md:py-[--space-4xl]">
    <SectionTitle title="Why Choose Ocean Food Group" alignment="center" />
    <div className="mt-[--space-4xl]">
      <CardGrid variant="feature" cards={featureCards} />
    </div>
  </section>
</div>
```

**Proposed Structure:**

```tsx
<section className="relative py-12">
  {/* Background Image */}
  <picture className="absolute inset-0">
    <source
      media="(max-width: 767px)"
      srcSet="/images/section-backgrounds/home-card-grid-mb.png"
    />
    <Image
      src="/images/section-backgrounds/home-card-grid.png"
      alt=""
      fill
      className="object-cover -z-10"
      aria-hidden="true"
    />
  </picture>

  {/* Content */}
  <div className="container-main relative z-10">
    <div className="py-[--space-3xl] md:py-[--space-4xl]">
      <SectionTitle title="Why Choose Ocean Food Group" alignment="center" />
      <div className="mt-[--space-4xl]">
        <CardGrid variant="feature" cards={featureCards} />
      </div>
    </div>
  </div>
</section>
```

## Career Section Background

**Responsive Background Strategy:**

- **Desktop (>768px)**: Uses `public/images/section-backgrounds/career-card-grid.png` (1920x690, ratio: 2.78:1)
- **Mobile (≤768px)**: Uses `public/images/section-backgrounds/contact-form-mb.png` (750x850, ratio: 0.88:1)
- **Implementation**: Follows the same pattern as "Why Choose Ocean Food Group" section

**Proposed Structure for Career Section:**

```tsx
<section className="relative py-12">
  {/* Background Image */}
  <picture className="absolute inset-0">
    <source
      media="(max-width: 767px)"
      srcSet="/images/section-backgrounds/contact-form-mb.png"
    />
    <Image
      src="/images/section-backgrounds/career-card-grid.png"
      alt=""
      fill
      className="object-cover"
      priority={false}
    />
  </picture>

  <div className="container-main relative z-10">
    <div className="py-[--space-3xl] md:py-[--space-4xl]">
      <SectionTitle title="Why Work With Us" alignment="center" />
      <div className="mt-[--space-4xl]">
        <CardGrid variant="feature" cards={careerCards} />
      </div>
    </div>
  </div>
</section>
```

## Contact Form Background

**Responsive Background Strategy:**

- **Desktop (>768px)**: Uses `public/images/section-backgrounds/contact-form.png` (1920x850, ratio: 2.26:1)
- **Mobile (≤768px)**: Uses `public/images/section-backgrounds/contact-form-mb.png` (750x850, ratio: 0.88:1)
- **Implementation**: Uses `<picture>` element with `<source>` for responsive behavior

**Proposed Structure for Contact Form:**

```tsx
<section className="relative py-12">
  {/* Background Image */}
  <picture className="absolute inset-0">
    <source
      media="(max-width: 767px)"
      srcSet="/images/section-backgrounds/contact-form-mb.png"
    />
    <Image
      src="/images/section-backgrounds/contact-form.png"
      alt=""
      fill
      className="object-cover"
      priority={false}
    />
  </picture>

  <div className="container-main relative z-10">
    <div className="py-[--space-3xl] md:py-[--space-4xl]">
      <SectionTitle title="Contact Us" alignment="center" />
      <div className="mt-[--space-4xl]">
        <ContactForm />
      </div>
    </div>
  </div>
</section>
```

## Brand Item Background Logic

**Full-Width Background Strategy:**

- **Background Coverage**: Background images span the full width of the brand items container, ignoring individual brand item padding
- **Content Padding**: Brand item content maintains horizontal padding while background extends to container edges
- **Conditional Application**: Background applied to the entire brands section when conditions are met

**Conditional Background Application:**

- **Single Brand**: Background applied to the brands container when only one brand exists
- **Multiple Brands**: Background applied to the brands container when multiple brands exist
- **No Background**: No background applied when no brands exist

**Implementation in Brands Component:**

```tsx
// In the brands container component
const shouldApplyBackground = brands.length > 0;

return (
  <div className={`brands-container ${shouldApplyBackground ? "has-background" : ""}`}>
    {shouldApplyBackground && (
      <picture className="absolute inset-0">
        <source
          media="(max-width: 767px)"
          srcSet="/images/section-backgrounds/home-brand-item-mb.png"
        />
        <Image
          src="/images/section-backgrounds/home-brand-item.png"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
      </picture>
    )}

    {/* Brand items with padding */}
    <div className="brands-grid">
      {brands.map((brand, index) => (
        <div key={brand.id} className="brand-item px-4">
          {/* Brand content */}
        </div>
      ))}
    </div>
  </div>
);
```

## CSS Considerations

- Use `relative` positioning on containers with backgrounds
- Position background with `absolute inset-0`
- Ensure content has `relative z-10` for proper layering
- Background should use `object-cover` for proper scaling
- Consider adding subtle overlay if background affects text readability

## Responsive Behavior

- **Desktop (>768px)**: Uses desktop background images
- **Mobile (≤768px)**: Uses mobile-optimized background images
- **Breakpoint**: 767px matches existing mobile breakpoints
- **Fallback**: Desktop images serve as fallback for browsers without `<picture>` support

## Performance Considerations

- Images should be optimized for web delivery
- Use Next.js Image component for automatic optimization
- Consider lazy loading for below-the-fold content
- Monitor impact on Core Web Vitals

## Accessibility

- Background images marked with `aria-hidden="true"`
- Ensure sufficient contrast between text and background
- Test with screen readers to ensure content remains accessible
- Consider adding descriptive alt text if backgrounds become decorative

## Future Extensibility

This pattern can be easily extended to other home page sections and items:

- Additional section backgrounds
- More complex brand item background logic
- Other component background patterns

The conditional logic for brand items provides flexibility for future requirements while maintaining clean, maintainable code.

## CSS Background Effects

**Our Team Section:**

```css
background: linear-gradient(
  180deg,
  #b4d2ff 0%,
  rgba(219, 241, 255, 0) 97.96%,
  rgba(195, 219, 255, 0) 100%
);
opacity: 0.6;
```

**Featured in Media Section:**

```css
background: rgba(0, 84, 255, 0.5);
mix-blend-mode: multiply;
filter: blur(107.69231414794922px);
```

**Job Postings Section:**

```css
opacity: 0.6;
background: linear-gradient(180deg, #B4D2FF 0%, rgba(219, 241, 255, 0.00) 97.96%, rgba(195, 219, 255, 0.00) 100%);
```

**Implementation Approach:**

- Apply CSS effects as pseudo-elements or background layers
- Ensure proper z-index layering with content
- Test blend modes and filters across browsers
- Monitor performance impact of blur effects

## Franchise Form Background

**Responsive Background Strategy:**

- **Desktop (>768px)**: Uses `public/images/section-backgrounds/franchise-form.png` (1920x1050, ratio: 1.83:1)
- **Mobile (≤768px)**: Uses `public/images/section-backgrounds/franchise-form-mb.png` (750x1542, ratio: 0.49:1)
- **Implementation**: Uses `<picture>` element with `<source>` for responsive behavior

**Proposed Structure for Franchise Form:**

```tsx
<section className="relative py-12">
  {/* Background Image */}
  <picture className="absolute inset-0">
    <source
      media="(max-width: 767px)"
      srcSet="/images/section-backgrounds/franchise-form-mb.png"
    />
    <Image
      src="/images/section-backgrounds/franchise-form.png"
      alt=""
      fill
      className="object-cover"
      priority={false}
    />
  </picture>

  <div className="container-main relative z-10">
    <div className="py-[--space-3xl] md:py-[--space-4xl]">
      <SectionTitle title="Franchise Application" alignment="center" />
      <div className="mt-[--space-4xl]">
        <FranchiseForm />
      </div>
    </div>
  </div>
</section>
```

## Franchise Form Footer Background

**Footer Background Strategy:**

- **All Devices**: Uses `public/images/section-backgrounds/franchise-form-footer.png` (750x118, ratio: 6.36:1)
- **Positioning**: Placed below the franchise form section
- **Implementation**: Full-width background image for visual continuity

**Proposed Structure for Franchise Form Footer:**

```tsx
<section className="relative">
  {/* Footer Background Image */}
  <Image
    src="/images/section-backgrounds/franchise-form-footer.png"
    alt=""
    width={750}
    height={118}
    className="w-full h-auto"
    priority={false}
  />
</section>
```
