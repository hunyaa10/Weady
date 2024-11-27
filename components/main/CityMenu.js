import React from "react";
import { Text, View, FlatList } from "react-native";
import { mainStyles } from "../../style/mainStyle";
import CustomButton from "../custom/CustomButton";

const cityList = ["Seoul", "Daejeon", "Daegu", "Busan"];
const cityCoordinates = {
  Seoul: { lat: 37.5665, lon: 126.978 },
  Daejeon: { lat: 36.3504, lon: 127.3845 },
  Daegu: { lat: 35.8714, lon: 128.6014 },
  Busan: { lat: 35.1796, lon: 129.0756 },
};

const CityMenu = ({ setShowMenu, cityLocation }) => {
  const handleCityClick = (city) => {
    const { lat, lon } = cityCoordinates[city];
    cityLocation(lat, lon);
    setShowMenu(false);
  };
  return (
    <View style={mainStyles.menuContainer}>
      <FlatList
        data={cityList}
        renderItem={({ item }) => (
          <View
            style={mainStyles.city}
            onTouchEnd={() => handleCityClick(item)}
          >
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
