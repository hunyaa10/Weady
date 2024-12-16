import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { globalStyles } from "../style/globalStyle";

const SendIcon = () => {
  return (
    <View style={globalStyles.smallIcon}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.8"
        stroke="#0D819E"
      >
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
        />
      </Svg>
    </View>
  );
};

export default SendIcon;
