import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CardGrid from '@/components/CardGrid';
import type { Variant1CardData, Variant2CardData } from '@/lib/card-grid/types';

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height, className, ...props }: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    [key: string]: unknown;
  }) => <img src={src} alt={alt} width={width} height={height} className={className} {...props} />, // eslint-disable-line @next/next/no-img-element
}));

describe('CardGrid Integration Tests', () => {
  const sampleFeatureCards: Variant1CardData[] = [
    {
      id: '1',
      title: 'Fresh Seafood',
      icon: '/images/icons/fresh.svg',
      bulletPoints: ['Sustainably sourced', 'Daily deliveries', 'Premium quality'],
    },
    {
      id: '2',
      title: 'Quality Assurance',
      icon: '/images/icons/quality.svg',
      bulletPoints: ['Rigorous testing', 'Food safety certified', 'Traceability guaranteed'],
    },
    {
      id: '3',
      title: 'Expert Team',
      icon: '/images/icons/team.svg',
      bulletPoints: ['20+ years experience', 'Culinary experts', 'Customer focused'],
    },
  ];

  const sampleImageCards: Variant2CardData[] = [
    {
      id: '1',
      title: 'Grilled Salmon',
      image: '/images/menu/salmon.jpg',
      text: 'Perfectly grilled Atlantic salmon with herbs',
    },
    {
      id: '2',
      title: 'Fresh Lobster',
      image: '/images/menu/lobster.jpg',
      text: 'Live Maine lobster, steamed to perfection',
    },
  ];

  describe('Page Context Integration', () => {
    it('renders correctly within a page section structure', () => {
      const { container } = render(
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us</h2>
            <CardGrid variant="feature" cards={sampleFeatureCards} />
          </div>
        </section>
      );

      // Verify the component is properly contained
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();

      // Verify the card grid is present
      const cardGrid = screen.getByRole('region', { name: 'feature card grid with 3 cards' });
      expect(cardGrid).toBeInTheDocument();

      // Verify content is accessible
      expect(screen.getByText('Fresh Seafood')).toBeInTheDocument();
      expect(screen.getByText('Quality Assurance')).toBeInTheDocument();
      expect(screen.getByText('Expert Team')).toBeInTheDocument();
    });

    it('maintains responsive behavior in different container contexts', () => {
      // Test with different container classes
      const { rerender } = render(
        <div className="w-full max-w-7xl mx-auto">
          <CardGrid variant="image" cards={sampleImageCards} />
        </div>
      );

      let gridElement = screen.getByRole('region', { name: 'image card grid with 2 cards' });
      expect(gridElement).toHaveClass('grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4');

      // Test with smaller container
      rerender(
        <div className="w-full max-w-4xl mx-auto">
          <CardGrid variant="image" cards={sampleImageCards} />
        </div>
      );

      gridElement = screen.getByRole('region', { name: 'image card grid with 2 cards' });
      expect(gridElement).toHaveClass('grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4');
    });

    it('integrates with page styling and spacing', () => {
      render(
        <main className="min-h-screen">
          <CardGrid
            variant="feature"
            cards={sampleFeatureCards}
            className="my-8"
          />
        </main>
      );

      const gridElement = screen.getByRole('region', { name: 'feature card grid with 3 cards' });
      expect(gridElement).toHaveClass('my-8');
    });
  });

  describe('Accessibility in Page Context', () => {
    it('maintains proper heading hierarchy when used in sections', () => {
      render(
        <article>
          <h1>Main Page Title</h1>
          <section>
            <h2>Section Heading</h2>
            <CardGrid variant="feature" cards={sampleFeatureCards.slice(0, 2)} />
          </section>
        </article>
      );

      // Verify the card grid doesn't interfere with heading hierarchy
      const headings = screen.getAllByRole('heading');
      expect(headings).toHaveLength(4); // h1, h2, and 2 card titles (h3)
    });

    it('provides appropriate ARIA labels in complex page structures', () => {
      render(
        <div>
          <header>
            <h1>Brand Showcase</h1>
          </header>
          <main>
            <section aria-labelledby="features-heading">
              <h2 id="features-heading">Key Features</h2>
              <CardGrid variant="feature" cards={sampleFeatureCards} />
            </section>
          </main>
        </div>
      );

      const cardGrid = screen.getByRole('region', { name: 'feature card grid with 3 cards' });
      expect(cardGrid).toBeInTheDocument();

      // Verify individual cards have proper labeling
      const articles = screen.getAllByRole('article');
      expect(articles).toHaveLength(3);
    });
  });

  describe('Performance and Loading', () => {
    it('renders efficiently with multiple cards', () => {
      const manyCards: Variant1CardData[] = Array.from({ length: 8 }, (_, i) => ({
        id: `${i + 1}`,
        title: `Feature ${i + 1}`,
        bulletPoints: [`Point ${i + 1}-1`, `Point ${i + 1}-2`],
      }));

      const startTime = performance.now();
      render(<CardGrid variant="feature" cards={manyCards} />);
      const endTime = performance.now();

      // Should render in reasonable time (less than 100ms for this simple test)
      expect(endTime - startTime).toBeLessThan(100);

      // Verify all cards are rendered
      expect(screen.getAllByRole('article')).toHaveLength(8);
    });

    it('handles empty card arrays gracefully', () => {
      render(<CardGrid variant="feature" cards={[]} />);

      const cardGrid = screen.getByRole('region', { name: 'feature card grid with 0 cards' });
      expect(cardGrid).toBeInTheDocument();

      // Should not crash and should render empty grid
      expect(screen.queryByRole('article')).not.toBeInTheDocument();
    });
  });
});