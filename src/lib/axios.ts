import axios from "axios";

const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

const instance = axios.create({
  baseURL: backendBaseUrl,
  timeout: 60000,
});

export default instance;
