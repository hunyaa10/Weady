import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { globalStyles } from "../../style/globalStyle";

const CustomButton = ({ onPress, text, imageSource, style, iconSize }) => {
  const iconStyle =
    iconSize === "big" ? globalStyles.bigIcon : globalStyles.smallIcon;

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      {imageSource ? (
        <Image source={imageSource} style={iconStyle} />
      ) : (
        <Text style={styles.buttonText}>{text}</Text>
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
