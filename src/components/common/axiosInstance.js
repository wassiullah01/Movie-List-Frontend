// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_BACKEND_URL,
//   withCredentials: true,
// });

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const message = error.response?.data?.message;
//     if (
//       message &&
//       (message.toLowerCase().includes("no token") ||
//         message.toLowerCase().includes("unauthorized"))
//     ) {
//       console.log("Redirecting to /signIn due to authentication failure");
//       window.location.href = "/signIn";
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;



import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

const fetchUserRole = async () => {
  try {
    const response = await axiosInstance({
      method: "get",
      url: "/api/permissions/get-role",
    });
    console.log('res --- ',response)
    return response.data.role;
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null;
  }
};

axiosInstance.interceptors.response.use(
  async (response) => {
    if (window.location.pathname.startsWith("/admin")) {
      const userRole = await fetchUserRole();
      console.log("User Role:", userRole);

      if (userRole === "user") {
        console.log("Redirecting to home because user is not authorized for admin");
        window.location.href = "/";
      }
    }
    return response;
  },
  (error) => {
    const message = error.response?.data?.message;

    if (
      message &&
      (message.toLowerCase().includes("no token") ||
        message.toLowerCase().includes("unauthorized"))
    ) {
      console.log("Redirecting to /signIn due to authentication failure");
      window.location.href = "/signIn";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;