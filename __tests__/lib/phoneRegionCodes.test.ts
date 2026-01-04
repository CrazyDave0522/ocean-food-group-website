import { describe, it, expect } from "vitest";
import {
    filterCountryCodes,
    formatCountryCode,
    getCountryCodes,
    isValidCountryCodeInput,
} from "@/lib/country-codes/phoneRegionCodes";

describe("phone country codes provider", () => {
    it("provides maintained country codes for suggestions", () => {
        const matches = filterCountryCodes("Australia", 5);
        const australia = matches.find((c) => c.code === "AU");
        expect(australia).toBeDefined();
        expect(australia?.dialCode).toBe("+61");
    });

    it("validates known country code inputs", () => {
        expect(isValidCountryCodeInput("AU +61")).toBe(true);
        expect(isValidCountryCodeInput("CA +1")).toBe(true);
    });

    it("reduces dense overlays while keeping dial code accessible", () => {
        const plusOne = filterCountryCodes("+1", 5);
        expect(plusOne.length).toBeGreaterThanOrEqual(1);
        expect(plusOne.some((c) => c.dialCode === "+1")).toBe(true);

        const canada = filterCountryCodes("Canada", 5)[0];
        expect(canada.dialCode.startsWith("+1")).toBe(true);
        expect(isValidCountryCodeInput(formatCountryCode(canada))).toBe(true);
    });

    it("exposes lookup data for future consumers", () => {
        const all = getCountryCodes();
        expect(all.length).toBeGreaterThan(20);
        const gb = filterCountryCodes("United Kingdom", 5);
        expect(gb.some((c) => c.code === "GB" || c.codes.includes("GB"))).toBe(true);
    });

    it("strips localized parentheticals from names", () => {
        const afghanistan = filterCountryCodes("Afghanistan", 5)[0];
        expect(afghanistan.name).toBe("Afghanistan");
        expect(afghanistan.name.includes("(")).toBe(false);
    });
});
