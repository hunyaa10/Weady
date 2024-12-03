import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../style/globalStyle";
import { settingStyles } from "../../style/settingStyle";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../custom/CustomButton";
import HomeIcon from "../../assets/HomeIcon";

const AiChatStyle = ({ userAddress, userWeathers }) => {
  const navigation = useNavigation();

  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedIntimacy, setSelectedIntimacy] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const naviToHome = () => {
    navigation.navigate("Home");
  };

  const handleSeletGender = (gender) => {
    if (selectedGender !== gender) {
      setSelectedGender(gender);
    } else {
      setSelectedGender(null);
    }
  };
  const handleSeletintimacy = (intimacy) => {
    if (selectedIntimacy !== intimacy) {
      setSelectedIntimacy(intimacy);
    } else {
      setSelectedIntimacy(null);
    }
  };
  const handleSeletCharacter = (character) => {
    if (selectedCharacter !== character) {
      setSelectedCharacter(character);
    } else {
      setSelectedCharacter(null);
    }
  };

  const handleSubmitOfAiStyle = (gender, intimacy, character) => {
    if (!selectedGender || !selectedCharacter) {
      setErrorMsg("모든 설정을 완료해주세요");
      return;
    }

    navigation.navigate("Chat", {
      userAddress,
      userWeathers,
      aiStyleOptions: { gender, character },
    });
  };

  return (
    <View style={globalStyles.container}>
      <View style={settingStyles.titleContainer}>
        <Text style={settingStyles.titleText}>나만의 챗봇 설정</Text>
        <TouchableOpacity onPress={naviToHome}>
          <HomeIcon />
        </TouchableOpacity>
      </View>

      <View style={settingStyles.formContainer}>
        <View style={settingStyles.optionGroup}>
          <Text style={settingStyles.optionTitle}>성별</Text>
          <View style={settingStyles.options}>
            {["남자", "여자"].map((value) => (
              <TouchableOpacity
                key={value}
                style={[
                  settingStyles.option,
                  selectedGender === value && settingStyles.selectedOption,
                ]}
                onPress={() => handleSeletGender(value)}
              >
                <Text
                  style={[
                    settingStyles.optionText,
                    selectedGender === value &&
                      settingStyles.selectedOptionText,
                  ]}
                >
                  {value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* 
        <View style={settingStyles.optionGroup}>
          <Text style={settingStyles.optionTitle}>친밀도</Text>
          <View style={settingStyles.options}>
            {[1, 2, 3, 4, 5].map((value) => (
              <TouchableOpacity
                key={value}
                style={[
                  settingStyles.option,
                  selectedIntimacy === String(value) &&
                    settingStyles.selectedOption,
                ]}
                onPress={() => handleSeletintimacy(String(value))}
              >
                <Text
                  style={[
                    settingStyles.optionText,
                    selectedIntimacy === String(value) &&
                      settingStyles.selectedOptionText,
                  ]}
                >
                  {value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View> */}

        <View style={settingStyles.optionGroup}>
          <Text style={settingStyles.optionTitle}>성격</Text>
          <View style={settingStyles.options}>
            {["소심한", "친절한", "쿨한", "예의없는"].map((value) => (
              <TouchableOpacity
                key={value}
                style={[
                  settingStyles.option,
                  selectedCharacter === value && settingStyles.selectedOption,
                ]}
                onPress={() => handleSeletCharacter(value)}
              >
                <Text
                  style={[
                    settingStyles.optionText,
                    selectedCharacter === value &&
                      settingStyles.selectedOptionText,
                  ]}
                >
                  {value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <View style={settingStyles.errorContainer}>
        <Text style={settingStyles.errorText}>{errorMsg}</Text>
      </View>

      <CustomButton
        text="설정하기"
        style={settingStyles.setBtn}
        onPress={() => handleSubmitOfAiStyle(selectedGender, selectedCharacter)}
      />
    </View>
  );
};

export default AiChatStyle;
