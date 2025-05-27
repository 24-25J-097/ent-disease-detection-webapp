import {SelectInputOption} from '@/types/FormInputs';


export type FiltersState = {
    patientsList: SelectInputOption[];
}

export type UserFilterData = {
    name?: string;
    phone?: string;
    email?: string;
    search?: string;
}
