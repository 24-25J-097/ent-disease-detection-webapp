export enum SinusitisResultEnum {
    valid = "valid",
    invalid = "invalid",
    mild = "mild",
    moderate = "moderate",
    severe = "severe",
    na = "N/A",
}

// Map enum values to their respective colors
export const predictionColors: { [key in SinusitisResultEnum]: string } = {
    [SinusitisResultEnum.valid]: "text-green-500",
    [SinusitisResultEnum.invalid]: "text-gray-500",
    [SinusitisResultEnum.mild]: "text-green-500",
    [SinusitisResultEnum.moderate]: "text-orange-500",
    [SinusitisResultEnum.severe]: "text-red-500",
    [SinusitisResultEnum.na]: "text-red-500",
};
// Map enum values to their respective colors
export const predictionText: { [key in SinusitisResultEnum]: string } = {
    [SinusitisResultEnum.valid]: "Valid Waters View XRay",
    [SinusitisResultEnum.invalid]: "Invalid Waters View XRay",
    [SinusitisResultEnum.mild]: "Healthy Or Not Serious Sinusitis",
    [SinusitisResultEnum.moderate]: "Moderate Sinusitis",
    [SinusitisResultEnum.severe]: "Severe Sinusitis",
    [SinusitisResultEnum.na]: "Severe Sinusitis",
};