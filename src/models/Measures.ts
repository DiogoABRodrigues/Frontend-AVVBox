// models/Measures.ts
export interface Measures {
  _id?: string;
  user?: string;
  date?: string;
  type?: "atual" | "goal";
  height?: number;
  weight?: number;
  bodyFat?: number;
  muscleMass?: number;
  visceralFat?: number;
}
