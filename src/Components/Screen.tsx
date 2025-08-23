import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";

import Constants from "expo-constants";
import { SafeAreaView } from "react-native";

interface ScreenProps {
  children: ReactNode;
}

const Screen: React.FC<ScreenProps> = ({ children }) => {
  return <SafeAreaView style={styles.screen}>{children}</SafeAreaView>;
};

export default Screen;

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
});
