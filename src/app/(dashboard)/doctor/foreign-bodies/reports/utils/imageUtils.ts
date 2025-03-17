import axios from 'axios';
import { uploadImage } from '@/app/(dashboard)/doctor/foreign-bodies/firebase/reports';
import { ApiUtils } from "@/services/api-service/ApiUtils";
import { Prediction } from '../types/types';

export const validateAndProcessImage = async (file: File): Promise<{
    isValid: boolean;
    imageUrl?: string;
    predictions?: Prediction[];
}> => {
    try {
        // First check if the image is valid
        const validityFormData = new FormData();
        validityFormData.append("file", file);

        const validityResponse = await axios.post(
            ApiUtils.fastApiUrl + "/api/foreign/run-inference",
            validityFormData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );

        const isValid = validityResponse.data.images[0]?.results[0]?.class === 1;
        
        if (!isValid) {
            return { isValid: false };
        }

        // Run detection on valid image
        const detectionFormData = new FormData();
        detectionFormData.append("image", file);

        const detectResponse = await axios.post(
            ApiUtils.fastApiUrl + "/api/foreign/detect",
            detectionFormData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );

        const predictions = detectResponse.data.predictions || [];
        
        // Upload image to Firebase
        const imageUrl = await uploadImage(file);

        return {
            isValid: true,
            imageUrl,
            predictions
        };
    } catch (error) {
        console.error('Error processing image:', error);
        throw error;
    }
};

export const drawBoundingBoxes = (
    predictions: Prediction[],
    displayWidth: number,
    displayHeight: number,
    imageDimensions: { width: number; height: number },
    classColors: { [key: string]: string }
) => {
    // We need to scale based on the ratio between display size and original image size
    const widthRatio = displayWidth / imageDimensions.width;
    const heightRatio = displayHeight / imageDimensions.height;

    return predictions.map((prediction, index) => {
        // Calculate the absolute position in the original image
        const x = prediction.x;
        const y = prediction.y;
        const width = prediction.width;
        const height = prediction.height;

        // Calculate the position in the displayed image
        const boxLeft = (x - width / 2) * widthRatio;
        const boxTop = (y - height / 2) * heightRatio;
        const boxWidth = width * widthRatio;
        const boxHeight = height * heightRatio;

        const boxColor = classColors[prediction.class] || 'black';

        return {
            key: index,
            style: {
                position: 'absolute' as const,
                left: `${boxLeft}px`,
                top: `${boxTop}px`,
                width: `${boxWidth}px`,
                height: `${boxHeight}px`,
                border: `2px solid ${boxColor}`,
                color: boxColor,
                fontSize: '12px',
                fontWeight: 'bold',
                textShadow: '1px 1px 1px rgba(255,255,255,0.7)',
                pointerEvents: 'none' as const,
            },
            label: `${prediction.class} (${(prediction.confidence * 100).toFixed(2)}%)`
        };
    });
};
