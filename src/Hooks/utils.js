import axios from "axios";

export const axiosPublic = axios.create({
  // baseURL: "", //for live server
  // baseURL: "http://localhost:3000",
  baseURL: "https://student-management-server-gilt.vercel.app",
});

// Add a request interceptor to set default headers
axiosPublic.interceptors.request.use(
  (config) => {
    // Only set default headers if they are not already provided
    config.headers["Content-Type"] =
      config.headers["Content-Type"] || "application/json";

    // Leave Authorization header untouched if it's already set
    if (!config.headers["Authorization"]) {
      // You can set a default for Authorization if needed, or leave this empty
      console.log("No Authorization header passed. Skipping default.");
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);
