import { OPEN_AI_API_KEY } from "@env";

const aiApiKey = OPEN_AI_API_KEY;

export const fetchAiResponse = async (userQuery) => {
  const fullQuery = `
    ${userQuery}
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
        max_tokens: 500,
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

export const getPersonalizedResponse = async (
  userQuery,
  userAddress,
  userWeathers
) => {
  const dateInfo = `오늘 날짜는 ${Object.keys(userWeathers)[0]}입니다.`;
  const locationInfo = `사용자가 살고있는 지역은 ${userAddress}입니다.`;
  const weatherInfo = `사용자가 살고있는 지역의 날씨정보는 ${JSON.stringify(
    userWeathers
  )}입니다. 오늘날짜를 기준으로 5일의 날씨정보를 가지고 있습니다.`;

  const fullQuery = `
    오늘 날짜: ${dateInfo},
    사용자 위치 정보: ${locationInfo},
    사용자 위치기준 날씨 정보: ${weatherInfo},
    질문: ${userQuery}
    대답규칙
    1. 복장 관련 질문일 경우 스타일을 선택하도록 대답해줘
    2. 스타일종류는 캐주얼, 포멀, 스포티, 쿨, 빈티지, 페미닌이야
    3. 날씨만 물으면 날씨만 대답해
    4. 10년지기 친구처럼 **반말로** 대답해
    5. **반드시** 존댓말은 사용하지 않도록 해.
  `;

  const aiResponse = await fetchAiResponse(fullQuery);

  if (userQuery.includes("오늘 뭐 입지?")) {
    return "원하는 스타일을 선택해: 캐주얼, 포멀, 스포티, 쿨, 빈티지, 페미닌";
  }

  return aiResponse;
};

export const getClothingRecommendation = async (style) => {
  const styleQuery = `
  사용자가 선택한 스타일: ${style},
  대답규칙
  1. 사용자가 선택한 스타일에 맞는 옷을 **날씨랑 맞게** 추천해줘
  2. 상의, 하의, 신발, 악세사리로 분류해서 대답해줘
  3. 10년지기 친구처럼 **반말로** 대답해
  4. **반드시** 존댓말은 사용하지 않도록 해.
`;

  const aiResponse = await fetchAiResponse(styleQuery);

  return aiResponse;
};
