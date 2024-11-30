import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  Text,
  View,
} from "react-native";
import { menuStyles } from "../../style/menuStyle";
import CustomButton from "../custom/CustomButton";

const menuList = ["채팅봇설정", "내프로필"];
const SCREEN_WIDTH = Dimensions.get("window").width;

const SideMenu = ({ showSideMenu, setShowSideMenu }) => {
  const translateX = useRef(new Animated.Value(SCREEN_WIDTH)).current;

  useEffect(() => {
    if (showSideMenu) {
      Animated.timing(translateX, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(translateX, {
        toValue: SCREEN_WIDTH,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  }, [showSideMenu, translateX]);

  return (
    <Animated.View
      style={[
        menuStyles.sideMenuContainer,
        {
          transform: [{ translateX }],
        },
      ]}
    >
      <FlatList
        style={menuStyles.menuList}
        data={menuList}
        renderItem={({ item }) => (
          <View style={menuStyles.menu}>
            <Text style={menuStyles.menuText}>{item}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <CustomButton
        onPress={() => setShowSideMenu(false)}
        text="CLOSE"
        style={menuStyles.menuCloseBtn}
      />
    </Animated.View>
  );
};

export default SideMenu;
