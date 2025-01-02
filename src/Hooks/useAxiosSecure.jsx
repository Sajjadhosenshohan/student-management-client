import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Auth/AuthProvider";

const axiosSecure = axios.create({
  baseURL: "https://rpistudentmanagementserver.vercel.app/api/v1",
  // baseURL: "http://localhost:5000/api/v1",
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const useAxiosSecure = () => {
  const { logout } = useContext(AuthContext) | null;

  useEffect(() => {
    // Request interceptor
    axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          logout();
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }, [logout]);

  return axiosSecure;
};
