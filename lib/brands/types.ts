/**
 * Brand data types for Supabase brand table
 */

export interface Brand {
  id: string; // UUID
  name: string;
  introduction: string;
  logo_url: string;
  website_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FetchBrandsResult {
  items: Brand[];
  error?: string;
}
