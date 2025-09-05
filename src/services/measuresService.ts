// frontend/services/measuresService.ts
import axios from "axios";
import { Measures } from "../models/Measures";  
const API_URL = "http://192.168.1.184:3000/measures";

export const measuresService = {
  async getByUser(userId: string): Promise<Measures> {
    const res = await axios.get(`${API_URL}/measures/${userId}`);
    return res.data;
  },

  async getAtualByUser(userId: string): Promise<Measures> {
    const res = await axios.get(`${API_URL}/atual-measures/${userId}`);
    return res.data;
  },

  async getLastByUser(userId: string): Promise<Measures> {
    const res = await axios.get(`${API_URL}/last-measures/${userId}`);
    return res.data;
  },

  async getGoalByUser(userId: string): Promise<Measures> {
    const res = await axios.get(`${API_URL}/goal/${userId}`);
    return res.data;
  },

  async create(measure: Partial<Measures>): Promise<Measures> {
    const res = await axios.post(API_URL, measure);
    return res.data;
  },

  async update(id: string, data: Partial<Measures>): Promise<Measures> {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data;
  },
};
