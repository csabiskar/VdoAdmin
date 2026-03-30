import axios from "axios";

const API = axios.create({
  // baseURL: "https://vdo-naturals.vercel.app/api",
  // baseURL: "http://172.16.125.189:8080/api", // third floor WIFI
  baseURL: "http://10.76.50.130:8080/api", // Vivo 1920
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
