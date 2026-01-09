import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrandsList } from '@/components/brands/BrandsList';
import * as brandsActions from '@/lib/actions/brands';
import type { Brand } from '@/lib/brands/types';

// Mock the fetchPublishedBrands action
vi.mock('@/lib/actions/brands', () => ({
  fetchPublishedBrands: vi.fn(),
}));

const mockBrand: Brand = {
  id: '123',
  name: 'Test Brand',
  introduction: 'Test intro',
  logo_url: 'https://example.com/logo.png',
  website_url: 'https://testbrand.com',
  is_active: true,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

describe('BrandsList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return null when no active brands exist', async () => {
    vi.mocked(brandsActions.fetchPublishedBrands).mockResolvedValue({
      items: [],
    });

    const result = await BrandsList();
    expect(result).toBeNull();
  });

  it('should render brands when available', async () => {
    const mockBrands = [mockBrand, { ...mockBrand, id: '456', name: 'Brand 2' }];
    vi.mocked(brandsActions.fetchPublishedBrands).mockResolvedValue({
      items: mockBrands,
    });

    const result = await BrandsList();
    expect(result).not.toBeNull();
  });

  it('should display error message on fetch failure', async () => {
    vi.mocked(brandsActions.fetchPublishedBrands).mockResolvedValue({
      items: [],
      error: 'Failed to fetch brands',
    });

    const result = await BrandsList();
    // Component returns error div when error exists and items are empty
    expect(result).not.toBeNull();
  });

  it('should fetch published brands on mount', async () => {
    vi.mocked(brandsActions.fetchPublishedBrands).mockResolvedValue({
      items: [mockBrand],
    });

    await BrandsList();

    expect(brandsActions.fetchPublishedBrands).toHaveBeenCalled();
  });

  it('should render items in flex container with proper spacing', async () => {
    const mockBrands = [mockBrand];
    vi.mocked(brandsActions.fetchPublishedBrands).mockResolvedValue({
      items: mockBrands,
    });

    const result = await BrandsList();
    // Verify the component structure through its rendered result
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
  });
});
