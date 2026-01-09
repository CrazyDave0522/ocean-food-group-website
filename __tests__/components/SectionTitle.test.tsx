import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SectionTitle } from '@/components/SectionTitle';

describe('SectionTitle Component', () => {
  it('should render title only', () => {
    render(<SectionTitle title="Test Title" />);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Test Title');
  });

  it('should render title with subtitle', () => {
    render(
      <SectionTitle title="Test Title" subtitle="Test Subtitle" />
    );

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Test Title');

    const paragraph = screen.getByText('Test Subtitle');
    expect(paragraph).toBeInTheDocument();
  });

  it('should apply center alignment by default', () => {
    const { container } = render(<SectionTitle title="Test Title" />);
    const wrapper = container.firstChild;

    expect(wrapper).toHaveClass('text-center');
  });

  it('should apply left alignment when specified', () => {
    const { container } = render(
      <SectionTitle title="Test Title" alignment="left" />
    );
    const wrapper = container.firstChild;

    expect(wrapper).toHaveClass('text-left');
  });

  it('should render with center alignment explicitly', () => {
    const { container } = render(
      <SectionTitle title="Test Title" alignment="center" />
    );
    const wrapper = container.firstChild;

    expect(wrapper).toHaveClass('text-center');
  });

  it('should have proper typography classes', () => {
    render(<SectionTitle title="Test Title" />);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveClass('font-bold');
  });

  it('should render subtitle with body text styling', () => {
    render(
      <SectionTitle title="Test Title" subtitle="Test Subtitle" />
    );

    const paragraph = screen.getByText('Test Subtitle');
    expect(paragraph).toHaveClass('text-[--fs-body]');
  });
});
