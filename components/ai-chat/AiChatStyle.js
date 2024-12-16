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
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
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
  const handleSeletCharacter = (character) => {
    if (selectedCharacter !== character) {
      setSelectedCharacter(character);
    } else {
      setSelectedCharacter(null);
    }
  };
  const handleSeletType = (type) => {
    if (selectedType !== type) {
      setSelectedType(type);
    } else {
      setSelectedType(null);
    }
  };

  const handleSubmitOfAiStyle = (gender, character, type) => {
    if (!selectedGender || !selectedCharacter || !selectedType) {
      setErrorMsg("모든 설정을 완료해주세요");
      return;
    } else {
      navigation.navigate("Chat", {
        userAddress,
        userWeathers,
        aiStyleOptions: { gender, character, type },
      });
      setErrorMsg("");
    }
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

        <View style={settingStyles.optionGroup}>
          <Text style={settingStyles.optionTitle}>말투</Text>
          <View style={settingStyles.options}>
            {["존댓말", "반말"].map((value) => (
              <TouchableOpacity
                key={value}
                style={[
                  settingStyles.option,
                  selectedType === value && settingStyles.selectedOption,
                ]}
                onPress={() => handleSeletType(value)}
              >
                <Text
                  style={[
                    settingStyles.optionText,
                    selectedType === value && settingStyles.selectedOptionText,
                  ]}
                >
                  {value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={settingStyles.optionGroup}>
          <Text style={settingStyles.optionTitle}>성격</Text>
          <View style={settingStyles.options}>
            {[
              "친절한",
              "소심한",
              "진지한",
              "친구같은",
              "유머있는",
              "우울한",
            ].map((value) => (
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
        onPress={() =>
          handleSubmitOfAiStyle(selectedGender, selectedCharacter, selectedType)
        }
      />
    </View>
  );
};

export default AiChatStyle;
