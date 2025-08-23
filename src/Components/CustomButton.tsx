import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import colors from "../Config/colors";

interface CustomButtonProps {
  backgroudColor?: string;
  onPressed: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  backgroudColor,
  onPressed,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPressed}>
      <View style={styles.button}>
        <Text style={styles.text}>Login</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
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
