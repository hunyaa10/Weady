import React from "react";
import { mainStyles } from "../../style/mainStyle";
import { Text, View } from "react-native";
import CustomButton from "../custom/CustomButton";

import PinIcon from "../../icon/pin.svg";
import MenuIcon from "../../icon/menu.svg";

const MainHeader = ({
  isLoading,
  address,
  setShowCityMenu,
  setShowSideMenu,
}) => {
  return (
    <View style={mainStyles.header}>
      <Text style={mainStyles.cityName}>
        {isLoading ? "loading..." : `${address}`}
      </Text>
      <View style={mainStyles.menuBox}>
        <CustomButton
          imageSource={PinIcon}
          iconSize={"big"}
          style={{ backgroundColor: "transparents", padding: 0 }}
          onPress={() => setShowCityMenu(true)}
        />
        <CustomButton
          imageSource={MenuIcon}
          iconSize={"big"}
          style={{ backgroundColor: "transparents", padding: 0 }}
          onPress={() => setShowSideMenu(true)}
        />
      </View>
    </View>
  );
};

export default MainHeader;
