import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { styles } from "../style/mainStyle";

// 날씨아이콘
import SunnyIcon from "../../icon/icons8-맑음-32.png";
import CloudIcon from "../../icon/icons8-구름-32.png";
import RainIcon from "../../icon/icons8-비-32.png";
import SnowIcon from "../../icon/icons8-눈-32.png";

// 날씨별배경이미지
import ClearBg from "../../image/clear.jpg";
import CloudsBg from "../../image/clouds.jpg";
import RainBg from "../../image/rain.jpg";
import SnowBg from "../../image/snow.jpg";

const TemperOfDate = ({ weatherData }) => {
  // console.log(weatherData);
  if (weatherData.length === 0) {
    return "날씨정보가 없습니다.";
  }

  const findClosestTime = () => {
    const currentTime = new Date();
    let closestTimeData = null;
    let closestTimeDiff = Infinity;

    weatherData.forEach((data) => {
      const weatherTime = new Date(data.dt_txt);
      const timeDiff = Math.abs(weatherTime - currentTime);
      if (timeDiff < closestTimeDiff) {
        closestTimeDiff = timeDiff;
        closestTimeData = data;
      }
    });
    return closestTimeData;
  };
  const closestData = findClosestTime();

  const thumbnailTemper = (closestData.main.feels_like - 273.15).toFixed(0);
  const thumbnailDescript = closestData.weather[0].description;
  const thumbnailIcon = () => {
    let icon = null;
    if (thumbnailDescript.includes("clear")) {
      icon = SunnyIcon;
    } else if (thumbnailDescript.includes("clouds")) {
      icon = CloudIcon;
    } else if (thumbnailDescript.includes("rain")) {
      icon = RainIcon;
    } else if (thumbnailDescript.includes("snow")) {
      icon = SnowIcon;
    }

    return icon;
  };

  return (
    <View style={styles.weatherWrapper}>
      <View style={styles.thumbnailWeather}>
        <Text style={styles.currentTemper}>{thumbnailTemper}º</Text>
        <View style={styles.scriptBox}>
          <Image source={thumbnailIcon()} style={styles.icon} />
          <Text style={styles.currentDescription}>{thumbnailDescript}</Text>
        </View>
      </View>
      <View style={styles.temperBox}>
        {weatherData.map((data) => {
          const feelsLike = (data.main.feels_like - 273.15).toFixed(0);
          return (
            <View key={data.dt} style={styles.temper}>
              <Text style={styles.timeFont}>
                {data.dt_txt.split(" ")[1].split(":")[0]}시
              </Text>
              <Text style={styles.temperFont}>{feelsLike}º</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default TemperOfDate;
