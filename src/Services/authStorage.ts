import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../Store/Slices/Auth/Models/User";

const AUTH_KEY = "auth";

export interface AuthData {
  token: string;
  refreshToken: string;
  user: User;
}

export async function saveUser(data: AuthData) {
  try {
    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save user's data:", error);
  }
}

export async function getCurrentUser(): Promise<AuthData | null> {
  try {
    const json = await AsyncStorage.getItem(AUTH_KEY);
    return json ? (JSON.parse(json) as AuthData) : null;
  } catch (error) {
    console.error("Failed to get the user's data:", error);
    return null;
  }
}

export async function removeCurrentUser() {
  try {
    await AsyncStorage.removeItem(AUTH_KEY);
  } catch (error) {
    console.error("Failed to remove the user's data:", error);
  }
}
