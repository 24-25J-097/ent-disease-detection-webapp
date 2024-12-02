export interface DiagnosisResult {
    diagnosisId: string;
    isCholesteatoma: boolean;
    stage?: string;
    suggestions?: string;
    confidenceScore?: number | "N/A";
    prediction?: "valid" | "invalid" | "N/A";
}

export interface CholesteatomaDiagnosisData {
    patientId: string;
    additionalInfo?: string;
    endoscopyImage: File;
}

export interface DiagnosisAcceptance {
    diagnosisId: string;
    accept: boolean;
}
