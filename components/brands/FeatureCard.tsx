/**
 * FeatureCard component - displays individual brand with alternating layout
 * Odd indexes: image left, text right
 * Even indexes: text left, image right
 * Mobile: always stacked vertically
 */

import Image from 'next/image';
import type { Brand } from '@/lib/brands/types';

interface FeatureCardProps {
  brand: Brand;
  index: number;
}

export function FeatureCard({ brand, index }: FeatureCardProps) {
  const isOddIndex = index % 2 === 0;

  return (
    <a
      href={brand.website_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      {/* Mobile: stacked layout */}
      <div className="flex flex-col gap-8 md:hidden">
        <div className="relative h-40 w-full">
          <Image
            src={brand.logo_url}
            alt={brand.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw"
          />
        </div>
        <div>
          <h3 className="text-(length:--fs-h3) font-semibold text-[--color-text] group-hover:opacity-80 transition-opacity">
            {brand.name}
          </h3>
          <p className="text-(length:--fs-body) text-slate-600 line-clamp-16 mt-2 text-justify whitespace-pre-line">
            {brand.introduction}
          </p>
        </div>
      </div>

      {/* Desktop: alternating layout */}
      <div
        className={`hidden md:flex gap-12 items-center group-hover:opacity-80 transition-opacity ${
          isOddIndex ? 'flex-row' : 'flex-row-reverse'
        }`}
      >
        <div className="shrink-0 w-120 h-75 relative">
          <Image
            src={brand.logo_url}
            alt={brand.name}
            fill
            className="object-cover"
            sizes="480px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-(length:--fs-h3) font-semibold text-[--color-text]">
            {brand.name}
          </h3>
          <p className="text-(length:--fs-body) text-slate-600 line-clamp-12 mt-(--space-xl) text-justify whitespace-pre-line">
            {brand.introduction}
          </p>
        </div>
      </div>
    </a>
  );
}
