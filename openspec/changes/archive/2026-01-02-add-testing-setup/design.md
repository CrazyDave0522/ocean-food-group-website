# Design: Testing Framework Setup

## Architecture

### Test Runner & Environment
- **Vitest** is chosen over Jest because:
  - Native ES modules support and faster execution.
  - Excellent TypeScript support with zero-config.
  - Better ESM compatibility with Next.js 16.
  - Compatible with existing Jest test syntax (lower migration cost).

- **Happy DOM** (rather than jsdom) is selected for:
  - Faster test execution (DOM simulation is lightweight).
  - Sufficient for component testing (no browser-specific features used).
  - Can migrate to jsdom if needed for edge cases.

### Test Organization

```
__tests__/
├── setup.ts                    # Global test setup
├── pages.test.ts               # Page metadata tests
├── components/
│   ├── forms/
│   │   ├── FormTitle.test.tsx
│   │   ├── FormShell.test.tsx
│   │   └── SubmitButton.test.tsx
│   └── Header.test.tsx         # Future tests
└── lib/
    ├── actions/
    │   └── contact.test.ts     # Server action validation
    └── supabase.test.ts        # Future: Supabase helper tests
```

### Test Patterns

#### Component Tests
```typescript
import { render, screen } from '@testing-library/react'
import { FormTitle } from '@/components/forms/FormTitle'

describe('FormTitle', () => {
  it('renders title and subtitle', () => {
    render(<FormTitle title="Test" subtitle="Description" />)
    expect(screen.getByRole('heading')).toHaveTextContent('Test')
    expect(screen.getByText('Description')).toBeInTheDocument()
  })
})
```

#### Server Action Tests (Unit)
```typescript
import { submitContact } from '@/lib/actions/contact'
import { describe, it, expect } from 'vitest'

describe('submitContact', () => {
  it('validates required fields', () => {
    const result = submitContact({
      firstName: '',
      lastName: 'Doe',
      email: 'test@example.com',
      phone: '555-1234',
      subject: 'Help',
      message: 'Test',
    })
    expect(result.error).toBeTruthy()
  })
})
```

### Configuration Details

#### vitest.config.ts
- **Environment**: `happy-dom`
- **Globals**: `true` (no need to import describe, it, expect)
- **Include**: `['**/__tests__/**/*.{test,spec}.{ts,tsx}']`
- **Coverage**:
  - Reporter: v8 (built-in)
  - Lines: 70% threshold
  - Exclude: node_modules, __tests__, dist

#### Path Aliases
Vitest reads from `tsconfig.json` automatically; ensure `@/` alias is defined there:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Mocking Strategy

#### Supabase Mocks
- Mock `lib/supabase.ts` module in tests that call server actions.
- Example: Mock `getSupabaseServerClient()` to return a test double that does not connect to real database.

#### Resend Mocks
- Mock the `resend` package in contact action tests.
- Verify that email was attempted with correct parameters.

#### Browser APIs (if needed)
- Mock `window` objects (localStorage, fetch) using vitest's `vi` utility.

### Type Safety

- All test files use TypeScript with strict mode.
- Use `@testing-library/react` types (already included in types).
- Avoid `any` in tests; prefer exact types or `as const`.

### Coverage Goals

- **Phase 1** (initial): 70% lines (focus on critical paths).
- **Phase 2** (incremental): 80% lines (as suite grows).
- **Phase 3** (mature): 85%+ lines (comprehensive coverage).

### CI/CD Integration

- Add GitHub Actions workflow (`.github/workflows/test.yml`):
  - Trigger: `push` to `main`, `pull_request` against `main`.
  - Steps: Install dependencies, run `pnpm test:run`, fail if tests fail or coverage drops.

### Naming & Discovery

- Test files: `[name].test.ts` or `[name].test.tsx` (prefer test over spec).
- Test descriptions: Use clear BDD-style names (`it('should validate email format')`).
- Organize tests in folders mirroring source structure for discoverability.

### Edge Cases & Future Considerations

1. **Next.js SSR/SSG Testing**: Use `@next/env` and `preloadEnv()` if testing functions that rely on runtime config.
2. **DOM Testing vs Snapshot Testing**: Prefer behavior-focused assertions (`getByRole`, `getByText`) over snapshots to avoid brittle tests.
3. **Async Operations**: Use `waitFor()` from @testing-library/react for async state updates.
4. **Accessibility Testing**: Integrate `@testing-library/jest-dom` matchers (e.g., `toBeInTheDocument`, `toHaveAccessibleName`) in example tests.

