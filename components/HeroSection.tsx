import type { HeroSectionProps } from "@/lib/hero-section/types";
import Image from "next/image";

export default function HeroSection({
  backgroundImageUrl,
  mobileBackgroundImageUrl,
  title,
  text,
}: HeroSectionProps) {
  return (
    <section
      className="relative w-full aspect-square md:aspect-16/5"
      role="region"
      aria-label="Hero section"
    >
      {/* Background Image */}
      <picture className="absolute inset-0">
        {/* Mobile image */}
        {mobileBackgroundImageUrl && (
          <source media="(max-width: 767px)" srcSet={mobileBackgroundImageUrl} />
        )}
        {/* Desktop image (fallback) */}
        <Image
          src={backgroundImageUrl}
          alt=""
          fill
          className="object-cover"
          priority
          aria-hidden="true"
        />
      </picture>

      {/* Content Box */}
      <div className="absolute bottom-(--space-xl) left-1/2 transform -translate-x-1/2">
        <div
          className="bg-[rgba(245,245,245,0.60)] backdrop-blur-[5px] px-6 sm:px-9 md:px-12 lg:px-15 py-0 rounded-t-lg md:rounded-lg flex flex-col justify-center items-start gap-5"
          style={{
            width: "min(1400px, 90vw)",
            height: "180px",
          }}
        >
          <h2
            className="font-bold text-gray-900 mb-2 truncate"
            style={{ fontSize: "var(--fs-h3)" }}
          >
            {title}
          </h2>
          <p
            className="leading-(--lh-body) text-gray-700 line-clamp-3"
            style={{
              fontSize: "var(--fs-body)",
              lineHeight: "var(--lh-body)",
            }}
          >
            {text}
          </p>
        </div>
      </div>
    </section>
  );
}
