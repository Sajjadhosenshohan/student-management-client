import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const useAxiosPublic = () => {
  return axiosPublic;
};