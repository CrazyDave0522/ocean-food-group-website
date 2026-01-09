import { describe, it, expect } from 'vitest';
import type { Brand, FetchBrandsResult } from '@/lib/brands/types';

describe('Brand Types', () => {
  it('should define Brand interface with all required fields', () => {
    const brand: Brand = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Test Brand',
      introduction: 'Test introduction text',
      logo_url: 'https://example.com/logo.png',
      website_url: 'https://testbrand.com',
      is_active: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    };

    expect(brand.id).toBeDefined();
    expect(brand.name).toBe('Test Brand');
    expect(brand.introduction).toBe('Test introduction text');
    expect(brand.logo_url).toBe('https://example.com/logo.png');
    expect(brand.website_url).toBe('https://testbrand.com');
    expect(brand.is_active).toBe(true);
    expect(brand.created_at).toBeDefined();
    expect(brand.updated_at).toBeDefined();
  });

  it('should define FetchBrandsResult with items array and optional error', () => {
    const successResult: FetchBrandsResult = {
      items: [
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
      ],
    };

    expect(successResult.items).toHaveLength(1);
    expect(successResult.error).toBeUndefined();
  });

  it('should define FetchBrandsResult with error message', () => {
    const errorResult: FetchBrandsResult = {
      items: [],
      error: 'Failed to fetch brands',
    };

    expect(errorResult.items).toHaveLength(0);
    expect(errorResult.error).toBe('Failed to fetch brands');
  });
});
