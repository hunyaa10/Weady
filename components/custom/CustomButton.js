import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = ({ onPress, text, style, children }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      {children ? (
        children
      ) : (
        <Text style={[styles.buttonText, style?.text]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "#0D819E",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CustomButton;
