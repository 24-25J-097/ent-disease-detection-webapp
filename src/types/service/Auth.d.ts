import {User} from "@/models/User";

export interface AuthState {
    role: string | null;
    token: string | null;
    user: User | null;
    loading: boolean;
    error: string | null;
}

export interface UserLoginData {
    email: string;
    password: string;
    source?: number;
    signedUpAs?: string;
    remember?: boolean;
}

export interface UserSignUpData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    remember?: boolean;
}

export interface ForgotPswData {
    email: string;
}

export interface ResetPswData {
    email: string;
    token: string;
    otp: string;
    password: string;
    passwordConfirmation: string;
}


