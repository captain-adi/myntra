import axiosR from "axios";

const axios = axiosR.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  withCredentials: true,
});

export default axios;
