// services/measuresService.ts
import axios from "axios";
import { Measures } from "../models/Measures";

const API_URL = "http://192.168.1.184:3000/measures";

export const measuresService = {
  async getByUser(userId: string): Promise<Measures[]> {
    const res = await axios.get(`${API_URL}/${userId}`);
    return res.data;
  },

  async create(userId: string, measure: Partial<Measures>): Promise<Measures> {
    const res = await axios.post(`${API_URL}/${userId}`, measure);
    return res.data;
  },

  async delete(id: string): Promise<{ message: string }> {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  },
};
