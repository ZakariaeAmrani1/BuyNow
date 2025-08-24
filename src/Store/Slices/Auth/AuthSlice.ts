import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./Models/User";
import { removeCurrentUser, saveUser } from "../../../Services/authStorage";
import axiosInstance from "../../../Services/api";
import Toast from "react-native-toast-message";

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  error: string | null;
}

const initialAuthState: AuthState = {
  token: null,
  refreshToken: null,
  user: null,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { username, password }: { username: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.post("auth/login", {
        username,
        password,
      });
      const data = response.data;
      const user: User = {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        image: data.image,
      };
      const token = data.accessToken;
      const refreshToken = data.refreshToken;
      await saveUser({
        token: token,
        refreshToken: refreshToken,
        user,
      });

      response.data = {
        token: token,
        refreshToken: refreshToken,
        user,
      };

      Toast.show({
        type: "success",
        text1: "Login Successful ",
      });

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Email or password is incorrect"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      removeCurrentUser();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
