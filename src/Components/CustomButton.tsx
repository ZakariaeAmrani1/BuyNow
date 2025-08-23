import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import React from "react";
import colors from "../Config/colors";

interface CustomButtonProps {
  backgroudColor?: string;
  loading?: boolean;
  onPressed: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  backgroudColor,
  loading = false,
  onPressed,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPressed}>
      <View style={styles.button}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Text style={styles.text}>Login</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 700,
  },
});
