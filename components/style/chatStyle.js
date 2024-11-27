import { Dimensions, StyleSheet } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const chatStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  messagesList: {
    flex: 1,
    width: SCREEN_WIDTH - 32,
  },
  messageContainer: {
    maxWidth: "80%",
    marginVertical: 5,
    padding: 10,
    borderRadius: 16,
  },
  userMessage: {
    backgroundColor: "#cce5ff",
    alignSelf: "flex-end",
    borderBottomEndRadius: 0,
  },
  aiMessage: {
    backgroundColor: "#f0f0f0",
    alignSelf: "flex-start",
    borderBottomStartRadius: 0,
  },
  messageText: {
    fontSize: 16,
    color: "#000",
  },

  inputContainer: {
    width: SCREEN_WIDTH,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 20,
  },
  userInput: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
  },
  inputBtn: {},
});
