import axios from "axios";
import { useNavigate } from "react-router";

const api = axios.create({
  baseURL: "https://todo-redev.herokuapp.com/api/",
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
