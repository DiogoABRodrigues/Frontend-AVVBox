import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3000', // Android Emulator
  // ou 'http://localhost:3000' se for no iOS Simulator
});

export default api;
