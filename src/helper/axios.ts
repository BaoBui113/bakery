import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8080/api/v1/", // base URL
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Optional: Add request interceptor (for example, attach token)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized case
      console.error("Unauthorized, maybe redirect to login");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
