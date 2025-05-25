import {Role} from '@/enums/access';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    phone: string | null;
    phone_verified_at: string | null;
    address: string | null;
    address_verified_at: string | null;
    profile_photo_url: string | null;
    role: Role;
    permissions: [];
    status: string;
    direct_permissions: [];
    role_permissions: [];
    suspended_reason: string | null;
    suspended_at: string | null;
    deleted_at: string | null;
    created_at: string | null;
    updated_at: string | null;

    progress?: number;
    streak?: number;
}
