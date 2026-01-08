"use server";

import { getSupabaseServerClient } from "@/lib/supabase";
import type { JobPosting, FetchJobPostingsResult } from "@/lib/job-postings/types";

export async function fetchPublishedJobPostings(
  offset: number = 0,
  limit: number = 10
): Promise<FetchJobPostingsResult> {
  try {
    const supabase = getSupabaseServerClient();

    const { data, count, error } = await supabase
      .from("job_postings")
      .select("*", { count: "exact" })
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("Error fetching job postings:", error);
      return {
        items: [],
        hasMore: false,
        error: "Failed to load job postings. Please try again later.",
      };
    }

    const items = (data || []) as JobPosting[];
    const totalCount = count || 0;
    const hasMore = offset + limit < totalCount;

    return {
      items,
      hasMore,
    };
  } catch (err) {
    console.error("Unexpected error fetching job postings:", err);
    return {
      items: [],
      hasMore: false,
      error: "Failed to load job postings. Please try again later.",
    };
  }
}
