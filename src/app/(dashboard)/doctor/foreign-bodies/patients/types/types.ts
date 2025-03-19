export interface Prediction {
    class: 'B' | 'D';
    confidence: number;
    bbox?: number[];
  }
  
  export interface Report {
    id: string;
    patientId: string;
    imageUrl: string;
    predictions: Prediction[];
    timestamp: {
      seconds: number;
      nanoseconds: number;
    };
    note: string;
  }