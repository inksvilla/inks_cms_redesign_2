import { axiosInstance } from "@refinedev/simple-rest";
import { TOKEN_KEY } from "../authProvider";

axiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    if (config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return config;
});

export default axiosInstance;
