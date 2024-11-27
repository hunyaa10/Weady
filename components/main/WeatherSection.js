import React from "react";
import { styles } from "../style/mainStyle";
import { ScrollView, Text, View } from "react-native";
import TemperOfDate from "./TemperOfDate";

const WeatherSection = ({ days }) => {
  // console.log(days);
  const getDayOfWeek = (day) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const date = new Date(day);
    const dayIndex = date.getDay();

    return daysOfWeek[dayIndex];
  };
  return (
    <ScrollView horizontal pagingEnabled contentContainerStyle={styles.scroll}>
      {Object.keys(days).map((date) => {
        const daysOfWeek = getDayOfWeek(date);
        return (
          <View key={date} style={styles.weatherContainer}>
            <View style={styles.dayBox}>
              <Text style={styles.week}>{daysOfWeek.toLocaleUpperCase()}</Text>
              <Text style={styles.date}>{date}</Text>
            </View>
            <View style={styles.weatherInfo}>
              <TemperOfDate weatherData={days[date]} />
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default WeatherSection;
