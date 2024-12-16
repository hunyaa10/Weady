import { Dimensions, StyleSheet } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const chatStyles = StyleSheet.create({
  messagesList: {
    flex: 1,
    width: SCREEN_WIDTH - 32,
    marginBottom: 60,
  },
  messageContainer: {
    maxWidth: "80%",
    marginVertical: 5,
    padding: 10,
    borderRadius: 16,
  },
  userMessage: {
    backgroundColor: "#C9E4EB",
    alignSelf: "flex-end",
    borderBottomEndRadius: 0,
    marginBottom: 8,
  },
  aiMessage: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    borderBottomStartRadius: 0,
    marginBottom: 8,
  },
  messageText: {
    fontSize: 16,
  },

  inputContainer: {
    width: SCREEN_WIDTH,
    height: 70,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 99,
  },
  userInput: {
    width: "75%",
    height: 40,
    borderColor: "#c8c8c8",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
  },

  sendBtn: {
    padding: 10,
    backgroundColor: "#0D819E",
    borderRadius: 10,
  },
  inputBtn: {
    padding: 5,
    backgroundColor: "#0D819E10",
    borderRadius: 50,
  },

  styleOptionsWrapper: {
    width: SCREEN_WIDTH,
    height: "auto",
    padding: 16,
    position: "relative",
    bottom: 70 - 16,
    left: -16,
    zIndex: 9,
    backgroundColor: "#EDF1F4",
  },
  styleOptionTitle: {
    marginBottom: 16,
    textAlign: "center",
    fontSize: 16,
    fontWeight: 600,
    color: "#0D819E",
  },
  styleOptionsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  styleOptionText: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 14,
    fontWeight: 600,
    textAlign: "center",
  },
});
