export interface PharyngitisDiagnosisResult {
    diagnosisId: string;
    isPharyngitis: boolean;
    stage?: string;
    suggestions?: string;
    confidenceScore?: number;
    prediction?: "valid" | "invalid" | "N/A";
}

export interface PharyngitisDiagnosisData {
    patientId: string;
    additionalInfo?: string;
    throatImage: File;
    isLearningPurpose: boolean;
}

export interface PharyngitisDiagnosisAcceptance {
    diagnosisId: string;
    accept: boolean;
}
