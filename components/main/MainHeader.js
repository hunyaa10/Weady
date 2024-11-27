import React, { useState } from "react";
import { mainStyles } from "../../style/mainStyle";
import { Text, View } from "react-native";
import CityMenu from "./CityMenu";
import CustomButton from "../custom/CustomButton";

import EarthIcon from "../../icon/earth.svg";
import MenuIcon from "../../icon/menubar3.svg";

const MainHeader = ({ isLoading, address, setShowMenu }) => {
  return (
    <View style={mainStyles.header}>
      <CustomButton
        imageSource={MenuIcon}
        iconSize={"big"}
        style={{ backgroundColor: "transparents", padding: 0 }}
      />
      <Text style={mainStyles.cityName}>
        {isLoading ? "loading..." : `${address}`}
      </Text>
      <CustomButton
        imageSource={EarthIcon}
        iconSize={"big"}
        style={{ backgroundColor: "transparents", padding: 0 }}
        onPress={() => setShowMenu(true)}
      />
    </View>
  );
};

export default MainHeader;
