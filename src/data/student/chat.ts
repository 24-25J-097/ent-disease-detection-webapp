export interface Message {
    id: string;
    type: "user" | "ai";
    content: string;
    timestamp: Date;
    citations?: string[];
}

export const sampleMessages: Message[] = [
    {
        id: "1",
        type: "ai",
        content:
            "Hello! I'm your AI ENT teacher. I can help you understand ear, nose, and throat conditions, answer questions about symptoms, treatments, and provide evidence-based medical information. What would you like to learn about today?",
        timestamp: new Date(Date.now() - 300000),
        citations: [],
    },
    {
        id: "2",
        type: "user",
        content: "Can you explain the difference between acute and chronic sinusitis?",
        timestamp: new Date(Date.now() - 240000),
    },
    {
        id: "3",
        type: "ai",
        content:
            "Great question! The main differences between acute and chronic sinusitis are:\n\n**Acute Sinusitis:**\n- Duration: Less than 4 weeks\n- Onset: Sudden, often following a cold or respiratory infection\n- Symptoms: Severe facial pain, thick nasal discharge, fever\n- Treatment: Usually responds well to antibiotics and decongestants\n\n**Chronic Sinusitis:**\n- Duration: 12 weeks or longer\n- Onset: Gradual, persistent symptoms\n- Symptoms: Milder but persistent nasal congestion, reduced sense of smell\n- Treatment: May require longer antibiotic courses, nasal corticosteroids, or surgery\n\nThe key diagnostic criterion is the duration of symptoms. Would you like me to elaborate on any specific aspect?",
        timestamp: new Date(Date.now() - 180000),
        citations: ["American Academy of Otolaryngology Guidelines 2023", "Cochrane Review on Sinusitis Treatment"],
    },
];

