import type React from "react";
import {BookOpen, Bug, Flag, Lightbulb, MessageCircle, MessageSquare,} from "lucide-react";

export interface FeedbackCategory {
    id: string;
    name: string;
    description: string;
    icon: React.ElementType;
    color: string;
    type: "feedback" | "report";
}

export interface FeedbackSubmission {
    id: string;
    category: string;
    rating?: number;
    title: string;
    description: string;
    attachments?: File[];
    priority: "low" | "medium" | "high" | "critical";
    status: "submitted" | "in-review" | "resolved" | "closed";
    submittedAt: Date;
    response?: string;
    responseAt?: Date;
}

export const feedbackCategories: FeedbackCategory[] = [
    {
        id: "general",
        name: "General Feedback",
        description: "Share your overall experience and suggestions",
        icon: MessageSquare,
        color: "from-blue-500 to-blue-600",
        type: "feedback",
    },
    {
        id: "feature-request",
        name: "Feature Request",
        description: "Suggest new features or improvements",
        icon: Lightbulb,
        color: "from-yellow-500 to-orange-500",
        type: "feedback",
    },
    {
        id: "bug-report",
        name: "Bug Report",
        description: "Report technical issues or errors",
        icon: Bug,
        color: "from-red-500 to-red-600",
        type: "report",
    },
    {
        id: "content-feedback",
        name: "Content Feedback",
        description: "Feedback on medical content accuracy",
        icon: BookOpen,
        color: "from-purple-500 to-purple-600",
        type: "feedback",
    },
    {
        id: "ai-feedback",
        name: "AI Performance",
        description: "Report AI analysis accuracy issues",
        icon: MessageCircle,
        color: "from-green-500 to-emerald-500",
        type: "feedback",
    },
    {
        id: "inappropriate-content",
        name: "Report Content",
        description: "Report inappropriate or harmful content",
        icon: Flag,
        color: "from-red-600 to-red-700",
        type: "report",
    },
];

export const recentFeedback: FeedbackSubmission[] = [
    {
        id: "1",
        category: "ai-feedback",
        rating: 4,
        title: "AI analysis was very helpful",
        description: "The sinusitis detection worked perfectly and helped me understand the condition better.",
        priority: "low",
        status: "resolved",
        submittedAt: new Date(Date.now() - 86400000 * 2),
        response: "Thank you for the positive feedback! We're glad our AI analysis helped with your learning.",
        responseAt: new Date(Date.now() - 86400000),
    },
    {
        id: "2",
        category: "feature-request",
        title: "Add more ENT conditions",
        description: "Would love to see more rare ENT conditions in the database, especially pediatric cases.",
        priority: "medium",
        status: "in-review",
        submittedAt: new Date(Date.now() - 86400000 * 5),
    },
    {
        id: "3",
        category: "bug-report",
        title: "Upload button not working",
        description: "Sometimes the image upload button doesn't respond on mobile devices.",
        priority: "high",
        status: "resolved",
        submittedAt: new Date(Date.now() - 86400000 * 7),
        response:
            "This issue has been fixed in our latest update. Please try again and let us know if you still experience problems.",
        responseAt: new Date(Date.now() - 86400000 * 3),
    },
];

