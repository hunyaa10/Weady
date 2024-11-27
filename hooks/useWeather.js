import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { WEATHER_API_KEY } from "@env";

const groupByDate = (weatherData) => {
  const grouped = {};

  weatherData.forEach((data) => {
    const date = data.dt_txt.split(" ")[0];

    if (!grouped[date]) {
      grouped[date] = [];
    }

    grouped[date].push(data);
  });

  return grouped;
};

const useWeather = () => {
  const [address, setAddress] = useState("");
  const [days, setDays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getWeatherInfo = async (latitude, longitude) => {
    const weatherApiKey = WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${weatherApiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data.city.name); // 지역이름
      // console.log(data.list); // 5일간날씨정보(3시간간격)
      const city = data.city.name;
      const daysWeather = data.list;

      const groupedWeather = groupByDate(daysWeather);
      return { city, groupedWeather };
    } catch (e) {
      console.log("지역별 날씨정보를 가져오는 중 오류발생: ", e);
    } finally {
      setIsLoading(false);
    }
  };

  const getLocation = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    // console.log(granted);
    if (!granted) {
      setIsLoading(false);
      return;
    }

    const location = await Location.getCurrentPositionAsync({ accuracy: 5 });
    // console.log(location);
    const { latitude, longitude } = location.coords;

    const { city, groupedWeather } = await getWeatherInfo(latitude, longitude);
    setAddress(city);
    setDays(groupedWeather);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { address, days, isLoading };
};

export default useWeather;