import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: 'http://localhost:3000',
  // // baseURL: 'https://student-management-server-production.up.railway.app',
  baseURL: "https://student-data-management-iota.vercel.app",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const useAxiosPublic = () => {
  return axiosPublic;
};
