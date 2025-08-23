import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import { getCurrentUser } from "./authStorage";

const instance = axios.create({
  baseURL: API_URL, // replace with your API
});

instance.interceptors.request.use(async (config) => {
  const user = await getCurrentUser();
  if (user?.token && config.headers) {
    config.headers.Authorization = `Bearer ${user?.token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      console.log("Unauthorized!");
    }
    return Promise.reject(error);
  }
);

export default instance;
