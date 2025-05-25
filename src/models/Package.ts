export interface Package {
    _id: string;
    id?: number | null;
    name: string;
    description: string;
    price: number;
    dailyRequestLimit: number;
    durationInDays: number; // in days
    isActive: boolean;
    isUnlimited: boolean;
    createdAt: string | null;
    updatedAt: string | null;
}