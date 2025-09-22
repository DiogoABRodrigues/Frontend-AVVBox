// services/userService.ts
import { User } from "../models/User";
import { API_BASE_URL } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../api";

const API_URL = `${API_BASE_URL}/users`;

export const userService = {
  async login(
    email: string,
    password: string,
  ): Promise<{ token: string; user: User }> {
    const res = await api.post(`${API_URL}/login`, { login: email, password });

    const { token, user } = res.data;

    if (token) {
      await AsyncStorage.setItem("token", token);
    }

    return { token, user };
  },

  async logout() {
    await AsyncStorage.removeItem("token");
  },

  async register(user: Partial<User>): Promise<{ message: string }> {
    const res = await api.post(`${API_URL}/register`, user);
    return res.data;
  },

  async requestPasswordReset(email: string): Promise<{ message: string }> {
    const res = await api.post(`${API_URL}/request-password-reset`, { email });
    return res.data;
  },

  async resetPasswordWithCode(
    email: string,
    code: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    const res = await api.post(`${API_URL}/reset-password-with-code`, {
      email,
      code,
      newPassword,
    });
    return res.data;
  },

  async getAll(): Promise<User[]> {
    const res = await api.get(API_URL);
    return res.data;
  },

  async getAllAll(): Promise<User[]> {
    const res = await api.get(`${API_URL}/all`);
    return res.data;
  },

  async getById(id: string): Promise<User> {
    const res = await api.get(`${API_URL}/${id}`);
    return res.data;
  },

  async getMyAthletes(trainerId: string): Promise<User[]> {
    const res = await api.get(`${API_URL}/my-atheletes/${trainerId}/`);
    return res.data;
  },

  async create(user: Partial<User>): Promise<User> {
    const res = await api.post(API_URL, user);
    return res.data;
  },

  async delete(id: string): Promise<{ message: string }> {
    const res = await api.delete(`${API_URL}/${id}`);
    return res.data;
  },

  async update(id: string, user: Partial<User>): Promise<User> {
    const res = await api.put(`${API_URL}/update/${id}`, user);
    return res.data;
  },

  async deactivate(id: string): Promise<{ message: string }> {
    const res = await api.put(`${API_URL}/deactivate/${id}`);
    return res.data;
  },

  async activate(id: string): Promise<{ message: string }> {
    const res = await api.put(`${API_URL}/activate/${id}`);
    return res.data;
  },

  async getStaff(): Promise<User[]> {
    const res = await api.get(`${API_URL}/get-staff`);
    return res.data;
  },
  /*/save-expo-token/:userId*/
  async saveExpoPushToken(userId: string, token: string): Promise<User> {
    const res = await api.post(`${API_URL}/save-expo-token/${userId}`, {
      expoPushToken: token,
    });
    return res.data;
  }
};
