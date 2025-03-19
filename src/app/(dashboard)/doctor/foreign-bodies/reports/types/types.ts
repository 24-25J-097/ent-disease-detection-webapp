export interface Report {
    id: string;
    patientId: string;
    note: string;
    imageUrl: string;
    predictions: Prediction[];
    updatedAt?: any;
    [key: string]: any;
}

export interface Prediction {
    x: number;
    y: number;
    width: number;
    height: number;
    class: string;
    confidence: number;
}

export interface ImageDimensions {
    width: number;
    height: number;
}

export const CLASS_COLORS: { [key: string]: string } = {
    C3: 'blue',
    C4: 'green',
    C5: 'yellow',
    C6: 'orange',
    C7: 'purple',
    B: 'red',
    D: 'pink',
};
