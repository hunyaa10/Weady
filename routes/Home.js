import { View } from "react-native";
import useWeather from "../hooks/useWeather";
import WeatherSection from "../components/main/WeatherSection";
import MainHeader from "../components/main/MainHeader";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../style/globalStyle";
import { useEffect, useState } from "react";
import CityMenu from "../components/main/CityMenu";
import ChatIcon from "../icon/chat.svg";
import CustomButton from "../components/custom/CustomButton";

// 날씨별배경이미지
// import ClearBg from "../image/clear.jpg";
// import CloudsBg from "../image/clouds.jpg";
// import RainBg from "../image/rain.jpg";
// import SnowBg from "../image/snow.jpg";

const Home = () => {
  const navigation = useNavigation();
  const [showMenu, setShowMenu] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const { address, days, isLoading, getLocation } = useWeather(
    latitude,
    longitude
  );

  const fetchLocation = async () => {
    const { latitude, longitude } = await getLocation();
    setLatitude(latitude);
    setLongitude(longitude);
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const cityLocation = (lat, lon) => {
    setLatitude(lat);
    setLongitude(lon);
  };

  const naviToChat = () => {
    navigation.navigate("Chat");
  };

  return (
    <View style={globalStyles.container}>
      <MainHeader
        isLoading={isLoading}
        address={address}
        setShowMenu={setShowMenu}
      />
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
      {showMenu && (
        <CityMenu setShowMenu={setShowMenu} cityLocation={cityLocation} />
      )}
    </View>
  );
};

export default Home;
