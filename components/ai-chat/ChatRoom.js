import React, { useEffect, useRef, useState } from "react";
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
import { getAutoResponse } from "../../api";

const styleList = ["캐주얼", "포멀", "스포티", "쿨", "빈티지", "페미닌"];
const areaList = ["결혼식", "장례식", "상견례", "집들이", "면접"];

const ChatRoom = ({ userAddress, userWeathers, aiStyleOptions }) => {
  // console.log(aiStyleOptions); // ok
  const flatListRef = useRef();

  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [showStyleOptions, setShowStyleOptions] = useState(false);

  const handleSubmit = async (input) => {
    // console.log("submit 확인", aiStyleOptions); // ok
    if (input.trim() === "") return;

    const userMsg = { role: "user", content: input };
    // console.log(userMsg); //
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // 장소응답
    const matchedArea = areaList.find((area) => input.includes(area));
    if (matchedArea) {
      const aiAnswer = await getAutoResponse(
        input,
        userAddress,
        userWeathers,
        matchedArea,
        "",
        aiStyleOptions
      );
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: aiAnswer },
      ]);
      return;
    }

    const aiAnswer = await getAutoResponse(
      input,
      userAddress,
      userWeathers,
      "",
      "",
      aiStyleOptions
    );
    // console.log(aiAnswer); //
    setMessages((prev) => [...prev, { role: "assistant", content: aiAnswer }]);

    // 옷추천응답
    const clothingKeywords = ["스타일", "옷", "입고", "추천"];
    const isClothingAnswer = clothingKeywords.some((keyword) =>
      aiAnswer.includes(keyword)
    );

    if (isClothingAnswer) {
      setShowStyleOptions(true);
      return;
    }
  };

  const handleStyleSelection = async (userStyle) => {
    setShowStyleOptions(false);

    const userStyleMsg = {
      role: "user",
      content: `${userStyle}한 스타일 추천해줘`,
    };
    setMessages((prev) => [...prev, userStyleMsg]);

    const aiAnswer = await getAutoResponse(
      `${userStyle}한 스타일 추천해줘`,
      userAddress,
      userWeathers,
      "",
      userStyle,
      aiStyleOptions
    );
    setMessages((prev) => [...prev, { role: "assistant", content: aiAnswer }]);
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
      {showStyleOptions && (
        <View style={chatStyles.styleOptionsWrapper}>
          <Text style={chatStyles.styleOptionTitle}>
            원하는 스타일을 선택하세요
          </Text>
          <FlatList
            data={styleList}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Text
                style={chatStyles.styleOptionText}
                onPress={() => handleStyleSelection(item)}
              >
                {item}
              </Text>
            )}
            contentContainerStyle={chatStyles.styleOptionsContainer}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;
