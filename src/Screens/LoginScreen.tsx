import { StyleSheet, Text, View, Image, Alert } from "react-native";
import React, { useState } from "react";
import Toast from "react-native-toast-message";

import Screen from "../Components/Screen";
import CustomInput from "../Components/CustomInput";
import CustomButton from "../Components/CustomButton";
import colors from "../Config/colors";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../Store/index";
import { loginUser } from "../Store/Slices/Auth/AuthSlice";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const { error } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async () => {
    if (disabled) {
      try {
        setDisabled(false);
        await dispatch(loginUser({ username, password }));
        setDisabled(true);
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Error while login",
        });
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
            {error && <Text style={styles.errorMessage}>{error.message}!</Text>}
            <View style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordLabel}>
                Forgot your password ?
              </Text>
              <Text style={styles.forgotPasswordText}>Reset Password</Text>
            </View>
          </View>
          <CustomButton
            value="Login"
            onPressed={handleLogin}
            loading={!disabled}
          />
        </View>
      </View>
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
  errorMessage: {
    color: colors.red,
    marginHorizontal: 5,
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
