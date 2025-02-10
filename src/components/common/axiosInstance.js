// axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, 
});


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.message &&
      (
        error.response.data.message.toLowerCase().includes("no token") ||
        error.response.data.message.toLowerCase().includes("unauthorized")
      )
    ) {
      window.location.href = "/signIn";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
