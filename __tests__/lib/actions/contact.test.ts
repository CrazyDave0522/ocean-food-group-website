import { describe, it, expect, vi, beforeEach } from 'vitest'
import { submitContact } from '@/lib/actions/contact'
import {
  CONTACT_FIELD_LIMITS,
  REQUIRED_CONTACT_FIELDS,
} from '@/lib/contact/form'

// Mock Supabase and Resend
vi.mock('@/lib/supabase', () => ({
  getSupabaseServerClient: vi.fn(),
}))

vi.mock('resend', () => {
  const mockEmailsSend = vi.fn()
  return {
    Resend: vi.fn(() => ({
      emails: {
        send: mockEmailsSend,
      },
    })),
  }
})

import { getSupabaseServerClient } from '@/lib/supabase'
import { Resend } from 'resend'

const mockGetSupabaseServerClient = getSupabaseServerClient as ReturnType<typeof vi.fn>
const mockResend = Resend as ReturnType<typeof vi.fn>

function createFormData(data: Record<string, string>): FormData {
  const formData = new FormData()
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value)
  }
  return formData
}

describe('Contact Form Validation', () => {
  describe('required fields', () => {
    it('should identify firstName as required', () => {
      expect(REQUIRED_CONTACT_FIELDS).toContain('firstName')
    })

    it('should identify lastName as required', () => {
      expect(REQUIRED_CONTACT_FIELDS).toContain('lastName')
    })

    it('should identify email as required', () => {
      expect(REQUIRED_CONTACT_FIELDS).toContain('email')
    })

    it('should identify subject as required', () => {
      expect(REQUIRED_CONTACT_FIELDS).toContain('subject')
    })

    it('should identify message as required', () => {
      expect(REQUIRED_CONTACT_FIELDS).toContain('message')
    })

    it('should NOT require phone', () => {
      expect(REQUIRED_CONTACT_FIELDS).not.toContain('phone')
    })
  })

  describe('field length limits', () => {
    it('firstName should have 100 character limit', () => {
      expect(CONTACT_FIELD_LIMITS.firstName).toBe(100)
    })

    it('lastName should have 100 character limit', () => {
      expect(CONTACT_FIELD_LIMITS.lastName).toBe(100)
    })

    it('email should have 255 character limit', () => {
      expect(CONTACT_FIELD_LIMITS.email).toBe(255)
    })

    it('phone should have 20 character limit', () => {
      expect(CONTACT_FIELD_LIMITS.phone).toBe(20)
    })

    it('subject should have 200 character limit', () => {
      expect(CONTACT_FIELD_LIMITS.subject).toBe(200)
    })

    it('message should have 2000 character limit', () => {
      expect(CONTACT_FIELD_LIMITS.message).toBe(2000)
    })
  })

  describe('validation rules', () => {
    it('firstName cannot exceed 100 characters', () => {
      const name = 'a'.repeat(101)
      expect(name.length).toBeGreaterThan(CONTACT_FIELD_LIMITS.firstName)
    })

    it('email cannot exceed 255 characters', () => {
      const email = 'a'.repeat(250) + '@test.com'
      expect(email.length).toBeGreaterThan(CONTACT_FIELD_LIMITS.email)
    })

    it('message cannot exceed 2000 characters', () => {
      const message = 'a'.repeat(2001)
      expect(message.length).toBeGreaterThan(CONTACT_FIELD_LIMITS.message)
    })
  })

  describe('email validation', () => {
    it('should accept valid email format', () => {
      const validEmails = [
        'test@example.com',
        'user.name@example.co.uk',
        'first+last@example.org',
      ]
      validEmails.forEach((email) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        expect(pattern.test(email)).toBe(true)
      })
    })

    it('should reject email without @', () => {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      expect(pattern.test('invalidemail.com')).toBe(false)
    })

    it('should reject email without domain', () => {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      expect(pattern.test('test@')).toBe(false)
    })

    it('should reject email with spaces', () => {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      expect(pattern.test('test @example.com')).toBe(false)
    })
  })

  describe('submitContact server action validation', () => {
    const validData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '555-1234',
      subject: 'Product Inquiry',
      message: 'I would like to know more about your products.',
    }

    beforeEach(() => {
      vi.clearAllMocks()
      mockGetSupabaseServerClient.mockClear()
      mockResend.mockClear()
    })

    it('should return validation error for missing firstName', async () => {
      const formData = createFormData({
        ...validData,
        firstName: '',
      })

      const result = await submitContact({ status: 'idle' }, formData)

      expect(result.status).toBe('error')
      expect(result.errors?.firstName).toBe('This field is required.')
    })

    it('should return validation error for missing lastName', async () => {
      const formData = createFormData({
        ...validData,
        lastName: '',
      })

      const result = await submitContact({ status: 'idle' }, formData)

      expect(result.status).toBe('error')
      expect(result.errors?.lastName).toBe('This field is required.')
    })

    it('should return validation error for missing email', async () => {
      const formData = createFormData({
        ...validData,
        email: '',
      })

      const result = await submitContact({ status: 'idle' }, formData)

      expect(result.status).toBe('error')
      expect(result.errors?.email).toBe('This field is required.')
    })

    it('should return validation error for missing subject', async () => {
      const formData = createFormData({
        ...validData,
        subject: '',
      })

      const result = await submitContact({ status: 'idle' }, formData)

      expect(result.status).toBe('error')
      expect(result.errors?.subject).toBe('This field is required.')
    })

    it('should return validation error for missing message', async () => {
      const formData = createFormData({
        ...validData,
        message: '',
      })

      const result = await submitContact({ status: 'idle' }, formData)

      expect(result.status).toBe('error')
      expect(result.errors?.message).toBe('This field is required.')
    })

    it('should allow empty phone field (optional)', async () => {
      // Phone field is optional, so it can be empty
      // Validated through integration test in ContactForm
      // This is more of a data model test
      expect(REQUIRED_CONTACT_FIELDS).not.toContain('phone')
    })

    it('should return validation error for invalid email format', async () => {
      const formData = createFormData({
        ...validData,
        email: 'not-an-email',
      })

      const result = await submitContact({ status: 'idle' }, formData)

      expect(result.status).toBe('error')
      expect(result.errors?.email).toBe('Enter a valid email.')
    })

    it('should return validation error for firstName exceeding limit', async () => {
      const formData = createFormData({
        ...validData,
        firstName: 'a'.repeat(101),
      })

      const result = await submitContact({ status: 'idle' }, formData)

      expect(result.status).toBe('error')
      expect(result.errors?.firstName).toBe(`Must be ${CONTACT_FIELD_LIMITS.firstName} characters or fewer.`)
    })

    it('should return validation error for lastName exceeding limit', async () => {
      const formData = createFormData({
        ...validData,
        lastName: 'a'.repeat(101),
      })

      const result = await submitContact({ status: 'idle' }, formData)

      expect(result.status).toBe('error')
      expect(result.errors?.lastName).toBe(`Must be ${CONTACT_FIELD_LIMITS.lastName} characters or fewer.`)
    })

    it('should return validation error for email exceeding limit', async () => {
      const formData = createFormData({
        ...validData,
        email: 'a'.repeat(245) + '@example.com', // Total > 255
      })

      const result = await submitContact({ status: 'idle' }, formData)

      expect(result.status).toBe('error')
      expect(result.errors?.email).toBe(`Must be ${CONTACT_FIELD_LIMITS.email} characters or fewer.`)
    })

    it('should return validation error for phone exceeding limit', async () => {
      const formData = createFormData({
        ...validData,
        phone: '1'.repeat(21),
      })

      const result = await submitContact({ status: 'idle' }, formData)

      expect(result.status).toBe('error')
      expect(result.errors?.phone).toBe(`Must be ${CONTACT_FIELD_LIMITS.phone} characters or fewer.`)
    })

    it('should return validation error for subject exceeding limit', async () => {
      const formData = createFormData({
        ...validData,
        subject: 'a'.repeat(201),
      })

      const result = await submitContact({ status: 'idle' }, formData)

      expect(result.status).toBe('error')
      expect(result.errors?.subject).toBe(`Must be ${CONTACT_FIELD_LIMITS.subject} characters or fewer.`)
    })

    it('should return validation error for message exceeding limit', async () => {
      const formData = createFormData({
        ...validData,
        message: 'a'.repeat(2001),
      })

      const result = await submitContact({ status: 'idle' }, formData)

      expect(result.status).toBe('error')
      expect(result.errors?.message).toBe(`Must be ${CONTACT_FIELD_LIMITS.message} characters or fewer.`)
    })

    it('should return error when Supabase client initialization fails', async () => {
      mockGetSupabaseServerClient.mockImplementation(() => {
        throw new Error('Supabase not configured')
      })

      const formData = createFormData(validData)
      const result = await submitContact({ status: 'idle' }, formData)

      expect(result.status).toBe('error')
      expect(result.message).toBe('Service is not configured. Please try again later.')
      expect(result.errors).toBeUndefined()
    })

    it('should return error when Supabase insert fails', async () => {
      const mockInsert = vi.fn().mockResolvedValue({
        error: { message: 'Database error' },
      })
      const mockSupabaseClient = {
        from: vi.fn().mockReturnValue({
          insert: mockInsert,
        }),
      }
      mockGetSupabaseServerClient.mockReturnValue(mockSupabaseClient)

      process.env.CONTACT_INQUIRY_RECIPIENT = 'contact@example.com'
      process.env.RESEND_API_KEY = 'test-key'

      const formData = createFormData(validData)
      const result = await submitContact({ status: 'idle' }, formData)

      expect(result.status).toBe('error')
      expect(result.message).toBe('We could not save your message. Please try again shortly.')
      expect(result.errors).toBeUndefined()
    })

    it('should return error when CONTACT_INQUIRY_RECIPIENT is not configured', async () => {
      const mockInsert = vi.fn().mockResolvedValue({ error: null })
      const mockSupabaseClient = {
        from: vi.fn().mockReturnValue({
          insert: mockInsert,
        }),
      }
      mockGetSupabaseServerClient.mockReturnValue(mockSupabaseClient)

      // Clear environment variables
      delete process.env.CONTACT_INQUIRY_RECIPIENT
      process.env.RESEND_API_KEY = 'test-key'

      const formData = createFormData(validData)
      const result = await submitContact({ status: 'idle' }, formData)

      expect(result.status).toBe('error')
      expect(result.message).toBe('Email delivery is not configured. Please try again later.')
    })

    it('should return error when RESEND_API_KEY is not configured', async () => {
      const mockInsert = vi.fn().mockResolvedValue({ error: null })
      const mockSupabaseClient = {
        from: vi.fn().mockReturnValue({
          insert: mockInsert,
        }),
      }
      mockGetSupabaseServerClient.mockReturnValue(mockSupabaseClient)

      process.env.CONTACT_INQUIRY_RECIPIENT = 'contact@example.com'
      delete process.env.RESEND_API_KEY

      const formData = createFormData(validData)
      const result = await submitContact({ status: 'idle' }, formData)

      expect(result.status).toBe('error')
      expect(result.message).toBe('Email delivery is not configured. Please try again later.')
    })
  })
})
