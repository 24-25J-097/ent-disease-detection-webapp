"use client";

import {motion} from "framer-motion";
import {useState} from "react";
import {
    BarChart3,
    BookOpen,
    Calendar,
    CheckCircle,
    Clock,
    Download,
    Filter,
    Star,
    Target,
    TrendingUp,
    Trophy,
    Zap,
} from "lucide-react";
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import {
    achievements,
    getRarityColor,
    getSessionColor,
    getSessionIcon,
    getStatusColor,
    learningHistory,
    weeklyData
} from '@/data/student/history';
import {useSelector} from 'react-redux';

export default function HistoryPage() {

    const [activeTab, setActiveTab] = useState<"overview" | "sessions" | "achievements">("overview");
    const [timeFilter, setTimeFilter] = useState("week");
    const [sessionFilter, setSessionFilter] = useState("all");

    const user = useSelector((state: any) => state.auth.user);

    const totalSessions = learningHistory.length;
    const totalMinutes = learningHistory.reduce((sum, session) => sum + session.duration, 0);
    const averageScore = Math.round(
        learningHistory.filter((s) => s.score).reduce((sum, s) => sum + (s.score || 0), 0) /
        learningHistory.filter((s) => s.score).length,
    );
    const completedAchievements = achievements.filter((a) => !a.progress).length;

    const filteredSessions = learningHistory.filter((session) => {
        if (sessionFilter === "all") return true;
        return session.type === sessionFilter;
    });

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
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground mb-2">Learning History</h1>
                            <p className="text-muted-foreground">Track your progress and celebrate your achievements</p>
                        </div>
                        <button
                            className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground
                            rounded-lg hover:bg-primary/90 transition-colors">
                            <Download className="w-4 h-4"/>
                            <span>Export Report</span>
                        </button>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex space-x-1 bg-muted/50 p-1 rounded-lg w-fit">
                        {[
                            {id: "overview", label: "Overview", icon: BarChart3},
                            {id: "sessions", label: "Sessions", icon: Clock},
                            {id: "achievements", label: "Achievements", icon: Trophy},
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

                {/* Overview Tab */}
                {activeTab === "overview" && (
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6}}
                        className="space-y-8"
                    >
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <motion.div
                                initial={{opacity: 0, scale: 0.95}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{duration: 0.6, delay: 0.1}}
                                className="glass-card rounded-2xl p-6"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                                        <BookOpen className="w-6 h-6 text-white"/>
                                    </div>
                                    <span className="text-2xl font-bold text-foreground">{totalSessions}</span>
                                </div>
                                <h3 className="font-semibold text-foreground">Total Sessions</h3>
                                <p className="text-sm text-muted-foreground">Learning activities completed</p>
                            </motion.div>

                            <motion.div
                                initial={{opacity: 0, scale: 0.95}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{duration: 0.6, delay: 0.2}}
                                className="glass-card rounded-2xl p-6"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                                        <Clock className="w-6 h-6 text-white"/>
                                    </div>
                                    <span className="text-2xl font-bold text-foreground">{totalMinutes}m</span>
                                </div>
                                <h3 className="font-semibold text-foreground">Study Time</h3>
                                <p className="text-sm text-muted-foreground">Total learning minutes</p>
                            </motion.div>

                            <motion.div
                                initial={{opacity: 0, scale: 0.95}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{duration: 0.6, delay: 0.3}}
                                className="glass-card rounded-2xl p-6"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                                        <Target className="w-6 h-6 text-white"/>
                                    </div>
                                    <span className="text-2xl font-bold text-foreground">{averageScore}%</span>
                                </div>
                                <h3 className="font-semibold text-foreground">Average Score</h3>
                                <p className="text-sm text-muted-foreground">Across all assessments</p>
                            </motion.div>

                            <motion.div
                                initial={{opacity: 0, scale: 0.95}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{duration: 0.6, delay: 0.4}}
                                className="glass-card rounded-2xl p-6"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl">
                                        <Trophy className="w-6 h-6 text-white"/>
                                    </div>
                                    <span className="text-2xl font-bold text-foreground">{completedAchievements}</span>
                                </div>
                                <h3 className="font-semibold text-foreground">Achievements</h3>
                                <p className="text-sm text-muted-foreground">Unlocked milestones</p>
                            </motion.div>
                        </div>

                        {/* Weekly Activity Chart */}
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.6, delay: 0.5}}
                            className="glass-card rounded-2xl p-6"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-foreground">Weekly Activity</h2>
                                <select
                                    value={timeFilter}
                                    onChange={(e) => setTimeFilter(e.target.value)}
                                    className="px-3 py-1 bg-muted border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="week">This Week</option>
                                    <option value="month">This Month</option>
                                    <option value="year">This Year</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-7 gap-4">
                                {weeklyData.map((day, index) => (
                                    <div key={day.day} className="text-center">
                                        <div className="mb-2">
                                            <div className="w-full bg-primary/20 rounded-lg overflow-hidden"
                                                 style={{height: "100px"}}>
                                                <motion.div
                                                    initial={{height: 0}}
                                                    animate={{height: `${(day.sessions / 4) * 100}%`}}
                                                    transition={{duration: 0.8, delay: index * 0.1}}
                                                    className="w-full bg-gradient-to-t from-primary to-primary/80 rounded-lg"
                                                    style={{marginTop: `${100 - (day.sessions / 4) * 100}%`}}
                                                />
                                            </div>
                                        </div>
                                        <p className="text-xs text-muted-foreground mb-1">{day.day}</p>
                                        <p className="text-sm font-medium text-foreground">{day.sessions}</p>
                                        <p className="text-xs text-muted-foreground">{day.minutes}m</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Recent Achievements */}
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.6, delay: 0.6}}
                            className="glass-card rounded-2xl p-6"
                        >
                            <h2 className="text-xl font-semibold text-foreground mb-6">Recent Achievements</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {achievements.slice(0, 3).map((achievement, index) => (
                                    <motion.div
                                        key={achievement.id}
                                        initial={{opacity: 0, scale: 0.95}}
                                        animate={{opacity: 1, scale: 1}}
                                        transition={{duration: 0.6, delay: 0.7 + index * 0.1}}
                                        className="flex items-center space-x-3 p-4 bg-muted/50 rounded-xl"
                                    >
                                        <div
                                            className={`p-2 bg-gradient-to-r ${getRarityColor(achievement.rarity)} rounded-lg`}>
                                            <achievement.icon className="w-5 h-5 text-white"/>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-foreground">{achievement.title}</h3>
                                            <p className="text-xs text-muted-foreground">{achievement.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Sessions Tab */}
                {activeTab === "sessions" && (
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6}}
                        className="space-y-6"
                    >
                        {/* Filters */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <Filter className="w-4 h-4 text-muted-foreground"/>
                                <span className="text-sm text-muted-foreground">Filter by:</span>
                            </div>
                            <select
                                value={sessionFilter}
                                onChange={(e) => setSessionFilter(e.target.value)}
                                className="px-3 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="all">All Sessions</option>
                                <option value="identification">Image Analysis</option>
                                <option value="condition">Condition Study</option>
                                <option value="chat">AI Chat</option>
                                <option value="quiz">Quizzes</option>
                            </select>
                        </div>

                        {/* Sessions List */}
                        <div className="space-y-4">
                            {filteredSessions.map((session, index) => {
                                const SessionIcon = getSessionIcon(session.type);
                                return (
                                    <motion.div
                                        key={session.id}
                                        initial={{opacity: 0, y: 20}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{duration: 0.6, delay: index * 0.1}}
                                        className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div
                                                    className={`p-3 bg-gradient-to-r ${getSessionColor(session.type)} rounded-xl`}>
                                                    <SessionIcon className="w-6 h-6 text-white"/>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-foreground">{session.title}</h3>
                                                    <p className="text-sm text-muted-foreground">{session.details}</p>
                                                    <div className="flex items-center space-x-4 mt-2">
                            <span className="text-xs text-muted-foreground flex items-center">
                              <Calendar className="w-3 h-3 mr-1"/>
                                {session.date.toLocaleDateString()}
                            </span>
                                                        <span
                                                            className="text-xs text-muted-foreground flex items-center">
                              <Clock className="w-3 h-3 mr-1"/>
                                                            {session.duration} min
                            </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-4">
                                                {session.score && (
                                                    <div className="text-right">
                                                        <p className="text-lg font-bold text-foreground">{session.score}%</p>
                                                        <p className="text-xs text-muted-foreground">Score</p>
                                                    </div>
                                                )}
                                                {session.accuracy && (
                                                    <div className="text-right">
                                                        <p className="text-lg font-bold text-green-500">{session.accuracy}%</p>
                                                        <p className="text-xs text-muted-foreground">Accuracy</p>
                                                    </div>
                                                )}
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}
                                                >
                          {session.status}
                        </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}

                {/* Achievements Tab */}
                {activeTab === "achievements" && (
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6}}
                        className="space-y-6"
                    >
                        {/* Achievement Categories */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {["streak", "accuracy", "volume", "special"].map((category, index) => {
                                const categoryAchievements = achievements.filter((a) => a.category === category);
                                const completed = categoryAchievements.filter((a) => !a.progress).length;
                                return (
                                    <motion.div
                                        key={category}
                                        initial={{opacity: 0, scale: 0.95}}
                                        animate={{opacity: 1, scale: 1}}
                                        transition={{duration: 0.6, delay: index * 0.1}}
                                        className="glass-card rounded-2xl p-6 text-center"
                                    >
                                        <div
                                            className="w-12 h-12 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4">
                                            {category === "streak" && <Zap className="w-6 h-6 text-white"/>}
                                            {category === "accuracy" && <Target className="w-6 h-6 text-white"/>}
                                            {category === "volume" && <TrendingUp className="w-6 h-6 text-white"/>}
                                            {category === "special" && <Star className="w-6 h-6 text-white"/>}
                                        </div>
                                        <h3 className="font-semibold text-foreground capitalize mb-2">{category}</h3>
                                        <p className="text-2xl font-bold text-foreground">
                                            {completed}/{categoryAchievements.length}
                                        </p>
                                        <p className="text-xs text-muted-foreground">Completed</p>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Achievements Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {achievements.map((achievement, index) => (
                                <motion.div
                                    key={achievement.id}
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.6, delay: index * 0.1}}
                                    className={`glass-card rounded-2xl p-6 relative overflow-hidden ${
                                        achievement.progress ? "opacity-75" : ""
                                    }`}
                                >
                                    {/* Rarity Indicator */}
                                    <div
                                        className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${getRarityColor(achievement.rarity)} opacity-20`}
                                    />

                                    <div className="flex items-start justify-between mb-4">
                                        <div
                                            className={`p-3 bg-gradient-to-r ${getRarityColor(achievement.rarity)} rounded-xl`}>
                                            <achievement.icon className="w-6 h-6 text-white"/>
                                        </div>
                                        <div className="text-right">
                      <span
                          className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getRarityColor(achievement.rarity).replace("from-", "text-").replace("to-", "").split(" ")[0]} bg-current/10`}
                      >
                        {achievement.rarity}
                      </span>
                                        </div>
                                    </div>

                                    <h3 className="font-semibold text-foreground mb-2">{achievement.title}</h3>
                                    <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>

                                    {achievement.progress ? (
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Progress</span>
                                                <span className="text-foreground">
                          {achievement.progress}/{achievement.maxProgress}
                        </span>
                                            </div>
                                            <div className="w-full bg-muted rounded-full h-2">
                                                <motion.div
                                                    initial={{width: 0}}
                                                    animate={{
                                                        width: `${((achievement.progress || 0) / (achievement.maxProgress || 1)) * 100}%`,
                                                    }}
                                                    transition={{duration: 1, delay: index * 0.1}}
                                                    className="bg-primary h-2 rounded-full"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center text-green-500">
                                                <CheckCircle className="w-4 h-4 mr-2"/>
                                                <span className="text-sm font-medium">Unlocked</span>
                                            </div>
                                            <span className="text-xs text-muted-foreground">
                        {achievement.unlockedAt.toLocaleDateString()}
                      </span>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </main>
        </div>
    );
}
