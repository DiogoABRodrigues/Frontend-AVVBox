export interface TimeRange {
  start: string; // ex: "08:00"
  end: string;   // ex: "12:00"
}

// Novo tipo para cada dia da semana
export interface DayAvailability {
  working: boolean;       // indica se o dia é de trabalho
  intervals: TimeRange[]; // horários do dia
}

export interface Availability {
  _id?: string;
  PT: string; // ID do Personal Trainer
  Monday: DayAvailability;
  Tuesday: DayAvailability;
  Wednesday: DayAvailability;
  Thursday: DayAvailability;
  Friday: DayAvailability;
  Saturday: DayAvailability;
  Sunday: DayAvailability;
  maxAthletesPerHour: number;
}
