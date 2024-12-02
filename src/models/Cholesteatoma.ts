
export interface Cholesteatoma {
    _id: string;
    diagnosticianId?: string;
    patientId: string;
    additionalInformation?: string;
    endoscopyImage: string;
    diagnosisResult?: {
        isCholesteatoma?: boolean;
        stage?: string;
        suggestions?: string;
        confidenceScore?: number | "N/A";
        prediction?: "valid" | "invalid" | "N/A";
    };
    status?: "pending" | "diagnosed" | "failed";
    createdAt?: Date;
    updatedAt?: Date;
}
