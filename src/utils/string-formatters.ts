/**
 * Returns a string without extra spaces.
 * @param text - this will remove extra spaces from the given text field
 * @param removeAll - this will remove all the spaces from the given text field
 */
export const trimText = (text: string | number, removeAll = false): string | number => {
    if (!text) {
        return text;
    }
    if (removeAll) {
        return text.toString().replace(/\s+/g, '').trim();
    } else {
        return text.toString().replace(/ +/g, ' ').trim();
    }
}

/**
 * Returns a string with title case
 * @param text - The text to be converted to "Title Case".
 * @returns The converted "Title Case" string.
 */
export const toTitleCase = (text: string): string => {
    if (!text) {
        return text;
    }
    let modifiedText = text.replace(/[^a-zA-Z]+|(?=[A-Z])/g, ' ');
    return modifiedText
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    .trim();
}

/**
 * Returns a string with first word title case.
 * @param text - this will change the case to "Title case" from the given text, only first word
 */
export const toTitleCaseFirst = (text: string): string => {
    if (!text) {
        return text;
    }
    text = text.toString().toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Returns a string in kebab-case.
 * Converts any text to kebab-case by replacing non-alphanumeric characters with a hyphen.
 *
 * @param {string} text - The text to convert to kebab-case.
 * @returns {string} The converted text in kebab-case.
 */
export const toKebabCase = (text: string): string => {
    if (!text) {
        return text;
    }

    return text
        .toString()
        .trim()
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2') // Insert hyphen between camelCase or PascalCase words
        .replace(/[\s_.@*]+/g, '-')  // Replace spaces, underscores, dots, and other separators with hyphen
        .toLowerCase();  // Convert entire string to lowercase
};

/**
 * Converts any string to snake_case.
 * Handles camelCase, PascalCase, and any non-alphanumeric characters.
 *
 * @param {string} text - The input string that needs to be converted to snake_case.
 * @returns {string} The converted string in snake_case.
 */
export const toSnakeCase = (text: string): string => {
    if (!text) {
        return text;
    }

    return text
        .toString()
        .trim()
        .replace(/([a-z0-9])([A-Z])/g, '$1_$2')  // Convert camelCase or PascalCase to snake_case
        .replace(/[\s\W]+/g, '_')                // Replace spaces and non-alphanumeric characters with underscores
        .toLowerCase();
};


