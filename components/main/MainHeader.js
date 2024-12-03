import React from "react";
import { mainStyles } from "../../style/mainStyle";
import { Text, TouchableOpacity, View } from "react-native";
import PinIcon from "../../assets/PinIcon";

const MainHeader = ({ isLoading, address, setShowCityMenu }) => {
  return (
    <View style={mainStyles.header}>
      <Text style={mainStyles.cityName}>
        {isLoading ? "loading..." : `${address}`}
      </Text>
      <TouchableOpacity onPress={() => setShowCityMenu(true)}>
        <PinIcon />
      </TouchableOpacity>
    </View>
  );
};

export default MainHeader;
