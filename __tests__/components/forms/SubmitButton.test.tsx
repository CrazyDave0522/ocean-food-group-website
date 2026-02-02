import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SubmitButton } from '@/components/forms/SubmitButton'

// Mock useFormStatus at module level for controlled testing
let mockPending = false

vi.mock('react-dom', async () => {
  const actual = await vi.importActual('react-dom')
  return {
    ...actual,
    useFormStatus: () => ({
      pending: mockPending,
    }),
  }
})

describe('SubmitButton', () => {
  beforeEach(() => {
    mockPending = false
  })

  it('renders button with provided label', () => {
    render(<SubmitButton label="Submit" />)
    const button = screen.getByRole('button')
    expect(button.textContent).toContain('Submit')
  })

  it('renders button with custom label', () => {
    render(<SubmitButton label="Send Message" />)
    const button = screen.getByRole('button', { name: 'Send Message' })
    expect(button).toBeInTheDocument()
  })

  it('displays label text when not pending', () => {
    mockPending = false
    render(
      <SubmitButton
        label="Send"
        loadingLabel="Sending..."
      />
    )
    const button = screen.getByRole('button')
    expect(button.textContent).toContain('Send')
    expect(button.textContent).not.toContain('Sending...')
  })

  it('displays loading label when pending', () => {
    mockPending = true
    render(
      <SubmitButton
        label="Submit"
        loadingLabel="Loading..."
      />
    )
    const button = screen.getByRole('button')
    expect(button.textContent).toContain('Loading...')
    expect(button.textContent).not.toContain('Submit')
  })

  it('disables button when pending', () => {
    mockPending = true
    render(<SubmitButton label="Submit" />)
    const button = screen.getByRole('button') as HTMLButtonElement
    expect(button).toBeDisabled()
  })

  it('enables button when not pending', () => {
    mockPending = false
    render(<SubmitButton label="Submit" />)
    const button = screen.getByRole('button') as HTMLButtonElement
    expect(button).not.toBeDisabled()
  })

  it('button is clickable and has correct type', async () => {
    const user = userEvent.setup()
    mockPending = false
    render(<SubmitButton label="Submit" />)
    const button = screen.getByRole('button') as HTMLButtonElement
    expect(button.type).toBe('submit')
    expect(button).not.toBeDisabled()
    await user.click(button)
  })

  it('applies button styling classes', () => {
    render(<SubmitButton label="Submit" />)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('rounded-full', 'bg-primary', 'text-white')
  })

  it('applies disabled styling when pending', () => {
    mockPending = true
    render(<SubmitButton label="Submit" />)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('disabled:opacity-70', 'disabled:cursor-not-allowed')
  })

  it('accepts custom className prop', () => {
    render(
      <SubmitButton
        label="Submit"
        className="custom-class"
      />
    )
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('uses default loading label when not provided', () => {
    mockPending = true
    render(<SubmitButton label="Send" />)
    const button = screen.getByRole('button')
    expect(button.textContent).toContain('Submitting...')
  })
})
