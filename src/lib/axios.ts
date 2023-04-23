import axios from "axios";
import cookie from "cookie";

const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

const instance = axios.create({
  baseURL: backendBaseUrl,
  withCredentials: true,
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    config.headers["X-CSRFToken"] = cookie.parse(document.cookie).csrftoken;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
