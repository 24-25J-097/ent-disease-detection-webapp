export interface SinusitisDiagnosisResult {
    diagnosisId: string;
    isSinusitis: boolean;
    severity?: string;
    suggestions?: string;
    confidenceScore?: number;
    prediction?: "valid" | "invalid" | "N/A";
}

export interface SinusitisDiagnosisData {
    patientId: string;
    additionalInfo?: string;
    watersViewXrayImage: File;
    isLearningPurpose: boolean;
}

export interface SinusitisDiagnosisAcceptance {
    diagnosisId: string;
    accept: boolean;
}
