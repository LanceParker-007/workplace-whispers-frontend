// axiosInstance.js
import axios from "axios";
import config from "../config/config";

const axiosInstance = axios.create({
  baseURL: `${config.BACKEND_URL}/api/v1`, // Use your backend URL from the config
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Get the token from local storage or your state management
    const token = localStorage.getItem("accessToken");

    console.log(token);

    // If the token exists, set the Authorization header
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Handle the error
    return Promise.reject(error);
  }
);

export default axiosInstance;
