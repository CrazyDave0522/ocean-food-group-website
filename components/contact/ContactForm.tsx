"use client";

import {
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";

import { submitContact } from "@/lib/actions/contact";
import {
  initialContactFormState,
  type ContactFormState,
} from "@/lib/contact/form";
import { SubmitButton } from "@/components/forms/SubmitButton";
import {
  CONTACT_FIELD_LIMITS,
  REQUIRED_CONTACT_FIELDS,
  type ContactField,
} from "@/lib/contact/form";

type FieldErrors = Partial<Record<ContactField, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readField(formData: FormData, key: ContactField): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function validateClient(formData: FormData): FieldErrors {
  const values: Record<ContactField, string> = {
    firstName: readField(formData, "firstName"),
    lastName: readField(formData, "lastName"),
    email: readField(formData, "email"),
    phone: readField(formData, "phone"),
    subject: readField(formData, "subject"),
    message: readField(formData, "message"),
  };

  const errors: FieldErrors = {};

  for (const field of REQUIRED_CONTACT_FIELDS) {
    if (!values[field]) {
      errors[field] = "This field is required.";
    }
  }

  if (values.email && !emailPattern.test(values.email)) {
    errors.email = "Enter a valid email.";
  }

  (Object.keys(CONTACT_FIELD_LIMITS) as ContactField[]).forEach((field) => {
    const limit = CONTACT_FIELD_LIMITS[field];
    if (values[field] && values[field].length > limit) {
      errors[field] = `Must be ${limit} characters or fewer.`;
    }
  });

  return errors;
}

export function ContactForm() {
  const [state, formAction] = useActionState<ContactFormState, FormData>(
    submitContact,
    initialContactFormState
  );
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const combinedErrors = useMemo(() => {
    return { ...clientErrors, ...(state.errors ?? {}) } as FieldErrors;
  }, [clientErrors, state.errors]);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
    if (state.status === "success" || state.status === "error") {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [state.status]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const errors = validateClient(formData);
    setClientErrors(errors);

    if (Object.keys(errors).length > 0) {
      event.preventDefault();
    }
  }

  const inputClass =
    "mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200";
  const labelClass = "text-sm font-medium text-gray-800";
  const errorClass = "mt-1 text-sm text-red-600";
  const requiredIndicator = <span className="text-red-600">*</span>;

  const getError = (field: ContactField) => combinedErrors[field];

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      className="space-y-6"
      noValidate
    >
      {state.status === "success" ? (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          {state.message}
        </div>
      ) : null}

      {state.status === "error" && state.message ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {state.message}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="firstName">
            First name {requiredIndicator}
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            maxLength={CONTACT_FIELD_LIMITS.firstName}
            className={inputClass}
            aria-invalid={Boolean(getError("firstName"))}
          />
          {getError("firstName") ? (
            <p className={errorClass}>{getError("firstName")}</p>
          ) : null}
        </div>
        <div>
          <label className={labelClass} htmlFor="lastName">
            Last name {requiredIndicator}
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            maxLength={CONTACT_FIELD_LIMITS.lastName}
            className={inputClass}
            aria-invalid={Boolean(getError("lastName"))}
          />
          {getError("lastName") ? (
            <p className={errorClass}>{getError("lastName")}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="email">
            Email {requiredIndicator}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={CONTACT_FIELD_LIMITS.email}
            className={inputClass}
            aria-invalid={Boolean(getError("email"))}
          />
          {getError("email") ? (
            <p className={errorClass}>{getError("email")}</p>
          ) : null}
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            Phone (optional)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={CONTACT_FIELD_LIMITS.phone}
            className={inputClass}
            aria-invalid={Boolean(getError("phone"))}
            placeholder="e.g. +1 (555) 123-4567"
          />
          {getError("phone") ? (
            <p className={errorClass}>{getError("phone")}</p>
          ) : null}
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="subject">
          Subject {requiredIndicator}
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          maxLength={CONTACT_FIELD_LIMITS.subject}
          className={inputClass}
          aria-invalid={Boolean(getError("subject"))}
        />
        {getError("subject") ? (
          <p className={errorClass}>{getError("subject")}</p>
        ) : null}
      </div>

      <div>
        <label className={labelClass} htmlFor="message">
          Message {requiredIndicator}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={CONTACT_FIELD_LIMITS.message}
          className={`${inputClass} resize-y`}
          aria-invalid={Boolean(getError("message"))}
        />
        {getError("message") ? (
          <p className={errorClass}>{getError("message")}</p>
        ) : null}
      </div>

      <div className="pt-2">
        <SubmitButton label="Talk To Us" loadingLabel="Sending..." />
      </div>
    </form>
  );
}
