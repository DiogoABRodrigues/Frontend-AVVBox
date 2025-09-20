// frontend/services/measuresService.ts
import { Measures } from "../models/Measures"; 
import { API_BASE_URL } from "../../config"; 
import api from "../../api";

const API_URL = `${API_BASE_URL}/measures`;

export const measuresService = {
  async getByUser(userId: string): Promise<Measures[]> {
    const res = await api.get(`${API_URL}/${userId}`);
    return res.data;
  },

  async getAtualByUser(userId: string): Promise<Measures> {
    const res = await api.get(`${API_URL}/atual-measures/${userId}`);
    return res.data;
  },

  async getLastByUser(userId: string): Promise<Measures> {
    const res = await api.get(`${API_URL}/last-measures/${userId}`);
    return res.data;
  },

  async getGoalByUser(userId: string): Promise<Measures> {
    const res = await api.get(`${API_URL}/goal/${userId}`);
    return res.data;
  },

  async create(measure: Partial<Measures>): Promise<Measures> {
    const res = await api.post(API_URL, measure);
    return res.data;
  },

  async update(id: string, data: Partial<Measures>): Promise<Measures> {
    const res = await api.put(`${API_URL}/${id}`, data);
    return res.data;
  },

  async delete(id: string): Promise<number> {
    const response = await api.delete(`${API_URL}/${id}`);
    return response.status; 
  },
};
