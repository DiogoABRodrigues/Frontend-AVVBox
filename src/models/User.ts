// models/User.ts
export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string; // opcional, raramente vais expor
  coach?: string | null; // id do PT principal
  role: "atleta" | "PT";
  atheleteIds?: string[]; // só para PTs
}
