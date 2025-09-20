// frontend/services/settingsService.ts
import { Settings } from "../models/Settings";
import { API_BASE_URL } from "../../config";
import api from "../../api";

const API_URL = `${API_BASE_URL}/settings`;

export const settingsService = {
  async getByUser(userId: string): Promise<Settings> {
    const res = await api.get(`${API_URL}/${userId}`);
    return res.data;
  },

  async create(settings: Partial<Settings>): Promise<Settings> {
    const res = await api.post(API_URL, settings);
    return res.data;
  },

  async update(userId: string, data: Partial<Settings>): Promise<Settings> {
    const res = await api.put(`${API_URL}/${userId}`, data);
    return res.data;
  },
};
