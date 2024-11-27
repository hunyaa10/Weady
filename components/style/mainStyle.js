import { Dimensions, StyleSheet } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#EDF1F4",
  },
  header: {
    padding: 16,
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#000",
    borderBottomWidth: 3,
    marginBottom: 16,
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
  icon: {
    // marginTop: 2,
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
});
