import axios from "axios";

const adminApi = axios.create({
  // same-origin; enable credentials to ensure cookies are sent
  withCredentials: true,
});

adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // central 401 handling: redirect to login for client-side requests
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  },
);


export default adminApi;
