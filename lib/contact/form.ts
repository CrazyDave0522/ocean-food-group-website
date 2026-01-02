export const CONTACT_FIELD_LIMITS = {
  firstName: 100,
  lastName: 100,
  email: 255,
  phone: 20,
  subject: 200,
  message: 2000,
} as const;

export type ContactField = keyof typeof CONTACT_FIELD_LIMITS;

export const REQUIRED_CONTACT_FIELDS: ContactField[] = [
  "firstName",
  "lastName",
  "email",
  "subject",
  "message",
];

type ContactFormStatus = "idle" | "success" | "error";

export type ContactFormState = {
  status: ContactFormStatus;
  message?: string;
  errors?: Partial<Record<ContactField, string>>;
};

export const initialContactFormState: ContactFormState = { status: "idle" };