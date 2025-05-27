import {User} from './User';
import {Package} from './Package';


export interface RequestLogResponse {
    dateRange: {
        startDate: string;
        endDate: string;
    },
    totalRequests: number;
    dailySummary: {
        date: string;
        count: number;
    }[];
    data: RequestLog[];
}

export interface RequestLog {
    _id: string;
    user?: User;
    endpoint: string;
    method: string;
    statusCode: number;
    responseTime: number;
    userAgent: string;
    ip: string;
    timestamp: string;
    createdAt: string | null;
    updatedAt: string | null;
}


export interface UsageByUser {
    _id: string;
    count: number;
    endpoints: string[];
    userDetails: {
        _id: string;
        name: string;
        email: string;
        role: string;
    }
}

export interface UsageByRole {
    _id: string;
    count: number;
    endpoints: string[];
    roleDetails: {
        _id: string;
        role: string;
    }
}

export interface UsageByPackage {
    _id: string;
    count: number;
    endpoints: string[];
    packageDetails: {
        _id: string;
        name: string;
    }
}

export interface PackagePurchase {
    _id: string;
    startDate: string;
    endDate: string;
    transactionId: string;
    paymentMethod: string;
    paymentStatus: string;
    purchaseDate: string;
    userDetails: {
        name: string;
        email: string;
        role: string;
    },
    packageDetails: {
        name: string;
        price: number;
    }
}