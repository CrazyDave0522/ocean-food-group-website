import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MediaReviewCard } from "@/components/media-reviews/MediaReviewCard";
import { MediaReview } from "@/lib/media-reviews/types";

const mockReview: MediaReview = {
  id: "1",
  title: "Ocean Food Group Featured in Forbes",
  excerpt: "A comprehensive look at how Ocean Food Group is revolutionizing sustainable seafood.",
  author: "Jane Smith",
  cover_image_url: "https://example.com/image.jpg",
  publish_date: "2025-01-05T10:30:00Z",
  slug: "ocean-food-group-forbes",
  is_published: true,
  content: {},
  created_at: "2025-01-05T10:30:00Z",
  updated_at: null,
};

const mockReviewNoImage: MediaReview = {
  ...mockReview,
  cover_image_url: "",
};

describe("MediaReviewCard", () => {
  it("renders the card with all fields", () => {
    render(<MediaReviewCard review={mockReview} />);

    expect(screen.getByText("Ocean Food Group Featured in Forbes")).toBeInTheDocument();
    expect(
      screen.getByText(
        "A comprehensive look at how Ocean Food Group is revolutionizing sustainable seafood."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("5 Jan 2025")).toBeInTheDocument();
  });

  it("renders the card as a clickable link", () => {
    render(<MediaReviewCard review={mockReview} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/media-reviews/ocean-food-group-forbes");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders fallback placeholder when image is missing", () => {
    render(<MediaReviewCard review={mockReviewNoImage} />);

    expect(screen.getByText("No Image Available")).toBeInTheDocument();
  });

  it("has hover state styling", () => {
    render(<MediaReviewCard review={mockReview} />);

    const link = screen.getByRole("link");
    expect(link).toHaveClass("hover:opacity-80");
    expect(link).toHaveClass("cursor-pointer");
  });

  it("renders with cursor-pointer class for interaction feedback", () => {
    render(<MediaReviewCard review={mockReview} />);

    const link = screen.getByRole("link");
    expect(link).toHaveClass("cursor-pointer");
  });

  it("handles missing author gracefully", () => {
    const reviewNoAuthor: MediaReview = {
      ...mockReview,
      author: null,
    };

    render(<MediaReviewCard review={reviewNoAuthor} />);
    expect(screen.getByText("Unknown Author")).toBeInTheDocument();
  });

  it("handles missing excerpt gracefully", () => {
    const reviewNoExcerpt: MediaReview = {
      ...mockReview,
      excerpt: null,
    };

    const { container } = render(<MediaReviewCard review={reviewNoExcerpt} />);
    // Excerpt section should not be rendered
    expect(container.querySelectorAll(".line-clamp-2")).toHaveLength(1); // Only title should have line-clamp
  });

  it("truncates title to 2 lines", () => {
    const longTitle =
      "This is a very long title that should be truncated to exactly two lines when displayed in the card component";
    const reviewLongTitle: MediaReview = {
      ...mockReview,
      title: longTitle,
    };

    render(<MediaReviewCard review={reviewLongTitle} />);

    const title = screen.getByText(longTitle);
    expect(title).toHaveClass("line-clamp-2");
  });

  it("truncates excerpt to 2 lines", () => {
    const longExcerpt =
      "This is a very long excerpt that exceeds two lines and should be truncated with ellipsis to maintain consistent card height across the list of media reviews displayed on the page.";
    const reviewLongExcerpt: MediaReview = {
      ...mockReview,
      excerpt: longExcerpt,
    };

    render(<MediaReviewCard review={reviewLongExcerpt} />);

    const excerpt = screen.getByText(longExcerpt);
    expect(excerpt).toHaveClass("line-clamp-2");
  });
});
