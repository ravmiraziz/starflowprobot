import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
  if (token) config.headers.Authorization = `${token}`;
  return config;
});

export const get = (url, params) => api.get(url, { params });
export const getOne = (url, id) => api.get(`${url}/${id}`);
export const post = (url, data) => api.post(url, data);
export const patch = (url, data) => api.patch(url, data);
export const put = (url, id, data) => api.put(`${url}/${id}`, data);
export const putData = (url, data) => api.put(`${url}`, data);
export const remove = (url, id) => api.delete(`${url}/${id}`);
