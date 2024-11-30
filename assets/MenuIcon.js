import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { globalStyles } from "../style/globalStyle";

const MenuIcon = () => {
  return (
    <View style={globalStyles.bigIcon}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        height="40px"
        viewBox="0 -960 960 960"
        width="40px"
        fill="#000"
      >
        <Path d="M479.91-160q-24.24 0-41.41-17.26-17.17-17.26-17.17-41.5t17.26-41.41q17.27-17.16 41.5-17.16 24.24 0 41.41 17.26 17.17 17.26 17.17 41.5t-17.26 41.4Q504.14-160 479.91-160Zm0-261.33q-24.24 0-41.41-17.26-17.17-17.27-17.17-41.5 0-24.24 17.26-41.41 17.27-17.17 41.5-17.17 24.24 0 41.41 17.26 17.17 17.27 17.17 41.5 0 24.24-17.26 41.41-17.27 17.17-41.5 17.17Zm0-261.34q-24.24 0-41.41-17.26-17.17-17.26-17.17-41.5t17.26-41.4Q455.86-800 480.09-800q24.24 0 41.41 17.26 17.17 17.26 17.17 41.5t-17.26 41.41q-17.27 17.16-41.5 17.16Z" />
      </Svg>
    </View>
  );
};

export default MenuIcon;
