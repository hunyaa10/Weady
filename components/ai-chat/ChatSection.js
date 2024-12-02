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
import {
  getResponseOfStyle,
  getAutoResponse,
  getResponseOfArea,
} from "../../api";

const styleList = ["캐주얼", "포멀", "스포티", "쿨", "빈티지", "페미닌"];
const areaList = ["결혼식", "장례식", "상견례", "집들이", "면접"];

const ChatSection = ({ userAddress, userWeathers }) => {
  const flatListRef = useRef();

  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [showStyleOptions, setShowStyleOptions] = useState(false);

  const handleSubmit = async (input) => {
    if (input.trim() === "") return;

    const userMsg = { role: "user", content: input };
    // console.log(userMsg); //
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // 장소응답
    const matchedArea = areaList.find((area) => input.includes(area));
    if (matchedArea) {
      const areaResponse = await getResponseOfArea(matchedArea);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: areaResponse },
      ]);
      return;
    }

    // 옷추천응답
    if (
      input.trim().includes("입지") ||
      input.trim().includes("입고가지") ||
      input.trim().includes("옷") ||
      input.trim().includes("추천") ||
      input.trim().includes("스타일")
    ) {
      const fixedAnswer = "어떤 스타일이 좋아?";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: fixedAnswer },
      ]);
      setShowStyleOptions(true);
      return;
    }

    // 자동응답
    const aiAnswer = await getAutoResponse(input, userAddress, userWeathers);
    // console.log(aiAnswer); //
    const aiMsg = { role: "assistant", content: aiAnswer };
    setMessages((prev) => [...prev, aiMsg]);
  };

  const handleStyleSelection = async (style) => {
    setShowStyleOptions(false);

    const userStyleMsg = {
      role: "user",
      content: `${style}한 스타일 추천해줘`,
    };
    setMessages((prev) => [...prev, userStyleMsg]);

    const styleResponse = await getResponseOfStyle(style);
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
