import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrandCard } from '@/components/brands/BrandCard';
import type { Brand } from '@/lib/brands/types';

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: vi.fn(({ alt, src }: { alt: string; src: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} data-testid="brand-logo" />
  )),
}));

const mockBrand: Brand = {
  id: '123',
  name: 'Test Brand',
  introduction: 'This is a test brand introduction',
  logo_url: 'https://example.com/logo.png',
  website_url: 'https://testbrand.com',
  is_active: true,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

describe('BrandCard Component', () => {
  it('should wrap entire card in <a> tag', () => {
    const { container } = render(<BrandCard brand={mockBrand} index={0} />);
    const link = container.querySelector('a');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', mockBrand.website_url);
  });

  it('should link to correct website_url', () => {
    const { container } = render(<BrandCard brand={mockBrand} index={0} />);
    const link = container.querySelector('a');

    expect(link).toHaveAttribute('href', 'https://testbrand.com');
  });

  it('should open link in new tab (target="_blank")', () => {
    const { container } = render(<BrandCard brand={mockBrand} index={0} />);
    const link = container.querySelector('a');

    expect(link).toHaveAttribute('target', '_blank');
  });

  it('should have rel="noopener noreferrer" for security', () => {
    const { container } = render(<BrandCard brand={mockBrand} index={0} />);
    const link = container.querySelector('a');

    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should render logo image with alt text', () => {
    render(<BrandCard brand={mockBrand} index={0} />);

    const images = screen.getAllByAltText('Test Brand');
    expect(images.length).toBeGreaterThan(0);
    expect(images[0]).toBeInTheDocument();
  });

  it('should render brand name', () => {
    render(<BrandCard brand={mockBrand} index={0} />);

    const headings = screen.getAllByText('Test Brand');
    expect(headings.length).toBeGreaterThan(0);
    expect(headings[0]).toBeInTheDocument();
  });

  it('should render introduction text', () => {
    render(<BrandCard brand={mockBrand} index={0} />);

    const intros = screen.getAllByText('This is a test brand introduction');
    expect(intros.length).toBeGreaterThan(0);
    expect(intros[0]).toBeInTheDocument();
  });

  it('should apply hover opacity effect', () => {
    const { container } = render(<BrandCard brand={mockBrand} index={0} />);
    const link = container.querySelector('a');

    expect(link).toHaveClass('group');
  });

  it('should display odd index layout with flex-row on desktop', () => {
    const { container } = render(<BrandCard brand={mockBrand} index={0} />);
    const desktopLayout = container.querySelector('.md\\:flex');

    expect(desktopLayout).toHaveClass('flex-row');
  });

  it('should display even index layout with flex-row-reverse on desktop', () => {
    const { container } = render(<BrandCard brand={mockBrand} index={1} />);
    const desktopLayout = container.querySelector('.md\\:flex');

    expect(desktopLayout).toHaveClass('flex-row-reverse');
  });

  it('should stack vertically on mobile regardless of index', () => {
    const { container } = render(<BrandCard brand={mockBrand} index={1} />);
    const mobileLayout = container.querySelector('.md\\:hidden');

    expect(mobileLayout).toHaveClass('flex-col');
  });
});
