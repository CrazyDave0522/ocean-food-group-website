/**
 * BrandsList component - displays vertical list of brands with alternating layout
 * Returns null if no active brands exist (entire section should not render)
 */

import { fetchPublishedBrands } from '@/lib/actions/brands';
import { BrandCard } from './BrandCard';

export async function BrandsList() {
  const result = await fetchPublishedBrands();

  // Show error message if fetch failed
  if (result.error) {
    return (
      <div className="text-center py-[--space-4xl]">
        <p className="text-[--color-text] text-base">
          Unable to load brands at this time. Please try again later.
        </p>
      </div>
    );
  }

  // Return null if no active brands exist - entire section should not render
  if (result.items.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-12 md:gap-16">
      {result.items.map((brand, index) => (
        <BrandCard key={brand.id} brand={brand} index={index} />
      ))}
    </div>
  );
}
