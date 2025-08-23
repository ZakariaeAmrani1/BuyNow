import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";

import Screen from "../Components/Screen";
import CustomInput from "../Components/CustomInput";
import CustomButton from "../Components/CustomButton";
import colors from "../Config/colors";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
              placeHolder="Enter your Email"
              icon="email"
              keyboardType="email-address"
              textContentType="emailAddress"
              onChangeText={(email) => setEmail(email)}
            />
            <CustomInput
              placeHolder="Enter your Password"
              icon="lock"
              textContentType="password"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
            <View style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordLabel}>
                Forgot your password ?
              </Text>
              <Text style={styles.forgotPasswordText}>Reset Password</Text>
            </View>
          </View>
          <CustomButton onPressed={() => {}} />
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
