"use server";

import { Resend } from "resend";

import {
  CONTACT_FIELD_LIMITS,
  REQUIRED_CONTACT_FIELDS,
  type ContactField,
  type ContactFormState,
} from "@/lib/contact/form";
import { getSupabaseServerClient } from "@/lib/supabase";

type ContactFormInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

function readField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function validateInput(formData: FormData): {
  data: ContactFormInput;
  errors: Partial<Record<ContactField, string>>;
} {
  const data: ContactFormInput = {
    firstName: readField(formData, "firstName"),
    lastName: readField(formData, "lastName"),
    email: readField(formData, "email"),
    phone: readField(formData, "phone"),
    subject: readField(formData, "subject"),
    message: readField(formData, "message"),
  };

  const errors: Partial<Record<ContactField, string>> = {};

  for (const field of REQUIRED_CONTACT_FIELDS) {
    if (!data[field]) {
      errors[field] = "This field is required.";
    }
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailPattern.test(data.email)) {
    errors.email = "Enter a valid email.";
  }

  (Object.keys(CONTACT_FIELD_LIMITS) as ContactField[]).forEach((field) => {
    const limit = CONTACT_FIELD_LIMITS[field];
    if (data[field] && data[field].length > limit) {
      errors[field] = `Must be ${limit} characters or fewer.`;
    }
  });

  return { data, errors };
}

function buildEmailText(payload: ContactFormInput) {
  return [
    "New contact inquiry",
    "",
    `First name: ${payload.firstName}`,
    `Last name: ${payload.lastName}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "(not provided)"}`,
    `Subject: ${payload.subject}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");
}

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const { data, errors } = validateInput(formData);

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

  const { error: insertError } = await supabase.from("contact_message").insert({
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    phone: data.phone || null,
    subject: data.subject,
    message: data.message,
  });

  if (insertError) {
    return {
      status: "error",
      message: "We could not save your message. Please try again shortly.",
    };
  }

  const recipient = process.env.CONTACT_INQUIRY_RECIPIENT;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!recipient || !resendApiKey) {
    return {
      status: "error",
      message: "Email delivery is not configured. Please try again later.",
    };
  }

  const resend = new Resend(resendApiKey);
  try {
    await resend.emails.send({
      from: "contact_inquiry@notify.oceanfoodgroup.com.au",
      to: recipient,
      replyTo: data.email,
      subject: `New contact inquiry: ${data.subject}`,
      text: buildEmailText(data),
    });
  } catch (error) {
    console.error("Resend email error", error);
    return {
      status: "error",
      message: "We saved your message but could not send email right now.",
    };
  }

  return {
    status: "success",
    message: "Thanks for reaching out. We received your message.",
  };
}