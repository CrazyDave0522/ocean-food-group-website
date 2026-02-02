import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FormShell } from '@/components/forms/FormShell'

describe('FormShell', () => {
  it('renders children content', () => {
    render(
      <FormShell>
        <div>Test content</div>
      </FormShell>
    )
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('takes full width in section', () => {
    const { container } = render(
      <FormShell>
        <div>Test</div>
      </FormShell>
    )
    const section = container.querySelector('section')
    expect(section).not.toHaveClass('mx-auto')
  })

  it('applies card styling to inner div', () => {
    const { container } = render(
      <FormShell>
        <div>Test</div>
      </FormShell>
    )
    const innerDiv = container.querySelector('div.rounded-2xl')
    expect(innerDiv).toHaveClass('rounded-2xl', 'bg-transparent')
  })

  it('applies padding to inner div', () => {
    const { container } = render(
      <FormShell>
        <div>Test</div>
      </FormShell>
    )
    const innerDiv = container.querySelector('div.rounded-2xl')
    expect(innerDiv).toHaveClass('p-6')
  })

  it('renders content inside nested structure', () => {
    const { container } = render(
      <FormShell>
        <span>Nested content</span>
      </FormShell>
    )
    const section = container.querySelector('section')
    const innerDiv = section?.querySelector('div')
    expect(innerDiv).toBeInTheDocument()
    expect(screen.getByText('Nested content')).toBeInTheDocument()
  })
})
