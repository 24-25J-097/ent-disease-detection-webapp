import {SinusitisResultEnum} from "@/enums/sinusitis";

export interface SinusitisResult {
    isSinusitis:boolean;
    prediction: SinusitisResultEnum;
    label:string;
    suggestions:string;
    confidence_score?: number;
}

export interface SinusitisRequest {
    file: File;
}
