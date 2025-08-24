import axios from "axios";
import { API_URL } from "@env";
import { getCurrentUser, saveUser } from "./authStorage";
import { logout } from "../Store/Slices/Auth/AuthSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Store";

const instance = axios.create({
  baseURL: API_URL,
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

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const dispatch = useDispatch<AppDispatch>();
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const user = await getCurrentUser();
      const refreshToken = user?.refreshToken;
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_URL}auth/refresh`, {
            refreshToken,
          });
          const newToken = response.data.accessToken;
          user.token = newToken;
          await saveUser(user);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return instance(originalRequest);
        } catch (err) {
          console.log("Refresh failed", err);
          dispatch(logout());
        }
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
