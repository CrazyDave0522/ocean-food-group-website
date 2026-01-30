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

describe('HeroSection Component', () => {
  const defaultProps = {
    backgroundImageUrl: '/test-image.jpg',
    title: 'Test Title',
    text: 'Test description text',
  };

  it('renders with required props', () => {
    render(<HeroSection {...defaultProps} />);

    expect(screen.getByRole('region', { name: 'Hero section' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Test Title' })).toBeInTheDocument();
    expect(screen.getByText('Test description text')).toBeInTheDocument();
  });

  it('renders background image with correct attributes', () => {
    render(<HeroSection {...defaultProps} />);

    const image = screen.getByAltText('');
    expect(image).toHaveAttribute('src', '/test-image.jpg');
    expect(image).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies correct styling to content box', () => {
    render(<HeroSection {...defaultProps} />);

    const contentBox = screen.getByText('Test description text').parentElement;
    expect(contentBox).toHaveClass('flex', 'flex-col', 'justify-center', 'items-start');
  });

  it('truncates title to single line', () => {
    render(<HeroSection {...defaultProps} title="Very long title that should be truncated to fit on one line" />);

    const title = screen.getByRole('heading');
    expect(title).toHaveClass('truncate');
  });

  it('limits text to 3 lines maximum', () => {
    render(<HeroSection {...defaultProps} text="This is a very long text that should be limited to three lines maximum and any overflow should be truncated with ellipsis" />);

    const text = screen.getByText(/This is a very long text/);
    expect(text).toHaveClass('line-clamp-3');
  });

  it('has proper accessibility structure', () => {
    render(<HeroSection {...defaultProps} />);

    const section = screen.getByRole('region', { name: 'Hero section' });
    expect(section).toBeInTheDocument();

    const heading = screen.getByRole('heading');
    expect(heading).toHaveTextContent('Test Title');
  });
});