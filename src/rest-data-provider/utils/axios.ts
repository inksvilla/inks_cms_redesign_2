import { HttpError } from "@refinedev/core";
import axios from "axios";
import { TOKEN_KEY } from "../../authProvider";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    if (error.response?.status === 403 || error.response?.status === 401) {
      // remove token and redirect
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }

    return Promise.reject(customError);
  }
);

axiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    if (config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return config;
});

export { axiosInstance };
