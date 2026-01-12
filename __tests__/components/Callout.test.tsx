import { render, screen } from '@testing-library/react';
import Callout from '@/components/Callout';

describe('Callout', () => {
  it('renders text and button', () => {
    render(<Callout text="Test text" buttonText="Click me" buttonUrl="/test" />);
    expect(screen.getByText('Test text')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders internal link', () => {
    render(<Callout text="Test" buttonText="Go" buttonUrl="/internal" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/internal');
  });

  it('renders external link', () => {
    render(<Callout text="Test" buttonText="Go" buttonUrl="https://example.com" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('renders with default background', () => {
    render(<Callout text="Test" buttonText="Go" buttonUrl="/test" />);
    const callout = screen.getByText('Test').closest('.callout');
    expect(callout).toHaveStyle('background: linear-gradient(135deg, var(--color-primary-lighter), var(--color-primary-light))');
  });

  // Note: Image testing might require mocking Next.js Image
});