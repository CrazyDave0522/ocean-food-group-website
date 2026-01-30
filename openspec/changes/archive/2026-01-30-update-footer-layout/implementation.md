## Implementation Details

### Footer Component Structure
```tsx
<footer className="bg-[#14224A] text-white">
  {/* Top Section */}
  <div className="py-8 flex items-center justify-center gap-6 md:gap-8 px-4 md:px-8">
    {/* Logo */}
    <div className="shrink-0 w-20 md:w-30">
      <Image
        src="/images/logos/Ocean-Food-white.png"
        alt="Ocean Food Group"
        width={120}
        height={42}
        className="footer-logo w-full h-auto"
        style={{ height: "auto" }}
      />
    </div>

    {/* Navigation Links */}
    <nav aria-label="Footer navigation">
      <ul className="flex gap-6 text-xs md:text-sm">
        <li>
          <Link href="/terms" className="hover:underline">
            Terms &amp; Conditions
          </Link>
        </li>
        <li>
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
        </li>
      </ul>
    </nav>
  </div>

  {/* Separator Line */}
  <div className="flex justify-center px-4">
    <div className="w-4/5 border-t border-white/20"></div>
  </div>

  {/* Bottom Section */}
  <div className="py-6 flex justify-center">
    <div className="text-xs md:text-sm text-center">
      © {new Date().getFullYear()} Ocean Food Group Pty Ltd. All Rights Reserved.
    </div>
  </div>
</footer>
```

### Key Implementation Points
- **Layout**: All elements remain in the same horizontal line on both mobile and desktop
- **Responsive Logo Sizing**: Logo scales from 80px width on mobile to 120px width on desktop using `w-20 md:w-30` container
- **Responsive Font Sizing**: Text scales from `text-xs` on mobile to `text-sm` on desktop for links and copyright
- **Responsive Spacing**: Gap between elements adjusts from `gap-6` on mobile to `gap-8` on desktop
- **Background Color**: Dark blue background `#14224A` applied to footer
- **Text Color**: White text for all elements
- **Separator**: 80% width horizontal line centered with `border-white/20`
- **Copyright**: Centered below separator with muted white color