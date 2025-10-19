export interface UserSummary {
  _id: string;
  name: string;
}

export interface Training {
  _id: string;
  date: string; // ISO string
  hour: string;
  duration?: number;
  details?: string;
  PT: UserSummary; // antes era string
  athlete: UserSummary; // antes era string
  proposedBy: "PT" | "Athlete" | "Admin";
  ptStatus: "proposed" | "accepted" | "rejected";
  athleteStatus: "proposed" | "accepted" | "rejected";
  overallStatus: "pending" | "confirmed" | "rejected" | "canceled";
}

export interface TrainingRequest {
  date: string;
  hour: string;
  duration?: number;
  details?: string;
  PT?: string; // ID do PT
  athlete?: string; // ID do atleta
  proposedBy?: "PT" | "Athlete" | "Admin";
  userId?: string; // ID do usuário que está fazendo a solicitação
}
