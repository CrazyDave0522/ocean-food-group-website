import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FormTitle } from '@/components/forms/FormTitle'

describe('FormTitle', () => {
  it('renders title as h1 heading', () => {
    render(<FormTitle title="Get In Touch" />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Get In Touch')
  })

  it('renders subtitle when provided', () => {
    render(
      <FormTitle
        title="Get In Touch"
        subtitle="We'd love to hear from you"
      />
    )
    expect(screen.getByText("We'd love to hear from you")).toBeInTheDocument()
  })

  it('does not render subtitle when not provided', () => {
    const { container } = render(<FormTitle title="Get In Touch" />)
    const paragraphs = container.querySelectorAll('p')
    expect(paragraphs.length).toBe(0)
  })

  it('applies correct heading typography classes', () => {
    render(<FormTitle title="Get In Touch" />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveClass('text-3xl', 'font-semibold')
  })

  it('applies subtitle text color class', () => {
    render(
      <FormTitle
        title="Get In Touch"
        subtitle="We'd love to hear from you"
        subtitleColor="text-gray-600"
      />
    )
    const subtitle = screen.getByText("We'd love to hear from you")
    expect(subtitle).toHaveClass('text-gray-600')
  })

  it('wraps content in container with spacing', () => {
    const { container } = render(
      <FormTitle title="Test" subtitle="Subtitle" />
    )
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass('mb-8', 'space-y-3')
  })
})
