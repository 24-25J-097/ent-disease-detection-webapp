import {Step} from '@/components/cards/StepsFlowCard';

export const identificationSteps: Step[] = [
    {
        number: 1,
        title: "Patient Selection",
        description: "Select an existing patient or create a new patient record."
    },
    {
        number: 2,
        title: "Additional Information",
        description: "Provide any relevant clinical information about the patient's condition."
    },
    {
        number: 3,
        title: "Upload Endoscopy Image",
        description: "Upload a clear middle ear endoscopy image for analysis."
    },
    {
        number: 4,
        title: "AI Analysis",
        description: "Our AI system analyzes the image to detect cholesteatoma and determine its stage."
    },
    {
        number: 5,
        title: "Review Results",
        description: "Review the diagnosis results, including cholesteatoma presence, stage, and confidence score."
    },
    {
        number: 6,
        title: "Update Results",
        description: "Update the diagnostic results suggestions if have anything else to add."
    },
    {
        number: 7,
        title: "Accept or Reject",
        description: "Confirm or reject the AI diagnosis based on your clinical judgment."
    }
];
