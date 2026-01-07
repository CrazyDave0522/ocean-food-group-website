import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchMediaReviewDetail } from "@/lib/actions/mediaReviewsDetail";
import { MediaReview } from "@/lib/media-reviews/types";

const mockMaybeSingle = vi.fn();
const mockEqSecond = vi.fn().mockReturnValue({ maybeSingle: mockMaybeSingle });
const mockEqFirst = vi.fn().mockReturnValue({ eq: mockEqSecond, maybeSingle: mockMaybeSingle });
const mockSelect = vi.fn().mockReturnValue({ eq: mockEqFirst });
const mockFrom = vi.fn().mockReturnValue({ select: mockSelect });

vi.mock("@/lib/supabase", () => ({
  getSupabaseServerClient: vi.fn(() => ({
    from: mockFrom,
  })),
}));

describe("fetchMediaReviewDetail", () => {
  beforeEach(() => {
    mockMaybeSingle.mockReset();
    mockEqSecond.mockClear();
    mockEqFirst.mockClear();
    mockSelect.mockClear();
    mockFrom.mockClear();
  });

  it("returns review when found", async () => {
    const review: MediaReview = {
      id: "1",
      title: "Test",
      excerpt: "Excerpt",
      author: "Author",
      cover_image_url: "https://example.com/image.jpg",
      publish_date: "2025-01-01T00:00:00Z",
      slug: "test",
      is_published: true,
      content: { blocks: [] },
      created_at: "2025-01-01T00:00:00Z",
      updated_at: null,
    };

    mockMaybeSingle.mockResolvedValue({ data: review, error: null, status: 200 });

    const result = await fetchMediaReviewDetail("test");
    expect(result.review).toEqual(review);
    expect(result.error).toBeUndefined();
  });

  it("returns null when not found", async () => {
    mockMaybeSingle.mockResolvedValue({ data: null, error: { code: "PGRST116" }, status: 406 });

    const result = await fetchMediaReviewDetail("missing");
    expect(result.review).toBeNull();
    expect(result.error).toBeUndefined();
  });

  it("returns error when Supabase fails", async () => {
    mockMaybeSingle.mockResolvedValue({ data: null, error: { message: "db down" }, status: 500 });

    const result = await fetchMediaReviewDetail("error");
    expect(result.review).toBeNull();
    expect(result.error).toBe("db down");
  });
});
