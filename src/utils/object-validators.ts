/**
 * Validates if all values in two objects are identical.
 *
 * @param {Record<string, any>} currentObj - The original object to compare.
 * @param {Record<string, any>} updatedObj - The updated object to compare against the original.
 * @returns {boolean} True if all values in both objects are the same, otherwise false.
 */
export function validateIsSameObjectValues(currentObj?: Record<string, any> | null, updatedObj?: Record<string, any> | null): boolean {

    if (!currentObj || !updatedObj) {
        return false;
    }

    return Object.keys(currentObj).every(key => {
        return currentObj[key] === updatedObj[key];
    });
}
