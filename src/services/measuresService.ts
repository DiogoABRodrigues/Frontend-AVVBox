// frontend/services/measuresService.ts
import axios from "axios";
import { Measures } from "../models/Measures";  
const API_URL = "http://192.168.1.184:3000/measures";

export const measuresService = {
  async getByUser(userId: string): Promise<Measures[]> {
    const res = await axios.get(`${API_URL}/user/${userId}`);
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
