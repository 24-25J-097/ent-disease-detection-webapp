export interface CholesteatomaDiagnosisResult {
    diagnosisId: string;
    isCholesteatoma: boolean;
    stage?: string;
    suggestions?: string;
    confidenceScore?: number;
    prediction?: "valid" | "invalid" | "N/A";
}

export interface CholesteatomaDiagnosisData {
    patientId: string;
    additionalInfo?: string;
    endoscopyImage: File;
    isLearningPurpose: boolean;
}

export interface CholesteatomaDiagnosisAcceptance {
    diagnosisId: string;
    accept: boolean;
}
