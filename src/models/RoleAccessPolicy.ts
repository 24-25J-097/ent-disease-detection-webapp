import {Package} from './Package';
import {Role} from "@/enums/access";

export enum AccessPolicyType {
    UNLIMITED = 'unlimited',
    MUST_BUY_PACKAGE = 'must_buy_package'
}

export interface RoleAccessPolicy {
    _id: string;
    role?: Role;
    hasUnlimitedAccess?: boolean;
    requiresPackage?: boolean;
    description?: string;
    createdAt: string | null;
    updatedAt: string | null;
}