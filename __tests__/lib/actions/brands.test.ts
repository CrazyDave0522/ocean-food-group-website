import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchPublishedBrands } from '@/lib/actions/brands';
import * as supabaseModule from '@/lib/supabase';

// Mock the Supabase module
vi.mock('@/lib/supabase', () => ({
  getSupabaseServerClient: vi.fn(),
}));

type MockSupabase = ReturnType<typeof supabaseModule.getSupabaseServerClient>;

describe('fetchPublishedBrands Server Action', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch active brands successfully', async () => {
    const mockBrands = [
      {
        id: '123',
        name: 'Brand 1',
        introduction: 'Intro 1',
        logo_url: 'https://example.com/logo1.png',
        website_url: 'https://brand1.com',
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      },
    ];

    const mockSelect = vi.fn().mockReturnThis();
    const mockEq = vi.fn().mockReturnThis();
    const mockOrder = vi.fn().mockResolvedValue({
      data: mockBrands,
      error: null,
    });

    const mockSupabase = {
      from: vi.fn().mockReturnValue({
        select: mockSelect.mockReturnValue({
          eq: mockEq.mockReturnValue({
            order: mockOrder,
          }),
        }),
      }),
    };

    vi.mocked(supabaseModule.getSupabaseServerClient).mockReturnValue(mockSupabase as unknown as MockSupabase);

    const result = await fetchPublishedBrands();

    expect(result.items).toHaveLength(1);
    expect(result.items[0].name).toBe('Brand 1');
    expect(result.error).toBeUndefined();
  });

  it('should return empty array when no brands exist', async () => {
    const mockSelect = vi.fn().mockReturnThis();
    const mockEq = vi.fn().mockReturnThis();
    const mockOrder = vi.fn().mockResolvedValue({
      data: [],
      error: null,
    });

    const mockSupabase = {
      from: vi.fn().mockReturnValue({
        select: mockSelect.mockReturnValue({
          eq: mockEq.mockReturnValue({
            order: mockOrder,
          }),
        }),
      }),
    };

    vi.mocked(supabaseModule.getSupabaseServerClient).mockReturnValue(mockSupabase as unknown as MockSupabase);

    const result = await fetchPublishedBrands();

    expect(result.items).toHaveLength(0);
    expect(result.error).toBeUndefined();
  });

  it('should filter by is_active = true', async () => {
    const mockSelect = vi.fn().mockReturnThis();
    const mockEq = vi.fn().mockReturnThis();
    const mockOrder = vi.fn().mockResolvedValue({
      data: [],
      error: null,
    });

    const mockSupabase = {
      from: vi.fn().mockReturnValue({
        select: mockSelect.mockReturnValue({
          eq: mockEq.mockReturnValue({
            order: mockOrder,
          }),
        }),
      }),
    };

    vi.mocked(supabaseModule.getSupabaseServerClient).mockReturnValue(mockSupabase as unknown as MockSupabase);

    await fetchPublishedBrands();

    expect(mockEq).toHaveBeenCalledWith('is_active', true);
  });

  it('should handle Supabase errors gracefully', async () => {
    const mockSelect = vi.fn().mockReturnThis();
    const mockEq = vi.fn().mockReturnThis();
    const mockOrder = vi.fn().mockResolvedValue({
      data: null,
      error: new Error('Supabase error'),
    });

    const mockSupabase = {
      from: vi.fn().mockReturnValue({
        select: mockSelect.mockReturnValue({
          eq: mockEq.mockReturnValue({
            order: mockOrder,
          }),
        }),
      }),
    };

    vi.mocked(supabaseModule.getSupabaseServerClient).mockReturnValue(mockSupabase as unknown as MockSupabase);

    const result = await fetchPublishedBrands();

    expect(result.items).toHaveLength(0);
    expect(result.error).toBe('Failed to fetch brands');
  });

  it('should handle unexpected errors', async () => {
    vi.mocked(supabaseModule.getSupabaseServerClient).mockImplementation(() => {
      throw new Error('Unexpected error');
    });

    const result = await fetchPublishedBrands();

    expect(result.items).toHaveLength(0);
    expect(result.error).toBe('An unexpected error occurred');
  });
});
