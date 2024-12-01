import React from "react";
import { mainStyles } from "../../style/mainStyle";
import { Text, TouchableOpacity, View } from "react-native";
import PinIcon from "../../assets/PinIcon";
import MenuIcon from "../../assets/MenuIcon";

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
        <TouchableOpacity onPress={() => setShowCityMenu(true)}>
          <PinIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowSideMenu(true)}>
          <MenuIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainHeader;
