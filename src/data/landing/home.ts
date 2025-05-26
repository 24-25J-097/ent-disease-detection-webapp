import {BookOpen, Brain, Building2, Camera, Ear, GraduationCap, Microscope, Target, Zap} from 'lucide-react';

export const medicalConditions = [
    {
        name: "Sinusitis",
        description: "Detection of sinus tissue inflammation caused by infections or allergies with precision diagnostics",
        icon: Brain,
        accuracy: "90%",
        color: "from-blue-500 to-blue-600",
    },
    {
        name: "Cholesteatoma",
        description: "Early identification of destructive and expanding growth in the middle ear through ML algorithms",
        icon: Ear,
        accuracy: "92%",
        color: "from-purple-500 to-purple-600",
    },
    {
        name: "Pharyngitis",
        description: "Automated detection of pharynx inflammation causing throat discomfort with clinical accuracy",
        icon: Microscope,
        accuracy: "87%",
        color: "from-green-500 to-green-600",
    },
    {
        name: "Foreign Objects in Throat",
        description: "AI-powered identification of unexpected obstructions in the throat using advanced image analysis",
        icon: Target,
        accuracy: "88%",
        color: "from-red-500 to-red-600",
    },
];

export const features = [
    {
        title: "AI-Powered Analysis",
        description: "Advanced machine learning algorithms trained on thousands of ENT cases",
        icon: Brain,
        color: "from-blue-500 to-cyan-500",
    },
    {
        title: "Real-time Diagnosis",
        description: "Instant analysis and diagnosis support for faster clinical decisions",
        icon: Zap,
        color: "from-yellow-500 to-orange-500",
    },
    {
        title: "Educational Platform",
        description: "Comprehensive learning resources for medical students and professionals",
        icon: BookOpen,
        color: "from-purple-500 to-pink-500",
    },
    {
        title: "Clinical Accuracy",
        description: "Evidence-based results with high precision and reliability metrics",
        icon: Target,
        color: "from-green-500 to-emerald-500",
    },
];

export const stats = [
    {label: "Diagnostic Accuracy", value: "90%", icon: Target},
    {label: "Medical Students", value: "10K+", icon: GraduationCap},
    {label: "Healthcare Institutions", value: "100+", icon: Building2},
    {label: "Cases Analyzed", value: "50K+", icon: Camera},
];
