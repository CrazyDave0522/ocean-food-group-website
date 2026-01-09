/**
 * Reusable SectionTitle component for site sections
 * Can be used across any page section (brands, media reviews, testimonials, etc.)
 */

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center";
}

export function SectionTitle({
  title,
  subtitle,
  alignment = "center",
}: SectionTitleProps) {
  const alignmentClass = alignment === "left" ? "text-left" : "text-center";

  return (
    <div className={alignmentClass}>
      <h2 className="text-(length:--fs-h1) font-bold mb-[--space-md]">{title}</h2>
      {subtitle && (
        <p className="text-(length:--fs-body) mb-[--space-lg]">{subtitle}</p>
      )}
    </div>
  );
}
