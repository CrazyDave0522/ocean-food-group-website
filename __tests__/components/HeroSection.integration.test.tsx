import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import HeroSection from '@/components/HeroSection';

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt = '', width, height, className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} className={className} {...props} />
  ),
}));

describe('HeroSection Integration', () => {
  it('integrates properly with Next.js Image component', () => {
    const props = {
      backgroundImageUrl: '/images/backgrounds/hero-bg.jpg',
      mobileBackgroundImageUrl: '/images/backgrounds/hero-bg-mobile.jpg',
      title: 'Welcome to Ocean Food Group',
      text: 'Leading provider of premium seafood products with sustainable practices and exceptional quality.',
    };

    render(<HeroSection {...props} />);

    // Verify the component renders without errors
    expect(screen.getByRole('region', { name: 'Hero section' })).toBeInTheDocument();

    // Verify background image is present
    const image = screen.getByAltText('');
    expect(image).toHaveAttribute('src', '/images/backgrounds/hero-bg.jpg');

    // Verify content is displayed
    expect(screen.getByRole('heading', { name: 'Welcome to Ocean Food Group' })).toBeInTheDocument();
    expect(screen.getByText('Leading provider of premium seafood products with sustainable practices and exceptional quality.')).toBeInTheDocument();
  });

  it('handles responsive layout correctly', () => {
    const props = {
      backgroundImageUrl: '/test.jpg',
      title: 'Test',
      text: 'Test text',
    };

    render(<HeroSection {...props} />);

    // Check that responsive classes are applied
    const section = screen.getByRole('region', { name: 'Hero section' });
    expect(section).toHaveClass('relative', 'w-full', 'aspect-square', 'md:aspect-16/5');

    const contentBoxContainer = screen.getByText('Test text').parentElement?.parentElement;
    expect(contentBoxContainer).toHaveClass('absolute', 'bottom-(--space-xl)', 'left-1/2', 'transform', '-translate-x-1/2');
  });

  it('maintains content box styling specifications', () => {
    const props = {
      backgroundImageUrl: '/test.jpg',
      title: 'Test Title',
      text: 'Test description',
    };

    render(<HeroSection {...props} />);

    const contentBox = screen.getByText('Test description').parentElement;

    // Verify background and blur effect
    expect(contentBox).toHaveClass('bg-[rgba(245,245,245,0.60)]', 'backdrop-blur-[5px]');

    // Verify padding and border radius
    expect(contentBox).toHaveClass('px-6', 'sm:px-9', 'md:px-12', 'lg:px-15', 'py-0', 'rounded-t-lg', 'md:rounded-lg');

    // Verify text styling
    const title = screen.getByRole('heading');
    expect(title).toHaveClass('font-bold', 'text-gray-900', 'mb-2');

    const text = screen.getByText('Test description');
    expect(text).toHaveClass('leading-(--lh-body)', 'text-gray-700');
  });
});