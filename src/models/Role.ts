import {Permission} from "@/models/Permission";

export interface Role {
    id: number;
    name: string;
    guard_name: string;
    created_at: string | null;
    updated_at: string | null;
    permissions: Permission[] | any[];
}
