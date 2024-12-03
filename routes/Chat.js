import React from "react";
import ChatRoom from "../components/ai-chat/ChatRoom";

const Chat = ({ route }) => {
  const { userAddress, userWeathers, aiStyleOptions } = route.params;
  // console.log(userWeathers);

  return (
    <ChatRoom
      userAddress={userAddress}
      userWeathers={userWeathers}
      aiStyleOptions={aiStyleOptions}
    />
  );
};

export default Chat;
