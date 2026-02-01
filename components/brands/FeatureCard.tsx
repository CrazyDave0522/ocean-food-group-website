/**
 * FeatureCard component - displays individual brand with alternating layout
 * Odd indexes: image left, text right
 * Even indexes: text left, image right
 * Mobile: always stacked vertically
 * Background logic: single item gets background, or second item in multiple items
 */

import Image from 'next/image';
import type { Brand } from '@/lib/brands/types';

interface FeatureCardProps {
  brand: Brand;
  index: number;
  totalItems: number;
}

export function FeatureCard({ brand, index, totalItems }: FeatureCardProps) {
  const isOddIndex = index % 2 === 0;
  // Apply background to first item if single, or second item if multiple
  const hasBackground = totalItems === 1 ? index === 0 : index === 1;

  const cardContent = (
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

  if (hasBackground) {
    return (
      <div className="relative" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', width: '100vw' }}>
        {/* Background Image - Full Width */}
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
            priority={false}
            aria-hidden="true"
          />
        </picture>

        {/* Content */}
        <div className="relative z-10 px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 mx-auto max-w-screen-2xl">
          {cardContent}
        </div>
      </div>
    );
  }

  return cardContent;
}
