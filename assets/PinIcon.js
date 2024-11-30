import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { globalStyles } from "../style/globalStyle";

const PinIcon = () => {
  return (
    <View style={globalStyles.bigIcon}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="#000"
      >
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
        />
      </Svg>
    </View>
  );
};

export default PinIcon;
