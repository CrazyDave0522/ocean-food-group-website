export const FRANCHISE_FIELD_LIMITS = {
    firstName: 100,
    lastName: 100,
    countryCode: 20,
    phone: 20,
    preferredContactMethod: 20,
    email: 255,
    conceptInterest: 255,
    preferredLocation: 10,
    hasLiquidAssets: 10,
    canManageFullTime: 10,
    referralSource: 500,
} as const;

export type FranchiseField = keyof typeof FRANCHISE_FIELD_LIMITS;

export const REQUIRED_FRANCHISE_FIELDS: FranchiseField[] = [
    "firstName",
    "lastName",
    "countryCode",
    "phone",
    "preferredContactMethod",
    "email",
    "conceptInterest",
    "preferredLocation",
    "hasLiquidAssets",
    "canManageFullTime",
];

export const AUSTRALIAN_STATES = [
    "NSW",
    "VIC",
    "QLD",
    "WA",
    "SA",
    "TAS",
    "ACT",
    "NT",
] as const;

export const CONTACT_METHODS = ["whatsapp", "mobile"] as const;

export const COUNTRY_CODES = [
    { code: "AU", dialCode: "+61", name: "Australia" },
    { code: "NZ", dialCode: "+64", name: "New Zealand" },
    { code: "US", dialCode: "+1", name: "United States" },
    { code: "GB", dialCode: "+44", name: "United Kingdom" },
    { code: "CA", dialCode: "+1", name: "Canada" },
    { code: "SG", dialCode: "+65", name: "Singapore" },
    { code: "HK", dialCode: "+852", name: "Hong Kong" },
    { code: "AW", dialCode: "+297", name: "Aruba" },
    { code: "AO", dialCode: "+244", name: "Angola" },
    { code: "IN", dialCode: "+91", name: "India" },
    { code: "IE", dialCode: "+353", name: "Ireland" },
    { code: "FR", dialCode: "+33", name: "France" },
    { code: "DE", dialCode: "+49", name: "Germany" },
    { code: "JP", dialCode: "+81", name: "Japan" },
    { code: "CN", dialCode: "+86", name: "China" },
    { code: "BR", dialCode: "+55", name: "Brazil" },
    { code: "MX", dialCode: "+52", name: "Mexico" },
    { code: "ZA", dialCode: "+27", name: "South Africa" },
    { code: "UAE", dialCode: "+971", name: "United Arab Emirates" },
] as const;

type FranchiseFormStatus = "idle" | "success" | "error";

export type FranchiseFormState = {
    status: FranchiseFormStatus;
    message?: string;
    errors?: Partial<Record<FranchiseField, string>>;
};

export const initialFranchiseFormState: FranchiseFormState = { status: "idle" };
