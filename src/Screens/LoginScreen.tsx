import { StyleSheet, Text, View, Image, Alert } from "react-native";
import React, { useState } from "react";
import Toast from "react-native-toast-message";

import Screen from "../Components/Screen";
import CustomInput from "../Components/CustomInput";
import CustomButton from "../Components/CustomButton";
import colors from "../Config/colors";
import axiosInstance from "../Services/api";
import { User } from "../Store/Slices/Models/User";
import { saveUser } from "../Services/authStorage";
import { useDispatch } from "react-redux";
import { setCredentials } from "../Store/Slices/AuthSlice";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (disabled) {
      try {
        setDisabled(false);
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
        dispatch(setCredentials({ token, refreshToken, user }));
        Toast.show({
          type: "success",
          text1: "Login Successful ",
          text2: "Welcome back!",
        });
        setDisabled(true);
      } catch (err) {
        Alert.alert("Login failed", "Check your credentials");
        console.error(err);
        setDisabled(true);
      }
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../assets/logos/logo.png")}
        />
        <View style={styles.loginContainer}>
          <View style={styles.inputsContainer}>
            <CustomInput
              placeHolder="Enter your Username"
              icon="email"
              editable={disabled}
              onChangeText={(username) => setUsername(username)}
            />
            <CustomInput
              placeHolder="Enter your Password"
              icon="lock"
              textContentType="password"
              secureTextEntry={true}
              editable={disabled}
              onChangeText={(password) => setPassword(password)}
            />
            <View style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordLabel}>
                Forgot your password ?
              </Text>
              <Text style={styles.forgotPasswordText}>Reset Password</Text>
            </View>
          </View>
          <CustomButton onPressed={handleLogin} loading={!disabled} />
        </View>
      </View>
      <Toast />
    </Screen>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    margin: 10,
    justifyContent: "center",
  },
  logo: {
    width: 240,
    height: 140,
    marginBottom: 100,
    alignSelf: "center",
  },
  loginContainer: {
    marginHorizontal: 10,
  },
  inputsContainer: {
    marginBottom: 20,
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    marginHorizontal: 5,
    marginVertical: 5,
  },
  forgotPasswordLabel: {
    color: colors.dark,
  },
  forgotPasswordText: {
    marginLeft: 5,
    color: colors.primary,
  },
});
