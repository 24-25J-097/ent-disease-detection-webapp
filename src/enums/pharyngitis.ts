export enum PharyngitisResultEnum {
    valid = "valid",
    invalid = "invalid",
    normal = "normal",
    moderate = "moderate",
    tonsillitis = "tonsillitis",
}

// Map enum values to their respective colors
export const PharyngitisPredictionColors: { [key in PharyngitisResultEnum]: string } = {
    [PharyngitisResultEnum.valid]: "bg-green-500 py-2",
    [PharyngitisResultEnum.invalid]: "bg-gray-500 py-2",
    [PharyngitisResultEnum.normal]: "bg-green-200 !text-black py-2",
    [PharyngitisResultEnum.moderate]: "bg-orange-500 py-2",
    [PharyngitisResultEnum.tonsillitis]: "bg-red-500 py-2",
};
// Map enum values to their respective colors
export const PharyngitisPredictionText: { [key in PharyngitisResultEnum]: string } = {
    [PharyngitisResultEnum.valid]: "Valid Throat image",
    [PharyngitisResultEnum.invalid]: "Invalid Throat image",
    [PharyngitisResultEnum.normal]: "Healthy Or Not Serious Pharyngitis",
    [PharyngitisResultEnum.moderate]: "Moderate Pharyngitis",
    [PharyngitisResultEnum.tonsillitis]: "Tonsillitis",
};