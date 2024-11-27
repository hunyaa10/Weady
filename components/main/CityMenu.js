import React from "react";
import { Text, View, FlatList } from "react-native";
import { mainStyles } from "../../style/mainStyle";
import CustomButton from "../custom/CustomButton";

const CityMenu = ({ setShowMenu }) => {
  const cityList = ["Seoul", "Daejeon", "Daegu", "Busan"];
  return (
    <View style={mainStyles.menuContainer}>
      <FlatList
        data={cityList}
        renderItem={({ item }) => (
          <View style={mainStyles.city}>
            <Text style={mainStyles.cityText}>{item}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={mainStyles.cityList}
      />
      <CustomButton
        onPress={() => setShowMenu(false)}
        text="CLOSE"
        style={mainStyles.menuCloseBtn}
      />
    </View>
  );
};

export default CityMenu;
