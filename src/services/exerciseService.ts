// frontend/services/exerciseService.ts
import { Weights, Exercise } from "../models/Exercise";
import { API_BASE_URL } from "../../config";
import api from "../../api";

const API_URL = `${API_BASE_URL}/exercises`;

export const exerciseService = {
  async getByUser(athleteId: string): Promise<Weights> {
    const res = await api.get(`${API_URL}/${athleteId}`);
    return res.data;
  },

  async create(exercise: Partial<Exercise>): Promise<Weights> {
    const res = await api.post(API_URL, exercise);
    return res.data;
  },

  async update(id: string, data: Partial<Exercise>): Promise<Weights> {
    const res = await api.put(`${API_URL}/${id}`, data);
    return res.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`${API_URL}/${id}`);
  }
};
