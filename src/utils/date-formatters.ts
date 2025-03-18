import {text} from 'node:stream/consumers';

/**
 * Converts an ISO date string into a human-readable format.
 * The output format includes the full weekday, day, month, and year.
 *
 * @param isoDateStr - The ISO date string to be formatted (e.g., "2024-07-28T07:02:27.000000Z").
 * @returns The formatted date string in the format "Weekday, Month Day, Year" (e.g., "Sunday, July 28, 2024").
 */
export const formatToHumanReadableDate = (isoDateStr: string | null): string => {
    if (!isoDateStr) {
        return "";
    }
    const date = new Date(isoDateStr);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

/**
 * Converts an ISO date string into a human-readable format with specific time formatting.
 *
 * @param isoDateStr - The ISO date string to be formatted (e.g., "2024-07-28T07:02:27.000000Z").
 * @returns The formatted date and time string (e.g., "Jul 28, 2024, 07:02 AM").
 */
export const formatToShortDateTime = (isoDateStr: string | null): string => {
    if (!isoDateStr) {
        return "";
    }
    const date = new Date(isoDateStr);
    return date.toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};
