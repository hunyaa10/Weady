import React from "react";
import AiChatStyle from "../components/ai-chat/AiChatStyle";

const ChatSetting = ({ route }) => {
  const { userAddress, userWeathers } = route.params;

  return <AiChatStyle userAddress={userAddress} userWeathers={userWeathers} />;
};

export default ChatSetting;
