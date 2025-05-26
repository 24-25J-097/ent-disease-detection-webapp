export interface Prediction {
    class: 'B' | 'D';
    confidence: number;
    bbox?: number[];
  }
  
  export interface Report {
  id: string;
  patientId: string;
  name?: string;
  email?: string;
  phone?: string;
  age?: string;
  address?: string;
  gender?: 'male' | 'female' | 'other';
  imageUrl: string;
  note: string;
  predictions: Prediction[];
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
}