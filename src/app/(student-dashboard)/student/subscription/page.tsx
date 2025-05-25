"use client";

import {motion} from "framer-motion";
import {useState} from "react";
import {
    AlertCircle,
    BookOpen,
    Calendar,
    Camera,
    Check,
    CreditCard,
    Download,
    MessageCircle,
    Settings,
    Shield,
    Sparkles,
    TrendingUp,
    Users,
    X,
} from "lucide-react";
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import {billingHistory, getUsageColor, getUsagePercentage, pricingTiers, usageData} from '@/data/student/subscription';
import {useSelector} from 'react-redux';

export default function SubscriptionPage() {

    const [currentPlan] = useState("free");
    const [billingPeriod, setBillingPeriod] = useState<"month" | "year">("month");
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"plans" | "usage" | "billing">("plans");

    const user = useSelector((state: any) => state.auth.user);

    const handleUpgrade = (planId: string) => {
        setSelectedPlan(planId);
        setShowUpgradeModal(true);
    };

    return (
        <div className="min-h-screen">
            <DashboardHeader user={user}/>

            <main className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-foreground mb-2">Subscription & Usage</h1>
                    <p className="text-muted-foreground">Manage your plan, track usage, and billing information</p>
                </motion.div>

                {/* Tab Navigation */}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6, delay: 0.1}}
                    className="mb-8"
                >
                    <div className="flex space-x-1 bg-muted/50 p-1 rounded-lg w-fit">
                        {[
                            {id: "plans", label: "Plans & Pricing", icon: CreditCard},
                            {id: "usage", label: "Usage & Limits", icon: TrendingUp},
                            {id: "billing", label: "Billing History", icon: Calendar},
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
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

                {/* Plans & Pricing Tab */}
                {activeTab === "plans" && (
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6}}
                        className="space-y-8"
                    >
                        {/* Current Plan Status */}
                        <div className="glass-card rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-foreground">Current Plan</h2>
                                <span
                                    className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-sm font-medium">
                  Active
                </span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl">
                                    <BookOpen className="w-6 h-6 text-white"/>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground">Student Free</h3>
                                    <p className="text-muted-foreground">Perfect for getting started with ENT
                                        learning</p>
                                </div>
                            </div>
                        </div>

                        {/* Billing Period Toggle */}
                        <div className="flex justify-center">
                            <div className="flex items-center space-x-4 bg-muted/50 p-1 rounded-lg">
                                <button
                                    onClick={() => setBillingPeriod("month")}
                                    className={`px-4 py-2 rounded-md transition-all duration-200 ${
                                        billingPeriod === "month"
                                            ? "bg-background text-foreground shadow-sm"
                                            : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    Monthly
                                </button>
                                <button
                                    onClick={() => setBillingPeriod("year")}
                                    className={`px-4 py-2 rounded-md transition-all duration-200 flex items-center space-x-2 ${
                                        billingPeriod === "year"
                                            ? "bg-background text-foreground shadow-sm"
                                            : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    <span>Yearly</span>
                                    <span
                                        className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">Save 20%</span>
                                </button>
                            </div>
                        </div>

                        {/* Pricing Cards */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {pricingTiers.map((tier, index) => (
                                <motion.div
                                    key={tier.id}
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.6, delay: index * 0.1}}
                                    className={`glass-card rounded-2xl p-6 relative overflow-hidden ${
                                        tier.popular ? "ring-2 ring-primary" : ""
                                    } ${currentPlan === tier.id ? "ring-2 ring-green-500" : ""}`}
                                >
                                    {tier.popular && (
                                        <div
                                            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                        Most Popular
                      </span>
                                        </div>
                                    )}

                                    {currentPlan === tier.id && (
                                        <div className="absolute top-4 right-4">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Current
                      </span>
                                        </div>
                                    )}

                                    <div className="text-center mb-6">
                                        <div
                                            className={`w-16 h-16 bg-gradient-to-r ${tier.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                                        >
                                            <tier.icon className="w-8 h-8 text-white"/>
                                        </div>
                                        <h3 className="text-xl font-bold text-foreground mb-2">{tier.name}</h3>
                                        <p className="text-muted-foreground text-sm mb-4">{tier.description}</p>
                                        <div className="flex items-baseline justify-center">
                      <span className="text-3xl font-bold text-foreground">
                        ${billingPeriod === "year" ? Math.round(tier.price * 12 * 0.8) : tier.price}
                      </span>
                                            <span
                                                className="text-muted-foreground ml-1">/{billingPeriod === "year" ? "year" : "month"}</span>
                                        </div>
                                        {billingPeriod === "year" && tier.price > 0 && (
                                            <p className="text-green-500 text-sm mt-1">Save
                                                ${Math.round(tier.price * 12 * 0.2)}/year</p>
                                        )}
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        {tier.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="flex items-start space-x-3">
                                                {feature.included ? (
                                                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"/>
                                                ) : (
                                                    <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5"/>
                                                )}
                                                <div className="flex-1">
                          <span
                              className={`text-sm ${
                                  feature.included ? "text-foreground" : "text-muted-foreground line-through"
                              }`}
                          >
                            {feature.name}
                          </span>
                                                    {feature.limit && (
                                                        <span
                                                            className="text-xs text-muted-foreground ml-2">({feature.limit})</span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => currentPlan !== tier.id && handleUpgrade(tier.id)}
                                        disabled={currentPlan === tier.id}
                                        className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                                            currentPlan === tier.id
                                                ? "bg-green-500/10 text-green-500 cursor-not-allowed"
                                                : tier.popular
                                                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                                    : "bg-muted hover:bg-muted/80 text-foreground"
                                        }`}
                                    >
                                        {currentPlan === tier.id ? "Current Plan" : tier.price === 0 ? "Current Plan" : "Upgrade"}
                                    </button>
                                </motion.div>
                            ))}
                        </div>

                        {/* Enterprise Section */}
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.6, delay: 0.4}}
                            className="glass-card rounded-2xl p-8 text-center"
                        >
                            <div
                                className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-white"/>
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-2">Enterprise & Institutions</h3>
                            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                                Custom solutions for medical schools, hospitals, and large organizations. Get volume
                                discounts, custom
                                integrations, and dedicated support.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 mb-6">
                <span className="flex items-center text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 mr-2"/>
                  HIPAA Compliant
                </span>
                                <span className="flex items-center text-sm text-muted-foreground">
                  <Users className="w-4 h-4 mr-2"/>
                  Bulk Licensing
                </span>
                                <span className="flex items-center text-sm text-muted-foreground">
                  <Settings className="w-4 h-4 mr-2"/>
                  Custom Integration
                </span>
                            </div>
                            <button
                                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-3 rounded-xl font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-200">
                                Contact Sales
                            </button>
                        </motion.div>
                    </motion.div>
                )}

                {/* Usage & Limits Tab */}
                {activeTab === "usage" && (
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6}}
                        className="space-y-6"
                    >
                        {/* Usage Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <motion.div
                                initial={{opacity: 0, scale: 0.95}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{duration: 0.6, delay: 0.1}}
                                className="glass-card rounded-2xl p-6"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                                        <Camera className="w-6 h-6 text-white"/>
                                    </div>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${getUsageColor(
                                            getUsagePercentage(usageData.current.dailyAnalyses, usageData.limits.dailyAnalyses),
                                        )}`}
                                    >
                    {getUsagePercentage(usageData.current.dailyAnalyses, usageData.limits.dailyAnalyses).toFixed(0)}%
                  </span>
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">Daily Analyses</h3>
                                <div className="flex items-baseline space-x-2 mb-3">
                                    <span
                                        className="text-2xl font-bold text-foreground">{usageData.current.dailyAnalyses}</span>
                                    <span className="text-muted-foreground">/ {usageData.limits.dailyAnalyses}</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <motion.div
                                        initial={{width: 0}}
                                        animate={{
                                            width: `${getUsagePercentage(usageData.current.dailyAnalyses, usageData.limits.dailyAnalyses)}%`,
                                        }}
                                        transition={{duration: 1, delay: 0.2}}
                                        className="bg-blue-500 h-2 rounded-full"
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                    Resets
                                    in {Math.ceil((usageData.resetDate.getTime() - Date.now()) / (1000 * 60 * 60))} hours
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{opacity: 0, scale: 0.95}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{duration: 0.6, delay: 0.2}}
                                className="glass-card rounded-2xl p-6"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                                        <TrendingUp className="w-6 h-6 text-white"/>
                                    </div>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${getUsageColor(
                                            getUsagePercentage(usageData.current.monthlyAnalyses, usageData.limits.monthlyAnalyses),
                                        )}`}
                                    >
                    {getUsagePercentage(usageData.current.monthlyAnalyses, usageData.limits.monthlyAnalyses).toFixed(0)}
                                        %
                  </span>
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">Monthly Analyses</h3>
                                <div className="flex items-baseline space-x-2 mb-3">
                                    <span
                                        className="text-2xl font-bold text-foreground">{usageData.current.monthlyAnalyses}</span>
                                    <span className="text-muted-foreground">/ {usageData.limits.monthlyAnalyses}</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <motion.div
                                        initial={{width: 0}}
                                        animate={{
                                            width: `${getUsagePercentage(usageData.current.monthlyAnalyses, usageData.limits.monthlyAnalyses)}%`,
                                        }}
                                        transition={{duration: 1, delay: 0.3}}
                                        className="bg-purple-500 h-2 rounded-full"
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">Resets monthly</p>
                            </motion.div>

                            <motion.div
                                initial={{opacity: 0, scale: 0.95}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{duration: 0.6, delay: 0.3}}
                                className="glass-card rounded-2xl p-6"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                                        <MessageCircle className="w-6 h-6 text-white"/>
                                    </div>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${getUsageColor(
                                            getUsagePercentage(usageData.current.aiChatMessages, usageData.limits.aiChatMessages),
                                        )}`}
                                    >
                    {getUsagePercentage(usageData.current.aiChatMessages, usageData.limits.aiChatMessages).toFixed(0)}%
                  </span>
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">AI Chat Messages</h3>
                                <div className="flex items-baseline space-x-2 mb-3">
                                    <span
                                        className="text-2xl font-bold text-foreground">{usageData.current.aiChatMessages}</span>
                                    <span className="text-muted-foreground">/ {usageData.limits.aiChatMessages}</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <motion.div
                                        initial={{width: 0}}
                                        animate={{
                                            width: `${getUsagePercentage(usageData.current.aiChatMessages, usageData.limits.aiChatMessages)}%`,
                                        }}
                                        transition={{duration: 1, delay: 0.4}}
                                        className="bg-green-500 h-2 rounded-full"
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">Resets daily</p>
                            </motion.div>

                            <motion.div
                                initial={{opacity: 0, scale: 0.95}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{duration: 0.6, delay: 0.4}}
                                className="glass-card rounded-2xl p-6"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                                        <BookOpen className="w-6 h-6 text-white"/>
                                    </div>
                                    <span
                                        className="px-2 py-1 rounded-full text-xs font-medium text-blue-500 bg-blue-500/10">
                    Unlimited
                  </span>
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">Conditions Studied</h3>
                                <div className="flex items-baseline space-x-2 mb-3">
                                    <span
                                        className="text-2xl font-bold text-foreground">{usageData.current.conditionsStudied}</span>
                                    <span className="text-muted-foreground">/ 50</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <motion.div
                                        initial={{width: 0}}
                                        animate={{width: `${(usageData.current.conditionsStudied / 50) * 100}%`}}
                                        transition={{duration: 1, delay: 0.5}}
                                        className="bg-orange-500 h-2 rounded-full"
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">Free tier limit</p>
                            </motion.div>
                        </div>

                        {/* Usage Warnings */}
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.6, delay: 0.5}}
                            className="space-y-4"
                        >
                            {getUsagePercentage(usageData.current.dailyAnalyses, usageData.limits.dailyAnalyses) >= 80 && (
                                <div className="glass-card rounded-2xl p-4 border border-yellow-500/20 bg-yellow-500/5">
                                    <div className="flex items-start space-x-3">
                                        <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5"/>
                                        <div>
                                            <h4 className="font-medium text-foreground">Daily Limit Warning</h4>
                                            <p className="text-sm text-muted-foreground">
                                                You're approaching your daily analysis limit. Consider upgrading to
                                                continue learning without
                                                interruption.
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleUpgrade("pro")}
                                            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium"
                                        >
                                            Upgrade
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>

                        {/* Upgrade Suggestion */}
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.6, delay: 0.6}}
                            className="glass-card rounded-2xl p-6"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                                        <Sparkles className="w-6 h-6 text-white"/>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">Unlock Unlimited Learning</h3>
                                        <p className="text-muted-foreground">
                                            Upgrade to Medical Pro for unlimited analyses and advanced features
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleUpgrade("pro")}
                                    className="bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors font-medium"
                                >
                                    Upgrade Now
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Billing History Tab */}
                {activeTab === "billing" && (
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6}}
                        className="space-y-6"
                    >
                        {/* Billing Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <motion.div
                                initial={{opacity: 0, scale: 0.95}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{duration: 0.6, delay: 0.1}}
                                className="glass-card rounded-2xl p-6"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                                        <CreditCard className="w-6 h-6 text-white"/>
                                    </div>
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">Current Plan</h3>
                                <p className="text-2xl font-bold text-foreground">Student Free</p>
                                <p className="text-sm text-muted-foreground">$0/month</p>
                            </motion.div>

                            <motion.div
                                initial={{opacity: 0, scale: 0.95}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{duration: 0.6, delay: 0.2}}
                                className="glass-card rounded-2xl p-6"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                                        <Calendar className="w-6 h-6 text-white"/>
                                    </div>
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">Next Billing</h3>
                                <p className="text-2xl font-bold text-foreground">N/A</p>
                                <p className="text-sm text-muted-foreground">Free plan</p>
                            </motion.div>

                            <motion.div
                                initial={{opacity: 0, scale: 0.95}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{duration: 0.6, delay: 0.3}}
                                className="glass-card rounded-2xl p-6"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                                        <TrendingUp className="w-6 h-6 text-white"/>
                                    </div>
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">Total Spent</h3>
                                <p className="text-2xl font-bold text-foreground">$0.00</p>
                                <p className="text-sm text-muted-foreground">All time</p>
                            </motion.div>
                        </div>

                        {/* Payment Method */}
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.6, delay: 0.4}}
                            className="glass-card rounded-2xl p-6"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-foreground">Payment Method</h2>
                                <button
                                    className="text-primary hover:text-primary/80 transition-colors text-sm font-medium">
                                    Add Payment Method
                                </button>
                            </div>
                            <div className="text-center py-8">
                                <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4"/>
                                <h3 className="font-medium text-foreground mb-2">No Payment Method</h3>
                                <p className="text-muted-foreground text-sm mb-4">Add a payment method to upgrade to a
                                    paid plan</p>
                                <button
                                    className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                                    Add Card
                                </button>
                            </div>
                        </motion.div>

                        {/* Billing History */}
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.6, delay: 0.5}}
                            className="glass-card rounded-2xl p-6"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-foreground">Billing History</h2>
                                <button
                                    className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium">
                                    <Download className="w-4 h-4"/>
                                    <span>Download All</span>
                                </button>
                            </div>

                            <div className="space-y-4">
                                {billingHistory.map((bill, index) => (
                                    <motion.div
                                        key={bill.id}
                                        initial={{opacity: 0, x: -20}}
                                        animate={{opacity: 1, x: 0}}
                                        transition={{duration: 0.6, delay: 0.6 + index * 0.1}}
                                        className="flex items-center justify-between p-4 bg-muted/50 rounded-xl"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="p-2 bg-green-500/10 rounded-lg">
                                                <Check className="w-4 h-4 text-green-500"/>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-foreground">{bill.plan}</h4>
                                                <p className="text-sm text-muted-foreground">{bill.date.toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span
                                                className="font-medium text-foreground">${bill.amount.toFixed(2)}</span>
                                            <button
                                                className="text-primary hover:text-primary/80 transition-colors text-sm">Download
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Upgrade Modal */}
                {showUpgradeModal && selectedPlan && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowUpgradeModal(false)}
                    >
                        <motion.div
                            initial={{opacity: 0, scale: 0.95}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.95}}
                            className="glass-card rounded-2xl p-8 max-w-md w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="text-center mb-6">
                                <div
                                    className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Sparkles className="w-8 h-8 text-white"/>
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">Upgrade to Medical Pro</h3>
                                <p className="text-muted-foreground">Unlock unlimited learning potential</p>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-center space-x-3">
                                    <Check className="w-5 h-5 text-green-500"/>
                                    <span className="text-foreground">Unlimited image analysis</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Check className="w-5 h-5 text-green-500"/>
                                    <span className="text-foreground">Access to all 200+ conditions</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Check className="w-5 h-5 text-green-500"/>
                                    <span className="text-foreground">Unlimited AI chat</span>
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setShowUpgradeModal(false)}
                                    className="flex-1 py-3 px-4 bg-muted text-foreground rounded-xl hover:bg-muted/80 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    className="flex-1 py-3 px-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors">
                                    Upgrade Now
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </main>
        </div>
    );
}
