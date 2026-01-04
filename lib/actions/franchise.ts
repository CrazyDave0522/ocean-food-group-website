"use server";

import {
    AUSTRALIAN_STATES,
    CONTACT_METHODS,
    FRANCHISE_FIELD_LIMITS,
    REQUIRED_FRANCHISE_FIELDS,
    type FranchiseField,
    type FranchiseFormState,
} from "@/lib/franchise/form";
import { getSupabaseServerClient } from "@/lib/supabase";
import { sendFormNotification } from "@/lib/email/sendFormNotification";

type FranchiseFormInput = {
    firstName: string;
    lastName: string;
    countryCode: string;
    phone: string;
    preferredContactMethod: string;
    email: string;
    conceptInterest: string;
    preferredLocation: string;
    hasLiquidAssets: string;
    canManageFullTime: string;
    referralSource: string;
};

function readField(formData: FormData, key: string): string {
    const value = formData.get(key);
    return typeof value === "string" ? value.trim() : "";
}

async function validateInput(formData: FormData): Promise<{
    data: FranchiseFormInput;
    errors: Partial<Record<FranchiseField, string>>;
}> {
    const data: FranchiseFormInput = {
        firstName: readField(formData, "firstName"),
        lastName: readField(formData, "lastName"),
        countryCode: readField(formData, "countryCode"),
        phone: readField(formData, "phone"),
        preferredContactMethod: readField(formData, "preferredContactMethod"),
        email: readField(formData, "email"),
        conceptInterest: readField(formData, "conceptInterest"),
        preferredLocation: readField(formData, "preferredLocation"),
        hasLiquidAssets: readField(formData, "hasLiquidAssets"),
        canManageFullTime: readField(formData, "canManageFullTime"),
        referralSource: readField(formData, "referralSource"),
    };

    const errors: Partial<Record<FranchiseField, string>> = {};

    // Check required fields
    for (const field of REQUIRED_FRANCHISE_FIELDS) {
        if (!data[field as keyof FranchiseFormInput]) {
            errors[field] = "This field is required.";
        }
    }

    // Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email && !emailPattern.test(data.email)) {
        errors.email = "Enter a valid email.";
    }

    // Country code format validation
    const countryCodePattern = /^[A-Z]{2}\s\+\d+$/;
    if (
        data.countryCode &&
        !countryCodePattern.test(data.countryCode.toUpperCase())
    ) {
        errors.countryCode = "Enter a valid country code.";
    }

    // Phone format validation - basic numeric + spaces/dashes
    if (data.phone && !/^[\d\s\-()]+$/.test(data.phone)) {
        errors.phone = "Enter a valid phone number.";
    }

    // Contact method validation
    if (
        data.preferredContactMethod &&
        !CONTACT_METHODS.includes(
            data.preferredContactMethod as (typeof CONTACT_METHODS)[number],
        )
    ) {
        errors.preferredContactMethod = "Please select a valid contact method.";
    }

    // Location validation
    if (
        data.preferredLocation &&
        !AUSTRALIAN_STATES.includes(
            data.preferredLocation as (typeof AUSTRALIAN_STATES)[number],
        )
    ) {
        errors.preferredLocation = "Please select a valid location.";
    }

    // Field length validation
    (Object.keys(FRANCHISE_FIELD_LIMITS) as FranchiseField[]).forEach(
        (field) => {
            const limit = FRANCHISE_FIELD_LIMITS[field];
            const value = data[field as keyof FranchiseFormInput];
            if (value && value.length > limit) {
                errors[field] = `Must be ${limit} characters or fewer.`;
            }
        },
    );

    // Validate concept against active brands from Supabase
    if (data.conceptInterest) {
        let supabase: ReturnType<typeof getSupabaseServerClient>;
        try {
            supabase = getSupabaseServerClient();
            const { data: brands, error } = await supabase
                .from("brand")
                .select("name")
                .eq("is_active", true);

            if (error) {
                errors.conceptInterest =
                    "Could not validate concept. Please try again.";
            } else {
                const validConcepts = brands.map((b) => b.name);
                if (!validConcepts.includes(data.conceptInterest)) {
                    errors.conceptInterest = "Please select a valid concept.";
                }
            }
        } catch {
            errors.conceptInterest =
                "Could not validate concept. Please try again.";
        }
    }

    return { data, errors };
}

function buildEmailText(payload: FranchiseFormInput): string {
    return [
        "New Franchise Inquiry",
        "",
        `First name: ${payload.firstName}`,
        `Last name: ${payload.lastName}`,
        `Country code: ${payload.countryCode}`,
        `Phone: ${payload.phone}`,
        `Preferred contact method: ${payload.preferredContactMethod}`,
        `Email: ${payload.email}`,
        `Interested concept: ${payload.conceptInterest}`,
        `Preferred location: ${payload.preferredLocation}`,
        `Has liquid assets (AUD$400k+): ${payload.hasLiquidAssets}`,
        `Can manage full-time: ${payload.canManageFullTime}`,
        `How they found us: ${payload.referralSource || "(not provided)"}`,
    ].join("\n");
}

export async function submitFranchiseInquiry(
    _prevState: FranchiseFormState,
    formData: FormData,
): Promise<FranchiseFormState> {
    const { data, errors } = await validateInput(formData);

    if (Object.keys(errors).length > 0) {
        return {
            status: "error",
            errors,
            message: "Please fix the highlighted fields.",
        };
    }

    let supabase: ReturnType<typeof getSupabaseServerClient>;
    try {
        supabase = getSupabaseServerClient();
    } catch (error) {
        console.error("Supabase client error", error);
        return {
            status: "error",
            message: "Service is not configured. Please try again later.",
        };
    }

    // Insert into franchise_inquiry table
    const { error: insertError } = await supabase
        .from("franchise_inquiry")
        .insert({
            first_name: data.firstName,
            last_name: data.lastName,
            country_code: data.countryCode,
            phone: data.phone,
            email: data.email,
            preferred_contact_method: data.preferredContactMethod,
            interested_brand: data.conceptInterest,
            preferred_state: data.preferredLocation,
            has_liquid_assets_400k: data.hasLiquidAssets === "Yes",
            can_manage_full_time: data.canManageFullTime === "Yes",
            referral_source: data.referralSource || null,
        });

    if (insertError) {
        console.error("Supabase insert error", insertError);
        return {
            status: "error",
            message: "Failed to submit application. Please try again.",
        };
    }

    // Send email notification
    const emailText = buildEmailText(data);
    const emailSubject = `New Franchise Inquiry — ${data.conceptInterest} — ${data.preferredLocation}`;

    const emailSent = await sendFormNotification({
        from: "franchise_inquiry@notify.oceanfoodgroup.com.au",
        to: "hello@oceanfoodgroup.com.au",
        replyTo: data.email,
        subject: emailSubject,
        text: emailText,
    });

    if (!emailSent) {
        console.warn("Email notification failed but form data was saved");
        return {
            status: "success",
            message:
                "Thank you for your application! We'll contact you if there are any issues.",
        };
    }

    return {
        status: "success",
        message: "Thank you! We'll be in touch soon.",
    };
}
