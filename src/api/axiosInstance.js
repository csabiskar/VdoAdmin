import axios from "axios";

const API = axios.create({
  baseURL:"https://vdo-naturals-production.up.railway.app/api",
  // baseURL: "http://172.16.125.189:8080/api",
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
