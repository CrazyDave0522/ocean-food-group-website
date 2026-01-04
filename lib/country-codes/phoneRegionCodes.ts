import countryData from "country-telephone-data";

export type CountryCodeEntry = {
    code: string;
    codes: string[];
    dialCode: string;
    name: string;
    searchTerms: string[];
};

const NANPA_DIAL_CODE = "+1";

let cachedCountryCodes: CountryCodeEntry[] | null = null;

function ensurePlusPrefix(dialCode: string): string {
    if (!dialCode) return "";
    return dialCode.startsWith("+") ? dialCode : `+${dialCode}`;
}

function stripLocalizedName(name: string): string {
    const cleaned = name.replace(/\s*\([^)]*\)/g, "").trim();
    return cleaned || name;
}

function normalizeRawCountry(raw: unknown): CountryCodeEntry | null {
    // The package may export entries as arrays or objects. Support both shapes.
    if (Array.isArray(raw)) {
        const [name, iso2, dialCode] = raw as [string?, string?, string?];
        if (!name || !iso2 || !dialCode) return null;
        const cleanedName = stripLocalizedName(name);
        return {
            code: iso2.toUpperCase(),
            codes: [iso2.toUpperCase()],
            dialCode: ensurePlusPrefix(dialCode),
            name: cleanedName,
            searchTerms: [],
        };
    }

    if (typeof raw === "object" && raw !== null) {
        const maybe = raw as { name?: string; iso2?: string; dialCode?: string };
        if (!maybe.name || !maybe.iso2 || !maybe.dialCode) return null;
        const cleanedName = stripLocalizedName(maybe.name);
        return {
            code: maybe.iso2.toUpperCase(),
            codes: [maybe.iso2.toUpperCase()],
            dialCode: ensurePlusPrefix(maybe.dialCode),
            name: cleanedName,
            searchTerms: [],
        };
    }

    return null;
}

function buildCountryCodes(): CountryCodeEntry[] {
    if (cachedCountryCodes) {
        return cachedCountryCodes;
    }

    const rawList = (countryData as unknown as { allCountries?: unknown[] }).allCountries ?? countryData;
    const map = new Map<string, CountryCodeEntry>();

    if (Array.isArray(rawList)) {
        for (const raw of rawList) {
            const entry = normalizeRawCountry(raw);
            if (!entry || !entry.dialCode || !entry.code || !entry.name) continue;

            const dialCode = entry.dialCode;
            const key = dialCode === NANPA_DIAL_CODE ? NANPA_DIAL_CODE : dialCode;
            const existing = map.get(key);

            if (existing) {
                existing.codes.push(entry.code);
                existing.searchTerms.push(entry.code, entry.name.toUpperCase());
                continue;
            }

            map.set(key, {
                code: entry.code,
                codes: [entry.code],
                dialCode,
                name: entry.name,
                searchTerms: [entry.code, entry.name.toUpperCase(), dialCode],
            });
        }
    }

    cachedCountryCodes = Array.from(map.values()).sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
    );
    return cachedCountryCodes;
}

export function getCountryCodes(): CountryCodeEntry[] {
    return buildCountryCodes();
}

export function parseCountryCodeInput(input: string): { code: string; dialCode: string } | null {
    if (!input) return null;
    const match = input.trim().toUpperCase().match(/^([A-Z]{2})\s*\+(\d+)$/);
    if (!match) return null;
    return { code: match[1], dialCode: `+${match[2]}` };
}

export function isValidCountryCodeInput(input: string): boolean {
    const parsed = parseCountryCodeInput(input);
    if (!parsed) return false;

    const entry = getCountryCodes().find((c) => c.dialCode === parsed.dialCode);
    if (!entry) return false;

    return entry.codes.includes(parsed.code);
}

export function filterCountryCodes(query: string, limit = 5): CountryCodeEntry[] {
    const trimmed = query.trim();
    if (!trimmed) return [];
    const upper = trimmed.toUpperCase();

    const numericQuery = trimmed.replace(/[^\d+]/g, "");

    const normalizedNumericQuery = numericQuery ? ensurePlusPrefix(numericQuery.replace(/[^\d]/g, "")) : "";

    const matches = getCountryCodes().filter((entry) => {
        const dialMatch = normalizedNumericQuery
            ? entry.dialCode.startsWith(normalizedNumericQuery) || entry.dialCode.includes(normalizedNumericQuery)
            : entry.dialCode.includes(trimmed);
        const textMatch =
            entry.name.toUpperCase().includes(upper) ||
            entry.code.includes(upper) ||
            entry.searchTerms.some((term) => term.toUpperCase().includes(upper));
        return dialMatch || textMatch;
    });

    const scored = matches
        .map((entry) => {
            let score = 0;
            if (normalizedNumericQuery && entry.dialCode === normalizedNumericQuery) score += 3;
            else if (normalizedNumericQuery && entry.dialCode.startsWith(normalizedNumericQuery)) score += 2;
            if (upper && entry.code.startsWith(upper)) score += 1;
            return { entry, score };
        })
        .sort((a, b) => b.score - a.score || a.entry.name.localeCompare(b.entry.name));

    return scored.slice(0, limit).map((item) => item.entry);
}

export function formatCountryCode(entry: CountryCodeEntry): string {
    return `${entry.code} ${entry.dialCode}`;
}
