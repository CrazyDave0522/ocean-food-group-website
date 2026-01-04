import { describe, it, expect, vi, beforeEach } from 'vitest'
import { submitFranchiseInquiry } from '@/lib/actions/franchise'
import {
    FRANCHISE_FIELD_LIMITS,
    REQUIRED_FRANCHISE_FIELDS,
    AUSTRALIAN_STATES,
    CONTACT_METHODS,
} from '@/lib/franchise/form'

// Mock Supabase and sendFormNotification
vi.mock('@/lib/supabase', () => ({
    getSupabaseServerClient: vi.fn(),
}))

vi.mock('@/lib/email/sendFormNotification', () => ({
    sendFormNotification: vi.fn(),
}))

import { getSupabaseServerClient } from '@/lib/supabase'
import { sendFormNotification } from '@/lib/email/sendFormNotification'

const mockGetSupabaseServerClient = getSupabaseServerClient as ReturnType<typeof vi.fn>
const mockSendFormNotification = sendFormNotification as ReturnType<typeof vi.fn>

function createFormData(data: Record<string, string>): FormData {
    const formData = new FormData()
    for (const [key, value] of Object.entries(data)) {
        formData.append(key, value)
    }
    return formData
}

describe('Franchise Form Validation', () => {
    describe('required fields', () => {
        it('should have correct required fields', () => {
            expect(REQUIRED_FRANCHISE_FIELDS).toContain('firstName')
            expect(REQUIRED_FRANCHISE_FIELDS).toContain('lastName')
            expect(REQUIRED_FRANCHISE_FIELDS).toContain('countryCode')
            expect(REQUIRED_FRANCHISE_FIELDS).toContain('phone')
            expect(REQUIRED_FRANCHISE_FIELDS).toContain('conceptInterest')
            expect(REQUIRED_FRANCHISE_FIELDS).toContain('preferredLocation')
        })

        it('should NOT require referralSource', () => {
            expect(REQUIRED_FRANCHISE_FIELDS).not.toContain('referralSource')
        })
    })

    describe('field length limits', () => {
        it('should have correct field limits', () => {
            expect(FRANCHISE_FIELD_LIMITS.firstName).toBe(100)
            expect(FRANCHISE_FIELD_LIMITS.lastName).toBe(100)
            expect(FRANCHISE_FIELD_LIMITS.countryCode).toBe(20)
            expect(FRANCHISE_FIELD_LIMITS.phone).toBe(20)
            expect(FRANCHISE_FIELD_LIMITS.email).toBe(255)
            expect(FRANCHISE_FIELD_LIMITS.referralSource).toBe(500)
        })
    })

    describe('australian states', () => {
        it('should have all 8 australian states', () => {
            expect(AUSTRALIAN_STATES).toHaveLength(8)
            expect(AUSTRALIAN_STATES).toContain('NSW')
            expect(AUSTRALIAN_STATES).toContain('VIC')
            expect(AUSTRALIAN_STATES).toContain('QLD')
            expect(AUSTRALIAN_STATES).toContain('WA')
            expect(AUSTRALIAN_STATES).toContain('SA')
            expect(AUSTRALIAN_STATES).toContain('TAS')
            expect(AUSTRALIAN_STATES).toContain('ACT')
            expect(AUSTRALIAN_STATES).toContain('NT')
        })
    })

    describe('contact methods', () => {
        it('should have whatsapp and mobile options', () => {
            expect(CONTACT_METHODS).toContain('whatsapp')
            expect(CONTACT_METHODS).toContain('mobile')
            expect(CONTACT_METHODS).toHaveLength(2)
        })
    })

    describe('submitFranchiseInquiry server action validation', () => {
        const validData = {
            firstName: 'John',
            lastName: 'Doe',
            countryCode: 'AU +61',
            phone: '400 123 456',
            preferredContactMethod: 'whatsapp',
            email: 'john@example.com',
            conceptInterest: 'Concept A',
            preferredLocation: 'NSW',
            hasLiquidAssets: 'Yes',
            canManageFullTime: 'Yes',
            referralSource: 'Google Search',
        }

        beforeEach(() => {
            vi.clearAllMocks()
            mockGetSupabaseServerClient.mockClear()
            mockSendFormNotification.mockClear()
        })

        it('should return validation error for missing firstName', async () => {
            const formData = createFormData({
                ...validData,
                firstName: '',
            })

            const result = await submitFranchiseInquiry({ status: 'idle' }, formData)

            expect(result.status).toBe('error')
            expect(result.errors?.firstName).toBe('This field is required.')
        })

        it('should return validation error for missing lastName', async () => {
            const formData = createFormData({
                ...validData,
                lastName: '',
            })

            const result = await submitFranchiseInquiry({ status: 'idle' }, formData)

            expect(result.status).toBe('error')
            expect(result.errors?.lastName).toBe('This field is required.')
        })

        it('should return validation error for missing countryCode', async () => {
            const formData = createFormData({
                ...validData,
                countryCode: '',
            })

            const result = await submitFranchiseInquiry({ status: 'idle' }, formData)

            expect(result.status).toBe('error')
            expect(result.errors?.countryCode).toBe('This field is required.')
        })

        it('should return validation error for missing phone', async () => {
            const formData = createFormData({
                ...validData,
                phone: '',
            })

            const result = await submitFranchiseInquiry({ status: 'idle' }, formData)

            expect(result.status).toBe('error')
            expect(result.errors?.phone).toBe('This field is required.')
        })

        it('should return validation error for missing email', async () => {
            const formData = createFormData({
                ...validData,
                email: '',
            })

            const result = await submitFranchiseInquiry({ status: 'idle' }, formData)

            expect(result.status).toBe('error')
            expect(result.errors?.email).toBe('This field is required.')
        })

        it('should return validation error for missing conceptInterest', async () => {
            const formData = createFormData({
                ...validData,
                conceptInterest: '',
            })

            const result = await submitFranchiseInquiry({ status: 'idle' }, formData)

            expect(result.status).toBe('error')
            expect(result.errors?.conceptInterest).toBe('This field is required.')
        })

        it('should return validation error for missing preferredLocation', async () => {
            const formData = createFormData({
                ...validData,
                preferredLocation: '',
            })

            const result = await submitFranchiseInquiry({ status: 'idle' }, formData)

            expect(result.status).toBe('error')
            expect(result.errors?.preferredLocation).toBe('This field is required.')
        })

        it('should allow empty referralSource (optional)', () => {
            expect(REQUIRED_FRANCHISE_FIELDS).not.toContain('referralSource')
        })

        it('should return validation error for invalid email format', async () => {
            const formData = createFormData({
                ...validData,
                email: 'not-an-email',
            })

            const result = await submitFranchiseInquiry({ status: 'idle' }, formData)

            expect(result.status).toBe('error')
            expect(result.errors?.email).toBe('Enter a valid email.')
        })

        it('should return validation error for invalid country code format', async () => {
            const formData = createFormData({
                ...validData,
                countryCode: 'invalid123',
            })

            const result = await submitFranchiseInquiry({ status: 'idle' }, formData)

            expect(result.status).toBe('error')
            expect(result.errors?.countryCode).toBe('Enter a valid country code.')
        })

        it('should return validation error for invalid phone format', async () => {
            const formData = createFormData({
                ...validData,
                phone: 'abc@#$%',
            })

            const result = await submitFranchiseInquiry({ status: 'idle' }, formData)

            expect(result.status).toBe('error')
            expect(result.errors?.phone).toBe('Enter a valid phone number.')
        })

        it('should return validation error for invalid contact method', async () => {
            const formData = createFormData({
                ...validData,
                preferredContactMethod: 'Email', // Invalid - should be whatsapp or mobile
            })

            // Mock the brands query
            const mockSelect = vi.fn().mockReturnValue({
                eq: vi.fn().mockResolvedValue({
                    data: [{ name: 'Concept A' }],
                    error: null,
                }),
            })
            const mockSupabaseClient = {
                from: vi.fn().mockReturnValue({ select: mockSelect }),
            }
            mockGetSupabaseServerClient.mockReturnValue(mockSupabaseClient)

            const result = await submitFranchiseInquiry({ status: 'idle' }, formData)

            expect(result.status).toBe('error')
            expect((result.errors as Record<string, string>)?.preferredContactMethod).toBe('Please select a valid contact method.')
        })

        it('should return validation error for invalid location', async () => {
            const formData = createFormData({
                ...validData,
                preferredLocation: 'INVALID',
            })

            // Mock the brands query
            const mockSelect = vi.fn().mockReturnValue({
                eq: vi.fn().mockResolvedValue({
                    data: [{ name: 'Concept A' }],
                    error: null,
                }),
            })
            const mockSupabaseClient = {
                from: vi.fn().mockReturnValue({ select: mockSelect }),
            }
            mockGetSupabaseServerClient.mockReturnValue(mockSupabaseClient)

            const result = await submitFranchiseInquiry({ status: 'idle' }, formData)

            expect(result.status).toBe('error')
            expect((result.errors as Record<string, string>)?.preferredLocation).toBe('Please select a valid location.')
        })

        it('should return validation error for firstName exceeding limit', async () => {
            const formData = createFormData({
                ...validData,
                firstName: 'a'.repeat(101),
            })

            const result = await submitFranchiseInquiry({ status: 'idle' }, formData)

            expect(result.status).toBe('error')
            expect(result.errors?.firstName).toBe(`Must be ${FRANCHISE_FIELD_LIMITS.firstName} characters or fewer.`)
        })

        it('should return validation error for referralSource exceeding 500 characters', async () => {
            const mockSelect = vi.fn().mockReturnValue({
                eq: vi.fn().mockResolvedValue({
                    data: [{ name: 'Concept A' }],
                    error: null,
                }),
            })
            const mockSupabaseClient = {
                from: vi.fn().mockReturnValue({ select: mockSelect }),
            }
            mockGetSupabaseServerClient.mockReturnValue(mockSupabaseClient)

            const formData = createFormData({
                ...validData,
                referralSource: 'a'.repeat(501),
            })

            const result = await submitFranchiseInquiry({ status: 'idle' }, formData)

            expect(result.status).toBe('error')
            expect(result.errors?.referralSource).toBe(`Must be ${FRANCHISE_FIELD_LIMITS.referralSource} characters or fewer.`)
        })

        it('should return error when Supabase client initialization fails during main submission', async () => {
            // Mock successful validation by providing a mock brands query first
            let callCount = 0
            const mockSelect = vi.fn().mockImplementation(() => ({
                eq: vi.fn().mockResolvedValue({
                    data: [{ name: 'Concept A' }],
                    error: null,
                }),
            }))
            mockGetSupabaseServerClient.mockImplementation(() => {
                callCount++
                if (callCount === 1) {
                    // First call during validation succeeds
                    return {
                        from: vi.fn().mockReturnValue({ select: mockSelect }),
                    }
                } else {
                    // Second call during insert throws
                    throw new Error('Supabase not configured')
                }
            })

            const formData = createFormData(validData)
            const result = await submitFranchiseInquiry({ status: 'idle' }, formData)

            expect(result.status).toBe('error')
            expect(result.message).toBe('Service is not configured. Please try again later.')
            expect(result.errors).toBeUndefined()
        })

        it('should return error when Supabase insert fails', async () => {
            const mockSelect = vi.fn().mockReturnValue({
                eq: vi.fn().mockResolvedValue({
                    data: [{ name: 'Concept A' }],
                    error: null,
                }),
            })
            const mockInsert = vi.fn().mockResolvedValue({
                error: { message: 'Database error' },
            })
            const mockSupabaseClient = {
                from: vi.fn().mockImplementation((table) => {
                    if (table === 'brand') {
                        return { select: mockSelect }
                    }
                    if (table === 'franchise_inquiry') {
                        return { insert: mockInsert }
                    }
                }),
            }
            mockGetSupabaseServerClient.mockReturnValue(mockSupabaseClient)

            const formData = createFormData(validData)
            const result = await submitFranchiseInquiry({ status: 'idle' }, formData)

            expect(result.status).toBe('error')
            expect(result.message).toBe('Failed to submit application. Please try again.')
        })

        it('should return error when concept validation query fails', async () => {
            const mockSelect = vi.fn().mockReturnValue({
                eq: vi.fn().mockResolvedValue({
                    data: null,
                    error: { message: 'Query error' },
                }),
            })
            const mockSupabaseClient = {
                from: vi.fn().mockReturnValue({ select: mockSelect }),
            }
            mockGetSupabaseServerClient.mockReturnValue(mockSupabaseClient)

            const formData = createFormData(validData)
            const result = await submitFranchiseInquiry({ status: 'idle' }, formData)

            expect(result.status).toBe('error')
            expect(result.errors?.conceptInterest).toBe('Could not validate concept. Please try again.')
        })

        it('should return error when concept is not in active brands list', async () => {
            const mockSelect = vi.fn().mockReturnValue({
                eq: vi.fn().mockResolvedValue({
                    data: [{ name: 'Concept A' }, { name: 'Concept B' }],
                    error: null,
                }),
            })
            const mockSupabaseClient = {
                from: vi.fn().mockReturnValue({ select: mockSelect }),
            }
            mockGetSupabaseServerClient.mockReturnValue(mockSupabaseClient)

            const formData = createFormData({
                ...validData,
                conceptInterest: 'Invalid Concept',
            })

            const result = await submitFranchiseInquiry({ status: 'idle' }, formData)

            expect(result.status).toBe('error')
            expect(result.errors?.conceptInterest).toBe('Please select a valid concept.')
        })

        it('should successfully submit with valid data and send email', async () => {
            const mockSelect = vi.fn().mockReturnValue({
                eq: vi.fn().mockResolvedValue({
                    data: [{ name: 'Concept A' }],
                    error: null,
                }),
            })
            const mockInsert = vi.fn().mockResolvedValue({ error: null })
            const mockSupabaseClient = {
                from: vi.fn().mockImplementation((table) => {
                    if (table === 'brand') {
                        return { select: mockSelect }
                    }
                    if (table === 'franchise_inquiry') {
                        return { insert: mockInsert }
                    }
                }),
            }
            mockGetSupabaseServerClient.mockReturnValue(mockSupabaseClient)
            mockSendFormNotification.mockResolvedValue(true)

            const formData = createFormData(validData)
            const result = await submitFranchiseInquiry({ status: 'idle' }, formData)

            expect(result.status).toBe('success')
            expect(result.message).toBe("Thank you! We'll be in touch soon.")
            expect(mockSendFormNotification).toHaveBeenCalled()
            expect(mockSendFormNotification).toHaveBeenCalledWith(
                expect.objectContaining({
                    from: 'franchise_inquiry@notify.oceanfoodgroup.com.au',
                    to: 'hello@oceanfoodgroup.com.au',
                    subject: expect.stringContaining('New Franchise Inquiry'),
                }),
            )
        })

        it('should return partial success when email sending fails', async () => {
            const mockSelect = vi.fn().mockReturnValue({
                eq: vi.fn().mockResolvedValue({
                    data: [{ name: 'Concept A' }],
                    error: null,
                }),
            })
            const mockInsert = vi.fn().mockResolvedValue({ error: null })
            const mockSupabaseClient = {
                from: vi.fn().mockImplementation((table) => {
                    if (table === 'brand') {
                        return { select: mockSelect }
                    }
                    if (table === 'franchise_inquiry') {
                        return { insert: mockInsert }
                    }
                }),
            }
            mockGetSupabaseServerClient.mockReturnValue(mockSupabaseClient)
            mockSendFormNotification.mockResolvedValue(false)

            const formData = createFormData(validData)
            const result = await submitFranchiseInquiry({ status: 'idle' }, formData)

            expect(result.status).toBe('success')
            expect(result.message).toBe("Thank you for your application! We'll contact you if there are any issues.")
            expect(mockSendFormNotification).toHaveBeenCalled()
        })
    })
})
