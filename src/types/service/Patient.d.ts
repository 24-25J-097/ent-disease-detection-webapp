
export interface PatientData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: string;
    dateOfBirth: string;
    gender: string;
}

// URL Patient Create => /api/doctor/patients <- payload PatientData
// URL Patient Get all => /api/doctor/patients
// URL Patient Get one => /api/doctor/patients/id -> res Patient Model
// etc.
