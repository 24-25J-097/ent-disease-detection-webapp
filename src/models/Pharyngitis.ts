import {PharyngitisDiagnosisResult} from "@/types/service/PharyngitisDiagnosisData";

export interface Pharyngitis {
    _id: string;
    diagnosticianId?: string;
    patientId: string;
    additionalInformation?: string;
    throatImage: string;
    diagnosisResult?: PharyngitisDiagnosisResult;
    status?: "pending" | "diagnosed" | "failed";
    createdAt?: Date;
    updatedAt?: Date;
}
