// frontend/services/trainingService.ts
import axios from "axios";
import { Training, TrainingRequest } from "../models/Training";
import { API_BASE_URL } from "../../config";

const API_URL = `${API_BASE_URL}/training`;

export const trainingService = {
    async getByPT(ptId: string): Promise<Training[]> {
        const res = await axios.get(`${API_URL}?ptId=${ptId}`);
        return res.data;
    },
    async create(data: Partial<TrainingRequest>): Promise<Training> {
        const res = await axios.post(API_URL, data);
        return res.data;
    },
   async accept(id: string, userId: string): Promise<Training> {
    const res = await axios.patch(`${API_URL}/${id}/accept`, { userId });
    return res.data;
    },

    async reject(id: string, userId: string): Promise<Training> {
    const res = await axios.patch(`${API_URL}/${id}/reject`, { userId });
    return res.data;
    },
    async delete(id: string): Promise<{ message: string }> {
        const res = await axios.delete(`${API_URL}/${id}`);
        return res.data;
    },
    async getPending(userId: string): Promise<Training[]> {
    const res = await axios.get(`${API_URL}/pending/${userId}`);
    return res.data;
    },

    async getUpcoming(userId: string): Promise<Training[]> {
        const res = await axios.get(`${API_URL}/upcoming/${userId}`);
        return res.data;
    },
};