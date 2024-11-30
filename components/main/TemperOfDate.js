import React from "react";
import { Image, Text, View } from "react-native";
import { mainStyles } from "../../style/mainStyle";
import { globalStyles } from "../../style/globalStyle";

// 날씨아이콘
import SunnyIcon from "../../assets/icons8-맑음-32.png";
import CloudIcon from "../../assets/icons8-구름-32.png";
import RainIcon from "../../assets/icons8-비-32.png";
import SnowIcon from "../../assets/icons8-눈-32.png";

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
    <View style={mainStyles.weatherWrapper}>
      <View style={mainStyles.thumbnailWeather}>
        <Text style={mainStyles.currentTemper}>{thumbnailTemper}º</Text>
        <View style={mainStyles.scriptBox}>
          <Image source={thumbnailIcon()} style={globalStyles.bigIcon} />
          <Text style={mainStyles.currentDescription}>{thumbnailDescript}</Text>
        </View>
      </View>
      <View style={mainStyles.temperBox}>
        {weatherData.map((data) => {
          const feelsLike = (data.main.feels_like - 273.15).toFixed(0);
          return (
            <View key={data.dt} style={mainStyles.temper}>
              <Text style={mainStyles.timeFont}>
                {data.dt_txt.split(" ")[1].split(":")[0]}시
              </Text>
              <Text style={mainStyles.temperFont}>{feelsLike}º</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default TemperOfDate;
