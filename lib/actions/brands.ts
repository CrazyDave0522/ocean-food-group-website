/**
 * Server action to fetch active brands from Supabase
 */

'use server';

import { getSupabaseServerClient } from '@/lib/supabase';
import type { Brand, FetchBrandsResult } from '@/lib/brands/types';

export async function fetchPublishedBrands(): Promise<FetchBrandsResult> {
  try {
    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase
      .from('brand')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching brands:', error);
      return {
        items: [],
        error: 'Failed to fetch brands',
      };
    }

    return {
      items: (data || []) as Brand[],
    };
  } catch (err) {
    console.error('Unexpected error fetching brands:', err);
    return {
      items: [],
      error: 'An unexpected error occurred',
    };
  }
}
