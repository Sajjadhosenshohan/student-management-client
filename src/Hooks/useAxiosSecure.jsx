import axios from 'axios';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../Auth/AuthProvider';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const useAxiosSecure = () => {
  const { logout } = useContext(AuthContext) | null;

  useEffect(() => {
    // Request interceptor
    axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
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