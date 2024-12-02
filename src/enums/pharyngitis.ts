export enum PharyngitisResultEnum {
    valid = "valid",
    invalid = "invalid",
    normal = "normal",
    moderate = "moderate",
    tonsillitis = "tonsillitis",
}

// Map enum values to their respective colors
export const PharyngitisPredictionColors: { [key in PharyngitisResultEnum]: string } = {
    [PharyngitisResultEnum.valid]: "text-green-500",
    [PharyngitisResultEnum.invalid]: "text-gray-500",
    [PharyngitisResultEnum.normal]: "text-green-500",
    [PharyngitisResultEnum.moderate]: "text-orange-500",
    [PharyngitisResultEnum.tonsillitis]: "text-red-500",
};
// Map enum values to their respective colors
export const PharyngitisPredictionText: { [key in PharyngitisResultEnum]: string } = {
    [PharyngitisResultEnum.valid]: "Valid Throat image",
    [PharyngitisResultEnum.invalid]: "Invalid Throat image",
    [PharyngitisResultEnum.normal]: "Healthy Or Not Serious Pharyngitis",
    [PharyngitisResultEnum.moderate]: "Moderate Pharyngitis",
    [PharyngitisResultEnum.tonsillitis]: "Tonsillitis",
};