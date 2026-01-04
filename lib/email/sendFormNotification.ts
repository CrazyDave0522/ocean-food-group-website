import { Resend } from "resend";

export interface FormNotificationParams {
    from: string;
    to: string;
    replyTo?: string;
    subject: string;
    text: string;
}

/**
 * Sends a notification email for form submissions (contact, franchise, etc.)
 * Uses Resend API for delivery.
 *
 * @param params - Email parameters including from, to, subject, and text content
 * @throws Will log error to console but doesn't throw; returns false on failure
 * @returns true if email sent successfully, false if error
 */
export async function sendFormNotification(
    params: FormNotificationParams,
): Promise<boolean> {
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
        console.error("RESEND_API_KEY is not configured");
        return false;
    }

    const resend = new Resend(resendApiKey);

    try {
        await resend.emails.send({
            from: params.from,
            to: params.to,
            replyTo: params.replyTo,
            subject: params.subject,
            text: params.text,
        });
        return true;
    } catch (error) {
        console.error("Failed to send form notification email:", error);
        return false;
    }
}
