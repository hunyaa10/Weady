import { Dimensions, StyleSheet } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const mainStyles = StyleSheet.create({
  header: {
    paddingVertical: 16,
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#000",
    borderBottomWidth: 3,
    marginBottom: 16,
    position: "relative",
  },
  cityName: {
    fontSize: 32,
    fontWeight: 600,
  },

  scroll: {},
  weatherContainer: {
    width: SCREEN_WIDTH - 32,
  },
  dayBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  week: {
    fontSize: 48,
    fontWeight: 600,
  },
  date: {
    fontSize: 20,
  },

  weatherInfo: {
    marginTop: "10%",
  },

  weatherWrapper: {
    justifyContent: "space-between",
  },

  thumbnailWeather: {
    alignItems: "center",
  },
  currentTemper: {
    fontSize: 158,
    fontWeight: 600,
  },
  scriptBox: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  currentDescription: {
    fontSize: 24,
  },

  temperBox: {
    marginTop: "20%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  temper: {
    alignItems: "center",
  },

  timeFont: {
    fontSize: 16,
    fontWeight: 600,
  },
  temperFont: {
    fontSize: 32,
  },

  menuContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - 64,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 99,
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  cityList: {
    padding: 16,
  },
  city: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  cityText: {
    fontSize: 20,
    fontWeight: 600,
    color: "#fff",
    textAlign: "center",
  },
  menuCloseBtn: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "transparent",
    zIndex: 100,
    borderWidth: 1,
    borderColor: "#fff",
  },
});
