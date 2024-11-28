import {User} from "@/models/User";
import {Role} from "@/models/Role";

export type UsersState = {
    usersList: User[];
    rolesList: Role[];
}

export interface CreateUserData {
    name: string;
    email: string;
    phone: string;
    address?: string;
    role: string;
    password: string;
    passwordConfirmation: string;
    photo?: File | null | undefined;
}

export interface UpdateUserData {
    name: string;
    email: string;
    phone: string;
    address?: string;
    photo?: File | null;
}

export interface ChangeUserPswData {
    password: string;
    passwordConfirmation: string;
}

