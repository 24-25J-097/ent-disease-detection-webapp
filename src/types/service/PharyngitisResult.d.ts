import {PharyngitisResultEnum} from "@/enums/pharyngitis";


export interface PharyngitisResult {
    prediction: PharyngitisResultEnum;
    confidence_score?: number;
}

export interface PharyngitisRequest {
    file: File;
}
