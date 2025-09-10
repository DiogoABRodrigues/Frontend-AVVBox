// models/User.ts
export interface User {
  _id: string;
  name: string;
  phoneNumber: string;
  password?: string; // opcional, raramente vais expor
  coach: string[]; // id do PT principal
  role: "atleta" | "PT" | "Admin";
  atheletes: string[]; // só para PTs
  active: boolean;
}
