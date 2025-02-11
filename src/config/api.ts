import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;
const API_TRANSFER_TOKEN = import.meta.env.VITE_API_TRANSFER_TOKEN;

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${API_TOKEN}`;
  return config;
});

export const transferApi = axios.create({
  baseURL: API_URL,
});

transferApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${API_TOKEN}`;
  config.headers["mural-account-api-key"] = API_TRANSFER_TOKEN;
  return config;
});
