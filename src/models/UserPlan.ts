import {User} from './User';
import {Package} from './Package';

export interface UserPlan {
    _id: string;
    user_id?: string;
    user?: User;
    package_id?: string;
    package?: Package;
    startDate: string;
    endDate: string;
    isActive: boolean;
    usageToday: number;
    transactionId: string
    paymentMethod: string
    paymentStatus: string
    purchaseDate?: string
    createdAt: string | null;
    updatedAt: string | null;
}