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
import { getClothingRecommendation, getPersonalizedResponse } from "../../api";

const styleList = ["캐주얼", "포멀", "스포티", "쿨", "빈티지", "페미닌"];

const ChatSection = ({ userAddress, userWeathers }) => {
  const flatListRef = useRef();

  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [showStyleOptions, setShowStyleOptions] = useState(false);

  const handleSubmit = async (input) => {
    if (input.trim() === "") return;

    const userMsg = { role: "user", content: input };
    // console.log(userMsg); //
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // AI 응답
    const aiAnswer = await getPersonalizedResponse(
      input,
      userAddress,
      userWeathers
    );
    // console.log(aiAnswer); //
    const aiMsg = { role: "assistant", content: aiAnswer };
    setMessages((prev) => [...prev, aiMsg]);

    // 스타일선택 시 응답
    if (
      aiAnswer.includes("스타일") ||
      aiAnswer.includes("옷") ||
      aiAnswer.includes("선택") ||
      aiAnswer.includes("추천")
    ) {
      setShowStyleOptions(true);
    }
  };

  const handleStyleSelection = async (style) => {
    // setSelectedStyle(style);
    setShowStyleOptions(false);

    const styleResponse = await getClothingRecommendation(style);
    const styleMsg = { role: "assistant", content: styleResponse };
    setMessages((prev) => [...prev, styleMsg]);
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

export default ChatSection;
