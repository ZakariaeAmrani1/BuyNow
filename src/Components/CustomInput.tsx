import { StyleSheet, View, TextInput } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../Config/colors";

interface CustomInputProps {
  icon?: string;
  placeHolder?: string | undefined;
  keyboardType?: string;
  textContentType?: string;
  secureTextEntry?: boolean;
  editable?: boolean;
  onChangeText: (text: string) => void;
}
const CustomInput: React.FC<CustomInputProps> = ({
  icon,
  placeHolder,
  keyboardType,
  textContentType,
  secureTextEntry = false,
  editable = true,
  onChangeText,
}) => {
  return (
    <View style={styles.container}>
      {icon && (
        <MaterialCommunityIcons name={icon as any} style={styles.icon} />
      )}
      <TextInput
        placeholder={placeHolder}
        style={styles.textInput}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={keyboardType as any}
        textContentType={textContentType as any}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        editable={editable}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.onSurface,
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderRadius: 15,
  },
  icon: {
    color: Colors.secondary,
    fontSize: 20,
  },
  textInput: {
    width: "100%",
    marginLeft: 5,
    fontSize: 16,
    color: Colors.dark,
  },
});
