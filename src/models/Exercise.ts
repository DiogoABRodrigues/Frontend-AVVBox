export interface Exercise {
  _id?: string;
  athleteId?: string;
  group: string; // Só para grupos normais
  name?: string;
  weight?: number;
  reps?: number;
  sets?: number;
  details?: string; // Só para extra
}

export interface MuscleGroup {
  exercises: Exercise[];
}

export interface ExtraGroup {
  exercises: Exercise[];
}

export interface Weights {
  _id?: string;
  athlete: string;
  triceps: MuscleGroup;
  biceps: MuscleGroup;
  shoulders: MuscleGroup;
  back: MuscleGroup;
  chest: MuscleGroup;
  legs: MuscleGroup;
  abs: MuscleGroup;
  cardio: MuscleGroup;
  extra: ExtraGroup;
  createdAt?: string;
  updatedAt?: string;
}
