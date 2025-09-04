// models/Measures.ts
export interface Measures {
  _id: string;
  user: string; // referência ao User
  date: string; // guardado como ISO string
  height?: number;
  weight?: number;
  bodyFat?: number;
  muscleMass?: number;
  visceralFat?: number;
}
