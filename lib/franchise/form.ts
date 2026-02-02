export const FRANCHISE_FIELD_LIMITS = {
    firstName: 100,
    lastName: 100,
    regionCode: 20,
    phone: 20,
    preferredContactMethod: 20,
    email: 255,
    preferredLocation: 10,
    hasLiquidAssets: 10,
    canManageFullTime: 10,
    referralSource: 500,
} as const;

export type FranchiseField = keyof typeof FRANCHISE_FIELD_LIMITS;

export const REQUIRED_FRANCHISE_FIELDS: FranchiseField[] = [
    "firstName",
    "lastName",
    "regionCode",
    "phone",
    "preferredContactMethod",
    "email",
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

type FranchiseFormStatus = "idle" | "success" | "error";

export type FranchiseFormState = {
    status: FranchiseFormStatus;
    message?: string;
    errors?: Partial<Record<FranchiseField, string>>;
};

export const initialFranchiseFormState: FranchiseFormState = { status: "idle" };
