/**
 * Utility function to format ISO 8601 timestamps to Australian date format
 * Example: "2025-01-01T10:30:00Z" → "1 Jan 2025"
 */

export function formatAustralianDate(isoDate: string): string {
  if (!isoDate) {
    return "N/A";
  }

  try {
    const date = new Date(isoDate);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "N/A";
    }

    // Format using Intl.DateTimeFormat for Australian locale
    const formatter = new Intl.DateTimeFormat("en-AU", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    return formatter.format(date);
  } catch {
    return "N/A";
  }
}
