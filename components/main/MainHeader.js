import React from "react";
import { styles } from "../style/mainStyle";
import { Text, View } from "react-native";

const MainHeader = ({ isLoading, address }) => {
  return (
    <View style={styles.header}>
      <Text>||</Text>
      <Text style={styles.cityName}>
        {isLoading ? "loading..." : `${address}`}
      </Text>
      <Text>||</Text>
    </View>
  );
};

export default MainHeader;
