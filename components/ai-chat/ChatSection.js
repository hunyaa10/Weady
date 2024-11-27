import React, { useState } from "react";
import { OPEN_AI_API_KEY } from "@env";
import { FlatList, Text, TextInput, View } from "react-native";
import { chatStyles } from "../../style/chatStyle";
import { globalStyles } from "../../style/globalStyle";
import CustomButton from "../custom/CustomButton";

import SendIcon from "../../icon/send.svg";

const ChatSection = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  const getOpenAiResponse = async (userQuery) => {
    const aiApiKey = OPEN_AI_API_KEY;
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${aiApiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userQuery }],
            max_tokens: 100,
          }),
        }
      );

      const data = await response.json();
      // console.log(data.choices[0].message.content);
      const answer = data.choices[0].message.content;
      return answer;
    } catch (e) {
      console.log("AI응답을 가져오는 중 오류발생: ", e.message);
    }
  };

  const handleSubmit = async (input) => {
    if (input.trim() === "") return;

    const userMsg = { role: "user", content: input };
    console.log(userMsg);
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    const aiAnswer = await getOpenAiResponse(input);
    console.log(aiAnswer);
    const aiMsg = { role: "assistant", content: aiAnswer };
    setMessages((prev) => [...prev, aiMsg]);
  };

  // 대화 내용 표시
  const renderItem = ({ item }) => (
    <View
      style={[
        chatStyles.messageContainer,
        item.role === "user" ? chatStyles.userMessage : chatStyles.aiMessage,
      ]}
    >
      <Text style={chatStyles.messageText}>{item.content}</Text>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={chatStyles.messagesList}
      />

      <View style={chatStyles.inputContainer}>
        <TextInput
          style={chatStyles.userInput}
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          placeholder="질문을 입력하세요"
        />
        <CustomButton
          imageSource={SendIcon}
          iconSize={"small"}
          onPress={() => handleSubmit(inputValue)}
        />
      </View>
    </View>
  );
};

export default ChatSection;
