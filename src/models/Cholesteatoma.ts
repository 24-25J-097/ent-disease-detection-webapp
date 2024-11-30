
export interface Cholesteatoma {
    id: number;
    diagnosticianId?: string;
    patientId: string;
    additionalInformation?: string;
    endoscopyImage: string;
    diagnosisResult?: {
        isCholesteatoma?: boolean;
        stage?: string;
        suggestions?: string;
    };
    status?: "pending" | "diagnosed" | "failed";
    createdAt?: Date;
    updatedAt?: Date;
}
