export enum SinusitisResultEnum {
    valid = "valid",
    invalid = "invalid",
    mild = "mild",
    moderate = "moderate",
    severe = "severe",
}

// Map enum values to their respective colors
export const predictionColors: { [key in SinusitisResultEnum]: string } = {
    [SinusitisResultEnum.valid]: "bg-green-500 py-2",
    [SinusitisResultEnum.invalid]: "bg-gray-500 py-2",
    [SinusitisResultEnum.mild]: "bg-green-200 !text-black py-2",
    [SinusitisResultEnum.moderate]: "bg-orange-500 py-2",
    [SinusitisResultEnum.severe]: "bg-red-500 py-2",
};
// Map enum values to their respective colors
export const predictionText: { [key in SinusitisResultEnum]: string } = {
    [SinusitisResultEnum.valid]: "Valid Waters View XRay",
    [SinusitisResultEnum.invalid]: "Invalid Waters View XRay",
    [SinusitisResultEnum.mild]: "Healthy Or Not Serious Sinusitis",
    [SinusitisResultEnum.moderate]: "Moderate Sinusitis",
    [SinusitisResultEnum.severe]: "Severe Sinusitis",
};