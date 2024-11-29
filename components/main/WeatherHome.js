import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import useWeather from "../../hooks/useWeather";
import WeatherSection from "./WeatherSection";
import MainHeader from "./MainHeader";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../../style/globalStyle";
import CityMenu from "./CityMenu";
import CustomButton from "../custom/CustomButton";

import ChatIcon from "../../icon/chat.svg";

const WeatherHome = () => {
  const navigation = useNavigation();

  const [showMenu, setShowMenu] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const getUserLocation = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    // console.log(granted);
    if (granted) {
      try {
        const { coords } = await Location.getCurrentPositionAsync({
          accuracy: 5,
        });
        // console.log(coords);
        setUserLocation(coords);
        setLatitude(coords.latitude);
        setLongitude(coords.longitude);
      } catch (e) {
        console.log("위치정보를 가져오는중 오류발생", e);
      }
    } else {
      console.log("위치권한이 없습니다.");
      return;
    }
  };
  useEffect(() => {
    getUserLocation();
  }, []);

  const {
    address,
    days,
    isLoading: weatherLoading,
  } = useWeather(latitude, longitude);

  const cityLocation = (lat, lon) => {
    setLatitude(lat);
    setLongitude(lon);
  };

  const naviToChat = () => {
    navigation.navigate("Chat", {
      userLocation: userLocation,
      userAddress: address,
      userWeathers: days,
    });
  };

  const isLoading = weatherLoading;

  return (
    <View style={globalStyles.container}>
      <MainHeader
        isLoading={isLoading}
        address={address}
        setShowMenu={setShowMenu}
      />
      {isLoading ? (
        <View style={globalStyles.container}>
          <Text>위치정보가 없습니다</Text>
        </View>
      ) : (
        <>
          <WeatherSection days={days} />
          <CustomButton
            onPress={naviToChat}
            imageSource={ChatIcon}
            iconSize={"big"}
            style={{
              position: "absolute",
              bottom: 16,
              right: 16,
              zIndex: 9,
            }}
          />
        </>
      )}
      {showMenu && (
        <CityMenu setShowMenu={setShowMenu} cityLocation={cityLocation} />
      )}
    </View>
  );
};

export default WeatherHome;
