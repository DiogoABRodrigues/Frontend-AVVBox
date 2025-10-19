// services/notificationService.ts
import { Notification } from "../models/Notifications";
import { API_BASE_URL } from "../../config";
import api from "../../api";

const API_URL = `${API_BASE_URL}/notifications`;

// ======================
// Criar notificações
// ======================
export const notificationService = {
  async createNotification(
    senderId: string,
    data: { title: string; body: string; target: "all" | "my" | string[] }
  ) {
    const res = await api.post(`${API_URL}/${senderId}`, data);
    return res.data;
  },

  // ======================
  // Buscar todas (admin/PT)
  // ======================
  async getAllNotifications() {
    const res = await api.get<Notification[]>(`${API_URL}`);
    return res.data;
  },

  // ======================
  // Buscar notificações de um user
  // ======================
  async getUserNotifications(targetId: string) {
    const res = await api.get<Notification[]>(`${API_URL}/${targetId}`);
    return res.data;
  },

  // ======================
  // Remover notificação apenas para um usuário (clear)
  // ======================
  async deleteNotificationForUser(notificationId: string, userId: string) {
    const res = await api.delete(`${API_URL}/${notificationId}/${userId}`);
    return res.data;
  },

  // ======================
  // Marcar notificação como lida
  // ======================
  async markNotificationAsRead(notificationId: string, userId: string) {
    const res = await api.post(`${API_URL}/${notificationId}/${userId}/read`);
    return res.data;
  },
};
