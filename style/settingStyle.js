import { Dimensions, StyleSheet } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const settingStyles = StyleSheet.create({
  titleContainer: {
    paddingVertical: 16,
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#333",
    borderBottomWidth: 2,
    marginBottom: 16,
  },
  titleText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 600,
  },

  formContainer: {},
  optionGroup: {
    marginVertical: 16,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 8,
  },
  options: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  option: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#ececec",
    borderWidth: 3,
    borderColor: "#fff",
    borderRadius: 50,
  },
  selectedOption: {
    backgroundColor: "#0D819E",
  },
  optionText: {
    color: "#333",
    fontSize: 16,
    fontWeight: 600,
  },
  selectedOptionText: {
    color: "#fff",
  },

  errorContainer: {},
  errorText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: 600,
    color: "red",
  },

  setBtn: {
    width: SCREEN_WIDTH - 32,
    position: "absolute",
    bottom: 16,
  },
});
