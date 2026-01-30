import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CardGrid from '@/components/CardGrid';
import type { Variant1CardData, Variant2CardData, Variant3CardData, Variant4CardData } from '@/lib/card-grid/types';

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

describe('CardGrid Component', () => {
  const mockFeatureCards: Variant1CardData[] = [
    {
      id: '1',
      title: 'Feature One',
      icon: '/test-icon1.svg',
      bulletPoints: ['Point 1', 'Point 2', 'Point 3'],
    },
    {
      id: '2',
      title: 'Feature Two',
      bulletPoints: ['Point A', 'Point B'],
    },
    {
      id: '3',
      title: 'Feature Three',
      icon: '/test-icon3.svg',
      bulletPoints: ['Point X', 'Point Y', 'Point Z'],
    },
  ];

  const mockImageCards: Variant2CardData[] = [
    {
      id: '1',
      title: 'Image Card One',
      image: '/test-image1.jpg',
      text: 'Description for card one',
    },
    {
      id: '2',
      title: 'Image Card Two',
      image: '/test-image2.jpg',
      text: 'Description for card two',
    },
  ];

  const mockExpandableCards: Variant3CardData[] = [
    {
      id: '1',
      title: 'Expandable One',
      backgroundImage: '/test-bg1.jpg',
      icon: '/test-icon1.svg',
      text: 'Expanded content for card one',
    },
    {
      id: '2',
      title: 'Expandable Two',
      backgroundImage: '/test-bg2.jpg',
      text: 'Expanded content for card two',
    },
  ];

  const mockCenteredCards: Variant4CardData[] = [
    {
      id: '1',
      title: 'Centered One',
      icon: '/test-icon1.svg',
      text: 'Content for centered card one',
    },
    {
      id: '2',
      title: 'Centered Two',
      text: 'Content for centered card two',
    },
  ];

  describe('Feature variant', () => {
    it('renders feature cards with correct structure', () => {
      render(<CardGrid variant="feature" cards={mockFeatureCards} />);

      expect(screen.getByRole('region', { name: 'feature card grid with 3 cards' })).toBeInTheDocument();
      expect(screen.getByText('Feature One')).toBeInTheDocument();
      expect(screen.getByText('Feature Two')).toBeInTheDocument();
      expect(screen.getByText('Feature Three')).toBeInTheDocument();
    });

    it('renders bullet points correctly', () => {
      render(<CardGrid variant="feature" cards={mockFeatureCards} />);

      expect(screen.getByText('Point 1')).toBeInTheDocument();
      expect(screen.getByText('Point A')).toBeInTheDocument();
      expect(screen.getByText('Point X')).toBeInTheDocument();
    });

    it('renders icons when provided', () => {
      render(<CardGrid variant="feature" cards={mockFeatureCards} />);

      const images = document.querySelectorAll('img[src*="/test-icon"]');
      expect(images).toHaveLength(2); // Only cards with icons
    });

    it('has proper accessibility attributes', () => {
      render(<CardGrid variant="feature" cards={[mockFeatureCards[0]]} />);

      const article = screen.getByRole('article');
      expect(article).toHaveAttribute('aria-labelledby', 'feature-card-title-1');

      const title = screen.getByRole('heading', { name: 'Feature One' });
      expect(title).toHaveAttribute('id', 'feature-card-title-1');
    });
  });

  describe('Image variant', () => {
    it('renders image cards with correct structure', () => {
      render(<CardGrid variant="image" cards={mockImageCards} />);

      expect(screen.getByRole('region', { name: 'image card grid with 2 cards' })).toBeInTheDocument();
      expect(screen.getByText('Image Card One')).toBeInTheDocument();
      expect(screen.getByText('Image Card Two')).toBeInTheDocument();
      expect(screen.getByText('Description for card one')).toBeInTheDocument();
    });

    it('renders images correctly', () => {
      render(<CardGrid variant="image" cards={mockImageCards} />);

      const images = document.querySelectorAll('img');
      expect(images).toHaveLength(2);
      expect(images[0]).toHaveAttribute('src', '/test-image1.jpg');
    });
  });

  describe('Expandable variant', () => {
    it('renders expandable cards with correct structure', () => {
      render(<CardGrid variant="expandable" cards={mockExpandableCards} />);

      expect(screen.getByRole('region', { name: 'expandable card grid with 2 cards' })).toBeInTheDocument();
      // Check for desktop versions (mobile versions are hidden)
      expect(screen.getAllByText('Expandable One')).toHaveLength(2); // mobile and desktop
      expect(screen.getAllByText('Expandable Two')).toHaveLength(2); // mobile and desktop
    });

    it('expands card on click', () => {
      render(<CardGrid variant="expandable" cards={mockExpandableCards} />);

      // Target desktop cards specifically (they have aria-expanded attribute)
      const desktopCards = screen.getAllByRole('button').filter(card => 
        card.hasAttribute('aria-expanded')
      );
      
      const firstCard = desktopCards[0];
      expect(firstCard).toHaveAttribute('aria-expanded', 'true'); // First card is expanded by default

      const secondCard = desktopCards[1];
      fireEvent.click(secondCard);

      expect(secondCard).toHaveAttribute('aria-expanded', 'true');
      expect(firstCard).toHaveAttribute('aria-expanded', 'false');
    });

    it('shows expanded content when card is expanded', () => {
      render(<CardGrid variant="expandable" cards={mockExpandableCards} />);

      // Check that desktop versions have the content with correct visibility
      const firstContent = document.getElementById('expandable-card-content-1');
      const secondContent = document.getElementById('expandable-card-content-2');
      
      expect(firstContent).toBeInTheDocument();
      expect(secondContent).toBeInTheDocument();
      
      // First card should be expanded by default
      expect(firstContent).toHaveStyle({ maxHeight: '150px' });
      expect(secondContent).toHaveStyle({ maxHeight: '0px' });

      // Target desktop cards specifically (they have aria-expanded attribute)
      const desktopCards = screen.getAllByRole('button').filter(card => 
        card.hasAttribute('aria-expanded')
      );
      
      const secondCard = desktopCards[1];
      fireEvent.click(secondCard);

      // After clicking second card, it should be expanded
      expect(firstContent).toHaveStyle({ maxHeight: '0px' });
      expect(secondContent).toHaveStyle({ maxHeight: '150px' });
    });

    it('supports keyboard navigation', () => {
      render(<CardGrid variant="expandable" cards={mockExpandableCards} />);

      // Target desktop cards specifically (they have aria-expanded attribute)
      const desktopCards = screen.getAllByRole('button').filter(card => 
        card.hasAttribute('aria-expanded')
      );
      
      const secondCard = desktopCards[1];
      fireEvent.keyDown(secondCard, { key: 'Enter' });

      expect(secondCard).toHaveAttribute('aria-expanded', 'true');
    });

    it('toggles mobile card display between icon/title and text only', () => {
      render(<CardGrid variant="expandable" cards={mockExpandableCards} />);

      // Find mobile cards (they have role="button" and are hidden on md and up)
      const mobileCards = screen.getAllByRole('button').filter(card => 
        card.classList.contains('md:hidden')
      );
      
      expect(mobileCards).toHaveLength(2);
      
      const firstMobileCard = mobileCards[0];
      
      // Initially should show only icon and title (text content not rendered)
      expect(firstMobileCard).toHaveTextContent('Expandable One');
      expect(firstMobileCard).not.toHaveTextContent('Expanded content for card one');
      
      // Click to toggle to text only mode
      fireEvent.click(firstMobileCard);
      
      // Should now show only text, no title, and have overlay
      expect(firstMobileCard).not.toHaveTextContent('Expandable One');
      expect(firstMobileCard).toHaveTextContent('Expanded content for card one');
      
      // Check that overlay is present
      const overlay = firstMobileCard.querySelector('.absolute.bg-black.opacity-50');
      expect(overlay).toBeInTheDocument();
      
      // Click again to toggle back
      fireEvent.click(firstMobileCard);
      
      // Should show only icon and title again (no text), and overlay should be gone
      expect(firstMobileCard).toHaveTextContent('Expandable One');
      expect(firstMobileCard).not.toHaveTextContent('Expanded content for card one');
      
      // Check that overlay is not present
      const overlayAfterToggle = firstMobileCard.querySelector('.absolute.bg-black.opacity-50');
      expect(overlayAfterToggle).not.toBeInTheDocument();
    });
  });

  describe('Centered variant', () => {
    it('renders centered cards with correct structure', () => {
      render(<CardGrid variant="centered" cards={mockCenteredCards} />);

      expect(screen.getByRole('region', { name: 'centered card grid with 2 cards' })).toBeInTheDocument();
      expect(screen.getByText('Centered One')).toBeInTheDocument();
      expect(screen.getByText('Centered Two')).toBeInTheDocument();
    });

    it('uses default icons when not provided', () => {
      render(<CardGrid variant="centered" cards={mockCenteredCards} />);

      const images = document.querySelectorAll('img');
      expect(images).toHaveLength(2);
      expect(images[0]).toHaveAttribute('src', '/test-icon1.svg');
      expect(images[1]).toHaveAttribute('src', '/images/components/card-grid/v4/2.svg');
    });
  });

  describe('Grid responsiveness', () => {
    it('applies correct grid classes for different variants', () => {
      const { container } = render(<CardGrid variant="feature" cards={mockFeatureCards} />);

      const gridElement = container.querySelector('.card-grid');
      expect(gridElement).toHaveClass('flex', 'md:grid', 'grid-cols-3');
      expect(gridElement).not.toHaveClass('lg:grid-cols-4');
    });

    it('applies correct grid classes for image variant', () => {
      const { container } = render(<CardGrid variant="image" cards={mockImageCards} />);

      const gridElement = container.querySelector('.card-grid');
      expect(gridElement).toHaveClass('grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4');
    });
  });

  describe('Custom className', () => {
    it('applies custom className to the grid container', () => {
      const { container } = render(
        <CardGrid variant="feature" cards={mockFeatureCards} className="custom-class" />
      );

      const gridElement = container.querySelector('.card-grid');
      expect(gridElement).toHaveClass('custom-class');
    });
  });
});