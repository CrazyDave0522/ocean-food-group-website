import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { JobPostingsList } from "@/components/job-postings/JobPostingsList";
import type { JobPosting } from "@/lib/job-postings/types";

const mockJobs: JobPosting[] = [
  {
    id: "test-1",
    title: "Software Engineer",
    company_name: "Tech Corp",
    suburb: "Sydney",
    state: "NSW",
    employment_type: "full_time",
    description: "Software engineering role",
    status: "published",
    created_at: "2026-01-01T00:00:00Z",
    published_at: "2026-01-05T00:00:00Z",
    closed_at: null,
    external_apply_url: "https://example.com/apply",
  },
  {
    id: "test-2",
    title: "Product Manager",
    company_name: "Tech Corp",
    suburb: "Melbourne",
    state: "VIC",
    employment_type: "full_time",
    description: "Product management role",
    status: "published",
    created_at: "2026-01-02T00:00:00Z",
    published_at: "2026-01-04T00:00:00Z",
    closed_at: null,
    external_apply_url: "https://example.com/apply",
  },
];

describe("JobPostingsList", () => {
  it("renders initial jobs", () => {
    const mockFetch = vi.fn();
    render(
      <JobPostingsList
        initialItems={mockJobs}
        initialHasMore={false}
        onFetchMore={mockFetch}
      />
    );

    expect(screen.getByText(/Software Engineer - Tech Corp/)).toBeInTheDocument();
    expect(
      screen.getByText(/Product Manager - Tech Corp/)
    ).toBeInTheDocument();
  });

  it("renders list title", () => {
    const mockFetch = vi.fn();
    render(
      <JobPostingsList
        initialItems={mockJobs}
        initialHasMore={false}
        onFetchMore={mockFetch}
      />
    );

    expect(screen.getByText("Open Positions")).toBeInTheDocument();
  });

  it("applies section background styling", () => {
    const mockFetch = vi.fn();
    const { container } = render(
      <JobPostingsList
        initialItems={mockJobs}
        initialHasMore={false}
        onFetchMore={mockFetch}
      />
    );

    const section = container.querySelector(".job-postings-section");
    expect(section).toBeInTheDocument();
  });

  it("shows empty state when no jobs", () => {
    const mockFetch = vi.fn();
    render(
      <JobPostingsList
        initialItems={[]}
        initialHasMore={false}
        onFetchMore={mockFetch}
      />
    );

    expect(
      screen.getByText(/No job postings available at this time/)
    ).toBeInTheDocument();
  });

  it("shows placeholder icon in empty state", () => {
    const mockFetch = vi.fn();
    const { container } = render(
      <JobPostingsList
        initialItems={[]}
        initialHasMore={false}
        onFetchMore={mockFetch}
      />
    );

    const briefcaseIcon = container.querySelector("svg");
    expect(briefcaseIcon).toBeInTheDocument();
  });

  it("does not have divider lines between jobs", () => {
    const mockFetch = vi.fn();
    const { container } = render(
      <JobPostingsList
        initialItems={mockJobs}
        initialHasMore={false}
        onFetchMore={mockFetch}
      />
    );

    const divider = container.querySelector(".divide-y");
    expect(divider).not.toBeInTheDocument();
  });

  it("passes index to job cards for alternating backgrounds", () => {
    const mockFetch = vi.fn();
    const { container } = render(
      <JobPostingsList
        initialItems={mockJobs}
        initialHasMore={false}
        onFetchMore={mockFetch}
      />
    );

    const cards = container.querySelectorAll(".job-posting-card");
    expect(cards).toHaveLength(2);
  });
});
