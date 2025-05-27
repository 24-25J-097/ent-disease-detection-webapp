import {Brain, Eye, Target, TrendingUp} from 'lucide-react';

export interface AnalysisStep {
    id: number;
    title: string;
    description: string;
    icon: any;
    status: "pending" | "processing" | "completed";
    duration: number;
}

export const conditions = [
    "Sinusitis",
    "Cholesteatoma",
    "Pharyngitis",
    "Foreign Objects in Throat",
];

export const sampleAnalysisResult = {
    condition: "Sinusitis",
    confidence: 87,
    findings: [
        "Inflammatory changes visible in the mucosa",
        "Fluid accumulation in the middle ear space",
        "Tympanic membrane appears retracted",
    ],
    recommendations: ["Consider antibiotic therapy", "Follow-up in 2 weeks", "Audiometry testing recommended"],
    severity: "Moderate",
    accuracy: "High confidence",
};

export const analysisSteps: AnalysisStep[] = [
    {
        id: 1,
        title: "Image Processing",
        description: "Preprocessing and enhancing image quality",
        icon: Eye,
        status: "pending",
        duration: 800,
    },
    {
        id: 2,
        title: "Feature Extraction",
        description: "Identifying key anatomical features",
        icon: Target,
        status: "pending",
        duration: 1000,
    },
    {
        id: 3,
        title: "AI Analysis",
        description: "Running deep learning algorithms",
        icon: Brain,
        status: "pending",
        duration: 1500,
    },
    {
        id: 4,
        title: "Result Generation",
        description: "Compiling diagnosis and recommendations",
        icon: TrendingUp,
        status: "pending",
        duration: 600,
    },
];

export const conditionImageRequirements = [
    { condition: "Sinusitis", imageType: "Valid Waters View X-ray Image" },
    { condition: "Cholesteatoma", imageType: "Valid Endoscopy Image" },
    { condition: "Pharyngitis", imageType: "Valid Throat Image" },
    { condition: "Foreign Objects in Throat", imageType: "Valid X-ray Image" },
];
