import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { chatStyles } from "../../style/chatStyle";
import { globalStyles } from "../../style/globalStyle";
import SendIcon from "../../assets/SendIcon";
import { getAiResponse } from "../../api";
import StyleIcon from "../../assets/StyleIcon";

const styleList = ["캐주얼", "포멀", "스포티", "쿨", "빈티지", "페미닌"];

const ChatRoom = ({ userAddress, userWeathers, aiStyleOptions }) => {
  const flatListRef = useRef();

  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [showStyleOptions, setShowStyleOptions] = useState(false);

  const handleSubmit = async (input) => {
    if (input.trim() === "") return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    const aiAnswer = await getAiResponse(
      input,
      userAddress,
      userWeathers,
      "",
      aiStyleOptions
    );
    const aiMsg = { role: "ai", content: aiAnswer };
    setMessages((prev) => [...prev, aiMsg]);
  };

  const handleClickStyleBtn = () => {
    setShowStyleOptions((prev) => !prev);
  };

  const handleStyleSelection = async (userStyle) => {
    setShowStyleOptions(false);

    const userStyleMsg = {
      role: "user",
      content: `${userStyle}한 스타일 추천해줘`,
    };
    setMessages((prev) => [...prev, userStyleMsg]);

    const aiAnswer = await getAiResponse(
      `${userStyle}한 스타일 추천해줘`,
      userAddress,
      userWeathers,
      userStyle,
      aiStyleOptions
    );
    const aiMsg = { role: "ai", content: aiAnswer };
    setMessages((prev) => [...prev, aiMsg]);
  };

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
        <TouchableOpacity
          style={chatStyles.inputBtn}
          onPress={handleClickStyleBtn}
        >
          <StyleIcon />
        </TouchableOpacity>
        <TextInput
          style={chatStyles.userInput}
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          placeholder="질문을 입력하세요"
          onSubmitEditing={() => handleSubmit(inputValue)}
        />
        <TouchableOpacity
          style={chatStyles.inputBtn}
          onPress={() => handleSubmit(inputValue)}
        >
          <SendIcon />
        </TouchableOpacity>
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
