import axios from "axios";
import { getUserLocalStorage } from "../context/AuthProvider/util";

export const privateAPi = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
      },
});

privateAPi.interceptors.request.use(
    (config) => {
      const user = getUserLocalStorage();
  
      config.headers.Authorization = user?.token;
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );