import React from "react";
import ChatSection from "../components/ai-chat/ChatSection";

const Chat = ({ route }) => {
  const { userLocation, userAddress, userWeathers } = route.params;

  return (
    <ChatSection
      userLocation={userLocation}
      userAddress={userAddress}
      userWeathers={userWeathers}
    />
  );
};

export default Chat;
