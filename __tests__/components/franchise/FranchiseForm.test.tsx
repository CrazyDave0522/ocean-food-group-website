import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FranchiseForm } from "@/components/franchise/FranchiseForm";

// Mock the server action
vi.mock("@/lib/actions/franchise", () => ({
  submitFranchiseInquiry: vi.fn(),
}));

import { submitFranchiseInquiry } from "@/lib/actions/franchise";

const mockSubmitFranchiseInquiry = submitFranchiseInquiry as ReturnType<
  typeof vi.fn
>;

describe("FranchiseForm", () => {
  beforeEach(() => {
    mockSubmitFranchiseInquiry.mockReset();
    mockSubmitFranchiseInquiry.mockResolvedValue({
      status: "idle",
      message: undefined,
      errors: undefined,
    });
  });

  it("renders form with all required fields", () => {
    render(<FranchiseForm />);

    expect(screen.getByLabelText(/First name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Region code/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Phone/)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Preferred contact method/)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Preferred location/)).toBeInTheDocument();
    // Radio buttons - check by role with specific names
    const radios = screen.getAllByRole("radio");
    expect(radios.length).toBeGreaterThanOrEqual(4); // At least 2 pairs of yes/no
    expect(screen.getByLabelText(/How did you find us/)).toBeInTheDocument();
  });

  it("renders submit button with correct label", () => {
    render(<FranchiseForm />);
    expect(
      screen.getByRole("button", { name: /Start your journey/ })
    ).toBeInTheDocument();
  });

  it("renders all australian states in location select", () => {
    render(<FranchiseForm />);

    const locationSelect = screen.getByLabelText(/Preferred location/);
    expect(locationSelect).toBeInTheDocument();
    expect(screen.getByText("NSW")).toBeInTheDocument();
    expect(screen.getByText("VIC")).toBeInTheDocument();
    expect(screen.getByText("QLD")).toBeInTheDocument();
    expect(screen.getByText("WA")).toBeInTheDocument();
  });

  it("renders contact method options", () => {
    render(<FranchiseForm />);

    const contactMethodSelect = screen.getByLabelText(
      /Preferred contact method/
    );
    expect(contactMethodSelect).toBeInTheDocument();
    expect(screen.getByText("Whatsapp")).toBeInTheDocument();
    expect(screen.getByText("Mobile")).toBeInTheDocument();
  });

  it("shows region code suggestions from maintained dataset", async () => {
    const user = userEvent.setup();
    render(<FranchiseForm />);

    const countryCodeInput = screen.getByLabelText(/Region code/);
    await user.type(countryCodeInput, "AUS");

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /AU \+61 — Australia/i })
      ).toBeInTheDocument();
    });
  });

  it("shows required indicator (*) on required fields", () => {
    render(<FranchiseForm />);

    // Check for asterisk indicators in labels
    const firstNameLabel =
      screen.getByLabelText(/First name/).parentElement?.textContent;
    expect(firstNameLabel).toContain("*");
  });

  it("shows optional indicator on referralSource", () => {
    render(<FranchiseForm />);

    const referralLabel =
      screen.getByLabelText(/How did you find us/).parentElement?.textContent;
    expect(referralLabel).toContain("Optional");
  });

  it("prevents submission with empty required fields", async () => {
    const user = userEvent.setup();
    render(<FranchiseForm />);

    const submitButton = screen.getByRole("button", {
      name: /Start your journey/,
    });
    await user.click(submitButton);

    // Should show client-side validation errors
    await waitFor(() => {
      const errors = screen.getAllByText("This field is required.");
      expect(errors.length).toBeGreaterThan(0);
    });

    // Should not have called server action
    expect(mockSubmitFranchiseInquiry).not.toHaveBeenCalled();
  });

  it("validates email format on client", async () => {
    const user = userEvent.setup();
    render(<FranchiseForm />);

    const firstNameInput = screen.getByLabelText(/First name/);
    const lastNameInput = screen.getByLabelText(/Last name/);
    const countryCodeInput = screen.getByLabelText(/Region code/);
    const phoneInput = screen.getByLabelText(/^Phone/);
    const contactMethodSelect = screen.getByLabelText(
      /Preferred contact method/
    );
    const emailInput = screen.getByLabelText(/Email/);
    const locationSelect = screen.getByLabelText(/Preferred location/);

    // Fill in all fields
    await user.type(firstNameInput, "John");
    await user.type(lastNameInput, "Doe");
    await user.type(countryCodeInput, "AU +61");
    await user.type(phoneInput, "400 123 456");
    await user.selectOptions(contactMethodSelect, "whatsapp");
    await user.type(emailInput, "invalid-email");
    await user.selectOptions(locationSelect, "NSW");

    // Select yes for radio buttons
    const yesRadios = screen.getAllByRole("radio", { name: "Yes" });
    await user.click(yesRadios[0]); // liquid assets
    await user.click(yesRadios[1]); // full-time

    const submitButton = screen.getByRole("button", {
      name: /Start your journey/,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Enter a valid email.")).toBeInTheDocument();
    });

    expect(mockSubmitFranchiseInquiry).not.toHaveBeenCalled();
  });

  it("validates region code format on client", async () => {
    const user = userEvent.setup();
    render(<FranchiseForm />);

    const firstNameInput = screen.getByLabelText(/First name/);
    const lastNameInput = screen.getByLabelText(/Last name/);
    const countryCodeInput = screen.getByLabelText(/Region code/);
    const phoneInput = screen.getByLabelText(/^Phone/);
    const contactMethodSelect = screen.getByLabelText(
      /Preferred contact method/
    );
    const emailInput = screen.getByLabelText(/Email/);
    const locationSelect = screen.getByLabelText(/Preferred location/);

    await user.type(firstNameInput, "John");
    await user.type(lastNameInput, "Doe");
    await user.type(countryCodeInput, "invalid123");
    await user.type(phoneInput, "400 123 456");
    await user.selectOptions(contactMethodSelect, "whatsapp");
    await user.type(emailInput, "john@example.com");
    await user.selectOptions(locationSelect, "NSW");

    const yesRadios = screen.getAllByRole("radio", { name: "Yes" });
    await user.click(yesRadios[0]);
    await user.click(yesRadios[1]);

    const submitButton = screen.getByRole("button", {
      name: /Start your journey/,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Enter a valid region code.")
      ).toBeInTheDocument();
    });

    expect(mockSubmitFranchiseInquiry).not.toHaveBeenCalled();
  });

  it("submits form with valid data", async () => {
    const user = userEvent.setup();
    mockSubmitFranchiseInquiry.mockResolvedValueOnce({
      status: "success",
      message: "Thank you! We'll be in touch soon.",
      errors: undefined,
    });

    render(<FranchiseForm />);

    const firstNameInput = screen.getByLabelText(/First name/);
    const lastNameInput = screen.getByLabelText(/Last name/);
    const countryCodeInput = screen.getByLabelText(/Region code/);
    const phoneInput = screen.getByLabelText(/^Phone/);
    const contactMethodSelect = screen.getByLabelText(
      /Preferred contact method/
    );
    const emailInput = screen.getByLabelText(/Email/);
    const locationSelect = screen.getByLabelText(/Preferred location/);
    const referralInput = screen.getByLabelText(/How did you find us/);

    await user.type(firstNameInput, "John");
    await user.type(lastNameInput, "Doe");
    await user.type(countryCodeInput, "AU +61");
    await user.type(phoneInput, "400 123 456");
    await user.selectOptions(contactMethodSelect, "whatsapp");
    await user.type(emailInput, "john@example.com");
    await user.selectOptions(locationSelect, "NSW");
    await user.type(referralInput, "Google Search");

    const yesRadios = screen.getAllByRole("radio", { name: "Yes" });
    await user.click(yesRadios[0]);
    await user.click(yesRadios[1]);

    const submitButton = screen.getByRole("button", {
      name: /Start your journey/,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSubmitFranchiseInquiry).toHaveBeenCalled();
    });
  });

  it("displays success message from server", async () => {
    const user = userEvent.setup();
    mockSubmitFranchiseInquiry.mockResolvedValueOnce({
      status: "success",
      message: "Thank you! We'll be in touch soon.",
      errors: undefined,
    });

    render(<FranchiseForm />);

    const firstNameInput = screen.getByLabelText(/First name/);
    const lastNameInput = screen.getByLabelText(/Last name/);
    const countryCodeInput = screen.getByLabelText(/Region code/);
    const phoneInput = screen.getByLabelText(/^Phone/);
    const contactMethodSelect = screen.getByLabelText(
      /Preferred contact method/
    );
    const emailInput = screen.getByLabelText(/Email/);
    const locationSelect = screen.getByLabelText(/Preferred location/);

    await user.type(firstNameInput, "John");
    await user.type(lastNameInput, "Doe");
    await user.type(countryCodeInput, "AU +61");
    await user.type(phoneInput, "400 123 456");
    await user.selectOptions(contactMethodSelect, "whatsapp");
    await user.type(emailInput, "john@example.com");
    await user.selectOptions(locationSelect, "NSW");

    const yesRadios = screen.getAllByRole("radio", { name: "Yes" });
    await user.click(yesRadios[0]);
    await user.click(yesRadios[1]);

    const submitButton = screen.getByRole("button", {
      name: /Start your journey/,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Thank you! We'll be in touch soon.")
      ).toBeInTheDocument();
    });
  });

  it("displays server validation errors", async () => {
    const user = userEvent.setup();
    mockSubmitFranchiseInquiry.mockResolvedValueOnce({
      status: "error",
      message: "Please fix the highlighted fields.",
      errors: {
        preferredLocation: "Please select a valid location.",
      },
    });

    render(<FranchiseForm />);

    const firstNameInput = screen.getByLabelText(/First name/);
    const lastNameInput = screen.getByLabelText(/Last name/);
    const countryCodeInput = screen.getByLabelText(/Region code/);
    const phoneInput = screen.getByLabelText(/^Phone/);
    const contactMethodSelect = screen.getByLabelText(
      /Preferred contact method/
    );
    const emailInput = screen.getByLabelText(/Email/);
    const locationSelect = screen.getByLabelText(/Preferred location/);

    await user.type(firstNameInput, "John");
    await user.type(lastNameInput, "Doe");
    await user.type(countryCodeInput, "AU +61");
    await user.type(phoneInput, "400 123 456");
    await user.selectOptions(contactMethodSelect, "whatsapp");
    await user.type(emailInput, "john@example.com");
    await user.selectOptions(locationSelect, "NSW");

    const yesRadios = screen.getAllByRole("radio", { name: "Yes" });
    await user.click(yesRadios[0]);
    await user.click(yesRadios[1]);

    const submitButton = screen.getByRole("button", {
      name: /Start your journey/,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Please select a valid location.")
      ).toBeInTheDocument();
    });
  });

  it("resets form on successful submission", async () => {
    const user = userEvent.setup();
    mockSubmitFranchiseInquiry.mockResolvedValueOnce({
      status: "success",
      message: "Thank you! We'll be in touch soon.",
      errors: undefined,
    });

    render(<FranchiseForm />);

    const firstNameInput = screen.getByLabelText(
      /First name/
    ) as HTMLInputElement;
    const lastNameInput = screen.getByLabelText(
      /Last name/
    ) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/Email/) as HTMLInputElement;
    const countryCodeInput = screen.getByLabelText(
      /Region code/,
    ) as HTMLInputElement;
    const phoneInput = screen.getByLabelText(/^Phone/) as HTMLInputElement;
    const contactMethodSelect = screen.getByLabelText(
      /Preferred contact method/
    ) as HTMLSelectElement;
    const locationSelect = screen.getByLabelText(
      /Preferred location/
    ) as HTMLSelectElement;

    await user.type(firstNameInput, "John");
    await user.type(lastNameInput, "Doe");
    await user.type(countryCodeInput, "AU +61");
    await user.type(phoneInput, "400 123 456");
    await user.selectOptions(contactMethodSelect, "whatsapp");
    await user.type(emailInput, "john@example.com");
    await user.selectOptions(locationSelect, "NSW");

    const yesRadios = screen.getAllByRole("radio", { name: "Yes" });
    await user.click(yesRadios[0]);
    await user.click(yesRadios[1]);

    const submitButton = screen.getByRole("button", {
      name: /Start your journey/,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(firstNameInput.value).toBe("");
      expect(lastNameInput.value).toBe("");
      expect(emailInput.value).toBe("");
      expect(countryCodeInput.value).toBe("");
    });
  });

  it("allows optional referralSource to be empty", async () => {
    const user = userEvent.setup();
    mockSubmitFranchiseInquiry.mockResolvedValueOnce({
      status: "success",
      message: "Thank you! We'll be in touch soon.",
      errors: undefined,
    });

    render(<FranchiseForm />);

    const firstNameInput = screen.getByLabelText(/First name/);
    const lastNameInput = screen.getByLabelText(/Last name/);
    const countryCodeInput = screen.getByLabelText(/Region code/);
    const phoneInput = screen.getByLabelText(/^Phone/);
    const contactMethodSelect = screen.getByLabelText(
      /Preferred contact method/
    );
    const emailInput = screen.getByLabelText(/Email/);
    const locationSelect = screen.getByLabelText(/Preferred location/);
    const referralInput = screen.getByLabelText(
      /How did you find us/
    ) as HTMLTextAreaElement;

    // Don't fill in referralSource field
    await user.type(firstNameInput, "John");
    await user.type(lastNameInput, "Doe");
    await user.type(countryCodeInput, "AU +61");
    await user.type(phoneInput, "400 123 456");
    await user.selectOptions(contactMethodSelect, "whatsapp");
    await user.type(emailInput, "john@example.com");
    await user.selectOptions(locationSelect, "NSW");

    const yesRadios = screen.getAllByRole("radio", { name: "Yes" });
    await user.click(yesRadios[0]);
    await user.click(yesRadios[1]);

    expect(referralInput.value).toBe("");

    const submitButton = screen.getByRole("button", {
      name: /Start your journey/,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSubmitFranchiseInquiry).toHaveBeenCalled();
    });
  });
});
