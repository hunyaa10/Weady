import { Dimensions, StyleSheet } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const menuStyles = StyleSheet.create({
  wrapper: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "rgba(0,0,0,0.2)",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 99,
  },
  menuContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 2,
    position: "absolute",
    left: 0,
    zIndex: 100,
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 10,
    elevation: 10,
    paddingBottom: 120,
  },
  cityList: {
    padding: 16,
  },
  city: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cityText: {
    fontSize: 20,
    fontWeight: 600,
    color: "#000",
    textAlign: "center",
  },
  menuCloseBtn: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#ccc",
    zIndex: 101,
  },

  sideMenuContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "#fff",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 99,
  },
  menuList: {
    padding: 16,
  },
  menu: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  menuText: {
    fontSize: 20,
    fontWeight: 600,
    color: "#000",
    textAlign: "center",
  },
});
