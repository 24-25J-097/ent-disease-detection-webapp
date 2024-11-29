export interface DiagnosisResult {
    isCholesteatoma: boolean;
    stage?: string;
    suggestions?: string;
}

export interface CholesteatomaDiagnosisData {
    patientId: string;
    additionalInfo?: string;
    endoscopyImage: File;
}
