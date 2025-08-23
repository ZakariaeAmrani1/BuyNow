import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Screen from "../Components/Screen";
import { User } from "../Store/Slices/Models/User";
import { RootState } from "../Store";

import { useSelector } from "react-redux";
import colors from "../Config/colors";

const HomeScreen = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.section1}>
          <Text style={styles.text}>Welcome back</Text>
          <Text style={styles.customText}>
            {user?.lastName} {user?.firstName}
          </Text>
        </View>
      </View>
    </Screen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section1: {
    flexDirection: "row",
    padding: 10,
  },
  text: {
    color: colors.dark,
    fontWeight: "700",
    fontSize: 22,
  },
  customText: {
    marginLeft: 6,
    color: colors.primary,
    fontWeight: "700",
    fontSize: 22,
  },
});
