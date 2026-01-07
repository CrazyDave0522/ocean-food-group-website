"use server";

import { getSupabaseServerClient } from "@/lib/supabase";
import { MediaReview } from "@/lib/media-reviews/types";

export type MediaReviewDetailResult = {
  review: MediaReview | null;
  error?: string;
};

export async function fetchMediaReviewDetail(
  slug: string
): Promise<MediaReviewDetailResult> {
  try {
    const normalizedSlug = decodeURIComponent(slug);
    const supabase = getSupabaseServerClient();

    const { data, error, status } = await supabase
      .from("media_review")
      .select("*")
      .eq("slug", normalizedSlug)
      .eq("is_published", true)
      .maybeSingle();

    if (error) {
      // 406 / PGRST116 represent "no rows" for .single()
      if (status === 406 || error.code === "PGRST116") {
        return { review: null };
      }

      return { review: null, error: error.message || "Failed to fetch media review" };
    }

    if (!data) {
      return { review: null };
    }

    return { review: data as MediaReview };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { review: null, error: message };
  }
}
