// import axios from "axios";

// export const axiosPublic = axios.create({
//   // baseURL: "https://student-data-management-iota.vercel.app",
//   // baseURL: "https://student-management-server-gilt.vercel.app",
//   // baseURL:"https://student-management-server-dswoojfg6-radiathossains-projects.vercel.app",
//   baseURL: "http://localhost:3000",
// });

// // Add a request interceptor to set default headers
// axiosPublic.interceptors.request.use(
//   (config) => {
//     // Only set default headers if they are not already provided
//     config.headers["Content-Type"] =
//       config.headers["Content-Type"] || "application/json";

//     // Leave Authorization header untouched if it's already set
//     if (!config.headers["Authorization"]) {
//       // You can set a default for Authorization if needed, or leave this empty
//       console.log("No Authorization header passed. Skipping default.");
//     }

//     return config;
//   },
//   (error) => {
//     // Handle request errors
//     return Promise.reject(error);
//   }
// );
