// services/notificationService.ts
import { Notification } from "../models/Notifications";
import { API_BASE_URL } from "../../config";
import api from "../../api";

const API_URL = `${API_BASE_URL}/notifications`;

// ======================
// Criar notificações
// ======================
export async function createNotification(
  senderId: string,
  data: { title: string; body: string; target: "all" | "my" | string[] },
) {
  const res = await api.post(`${API_URL}/${senderId}`, data);
  return res.data;
}

// ======================
// Buscar todas (admin/PT)
// ======================
export async function getAllNotifications() {
  const res = await api.get<Notification[]>(`${API_URL}`);
  return res.data;
}

// ======================
// Buscar notificações de um user
// ======================
export async function getUserNotifications(targetId: string) {
  const res = await api.get<Notification[]>(`${API_URL}/${targetId}`);
  return res.data;
}

// ======================
// Remover notificação apenas para um usuário (clear)
// ======================
export async function deleteNotificationForUser(
  notificationId: string,
  userId: string,
) {
  const res = await api.delete(`${API_URL}/${notificationId}/${userId}`);
  return res.data;
}

// ======================
// Marcar notificação como lida
// ======================
export async function markNotificationAsRead(
  notificationId: string,
  userId: string,
) {
  const res = await api.post(`${API_URL}/${notificationId}/${userId}/read`);
  return res.data;
}
