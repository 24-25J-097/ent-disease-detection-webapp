import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthState} from "@/types/service/Auth";
import ServiceUtils from "@/services/api-service/ServiceUtils";
import {Role} from "@/enums/access";
import {User} from "@/models/User";

const initialState: AuthState = {
    role: null,
    token: null,
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setRole: (state, action: PayloadAction<Role>) => {
            const role = action.payload;
            state.role = role;
            ServiceUtils.setUserRole(role);
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            ServiceUtils.setAccessToken(action.payload);
        },
        clearUserSession: (state) => {
            state.role = null;
            state.token = null;
            state.user = null;
            ServiceUtils.logout();
        },
    },
});

export const {
    setRole,
    clearUserSession,
    setUser,
    setToken
} = authSlice.actions;

export default authSlice.reducer;
