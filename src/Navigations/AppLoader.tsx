import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../Services/authStorage";
import { setCredentials } from "../Store/Slices/Auth/AuthSlice";

const AppLoader = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          const token = user.token;
          const refreshToken = user.refreshToken;
          const userData = user.user;
          dispatch(
            setCredentials({ token, refreshToken, user: userData, error: null })
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);
  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  return <>{children}</>;
};

export default AppLoader;
