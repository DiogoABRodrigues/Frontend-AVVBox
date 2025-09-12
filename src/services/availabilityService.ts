// frontend/services/availabilityService.ts
import axios from "axios";
import { Availability } from "../models/Availability";

const API_URL = "http://192.168.1.184:3000/availability";

export const availabilityService = {
  async getByPT(ptId: string): Promise<Availability> {
    const res = await axios.get(`${API_URL}/${ptId}`);
    return res.data;
  },

  // upsert: cria ou atualiza disponibilidade
  async update(data: Partial<Availability>): Promise<Availability> {
    const res = await axios.put(`${API_URL}/${data._id || ""}`, data);
    return res.data;
  },

  async create(data: Partial<Availability>): Promise<Availability> {
    const res = await axios.post(API_URL, data);
    return res.data;
  },
};
