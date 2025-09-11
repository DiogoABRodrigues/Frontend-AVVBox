// services/userService.ts
import axios from "axios";
import { User } from "../models/User";

const API_URL = "http://192.168.1.184:3000/users";

export const userService = {

  async login (email: string, password: string): Promise<{ token: string; user: User }> {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    return res.data;
  },

  async register (user: Partial<User>): Promise<{ message: string }> {
    const res = await axios.post(`${API_URL}/register`, user);
    return res.data;
  },
  

  async getAll(): Promise<User[]> {
    const res = await axios.get(API_URL);
    return res.data;
  },

  async getAllAll(): Promise<User[]> {
    const res = await axios.get(`${API_URL}/all`);
    return res.data;
  },

  async getById(id: string): Promise<User> {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  },

  async getMyAthletes(trainerId: string): Promise<User[]> {
    const res = await axios.get(`${API_URL}/my-atheletes/${trainerId}/`);
    return res.data;
  },

  async create(user: Partial<User>): Promise<User> {
    const res = await axios.post(API_URL, user);
    return res.data;
  },
  
  async delete(id: string): Promise<{ message: string }> {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  },

  async update(id: string, user: Partial<User>): Promise<User> {
    const res = await axios.put(`${API_URL}/update/${id}`, user);
    return res.data;
  },

  async deactivate(id: string): Promise<{ message: string }> {
    const res = await axios.put(`${API_URL}/deactivate/${id}`);
    return res.data;
  },

  async activate(id: string): Promise<{ message: string }> {
    const res = await axios.put(`${API_URL}/activate/${id}`);
    return res.data;
  }
};
