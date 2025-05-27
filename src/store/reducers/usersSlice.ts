import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from "@/models/User";
import {UsersState} from "@/types/service/Users";
import {Role} from "@/models/Role";

const initialState: UsersState = {
    usersList: [],
    rolesList: [],
    patientsList: [],
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.usersList = action.payload;
        },
        revalidateUsers: (state, action: PayloadAction<User>) => {
            const updatedUser = action.payload;
            const index = state.usersList.findIndex(user => user.id === updatedUser.id);

            if (index !== -1) {
                state.usersList[index] = updatedUser;
            } else {
                state.usersList.push(updatedUser);
            }
        },
        setRoles: (state, action: PayloadAction<Role[]>) => {
            state.rolesList = action.payload;
        },
    },
});

export const {
    setUsers,
    revalidateUsers,
    setRoles,
} = usersSlice.actions;

export default usersSlice.reducer;
