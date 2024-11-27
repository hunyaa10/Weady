import { ImageBackground } from "react-native";
import useWeather from "../hooks/useWeather";
import { styles } from "../components/style/mainStyle";
import WeatherSection from "../components/main/WeatherSection";
import MainHeader from "../components/main/MainHeader";

// 날씨별배경이미지
// import ClearBg from "../image/clear.jpg";
// import CloudsBg from "../image/clouds.jpg";
// import RainBg from "../image/rain.jpg";
// import SnowBg from "../image/snow.jpg";

const Home = () => {
  const { address, days, isLoading } = useWeather();

  return (
    <ImageBackground
      // source={ClearBg}
      // resizeMode="cover"
      style={styles.container}
    >
      <MainHeader isLoading={isLoading} address={address} />
      <WeatherSection days={days} />
    </ImageBackground>
  );
};

export default Home;
