export interface Exercise {
  name: string;   // ex: "Supino"
  weight: number; // ex: 45 (kg)
  reps?: number;  // ex: 10
  sets?: number;  // ex: 4
}

export interface MuscleGroup {
  exercises: Exercise[];
}

export interface Weights {
  _id?: string;
  athlete: string; // ID do User (ObjectId no backend)
  triceps: MuscleGroup;
  biceps: MuscleGroup;
  shoulders: MuscleGroup;
  back: MuscleGroup;
  chest: MuscleGroup;
  legs: MuscleGroup;
  abs: MuscleGroup;
  cardio: MuscleGroup;
  createdAt?: string;
  updatedAt?: string;
}
