import {PharyngitisResultEnum} from "@/enums/pharyngitis";


export interface PharyngitisResult {
    isDiseased: boolean;
    prediction: PharyngitisResultEnum;
    label: string;
    suggestions: string;
    confidence_score?: number;
}

export interface PharyngitisRequest {
    file: File;
}
