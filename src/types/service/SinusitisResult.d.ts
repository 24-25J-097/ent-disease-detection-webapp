import {SinusitisResultEnum} from "@/enums/sinusitis";

export interface SinusitisResult {
    prediction: SinusitisResultEnum;
    confidence_score?: number;
}

export interface SinusitisRequest {
    file: File;
}
