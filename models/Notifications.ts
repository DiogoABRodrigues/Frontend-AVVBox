// models/Notification.ts
export interface Notification {
  _id: string;
  user: string; // id do utilizador que criou
  title: string;
  body: string;
  target: string[]; // pode ser todos, meus atletas, ou lista de ids
  date: string;
  readBy?: string[]; // lista de ids de users que leram
}
