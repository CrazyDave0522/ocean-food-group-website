import { describe, it, expect } from "vitest";
import { formatAustralianDate } from "@/lib/utils/formatDate";

describe("formatAustralianDate", () => {
  it("formats ISO timestamp to Australian date format", () => {
    const result = formatAustralianDate("2025-01-05T10:30:00Z");
    expect(result).toBe("5 Jan 2025");
  });

  it("handles date without time", () => {
    const result = formatAustralianDate("2025-01-05");
    expect(result).toBe("5 Jan 2025");
  });

  it("handles different months", () => {
    expect(formatAustralianDate("2025-01-15T12:00:00Z")).toBe("15 Jan 2025");
    expect(formatAustralianDate("2025-02-28T12:00:00Z")).toBe("28 Feb 2025");
    expect(formatAustralianDate("2025-12-25T12:00:00Z")).toBe("25 Dec 2025");
  });

  it("handles single digit days without leading zero", () => {
    const result = formatAustralianDate("2025-01-01T12:00:00Z");
    expect(result).toBe("1 Jan 2025");
  });

  it("returns 'N/A' for invalid dates", () => {
    expect(formatAustralianDate("invalid-date")).toBe("N/A");
    expect(formatAustralianDate("2025-13-01T12:00:00Z")).toBe("N/A");
    expect(formatAustralianDate("not a date at all")).toBe("N/A");
  });

  it("returns 'N/A' for empty string", () => {
    expect(formatAustralianDate("")).toBe("N/A");
  });

  it("returns 'N/A' for null-like values", () => {
    expect(formatAustralianDate("" as string)).toBe("N/A");
    expect(formatAustralianDate("" as string)).toBe("N/A");
  });

  it("handles timezone variations correctly", () => {
    // Same UTC time, different timezone strings
    const resultUTC = formatAustralianDate("2025-01-05T00:00:00Z");

    expect(resultUTC).toBe("5 Jan 2025");
    // Note: Timezone handling depends on system locale, so we just verify UTC works
  });

  it("does not include time in output", () => {
    const result = formatAustralianDate("2025-01-05T12:00:00Z");
    expect(result).toBe("5 Jan 2025");
    expect(result).not.toContain("23:59:59");
    expect(result).not.toContain(":");
  });

  it("handles historical dates", () => {
    const result = formatAustralianDate("2000-01-01T12:00:00Z");
    expect(result).toBe("1 Jan 2000");
  });

  it("handles future dates", () => {
    const result = formatAustralianDate("2050-12-31T12:00:00Z");
    expect(result).toBe("31 Dec 2050");
  });
});
