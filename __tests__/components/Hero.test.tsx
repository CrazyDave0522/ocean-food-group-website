import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Hero from '@/components/Hero';

describe('Hero Component', () => {
  describe('Center variant', () => {
    it('renders center variant with styled background', () => {
      render(
        <Hero
          title="Welcome to Our Site"
          subtitle="This is a test subtitle"
          variant="center"
          backgroundType="styled"
          backgroundVariant="solid"
        />
      );

      expect(screen.getByText('Welcome to Our Site')).toBeInTheDocument();
      expect(screen.getByText('This is a test subtitle')).toBeInTheDocument();
      expect(screen.getByRole('region')).toHaveClass('hero--solid');
    });

    it('renders center variant with image background', () => {
      render(
        <Hero
          title="Welcome"
          subtitle="Test"
          variant="center"
          backgroundType="image"
          backgroundImageUrl="/test-image.jpg"
        />
      );

      expect(screen.getByText('Welcome')).toBeInTheDocument();
      const images = screen.getAllByRole('presentation');
      expect(images.length).toBeGreaterThan(0);
    });

    it('renders center variant without subtitle', () => {
      render(
        <Hero
          title="Welcome"
          variant="center"
        />
      );

      expect(screen.getByText('Welcome')).toBeInTheDocument();
      expect(screen.queryByText('This is a test subtitle')).not.toBeInTheDocument();
    });

    it('applies gradient background variant', () => {
      render(
        <Hero
          title="Test"
          variant="center"
          backgroundType="styled"
          backgroundVariant="gradient"
        />
      );

      expect(screen.getByRole('region')).toHaveClass('hero--gradient');
    });
  });

  describe('Left variant', () => {
    it('renders left variant with styled background and content image', () => {
      render(
        <Hero
          title="About Us"
          subtitle="Learn more"
          variant="left"
          backgroundType="styled"
          contentImageUrl="/content.jpg"
        />
      );

      expect(screen.getByText('About Us')).toBeInTheDocument();
      expect(screen.getByText('Learn more')).toBeInTheDocument();
      const images = screen.getAllByRole('presentation');
      expect(images.length).toBeGreaterThan(0);
    });

    it('renders left variant with styled background without content image', () => {
      render(
        <Hero
          title="Contact"
          subtitle="Get in touch"
          variant="left"
          backgroundType="styled"
        />
      );

      expect(screen.getByText('Contact')).toBeInTheDocument();
      expect(screen.getByText('Get in touch')).toBeInTheDocument();
    });

    it('renders left variant with image background and content image', () => {
      render(
        <Hero
          title="Careers"
          subtitle="Join us"
          variant="left"
          backgroundType="image"
          backgroundImageUrl="/bg.jpg"
          contentImageUrl="/careers.jpg"
        />
      );

      expect(screen.getByText('Careers')).toBeInTheDocument();
      const images = screen.getAllByRole('presentation');
      expect(images.length).toBeGreaterThan(1);
    });

    it('renders left variant with image background without content image', () => {
      render(
        <Hero
          title="Services"
          variant="left"
          backgroundType="image"
          backgroundImageUrl="/services-bg.jpg"
        />
      );

      expect(screen.getByText('Services')).toBeInTheDocument();
      const images = screen.getAllByRole('presentation');
      expect(images.length).toBe(2);
    });
  });

  describe('Overlay behavior', () => {
    it('renders overlay by default when background is an image', () => {
      const { container } = render(
        <Hero
          title="Test"
          backgroundType="image"
          backgroundImageUrl="/test.jpg"
        />
      );

      expect(container.querySelector('.hero__overlay')).toBeInTheDocument();
    });

    it('can disable overlay via overlay: false prop', () => {
      const { container } = render(
        <Hero
          title="Test"
          backgroundType="image"
          backgroundImageUrl="/test.jpg"
          overlay={false}
        />
      );

      expect(container.querySelector('.hero__overlay')).not.toBeInTheDocument();
    });

    it('does not render overlay for styled background', () => {
      const { container } = render(
        <Hero
          title="Test"
          backgroundType="styled"
        />
      );

      expect(container.querySelector('.hero__overlay')).not.toBeInTheDocument();
    });
  });

  describe('Typography', () => {
    it('applies correct font size classes for title and subtitle', () => {
      const { container } = render(
        <Hero
          title="Title"
          subtitle="Subtitle"
        />
      );

      const title = container.querySelector('.hero__title');
      const subtitle = container.querySelector('.hero__subtitle');

      expect(title).toHaveClass('text-(length:--fs-h1)');
      expect(subtitle).toHaveClass('text-(length:--fs-h4)');
    });
  });

  describe('Content image sizing', () => {
    it('applies correct sizing classes to content image', () => {
      const { container } = render(
        <Hero
          title="Test"
          variant="left"
          contentImageUrl="/content.jpg"
        />
      );

      const imageContainer = container.querySelector('.hero__image');
      expect(imageContainer).toHaveClass('w-full', 'md:w-103.5');
      expect(imageContainer).toHaveClass('h-66.5', 'md:h-83');
    });
  });

  describe('Video background', () => {
    it('renders center variant with video background', () => {
      render(
        <Hero
          title="Welcome"
          subtitle="Test"
          variant="center"
          backgroundType="video"
          backgroundVideoUrl="/test-video.mp4"
        />
      );

      expect(screen.getByText('Welcome')).toBeInTheDocument();
      const video = screen.getByLabelText('Background video');
      expect(video).toBeInTheDocument();
      expect(video).toHaveAttribute('autoplay');
      expect(video).toHaveAttribute('muted');
      expect(video).toHaveAttribute('loop');
      expect(video).toHaveAttribute('playsInline');
      expect(video).not.toHaveAttribute('controls');
    });

    it('renders left variant with video background', () => {
      render(
        <Hero
          title="About Us"
          subtitle="Learn more"
          variant="left"
          backgroundType="video"
          backgroundVideoUrl="/test-video.mp4"
        />
      );

      expect(screen.getByText('About Us')).toBeInTheDocument();
      const video = screen.getByLabelText('Background video');
      expect(video).toBeInTheDocument();
      expect(video).toHaveAttribute('src', '/test-video.mp4');
    });

    it('does not render video when backgroundVideoUrl is not provided', () => {
      render(
        <Hero
          title="Welcome"
          variant="center"
          backgroundType="video"
        />
      );

      expect(screen.getByText('Welcome')).toBeInTheDocument();
      expect(screen.queryByLabelText('Background video')).not.toBeInTheDocument();
    });

    it('applies overlay for video background when overlay is true', () => {
      const { container } = render(
        <Hero
          title="Welcome"
          variant="center"
          backgroundType="video"
          backgroundVideoUrl="/test-video.mp4"
          overlay={true}
        />
      );

      const overlay = container.querySelector('.hero__overlay');
      expect(overlay).toBeInTheDocument();
    });
  });

  describe('Responsive layout', () => {
    it('applies mobile stacking classes for left variant with content image', () => {
      const { container } = render(
        <Hero
          title="Test"
          variant="left"
          contentImageUrl="/content.jpg"
        />
      );

      const content = container.querySelector('.hero__content');
      expect(content).toHaveClass('flex', 'flex-col', 'md:flex-row');
    });

    it('applies center alignment classes for center variant', () => {
      const { container } = render(
        <Hero
          title="Test"
          variant="center"
        />
      );

      const section = container.querySelector('.hero');
      expect(section).toHaveClass('items-center', 'justify-center', 'text-center');
    });
  });
});
