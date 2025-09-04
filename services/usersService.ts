// services/userService.ts
import axios from "axios";
import { User } from "../models/User";

const API_URL = "http://localhost:3000/users";

export const userService = {
  async getAll(): Promise<User[]> {
    const res = await axios.get(API_URL);
    return res.data;
  },

  async getById(id: string): Promise<User> {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  },

  async create(user: Partial<User>): Promise<User> {
    const res = await axios.post(API_URL, user);
    return res.data;
  },

  async update(id: string, user: Partial<User>): Promise<User> {
    const res = await axios.put(`${API_URL}/${id}`, user);
    return res.data;
  },

  async delete(id: string): Promise<{ message: string }> {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  },
};
