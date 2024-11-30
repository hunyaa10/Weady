import React, { useEffect, useRef, useState } from "react";
import { OPEN_AI_API_KEY } from "@env";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import { chatStyles } from "../../style/chatStyle";
import { globalStyles } from "../../style/globalStyle";
import CustomButton from "../custom/CustomButton";
import SendIcon from "../../assets/SendIcon";

const ChatSection = ({ userAddress, userWeathers }) => {
  // console.log(userAddress, userWeathers, Object.keys(userWeathers)[0]);
  const flatListRef = useRef();

  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  const getOpenAiResponse = async (userQuery) => {
    const aiApiKey = OPEN_AI_API_KEY;

    const dateInfo = `오늘 날짜는 ${Object.keys(userWeathers)[0]}입니다.`;
    const locationInfo = `사용자가 살고있는 지역은 ${userAddress}입니다.`;
    const weatherInfo = `사용자가 살고있는 지역의 날씨정보는 ${userWeathers}입니다. 오늘날짜를 기준으로 5일의 날씨정보를 가지고 있습니다.`;
    const fullQuery = `
      오늘 날짜: ${dateInfo},
      사용자 위치 정보: ${locationInfo},
      사용자 위치기준 날씨 정보: ${weatherInfo},
      질문: ${userQuery}(복장관련질문이면 날씨정보를 기반으로 대답해. 날짜, 온도(섭씨기준), 바람, description이 중요한 정보야. 10년이상된 친구처럼 반말로 대답해줘)
    `;

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
            messages: [{ role: "user", content: fullQuery }],
            max_tokens: 200,
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
    // console.log(userMsg); //
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    const aiAnswer = await getOpenAiResponse(input);
    // console.log(aiAnswer); //
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
  // 메세지스크롤 가장하단으로
  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <KeyboardAvoidingView
      style={globalStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <FlatList
        ref={flatListRef}
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
          onSubmitEditing={() => handleSubmit(inputValue)}
        />
        <CustomButton onPress={() => handleSubmit(inputValue)}>
          <SendIcon />
        </CustomButton>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatSection;
