import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FiltersState} from '@/types/Filters';
import {SelectInputOption} from '@/types/FormInputs';

const initialState: FiltersState = {
    patientsList: [],
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilterPatients: (state, action: PayloadAction<SelectInputOption[]>) => {
            state.patientsList = action.payload;
        },
        revalidateFilterPatients: (state, action: PayloadAction<SelectInputOption[]>) => {
            const newPatients = action.payload;
            const uniquePatientsMap = new Map(
                [...state.patientsList, ...newPatients].map((patient) => [patient.value, patient])
            );
            state.patientsList = Array.from(uniquePatientsMap.values());
        },
    },
});

export const {
    setFilterPatients,
    revalidateFilterPatients,
} = filtersSlice.actions;

export default filtersSlice.reducer;
