/**
 * TypeScript types for media review data from Supabase media_review table
 * Note: `content` field is rich text from Editor.js (JSONB format)
 * and is only displayed in the media review detail page, not in the list
 */

export type MediaReview = {
  id: string; // UUID
  title: string;
  excerpt: string | null;
  author: string | null;
  cover_image_url: string;
  publish_date: string; // ISO 8601 timestamp
  slug: string;
  is_published: boolean;
  content: Record<string, unknown> | null; // JSONB field from Editor.js
  created_at: string;
  updated_at: string | null;
};

export type FetchMediaReviewsResponse = {
  items: MediaReview[];
  hasMore: boolean;
  error?: string;
};
