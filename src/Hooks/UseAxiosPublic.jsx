import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: 'http://localhost:3000',
  // // baseURL: 'https://student-management-server-production.up.railway.app',
  baseURL:
    "https://rpistudentmanagementserver.vercel.app/api/v1",
    // "http://localhost:5000/api/v1",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const useAxiosPublic = () => {
  return axiosPublic;
};
