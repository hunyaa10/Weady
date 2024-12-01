import React, { useEffect, useRef } from "react";
import {
  Text,
  View,
  FlatList,
  Animated,
  Dimensions,
  Easing,
} from "react-native";
import CustomButton from "../custom/CustomButton";
import { menuStyles } from "../../style/menuStyle";

const cityList = [
  "Seoul",
  "Incheon",
  "Daejeon",
  "Daegu",
  "Busan",
  "Gwangju",
  "Ulsan",
];
const cityCoordinates = {
  Seoul: { lat: 37.5665, lon: 126.978 },
  Incheon: { lat: 37.4563, lon: 126.7052 },
  Daejeon: { lat: 36.3504, lon: 127.3845 },
  Daegu: { lat: 35.8714, lon: 128.6014 },
  Busan: { lat: 35.1796, lon: 129.0756 },
  Gwangju: { lat: 35.1595, lon: 126.8526 },
  Ulsan: { lat: 35.5397, lon: 129.3114 },
};

const SCREEN_HEIGHT = Dimensions.get("window").height;

const CityMenu = ({ showCityMenu, setShowCityMenu, cityLocation }) => {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    if (showCityMenu) {
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT / 2,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  }, [showCityMenu, translateY]);

  const handleCityClick = (city) => {
    const { lat, lon } = cityCoordinates[city];
    cityLocation(lat, lon);
    setShowCityMenu(false);
  };

  return (
    <View
      style={menuStyles.wrapper}
      onTouchStart={() => setShowCityMenu(false)}
    >
      <Animated.View
        style={[
          menuStyles.menuContainer,
          {
            transform: [{ translateY }],
          },
        ]}
        onTouchStart={(e) => e.stopPropagation()}
      >
        <FlatList
          data={cityList}
          renderItem={({ item }) => (
            <View
              style={menuStyles.city}
              onTouchEnd={() => handleCityClick(item)}
            >
              <Text style={menuStyles.cityText}>{item}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          style={menuStyles.cityList}
        />
        <CustomButton
          onPress={() => setShowCityMenu(false)}
          text="CLOSE"
          style={menuStyles.menuCloseBtn}
        />
      </Animated.View>
    </View>
  );
};

export default CityMenu;
