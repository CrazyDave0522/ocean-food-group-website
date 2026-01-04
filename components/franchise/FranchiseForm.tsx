"use client";

import {
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";

import { submitFranchiseInquiry } from "@/lib/actions/franchise";
import {
  initialFranchiseFormState,
  type FranchiseFormState,
} from "@/lib/franchise/form";
import { SubmitButton } from "@/components/forms/SubmitButton";
import {
  FRANCHISE_FIELD_LIMITS,
  type FranchiseField,
  AUSTRALIAN_STATES,
  CONTACT_METHODS,
} from "@/lib/franchise/form";
import {
  filterCountryCodes,
  formatCountryCode,
  isValidCountryCodeInput,
  type CountryCodeEntry,
} from "@/lib/country-codes/phoneRegionCodes";

type FieldErrors = Partial<Record<FranchiseField, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const countryCodePattern = /^[A-Z]{2}\s\+\d+$/;

function readField(formData: FormData, key: FranchiseField): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function validateClient(formData: FormData): FieldErrors {
  const values: Record<
    Exclude<
      FranchiseField,
      "preferredContactMethod" | "hasLiquidAssets" | "canManageFullTime"
    >,
    string
  > = {
    firstName: readField(formData, "firstName"),
    lastName: readField(formData, "lastName"),
    regionCode: readField(formData, "regionCode"),
    phone: readField(formData, "phone"),
    email: readField(formData, "email"),
    conceptInterest: readField(formData, "conceptInterest"),
    preferredLocation: readField(formData, "preferredLocation"),
    referralSource: readField(formData, "referralSource"),
  };

  const contactMethod = readField(formData, "preferredContactMethod");
  const hasLiquidAssets = readField(formData, "hasLiquidAssets");
  const canManageFullTime = readField(formData, "canManageFullTime");

  const errors: FieldErrors = {};

  // Required field validation
  if (!values.firstName) {
    errors.firstName = "This field is required.";
  }
  if (!values.lastName) {
    errors.lastName = "This field is required.";
  }
  if (!values.regionCode) {
    errors.regionCode = "This field is required.";
  }
  if (!values.phone) {
    errors.phone = "This field is required.";
  }
  if (!contactMethod) {
    errors.preferredContactMethod = "This field is required.";
  }
  if (!values.email) {
    errors.email = "This field is required.";
  }
  if (!values.conceptInterest) {
    errors.conceptInterest = "This field is required.";
  }
  if (!values.preferredLocation) {
    errors.preferredLocation = "This field is required.";
  }
  if (!hasLiquidAssets) {
    errors.hasLiquidAssets = "This field is required.";
  }
  if (!canManageFullTime) {
    errors.canManageFullTime = "This field is required.";
  }

  // Email format validation
  if (values.email && !emailPattern.test(values.email)) {
    errors.email = "Enter a valid email.";
  }

  // Region code format validation
  if (
    values.regionCode &&
    !countryCodePattern.test(values.regionCode.toUpperCase())
  ) {
    errors.regionCode = "Enter a valid region code.";
  } else if (values.regionCode && !isValidCountryCodeInput(values.regionCode)) {
    errors.regionCode = "Please select a valid region code.";
  }

  // Phone format validation
  if (values.phone && !/^[\d\s\-()]+$/.test(values.phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  // Field length validation
  (Object.keys(FRANCHISE_FIELD_LIMITS) as FranchiseField[]).forEach((field) => {
    const limit = FRANCHISE_FIELD_LIMITS[field];
    let fieldValue = "";

    if (field === "preferredContactMethod") {
      fieldValue = contactMethod;
    } else if (field === "hasLiquidAssets") {
      fieldValue = hasLiquidAssets;
    } else if (field === "canManageFullTime") {
      fieldValue = canManageFullTime;
    } else {
      fieldValue = values[field as keyof typeof values];
    }

    if (fieldValue && fieldValue.length > limit) {
      errors[field] = `Must be ${limit} characters or fewer.`;
    }
  });

  return errors;
}

interface BrandOption {
  name: string;
}

interface FranchiseFormProps {
  brands: BrandOption[];
}

export function FranchiseForm({ brands }: FranchiseFormProps) {
  const [state, formAction] = useActionState<FranchiseFormState, FormData>(
    submitFranchiseInquiry,
    initialFranchiseFormState
  );
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const [countryCodeSuggestions, setCountryCodeSuggestions] = useState<
    CountryCodeEntry[]
  >([]);
  const formRef = useRef<HTMLFormElement>(null);

  const combinedErrors = useMemo(() => {
    return { ...clientErrors, ...(state.errors ?? {}) } as FieldErrors;
  }, [clientErrors, state.errors]);

  const handleCountryCodeChange = (value: string) => {
    if (!value.trim()) {
      setCountryCodeSuggestions([]);
      return;
    }

    const filtered = filterCountryCodes(value, 5);

    setCountryCodeSuggestions(filtered);
  };

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
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
  const requiredIndicator = <span className="text-red-600">*</span>;
  const optionalIndicator = <span className="text-gray-500">(Optional)</span>;
  const errorClass = "mt-1 text-sm text-red-600";

  const getError = (field: FranchiseField) => combinedErrors[field];

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

      {/* First Name & Last Name */}
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
            maxLength={FRANCHISE_FIELD_LIMITS.firstName}
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
            maxLength={FRANCHISE_FIELD_LIMITS.lastName}
            className={inputClass}
            aria-invalid={Boolean(getError("lastName"))}
          />
          {getError("lastName") ? (
            <p className={errorClass}>{getError("lastName")}</p>
          ) : null}
        </div>
      </div>

      {/* Country Code & Phone */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="relative">
          <label className={labelClass} htmlFor="regionCode">
            Region code {requiredIndicator}
          </label>
          <input
            id="regionCode"
            name="regionCode"
            type="text"
            placeholder="e.g., AU +61 or Australia"
            required
            maxLength={FRANCHISE_FIELD_LIMITS.regionCode}
            className={inputClass}
            aria-invalid={Boolean(getError("regionCode"))}
            onChange={(e) => handleCountryCodeChange(e.currentTarget.value)}
          />
          {countryCodeSuggestions.length > 0 && (
            <ul className="absolute top-full left-0 right-0 z-10 border border-t-0 border-gray-300 bg-white shadow-sm">
              {countryCodeSuggestions.map((country) => (
                <li key={country.code}>
                  <button
                    type="button"
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 active:bg-gray-100"
                    onClick={(e) => {
                      e.preventDefault();
                      const regionCodeInput = document.getElementById(
                        "regionCode"
                      ) as HTMLInputElement | null;
                      if (regionCodeInput) {
                        regionCodeInput.value = formatCountryCode(country);
                        setCountryCodeSuggestions([]);
                        regionCodeInput.focus();
                      }
                    }}
                  >
                    {country.code} {country.dialCode} — {country.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
          {getError("regionCode") ? (
            <p className={errorClass}>{getError("regionCode")}</p>
          ) : null}
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            Phone {requiredIndicator}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="e.g., 400 123 456"
            required
            maxLength={FRANCHISE_FIELD_LIMITS.phone}
            className={inputClass}
            aria-invalid={Boolean(getError("phone"))}
          />
          {getError("phone") ? (
            <p className={errorClass}>{getError("phone")}</p>
          ) : null}
        </div>
      </div>

      {/* Preferred Contact Method & Email */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="preferredContactMethod">
            Preferred contact method {requiredIndicator}
          </label>
          <select
            id="preferredContactMethod"
            name="preferredContactMethod"
            required
            className={inputClass}
            aria-invalid={Boolean(getError("preferredContactMethod"))}
          >
            <option value="">Select a method</option>
            {CONTACT_METHODS.map((method) => (
              <option key={method} value={method}>
                {method.charAt(0).toUpperCase() + method.slice(1)}
              </option>
            ))}
          </select>
          {getError("preferredContactMethod") ? (
            <p className={errorClass}>{getError("preferredContactMethod")}</p>
          ) : null}
        </div>
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
            maxLength={FRANCHISE_FIELD_LIMITS.email}
            className={inputClass}
            aria-invalid={Boolean(getError("email"))}
          />
          {getError("email") ? (
            <p className={errorClass}>{getError("email")}</p>
          ) : null}
        </div>
      </div>

      {/* Concept Interest */}
      <div>
        <label className={labelClass} htmlFor="conceptInterest">
          Which concept are you interested in? {requiredIndicator}
        </label>
        <select
          id="conceptInterest"
          name="conceptInterest"
          required
          className={inputClass}
          aria-invalid={Boolean(getError("conceptInterest"))}
        >
          <option value="">Select a concept</option>
          {brands.map((brand) => (
            <option key={brand.name} value={brand.name}>
              {brand.name}
            </option>
          ))}
        </select>
        {getError("conceptInterest") ? (
          <p className={errorClass}>{getError("conceptInterest")}</p>
        ) : null}
      </div>

      {/* Preferred Location */}
      <div>
        <label className={labelClass} htmlFor="preferredLocation">
          Preferred location {requiredIndicator}
        </label>
        <select
          id="preferredLocation"
          name="preferredLocation"
          required
          className={inputClass}
          aria-invalid={Boolean(getError("preferredLocation"))}
        >
          <option value="">Select a state</option>
          {AUSTRALIAN_STATES.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        {getError("preferredLocation") ? (
          <p className={errorClass}>{getError("preferredLocation")}</p>
        ) : null}
      </div>

      {/* Liquid Assets & Full-time */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="hasLiquidAssets">
            Do you have at least AUD$400k in liquid assets? {requiredIndicator}
          </label>
          <div className="mt-2 space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="hasLiquidAssets"
                value="Yes"
                required
                className="h-4 w-4"
              />
              <span className="ml-2 text-sm text-gray-900">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="hasLiquidAssets"
                value="No"
                required
                className="h-4 w-4"
              />
              <span className="ml-2 text-sm text-gray-900">No</span>
            </label>
          </div>
          {getError("hasLiquidAssets") ? (
            <p className={errorClass}>{getError("hasLiquidAssets")}</p>
          ) : null}
        </div>
        <div>
          <label className={labelClass} htmlFor="canManageFullTime">
            Will you be able to manage your store full-time? {requiredIndicator}
          </label>
          <div className="mt-2 space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="canManageFullTime"
                value="Yes"
                required
                className="h-4 w-4"
              />
              <span className="ml-2 text-sm text-gray-900">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="canManageFullTime"
                value="No"
                required
                className="h-4 w-4"
              />
              <span className="ml-2 text-sm text-gray-900">No</span>
            </label>
          </div>
          {getError("canManageFullTime") ? (
            <p className={errorClass}>{getError("canManageFullTime")}</p>
          ) : null}
        </div>
      </div>

      {/* Referral Source */}
      <div>
        <label className={labelClass} htmlFor="referralSource">
          How did you find us? {optionalIndicator}
        </label>
        <textarea
          id="referralSource"
          name="referralSource"
          rows={3}
          maxLength={FRANCHISE_FIELD_LIMITS.referralSource}
          className={`${inputClass} resize-y`}
          aria-invalid={Boolean(getError("referralSource"))}
        />
        {getError("referralSource") ? (
          <p className={errorClass}>{getError("referralSource")}</p>
        ) : null}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <SubmitButton
          label="Start your journey?"
          loadingLabel="Submitting..."
        />
      </div>
    </form>
  );
}
