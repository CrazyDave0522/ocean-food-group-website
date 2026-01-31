"use server";

import { MediaReview, FetchMediaReviewsResponse } from "@/lib/media-reviews/types";
import { getSupabaseServerClient } from "@/lib/supabase";

export async function fetchPublishedMediaReviews(
  offset: number = 0,
  limit: number = 10
): Promise<FetchMediaReviewsResponse> {
  try {
    const supabase = getSupabaseServerClient();

    // Query published media reviews ordered by publish_date DESC
    const { data, error, count } = await supabase
      .from("media_review")
      .select("*", { count: "exact" })
      .eq("is_published", true)
      .order("publish_date", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("Supabase error:", error);
      return {
        items: [],
        hasMore: false,
        error: error.message || "Failed to fetch media reviews",
      };
    }

    const items = (data || []) as MediaReview[];
    const totalCount = count || 0;
    const hasMore = offset + limit < totalCount;

    return {
      items,
      hasMore,
    };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Error fetching media reviews:", errorMessage);
    return {
      items: [],
      hasMore: false,
      error: errorMessage,
    };
  }
}

export async function fetchLatestMediaReviews(): Promise<MediaReview[]> {
  try {
    const response = await fetchPublishedMediaReviews(0, 3);
    return response.items;
  } catch (err) {
    console.error("Error fetching latest media reviews:", err);
    return [];
  }
}
