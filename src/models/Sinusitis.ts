import {SinusitisDiagnosisResult} from "@/types/service/SinusitisDiagnosis";

export interface Sinusitis {
    _id: string;
    diagnosticianId?: string;
    patientId: string;
    additionalInformation?: string;
    watersViewXrayImage: string;
    diagnosisResult?: SinusitisDiagnosisResult;
    status?: "pending" | "diagnosed" | "failed";
    accepted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
