import React from "react";
import ChatSection from "../components/ai-chat/ChatSection";

const Chat = ({ route }) => {
  const { userAddress, userWeathers } = route.params;

  return <ChatSection userAddress={userAddress} userWeathers={userWeathers} />;
};

export default Chat;
