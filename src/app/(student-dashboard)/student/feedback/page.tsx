"use client";

import type React from "react";
import {useState} from "react";
import {motion} from "framer-motion";
import {
    Check,
    Heart,
    MessageSquare,
    Send,
    Settings,
    Shield,
    Star,
    ThumbsDown,
    ThumbsUp,
    Upload,
    X,
    Zap,
} from "lucide-react";
import StudentDashboardHeader from '@/components/dashboard/StudentDashboardHeader';
import {
    feedbackCategories,
    recentFeedback,
} from '@/data/student/feedback';
import {useSelector} from 'react-redux';

export default function FeedbackPage() {

    const [activeTab, setActiveTab] = useState<"submit" | "history">("submit");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [rating, setRating] = useState<number>(0);
    const [hoverRating, setHoverRating] = useState<number>(0);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<"low" | "medium" | "high" | "critical">("medium");
    const [attachments, setAttachments] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showQuickFeedback, setShowQuickFeedback] = useState(true);

    const user = useSelector((state: any) => state.auth.user);

    const handleFileUpload = (files: FileList | null) => {
        if (files) {
            const newFiles = Array.from(files).slice(0, 3 - attachments.length);
            setAttachments([...attachments, ...newFiles]);
        }
    };

    const removeAttachment = (index: number) => {
        setAttachments(attachments.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCategory || !title || !description) return;

        setIsSubmitting(true);

        // Simulate submission
        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccess(true);

            // Add notification
            // Reset form
            setSelectedCategory("");
            setRating(0);
            setTitle("");
            setDescription("");
            setPriority("medium");
            setAttachments([]);

            setTimeout(() => setShowSuccess(false), 3000);
        }, 2000);
    };

    const handleQuickFeedback = (type: "positive" | "negative") => {
        setShowQuickFeedback(false);
        // Handle quick feedback submission
        setTimeout(() => setShowQuickFeedback(true), 5000);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "submitted":
                return "text-foreground bg-blue-500/10 dark:bg-blue-500/20";
            case "in-review":
                return "text-foreground bg-yellow-500/10 dark:bg-yellow-500/20";
            case "resolved":
                return "text-foreground bg-green-500/10 dark:bg-green-500/20";
            case "closed":
                return "text-foreground bg-blue-gray-900";
            default:
                return "text-foreground bg-blue-gray-900";
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "low":
                return "text-foreground bg-green-500/10 dark:bg-green-500/20";
            case "medium":
                return "text-foreground bg-yellow-500/10 dark:bg-yellow-500/20";
            case "high":
                return "text-foreground bg-orange-500/10 dark:bg-orange-500/20";
            case "critical":
                return "text-foreground bg-red-500/10 dark:bg-red-500/20";
            default:
                return "text-foreground bg-blue-gray-900";
        }
    };

    const selectedCategoryData = feedbackCategories.find((cat) => cat.id === selectedCategory);

    return (
        <div className="min-h-screen">
            <StudentDashboardHeader user={user}/>

            <main className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-foreground mb-2">Feedback & Support</h1>
                    <p className="text-muted-foreground">
                        Help us improve ENT Insight by sharing your feedback and reporting issues
                    </p>
                </motion.div>

                {/* Quick Feedback Banner */}
                {showQuickFeedback && (
                    <motion.div
                        initial={{opacity: 0, y: -20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6}}
                        className="glass-card rounded-2xl p-6 mb-8 border border-primary/20 bg-primary/5"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-xl">
                                    <Heart className="w-6 h-6 text-primary-foreground"/>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">How was your experience today?</h3>
                                    <p className="text-muted-foreground text-sm">Your quick feedback helps us
                                        improve</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => handleQuickFeedback("positive")}
                                    className="flex items-center space-x-2 px-4 py-2 bg-green-500/10 dark:bg-green-500/20 text-foreground rounded-lg hover:bg-green-500/20 dark:hover:bg-green-500/30 transition-colors"
                                >
                                    <ThumbsUp className="w-4 h-4"/>
                                    <span>Great</span>
                                </button>
                                <button
                                    onClick={() => handleQuickFeedback("negative")}
                                    className="flex items-center space-x-2 px-4 py-2 bg-red-500/10 dark:bg-red-500/20 text-foreground rounded-lg hover:bg-red-500/20 dark:hover:bg-red-500/30 transition-colors"
                                >
                                    <ThumbsDown className="w-4 h-4"/>
                                    <span>Needs Work</span>
                                </button>
                                <button
                                    onClick={() => setShowQuickFeedback(false)}
                                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <X className="w-4 h-4"/>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Tab Navigation */}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6, delay: 0.1}}
                    className="mb-8"
                >
                    <div className="flex space-x-1 bg-blue-gray-900/50 p-1 rounded-lg w-fit">
                        {[
                            {id: "submit", label: "Submit Feedback", icon: MessageSquare},
                            {id: "history", label: "My Feedback", icon: Settings},
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as "submit" | "history")}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                                    activeTab === tab.id
                                        ? "bg-background text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                <tab.icon className="w-4 h-4"/>
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Submit Feedback Tab */}
                {activeTab === "submit" && (
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6}}
                        className="space-y-8"
                    >
                        {/* Category Selection */}
                        <div className="glass-card rounded-2xl p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-6">What would you like to
                                share?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {feedbackCategories.map((category, index) => (
                                    <motion.button
                                        key={category.id}
                                        initial={{opacity: 0, scale: 0.95}}
                                        animate={{opacity: 1, scale: 1}}
                                        transition={{duration: 0.6, delay: index * 0.1}}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`p-4 rounded-xl text-left transition-all duration-200 ${
                                            selectedCategory === category.id ? "ring-2 ring-primary bg-primary/5" : "hover:bg-blue-gray-900/50"
                                        }`}
                                    >
                                        <div className="flex items-start space-x-3">
                                            <div
                                                className={`p-2 bg-gradient-to-r ${category.color} rounded-lg flex-shrink-0`}>
                                                <category.icon className="w-5 h-5 text-primary-foreground"/>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-medium text-foreground mb-1">{category.name}</h3>
                                                <p className="text-sm text-muted-foreground">{category.description}</p>
                                                {category.type === "report" && (
                                                    <span
                                                        className="inline-flex items-center mt-2 px-2 py-1 bg-red-500/10 dark:bg-red-500/20 text-foreground rounded-full text-xs">
                            <Shield className="w-3 h-3 mr-1"/>
                            Report
                          </span>
                                                )}
                                            </div>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Feedback Form */}
                        {selectedCategory && (
                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.6}}
                                className="glass-card rounded-2xl p-6"
                            >
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className={`p-3 bg-gradient-to-r ${selectedCategoryData?.color} rounded-xl`}>
                                        {selectedCategoryData?.icon &&
                                            <selectedCategoryData.icon className="w-6 h-6 text-primary-foreground"/>}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-foreground">{selectedCategoryData?.name}</h2>
                                        <p className="text-muted-foreground">{selectedCategoryData?.description}</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Rating (for feedback categories) */}
                                    {selectedCategoryData?.type === "feedback" && (
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-3">
                                                Rate your experience (optional)
                                            </label>
                                            <div className="flex items-center space-x-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setRating(star)}
                                                        onMouseEnter={() => setHoverRating(star)}
                                                        onMouseLeave={() => setHoverRating(0)}
                                                        className="transition-colors"
                                                    >
                                                        <Star
                                                            className={`w-8 h-8 ${
                                                                star <= (hoverRating || rating)
                                                                    ? "text-primary fill-primary"
                                                                    : "text-muted-foreground"
                                                            }`}
                                                        />
                                                    </button>
                                                ))}
                                                {rating > 0 && (
                                                    <span className="ml-3 text-sm text-muted-foreground">
                            {rating === 1 && "Poor"}
                                                        {rating === 2 && "Fair"}
                                                        {rating === 3 && "Good"}
                                                        {rating === 4 && "Very Good"}
                                                        {rating === 5 && "Excellent"}
                          </span>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Priority (for reports) */}
                                    {selectedCategoryData?.type === "report" && (
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-3">Priority
                                                Level</label>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                {[
                                                    {value: "low", label: "Low", icon: "🟢"},
                                                    {value: "medium", label: "Medium", icon: "🟡"},
                                                    {value: "high", label: "High", icon: "🟠"},
                                                    {value: "critical", label: "Critical", icon: "🔴"},
                                                ].map((p) => (
                                                    <button
                                                        key={p.value}
                                                        type="button"
                                                        onClick={() => setPriority(p.value as "low" | "medium" | "high" | "critical")}
                                                        className={`p-3 rounded-lg text-center transition-all duration-200 ${
                                                            priority === p.value ? "ring-2 ring-primary bg-primary/5" : "bg-blue-gray-900/50 hover:bg-blue-gray-900"
                                                        }`}
                                                    >
                                                        <div className="text-lg mb-1">{p.icon}</div>
                                                        <div
                                                            className="text-sm font-medium text-foreground">{p.label}</div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Title */}
                                    <div>
                                        <label htmlFor="title"
                                               className="block text-sm font-medium text-foreground mb-2">
                                            Title *
                                        </label>
                                        <input
                                            id="title"
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="Brief summary of your feedback"
                                            className="w-full px-4 py-3 bg-blue-gray-900/50 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                                            required
                                        />
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label htmlFor="description"
                                               className="block text-sm font-medium text-foreground mb-2">
                                            Description *
                                        </label>
                                        <textarea
                                            id="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Please provide detailed information about your feedback or issue..."
                                            rows={6}
                                            className="w-full px-4 py-3 bg-blue-gray-900/50 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                                            required
                                        />
                                    </div>

                                    {/* File Attachments */}
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Attachments
                                            (optional)</label>
                                        <div className="space-y-3">
                                            <div
                                                className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                                                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2"/>
                                                <p className="text-sm text-muted-foreground mb-2">
                                                    Upload screenshots or files to help explain your feedback
                                                </p>
                                                <input
                                                    type="file"
                                                    multiple
                                                    accept="image/*,.pdf,.doc,.docx"
                                                    onChange={(e) => handleFileUpload(e.target.files)}
                                                    className="hidden"
                                                    id="file-upload"
                                                />
                                                <label
                                                    htmlFor="file-upload"
                                                    className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:bg-primary/90 transition-colors text-sm"
                                                >
                                                    Choose Files
                                                </label>
                                                <p className="text-xs text-muted-foreground mt-2">Max 3 files, 10MB
                                                    each</p>
                                            </div>

                                            {attachments.length > 0 && (
                                                <div className="space-y-2">
                                                    {attachments.map((file, index) => (
                                                        <div key={index}
                                                             className="flex items-center justify-between p-3 bg-blue-gray-900/50 rounded-lg">
                                                            <div className="flex items-center space-x-3">
                                                                <div className="p-2 bg-primary/10 rounded-lg">
                                                                    <Upload className="w-4 h-4 text-primary"/>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-medium text-foreground">{file.name}</p>
                                                                    <p className="text-xs text-muted-foreground">
                                                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeAttachment(index)}
                                                                className="p-1 text-muted-foreground hover:text-red-500 transition-colors"
                                                            >
                                                                <X className="w-4 h-4"/>
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex items-center justify-between pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedCategory("")}
                                            className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            Back
                                        </button>
                                        <motion.button
                                            type="submit"
                                            disabled={isSubmitting || !title || !description}
                                            whileHover={{scale: 1.02}}
                                            whileTap={{scale: 0.98}}
                                            className="flex items-center space-x-2 px-8 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div
                                                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                                                    <span>Submitting...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4"/>
                                                    <span>Submit Feedback</span>
                                                </>
                                            )}
                                        </motion.button>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {/* Feedback History Tab */}
                {activeTab === "history" && (
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6}}
                        className="space-y-6"
                    >
                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <motion.div
                                initial={{opacity: 0, scale: 0.95}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{duration: 0.6, delay: 0.1}}
                                className="glass-card rounded-2xl p-6"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-xl">
                                        <MessageSquare className="w-6 h-6 text-primary-foreground"/>
                                    </div>
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">Total Submitted</h3>
                                <p className="text-2xl font-bold text-foreground">{recentFeedback.length}</p>
                            </motion.div>

                            <motion.div
                                initial={{opacity: 0, scale: 0.95}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{duration: 0.6, delay: 0.2}}
                                className="glass-card rounded-2xl p-6"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-xl">
                                        <Check className="w-6 h-6 text-primary-foreground"/>
                                    </div>
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">Resolved</h3>
                                <p className="text-2xl font-bold text-foreground">
                                    {recentFeedback.filter((f) => f.status === "resolved").length}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{opacity: 0, scale: 0.95}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{duration: 0.6, delay: 0.3}}
                                className="glass-card rounded-2xl p-6"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-xl">
                                        <Zap className="w-6 h-6 text-primary-foreground"/>
                                    </div>
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">In Review</h3>
                                <p className="text-2xl font-bold text-foreground">
                                    {recentFeedback.filter((f) => f.status === "in-review").length}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{opacity: 0, scale: 0.95}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{duration: 0.6, delay: 0.4}}
                                className="glass-card rounded-2xl p-6"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-xl">
                                        <Star className="w-6 h-6 text-primary-foreground"/>
                                    </div>
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">Avg Rating</h3>
                                <p className="text-2xl font-bold text-foreground">
                                    {(
                                        recentFeedback.filter((f) => f.rating).reduce((sum, f) => sum + (f.rating || 0), 0) /
                                        recentFeedback.filter((f) => f.rating).length || 0
                                    ).toFixed(1)}
                                </p>
                            </motion.div>
                        </div>

                        {/* Feedback List */}
                        <div className="space-y-4">
                            {recentFeedback.map((feedback, index) => {
                                const category = feedbackCategories.find((cat) => cat.id === feedback.category);
                                return (
                                    <motion.div
                                        key={feedback.id}
                                        initial={{opacity: 0, y: 20}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{duration: 0.6, delay: index * 0.1}}
                                        className="glass-card rounded-2xl p-6"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-start space-x-4">
                                                <div
                                                    className={`p-3 bg-gradient-to-r ${category?.color} rounded-xl flex-shrink-0`}>
                                                    {category?.icon &&
                                                        <category.icon className="w-6 h-6 text-primary-foreground"/>}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-3 mb-2">
                                                        <h3 className="font-semibold text-foreground">{feedback.title}</h3>
                                                        {feedback.rating && (
                                                            <div className="flex items-center space-x-1">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <Star
                                                                        key={i}
                                                                        className={`w-4 h-4 ${
                                                                            i < feedback.rating! ? "text-primary fill-primary" : "text-muted-foreground"
                                                                        }`}
                                                                    />
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="text-muted-foreground text-sm mb-3">{feedback.description}</p>
                                                    <div
                                                        className="flex items-center space-x-4 text-xs text-muted-foreground">
                                                        <span>{feedback.submittedAt.toLocaleDateString()}</span>
                                                        <span className="capitalize">{category?.name}</span>
                                                        {feedback.priority && (
                                                            <span
                                                                className={`px-2 py-1 rounded-full ${getPriorityColor(feedback.priority)}`}>
                                {feedback.priority}
                              </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(feedback.status)}`}>
                        {feedback.status.replace("-", " ")}
                      </span>
                                        </div>

                                        {feedback.response && (
                                            <div className="mt-4 p-4 bg-blue-gray-900/50 rounded-xl">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <div
                                                        className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                                        <MessageSquare className="w-3 h-3 text-primary-foreground"/>
                                                    </div>
                                                    <span
                                                        className="text-sm font-medium text-foreground">Team Response</span>
                                                    <span className="text-xs text-muted-foreground">
                            {feedback.responseAt?.toLocaleDateString()}
                          </span>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{feedback.response}</p>
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>

                        {recentFeedback.length === 0 && (
                            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="text-center py-12">
                                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4"/>
                                <h3 className="text-lg font-semibold text-foreground mb-2">No feedback submitted
                                    yet</h3>
                                <p className="text-muted-foreground mb-4">Share your thoughts to help us improve the
                                    platform</p>
                                <button
                                    onClick={() => setActiveTab("submit")}
                                    className="bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors"
                                >
                                    Submit Feedback
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {/* Success Modal */}
                {showSuccess && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{opacity: 0, scale: 0.95}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.95}}
                            className="glass-card rounded-2xl p-8 max-w-md w-full text-center"
                        >
                            <div
                                className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                                <Check className="w-8 h-8 text-primary-foreground"/>
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">Feedback Submitted!</h3>
                            <p className="text-muted-foreground mb-6">
                                Thank you for your feedback. We'll review it and get back to you soon.
                            </p>
                            <button
                                onClick={() => setShowSuccess(false)}
                                className="bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors"
                            >
                                Continue
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </main>
        </div>
    );
}
