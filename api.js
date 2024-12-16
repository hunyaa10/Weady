import { OPEN_AI_API_KEY } from "@env";

const aiApiKey = OPEN_AI_API_KEY;

// 공통 대답 규칙
const responseRules = `
  대답규칙:
  1. 사용자가 날씨를 질문하면 **기온(섭씨), 바람, 햇빛**을 기준으로 대답한다.
  2. 사용자가 선택한 스타일에 맞는 옷을 **날씨에 맞게** 추천해준다.
`;

// 사용자지역정보
let userInfo = {
  dateInfo: "",
  locationInfo: "",
  weatherInfo: "",
  isUserInfo: false,
};

// 날씨키워드
const isWeatherQuery = (query) => {
  const weatherKeywords = [
    "날씨",
    "기온",
    "온도",
    "바람",
    "비",
    "눈",
    "햇빛",
    "입지",
    "입고",
    "밖에",
    "입을까",
    "추천",
    "옷",
  ];
  return weatherKeywords.some((keyword) => query.includes(keyword));
};

export const fetchAiResponse = async (userQuery) => {
  const fullQuery = `
    ${userQuery}, ${responseRules}
  `;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${aiApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: fullQuery }],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    // console.log(data.choices[0].message.content);
    return data.choices[0].message.content;
  } catch (e) {
    console.log("AI 응답을 가져오는 중 오류 발생:", e.message);
    return "AI 응답을 가져오는 중 오류가 발생했습니다.";
  }
};

export const selectedAiStyleForUser = (gender, character, type) => {
  let responseStyle = [];
  if (gender) {
    responseStyle.push(`너의 성별은 ${gender}야.`);
  }
  if (type) {
    responseStyle.push(`**${type}로 대답해.**`);
  }
  if (character) {
    if (character === "소심한") {
      responseStyle.push(
        "너는 소심한 성격을 가진 AI야. 매우 **소극적이고, 불안해하며, 확신이 없는 사람**처럼 대답해."
      );
    } else if (character === "진지한") {
      responseStyle.push(
        "너는 진지한 성격을 가진 AI야. **공식적이고 신중한 방식**으로 대답해."
      );
    } else if (character === "친구같은") {
      responseStyle.push(
        "너는 친구같은 성격을 가진 AI야. **10년지기 친구처럼** 반말을 사용하고, 농담이나 이모티콘도 많이 사용해."
      );
    } else if (character === "유머있는") {
      responseStyle.push(
        "너는 유머러스한 성격을 가진 AI야. 굉장히 유쾌하고 즐거운 이모티콘을 많이 사용하고, **언어유희를 포함**시켜서 대답해."
      );
    } else if (character === "우울한") {
      responseStyle.push(
        "너는 우울한 성격을 가진 AI야. 다소 무기력하고 **우울한 감정**이 드러나도록 대답해. 우울한 이모티콘도 사용해."
      );
    } else {
      responseStyle.push(`너는 ${character} 성격을 가진 AI야.`);
    }
  }

  // console.log("지정한 ai스타일:", responseStyle.join(", "));
  return responseStyle.join(", ");
};

export const getAiResponse = async (
  userQuery,
  userAddress,
  userWeathers,
  matchedStyle = "",
  aiStyleOptions = {}
) => {
  const { gender, character, type } = aiStyleOptions;

  const aiStyle = selectedAiStyleForUser(gender, character, type);

  const isWeatherKeyword = isWeatherQuery(userQuery);

  if (!userInfo.isUserInfo) {
    const dateInfo = `오늘 날짜는 ${Object.keys(userWeathers)[0]}야`;
    const locationInfo = `내가 살고있는 지역은 ${userAddress}야`;
    const weatherInfo = `내가 살고있는 지역의 날씨정보는 ${JSON.stringify(
      userWeathers
    )}야. 기온은 *'temp - 273.15'*로 바꿔서 얘기해줘.`;

    userInfo = { dateInfo, locationInfo, weatherInfo, isUserInfo: true };
  }

  const baseQuery = `
    ${userQuery}, AI(너) 특징: ${aiStyle}
  `;

  let finalQuery = baseQuery;

  if (matchedStyle !== "") {
    finalQuery = `${baseQuery}, 내가 선택한 스타일: ${matchedStyle}`;
  }

  if (isWeatherKeyword) {
    finalQuery = `${baseQuery}, ${userInfo.dateInfo}, ${userInfo.locationInfo}, ${userInfo.weatherInfo}`;
  }

  // console.log(finalQuery);

  const aiResponse = await fetchAiResponse(finalQuery);
  return aiResponse;
};
