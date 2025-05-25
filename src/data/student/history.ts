import {BookOpen, Brain, Camera, Eye, MessageCircle, Target, Zap,} from "lucide-react";

export interface LearningSession {
    id: string;
    type: "identification" | "condition" | "chat" | "quiz";
    title: string;
    date: Date;
    duration: number;
    score?: number;
    accuracy?: number;
    status: "completed" | "in-progress" | "failed";
    details: string;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: any;
    category: "streak" | "accuracy" | "volume" | "special";
    unlockedAt: Date;
    rarity: "common" | "rare" | "epic" | "legendary";
    progress?: number;
    maxProgress?: number;
}

export const learningHistory: LearningSession[] = [
    {
        id: "1",
        type: "identification",
        title: "Acute Sinusitis Analysis",
        date: new Date(Date.now() - 86400000),
        duration: 12,
        score: 87,
        accuracy: 89,
        status: "completed",
        details: "Successfully identified sinusitis with 89% AI confidence",
    },
    {
        id: "2",
        type: "condition",
        title: "Cholesteatoma Study",
        date: new Date(Date.now() - 172800000),
        duration: 8,
        status: "completed",
        details: "Completed comprehensive study of cholesteatoma pathology",
    },
    {
        id: "3",
        type: "chat",
        title: "ENT Anatomy Discussion",
        date: new Date(Date.now() - 259200000),
        duration: 15,
        status: "completed",
        details: "Interactive Q&A session about ear anatomy and physiology",
    },
    {
        id: "4",
        type: "identification",
        title: "Otitis Media Detection",
        date: new Date(Date.now() - 345600000),
        duration: 10,
        score: 92,
        accuracy: 94,
        status: "completed",
        details: "Excellent identification of otitis media characteristics",
    },
    {
        id: "5",
        type: "quiz",
        title: "ENT Fundamentals Quiz",
        date: new Date(Date.now() - 432000000),
        duration: 20,
        score: 78,
        status: "completed",
        details: "Scored 78% on comprehensive ENT knowledge assessment",
    },
];

export const achievements: Achievement[] = [
    {
        id: "1",
        title: "First Steps",
        description: "Complete your first image analysis",
        icon: Camera,
        category: "volume",
        unlockedAt: new Date(Date.now() - 432000000),
        rarity: "common",
    },
    {
        id: "2",
        title: "Streak Master",
        description: "Maintain a 7-day learning streak",
        icon: Zap,
        category: "streak",
        unlockedAt: new Date(Date.now() - 259200000),
        rarity: "rare",
    },
    {
        id: "3",
        title: "Eagle Eye",
        description: "Achieve 90%+ accuracy on 5 identifications",
        icon: Eye,
        category: "accuracy",
        unlockedAt: new Date(Date.now() - 172800000),
        rarity: "epic",
    },
    {
        id: "4",
        title: "Knowledge Seeker",
        description: "Study 10 different ENT conditions",
        icon: BookOpen,
        category: "volume",
        unlockedAt: new Date(Date.now() - 86400000),
        rarity: "common",
    },
    {
        id: "5",
        title: "AI Whisperer",
        description: "Have 50+ conversations with AI teacher",
        icon: Brain,
        category: "volume",
        unlockedAt: new Date(),
        rarity: "legendary",
        progress: 47,
        maxProgress: 50,
    },
];

export const weeklyData = [
    {day: "Mon", sessions: 3, minutes: 45},
    {day: "Tue", sessions: 2, minutes: 30},
    {day: "Wed", sessions: 4, minutes: 60},
    {day: "Thu", sessions: 1, minutes: 15},
    {day: "Fri", sessions: 3, minutes: 40},
    {day: "Sat", sessions: 2, minutes: 25},
    {day: "Sun", sessions: 1, minutes: 20},
];

// Helper functions
export const getSessionIcon = (type: string) => {
    switch (type) {
        case "identification":
            return Camera;
        case "condition":
            return BookOpen;
        case "chat":
            return MessageCircle;
        case "quiz":
            return Target;
        default:
            return BookOpen;
    }
};

export const getSessionColor = (type: string) => {
    switch (type) {
        case "identification":
            return "from-blue-500 to-cyan-500";
        case "condition":
            return "from-purple-500 to-pink-500";
        case "chat":
            return "from-green-500 to-emerald-500";
        case "quiz":
            return "from-orange-500 to-red-500";
        default:
            return "from-gray-500 to-gray-600";
    }
};

export const getStatusColor = (status: string) => {
    switch (status) {
        case "completed":
            return "text-foreground bg-green-500/10 dark:bg-green-500/20";
        case "in-progress":
            return "text-foreground bg-yellow-500/10 dark:bg-yellow-500/20";
        case "failed":
            return "text-foreground bg-red-500/10 dark:bg-red-500/20";
        default:
            return "text-foreground bg-muted";
    }
};

export const getRarityColor = (rarity: string) => {
    switch (rarity) {
        case "common":
            return "from-gray-500 to-gray-600";
        case "rare":
            return "from-blue-500 to-blue-600";
        case "epic":
            return "from-purple-500 to-purple-600";
        case "legendary":
            return "from-yellow-500 to-orange-500";
        default:
            return "from-gray-500 to-gray-600";
    }
};
