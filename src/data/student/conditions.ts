export interface Condition {
    id: number;
    name: string;
    category: string;
    description: string;
    image: string;
    prevalence: string;
    severity: string;
    readTime: string;
    studyCount: number;
    tags: string[];
}

export const conditions: Condition[] = [
    {
        id: 1,
        name: "Acute Sinusitis",
        category: "Nose & Sinuses",
        description: "Inflammation of the paranasal sinuses lasting less than 4 weeks",
        image: "/images/placeholder.jpg",
        prevalence: "Very Common",
        severity: "Mild to Moderate",
        readTime: "5 min read",
        studyCount: 156,
        tags: ["Infection", "Inflammation", "Acute"],
    },
    {
        id: 2,
        name: "Cholesteatoma",
        category: "Ear",
        description: "Abnormal skin growth in the middle ear behind the eardrum",
        image: "/images/placeholder.jpg",
        prevalence: "Uncommon",
        severity: "Moderate to Severe",
        readTime: "8 min read",
        studyCount: 89,
        tags: ["Chronic", "Surgical", "Hearing Loss"],
    },
    {
        id: 3,
        name: "Vocal Cord Paralysis",
        category: "Throat & Larynx",
        description: "Inability to move one or both vocal cords due to nerve damage",
        image: "/images/placeholder.jpg",
        prevalence: "Rare",
        severity: "Moderate to Severe",
        readTime: "7 min read",
        studyCount: 67,
        tags: ["Neurological", "Voice", "Paralysis"],
    },
    {
        id: 4,
        name: "Otitis Media",
        category: "Ear",
        description: "Infection or inflammation of the middle ear",
        image: "/images/placeholder.jpg",
        prevalence: "Very Common",
        severity: "Mild to Moderate",
        readTime: "4 min read",
        studyCount: 234,
        tags: ["Infection", "Pediatric", "Common"],
    },
    {
        id: 5,
        name: "Nasal Polyps",
        category: "Nose & Sinuses",
        description: "Soft, painless growths on the lining of nasal passages",
        image: "/images/placeholder.jpg",
        prevalence: "Common",
        severity: "Mild to Moderate",
        readTime: "6 min read",
        studyCount: 123,
        tags: ["Chronic", "Allergic", "Obstruction"],
    },
    {
        id: 6,
        name: "Meniere's Disease",
        category: "Ear",
        description: "Inner ear disorder causing vertigo, hearing loss, and tinnitus",
        image: "/images/placeholder.jpg",
        prevalence: "Uncommon",
        severity: "Moderate to Severe",
        readTime: "9 min read",
        studyCount: 78,
        tags: ["Chronic", "Vertigo", "Progressive"],
    },
];

export const categories = ["All", "Ear", "Nose & Sinuses", "Throat & Larynx"];
export const severityLevels = ["All", "Mild", "Moderate", "Severe"];
