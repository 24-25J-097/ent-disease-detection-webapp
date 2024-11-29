import {DataObject} from "@/types/Utils";
import {toSnakeCase} from "@/utils/string-formatters";

/**
 * Converts an object with camelCase keys to an object with snake_case keys.
 *
 * @param {Object} obj - The input object with camelCase keys.
 * @param {boolean} removeEmptyFields - A flag to determine whether to remove fields with null or empty string values.
 * @returns {Object} The converted object with snake_case keys, with or without empty fields based on the flag.
 */
export function convertToAPIObj(obj: DataObject, removeEmptyFields = false): DataObject {

    const newObj: DataObject = {};
    for (const [key, value] of Object.entries(obj)) {
        const snakeKey = toSnakeCase(key);
        if (!removeEmptyFields || (value !== null && value !== '')) {
            newObj[snakeKey] = value;
        }
    }
    return newObj;
}


/**
 * Converts an object to a FormData object for use in HTTP requests.
 *
 * @param {DataObject} data - The input object containing form data.
 * This object can include both file and non-file fields.
 * @param {boolean} removeEmptyFields - A flag to determine whether to remove fields with null or empty string values.
 * @returns {FormData} The converted FormData object suitable for HTTP requests.
 */
export const convertToAPIFormData = (data: DataObject, removeEmptyFields = false): FormData => {

    const formData = new FormData();
    Object.keys(data).forEach(key => {
        const value = data[key];
        const snakeKey = toSnakeCase(key);
        if (!removeEmptyFields || (value !== null && value !== '')) {
            formData.append(snakeKey, value);
        }
    });
    return formData as FormData;
};
