import {BookOpen, Crown, Zap,} from "lucide-react";

export interface PricingTier {
    id: string;
    name: string;
    price: number;
    period: "month" | "year";
    description: string;
    icon: any;
    color: string;
    popular?: boolean;
    features: {
        name: string
        included: boolean
        limit?: string
    }[];
    limits: {
        dailyAnalyses: number
        monthlyAnalyses: number
        aiChatMessages: number
        conditionAccess: number | "unlimited"
        supportLevel: string
    };
}

export interface UsageData {
    current: {
        dailyAnalyses: number
        monthlyAnalyses: number
        aiChatMessages: number
        conditionsStudied: number
    };
    limits: {
        dailyAnalyses: number
        monthlyAnalyses: number
        aiChatMessages: number
    };
    resetDate: Date;
}

export const pricingTiers: PricingTier[] = [
    {
        id: "free",
        name: "Student Free",
        price: 0,
        period: "month",
        description: "Perfect for getting started with ENT learning",
        icon: BookOpen,
        color: "from-gray-500 to-gray-600",
        features: [
            {name: "Basic image analysis", included: true, limit: "5 per day"},
            {name: "Access to 50 conditions", included: true},
            {name: "AI chat support", included: true, limit: "20 messages/day"},
            {name: "Learning progress tracking", included: true},
            {name: "Basic achievements", included: true},
            {name: "Community support", included: true},
            {name: "Advanced analytics", included: false},
            {name: "Priority support", included: false},
            {name: "Offline access", included: false},
            {name: "Custom study plans", included: false},
        ],
        limits: {
            dailyAnalyses: 5,
            monthlyAnalyses: 150,
            aiChatMessages: 20,
            conditionAccess: 50,
            supportLevel: "Community",
        },
    },
    {
        id: "pro",
        name: "Medical Pro",
        price: 19,
        period: "month",
        description: "Enhanced features for serious medical students",
        icon: Zap,
        color: "from-blue-500 to-blue-600",
        popular: true,
        features: [
            {name: "Unlimited image analysis", included: true},
            {name: "Access to all 200+ conditions", included: true},
            {name: "Unlimited AI chat", included: true},
            {name: "Advanced progress analytics", included: true},
            {name: "All achievements & badges", included: true},
            {name: "Priority email support", included: true},
            {name: "Detailed case studies", included: true},
            {name: "Custom study plans", included: true},
            {name: "Offline access", included: false},
            {name: "1-on-1 expert sessions", included: false},
        ],
        limits: {
            dailyAnalyses: -1, // unlimited
            monthlyAnalyses: -1,
            aiChatMessages: -1,
            conditionAccess: "unlimited",
            supportLevel: "Priority Email",
        },
    },
    {
        id: "premium",
        name: "Academic Elite",
        price: 39,
        period: "month",
        description: "Complete solution for medical professionals",
        icon: Crown,
        color: "from-purple-500 to-purple-600",
        features: [
            {name: "Everything in Medical Pro", included: true},
            {name: "Offline mobile access", included: true},
            {name: "1-on-1 expert sessions", included: true, limit: "2 per month"},
            {name: "Advanced AI insights", included: true},
            {name: "Custom case uploads", included: true},
            {name: "White-label reports", included: true},
            {name: "API access", included: true},
            {name: "24/7 phone support", included: true},
            {name: "Early feature access", included: true},
            {name: "Institution licensing", included: true},
        ],
        limits: {
            dailyAnalyses: -1,
            monthlyAnalyses: -1,
            aiChatMessages: -1,
            conditionAccess: "unlimited",
            supportLevel: "24/7 Phone & Chat",
        },
    },
];

export const usageData: UsageData = {
    current: {
        dailyAnalyses: 3,
        monthlyAnalyses: 47,
        aiChatMessages: 12,
        conditionsStudied: 23,
    },
    limits: {
        dailyAnalyses: 5,
        monthlyAnalyses: 150,
        aiChatMessages: 20,
    },
    resetDate: new Date(Date.now() + 86400000 * 2), // 2 days from now
};

export const billingHistory = [
    {
        id: "1",
        date: new Date(Date.now() - 86400000 * 30),
        amount: 0,
        plan: "Student Free",
        status: "active",
        invoice: "INV-2024-001",
    },
    {
        id: "2",
        date: new Date(Date.now() - 86400000 * 60),
        amount: 0,
        plan: "Student Free",
        status: "active",
        invoice: "INV-2024-002",
    },
];

export const getUsagePercentage = (current: number, limit: number) => {
    if (limit === -1) return 0; // unlimited
    return Math.min((current / limit) * 100, 100);
};

export const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return "text-foreground bg-red-500/10 dark:bg-red-500/20";
    if (percentage >= 70) return "text-foreground bg-yellow-500/10 dark:bg-yellow-500/20";
    return "text-foreground bg-green-500/10 dark:bg-green-500/20";
};
