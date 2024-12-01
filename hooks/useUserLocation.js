import * as Location from "expo-location";
import { useEffect, useState } from "react";

const useUserLocation = async () => {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getLocation = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    // console.log(granted);
    if (granted) {
      try {
        const { coords } = await Location.getCurrentPositionAsync({
          accuracy: 5,
        });

        setLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
        setIsLoading(false);
      } catch (e) {
        console.log("위치정보를 가져오는중 오류발생", e);
      }
    } else {
      console.log("위치권한이 없습니다.");
      return;
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  // useEffect(() => {
  //   if (location) {
  //     console.log("사용자위치: ", location); // ok
  //   }
  // }, [location]);

  return { location, isLoading };
};

export default useUserLocation;
