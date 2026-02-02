import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { JobPostingCard } from "@/components/job-postings/JobPostingCard";
import type { JobPosting } from "@/lib/job-postings/types";

const mockJob: JobPosting = {
  id: "test-1",
  title: "Software Engineer",
  company_name: "Tech Corp",
  suburb: "Sydney",
  state: "NSW",
  employment_type: "full_time",
  description: "We are looking for a talented software engineer to join our team.",
  status: "published",
  created_at: "2026-01-01T00:00:00Z",
  published_at: "2026-01-05T00:00:00Z",
  closed_at: null,
  external_apply_url: "https://example.com/apply",
};

describe("JobPostingCard", () => {
  it("renders job posting with all metadata", () => {
    render(<JobPostingCard job={mockJob} />);

    expect(screen.getByText(/Software Engineer - Tech Corp/)).toBeInTheDocument();
    expect(screen.getByText("Sydney NSW")).toBeInTheDocument();
    expect(screen.getByText("Full Time")).toBeInTheDocument();
    expect(
      screen.getByText(
        "We are looking for a talented software engineer to join our team."
      )
    ).toBeInTheDocument();
  });

  it("renders Apply Now button when external_apply_url is present", () => {
    render(<JobPostingCard job={mockJob} />);

    expect(screen.getByText("Apply Now")).toBeInTheDocument();
  });

  it("does not render Apply Now button when external_apply_url is null", () => {
    const jobWithoutUrl = { ...mockJob, external_apply_url: null };
    render(<JobPostingCard job={jobWithoutUrl} />);

    expect(screen.queryByText("Apply Now")).not.toBeInTheDocument();
  });

  it("formats employment type correctly", () => {
    const jobPartTime = { ...mockJob, employment_type: "part_time" as const };
    render(<JobPostingCard job={jobPartTime} />);

    expect(screen.getByText("Part Time")).toBeInTheDocument();
  });

  it("truncates title to 2 lines", () => {
    const longTitle = "A".repeat(200);
    const jobLongTitle = { ...mockJob, title: longTitle };
    const { container } = render(<JobPostingCard job={jobLongTitle} />);

    const titleElement = container.querySelector(".job-posting-title");
    expect(titleElement).toBeInTheDocument();
  });

  it("truncates description to 4 lines", () => {
    const longDesc = "This is a description. ".repeat(50);
    const jobLongDesc = { ...mockJob, description: longDesc };
    const { container } = render(<JobPostingCard job={jobLongDesc} />);

    const descElement = container.querySelector(".job-posting-description");
    expect(descElement).toBeInTheDocument();
  });

  it("renders location and employment type as tag elements", () => {
    const { container } = render(<JobPostingCard job={mockJob} />);

    const locationTag = container.querySelector(".location-tag");
    const employmentTag = container.querySelector(".employment-type-tag");

    expect(locationTag).toBeInTheDocument();
    expect(employmentTag).toBeInTheDocument();
    expect(locationTag).toHaveTextContent("Sydney NSW");
    expect(employmentTag).toHaveTextContent("Full Time");
  });
});
