"use client";

import {motion} from "framer-motion";
import {useState} from "react";
import {BookOpen, Clock, ExternalLink, Filter, Search, Users} from "lucide-react";
import {useSelector} from 'react-redux';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import {conditions, categories, severityLevels} from '@/data/student/conditions';

export default function ConditionsPage() {

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedSeverity, setSelectedSeverity] = useState("All");
    const [showFilters, setShowFilters] = useState(false);

    const user = useSelector((state: any) => state.auth.user);

    const filteredConditions = conditions.filter((condition) => {
        const matchesSearch =
            condition.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            condition.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            condition.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesCategory = selectedCategory === "All" || condition.category === selectedCategory;
        const matchesSeverity = selectedSeverity === "All" || condition.severity.includes(selectedSeverity);

        return matchesSearch && matchesCategory && matchesSeverity;
    });

    const getSeverityColor = (severity: string) => {
        if (severity.includes("Mild")) return "text-foreground bg-green-500/10 dark:bg-green-500/20";
        if (severity.includes("Moderate")) return "text-foreground bg-yellow-500/10 dark:bg-yellow-500/20";
        if (severity.includes("Severe")) return "text-foreground bg-red-500/10 dark:bg-red-500/20";
        return "text-foreground bg-muted";
    };

    const getPrevalenceColor = (prevalence: string) => {
        switch (prevalence) {
            case "Very Common":
                return "text-foreground bg-blue-500/10 dark:bg-blue-500/20";
            case "Common":
                return "text-foreground bg-green-500/10 dark:bg-green-500/20";
            case "Uncommon":
                return "text-foreground bg-yellow-500/10 dark:bg-yellow-500/20";
            case "Rare":
                return "text-foreground bg-red-500/10 dark:bg-red-500/20";
            default:
                return "text-foreground bg-muted";
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <DashboardHeader user={user}/>

            <main className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-foreground mb-2">Medical Conditions</h1>
                    <p className="text-muted-foreground">
                        Explore a comprehensive ENT condition database with evidence-based information
                    </p>
                </motion.div>

                {/* Search and Filters */}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6, delay: 0.2}}
                    className="mb-8 space-y-4"
                >
                    {/* Search Bar */}
                    <div className="relative">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5"/>
                        <input
                            type="text"
                            placeholder="Search conditions, symptoms, or keywords..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                        />
                    </div>

                    {/* Filter Toggle */}
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center space-x-2 px-4 py-2 bg-muted/50 hover:bg-muted rounded-lg transition-colors"
                        >
                            <Filter className="w-4 h-4"/>
                            <span>Filters</span>
                        </button>

                        <div className="text-sm text-muted-foreground">
                            {filteredConditions.length} of {conditions.length} conditions
                        </div>
                    </div>

                    {/* Filters */}
                    {showFilters && (
                        <motion.div
                            initial={{opacity: 0, height: 0}}
                            animate={{opacity: 1, height: "auto"}}
                            exit={{opacity: 0, height: 0}}
                            className="glass-card rounded-xl p-4 space-y-4"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full p-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        {categories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Severity</label>
                                    <select
                                        value={selectedSeverity}
                                        onChange={(e) => setSelectedSeverity(e.target.value)}
                                        className="w-full p-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        {severityLevels.map((severity) => (
                                            <option key={severity} value={severity}>
                                                {severity}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>

                {/* Conditions Grid */}
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.6, delay: 0.4}}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filteredConditions.map((condition, index) => (
                        <motion.div
                            key={condition.id}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.6, delay: index * 0.1}}
                            whileHover={{y: -5}}
                            className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
                        >
                            {/* Image */}
                            <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20">
                                <img
                                    src={condition.image || "/placeholder.svg"}
                                    alt={condition.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4">
                                  <span
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${getPrevalenceColor(condition.prevalence)}`}
                                  >
                                    {condition.prevalence}
                                  </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                            {condition.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">{condition.category}</p>
                                    </div>
                                    <BookOpen className="w-5 h-5 text-muted-foreground"/>
                                </div>

                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{condition.description}</p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {condition.tags.slice(0, 2).map((tag) => (
                                        <span key={tag}
                                              className="px-2 py-1 bg-muted/50 text-xs text-muted-foreground rounded-md"
                                        >
                                        {tag}
                                      </span>
                                    ))}
                                    {condition.tags.length > 2 && (
                                        <span
                                            className="px-2 py-1 bg-muted/50 text-xs text-muted-foreground rounded-md"
                                        >
                                          +{condition.tags.length - 2}
                                        </span>
                                    )}
                                </div>

                                {/* Metadata */}
                                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                                    <div className="flex items-center">
                                        <Clock className="w-3 h-3 mr-1"/>
                                        {condition.readTime}
                                    </div>
                                    <div className="flex items-center">
                                        <Users className="w-3 h-3 mr-1"/>
                                        {condition.studyCount} studies
                                    </div>
                                </div>

                                {/* Severity and Action */}
                                <div className="flex items-center justify-between">
                                  <span
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(condition.severity)}`}
                                  >
                                    {condition.severity}
                                  </span>
                                    <button
                                        className="flex items-center text-primary hover:text-primary/80 transition-colors">
                                        <span className="text-sm mr-1">Learn More</span>
                                        <ExternalLink className="w-4 h-4"/>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* No Results */}
                {filteredConditions.length === 0 && (
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="text-center py-12">
                        <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4"/>
                        <h3 className="text-lg font-semibold text-foreground mb-2">No conditions found</h3>
                        <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
                    </motion.div>
                )}
            </main>
        </div>
    );
}
