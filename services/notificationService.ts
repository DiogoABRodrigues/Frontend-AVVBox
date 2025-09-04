// services/notificationService.ts
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/notifications"; // ajusta se precisares

export interface Notification {
  _id: string;
  user: string;
  title: string;
  body: string;
  target: string[];
  date: string;
  readBy?: string[];
}

// ======================
// Criar notificações
// ======================
export async function createNotification(
  senderId: string,
  data: { title: string; body: string; target: "all" | "my" | string[] }
) {
  const res = await axios.post(`${API_URL}/${senderId}`, data);
  return res.data;
}

// ======================
// Buscar todas (admin/PT)
// ======================
export async function getAllNotifications() {
  const res = await axios.get<Notification[]>(`${API_URL}`);
  return res.data;
}

// ======================
// Buscar notificações de um user
// ======================
export async function getUserNotifications(targetId: string) {
  const res = await axios.get<Notification[]>(`${API_URL}/${targetId}`);
  return res.data;
}

// ======================
// Remover notificação apenas para um usuário (clear)
// ======================
export async function deleteNotificationForUser(notificationId: string, userId: string) {
  const res = await axios.delete(`${API_URL}/${notificationId}/${userId}`);
  return res.data;
}

// ======================
// Marcar notificação como lida
// ======================
export async function markNotificationAsRead(notificationId: string, userId: string) {
  const res = await axios.post(`${API_URL}/${notificationId}/${userId}/read`);
  return res.data;
}
