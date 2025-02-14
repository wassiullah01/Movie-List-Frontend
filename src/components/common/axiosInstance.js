import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // Ensures cookies are sent
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message;
    if (
      message &&
      (message.toLowerCase().includes("no token") ||
        message.toLowerCase().includes("unauthorized"))
    ) {
      console.log("Redirecting to /signIn due to authentication failure");
      window.location.href = "/signIn"; // Redirects to login page
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;