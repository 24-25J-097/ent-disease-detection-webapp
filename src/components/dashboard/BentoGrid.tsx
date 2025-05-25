"use client";

import {motion} from "framer-motion";
import {
    BookOpen,
    Brain,
    Camera,
    CreditCard,
    History,
    MessageCircle,
    MessageSquare,
    Star,
    TrendingUp,
    Upload,
} from "lucide-react";
import {useState} from "react";
import {useRouter} from "next/navigation";

const gridItems = [
    {
        id: "ent-identification",
        title: "ENT Identification",
        description: "Upload medical images for AI-powered diagnosis and learning",
        icon: Camera,
        color: "from-blue-500 to-cyan-500",
        size: "medium",
        stats: "89% accuracy",
        route: "/student/identification",
    },
    {
        id: "explore-conditions",
        title: "Explore Medical Conditions",
        description: "Browse comprehensive ENT condition database",
        icon: BookOpen,
        color: "from-purple-500 to-pink-500",
        size: "medium",
        stats: "200+ conditions",
        route: "/student/conditions",
    },
    {
        id: "ai-teacher",
        title: "Chat with AI Teacher",
        description: "Get instant answers about ENT topics",
        icon: MessageCircle,
        color: "from-green-500 to-emerald-500",
        size: "medium",
        stats: "Available 24/7",
        route: "/student/chat",
    },
    {
        id: "learning-history",
        title: "My Learning History",
        description: "Track your progress and achievements",
        icon: History,
        color: "from-orange-500 to-red-500",
        size: "medium",
        stats: "78% complete",
        route: "/student/history",
    },
    {
        id: "subscription",
        title: "Subscription & Usage",
        description: "Manage your plan and usage",
        icon: CreditCard,
        color: "from-indigo-500 to-purple-500",
        size: "medium",
        stats: "5/10 daily uses",
        route: "/student/subscription",
    },
    {
        id: "feedback",
        title: "Submit Feedback",
        description: "Help us improve the platform",
        icon: MessageSquare,
        color: "from-teal-500 to-blue-500",
        size: "medium",
        stats: "Your voice matters",
        route: "/student/feedback",
    },
];

export default function BentoGrid() {

    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const router = useRouter();

    const getSizeClasses = (size: string) => {
        switch (size) {
            case "large":
                return "md:col-span-2 md:row-span-2";
            case "medium":
                return "md:col-span-2 md:row-span-1";
            case "small":
                return "md:col-span-1 md:row-span-1";
            default:
                return "md:col-span-1 md:row-span-1";
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-fr">
            {gridItems.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6, delay: index * 0.1}}
                    className={`${getSizeClasses(item.size)} group cursor-pointer`}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => router.push(item.route)}
                >
                    <motion.div
                        whileHover={{scale: 1.02, y: -5}}
                        whileTap={{scale: 0.98}}
                        className="h-full glass-card rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
                    >
                        {/* Background Gradient */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                        />

                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} shadow-lg`}>
                                    <item.icon className="w-6 h-6 text-white"/>
                                </div>
                                <div className="text-right">
                                    <span
                                        className="text-xs text-muted-foreground bg-blue-gray-900/50 px-2 py-1 rounded-full">{item.stats}</span>
                                </div>
                            </div>

                            {/* Title and Description */}
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                            </div>

                            {/* Footer */}
                            <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    {item.id === "ent-identification" && (
                                        <>
                                            <Upload className="w-4 h-4 text-muted-foreground"/>
                                            <span className="text-xs text-muted-foreground">Upload & Analyze</span>
                                        </>
                                    )}
                                    {item.id === "explore-conditions" && (
                                        <>
                                            <Brain className="w-4 h-4 text-muted-foreground"/>
                                            <span className="text-xs text-muted-foreground">Evidence-Based</span>
                                        </>
                                    )}
                                    {item.id === "ai-teacher" && (
                                        <>
                                            <MessageCircle className="w-4 h-4 text-muted-foreground"/>
                                            <span className="text-xs text-muted-foreground">Interactive Chat</span>
                                        </>
                                    )}
                                    {item.id === "learning-history" && (
                                        <>
                                            <TrendingUp className="w-4 h-4 text-muted-foreground"/>
                                            <span className="text-xs text-muted-foreground">Progress Tracking</span>
                                        </>
                                    )}
                                    {item.id === "subscription" && (
                                        <>
                                            <Star className="w-4 h-4 text-muted-foreground"/>
                                            <span className="text-xs text-muted-foreground">Premium Features</span>
                                        </>
                                    )}
                                    {item.id === "feedback" && (
                                        <>
                                            <MessageSquare className="w-4 h-4 text-muted-foreground"/>
                                            <span className="text-xs text-muted-foreground">Community Driven</span>
                                        </>
                                    )}
                                </div>

                                <motion.div
                                    animate={{x: hoveredItem === item.id ? 5 : 0}}
                                    transition={{duration: 0.2}}
                                    className="text-primary"
                                >
                                    →
                                </motion.div>
                            </div>
                        </div>

                        {/* Hover Effect */}
                        <motion.div
                            initial={{scale: 0, opacity: 0}}
                            animate={{
                                scale: hoveredItem === item.id ? 1 : 0,
                                opacity: hoveredItem === item.id ? 0.1 : 0,
                            }}
                            transition={{duration: 0.3}}
                            className={`absolute top-4 right-4 w-32 h-32 bg-gradient-to-br ${item.color} rounded-full blur-2xl`}
                        />
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
}
