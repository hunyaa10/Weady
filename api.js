import { OPEN_AI_API_KEY } from "@env";

const aiApiKey = OPEN_AI_API_KEY;

// 공통 대답 규칙
const responseRules = `
  대답규칙:
  1. 사용자가 복장이나 날씨를 묻지않으면 그에 관해 대답하지말고 일상대화를 해줘.
  2. 복장 관련 질문일 경우 스타일을 선택하도록 대답해.
  3. 사용자가 선택한 스타일 또는 장소에 맞는 옷을 **날씨랑 맞게** 추천해줘.
`;

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

export const selectedAiStyleFromUser = (gender, character) => {
  let responseStyle = [];
  if (gender) {
    responseStyle.push(`너의 성별은 ${gender}야.`);
  }
  // if (intimacy) {
  //   responseStyle.push(
  //     `ai와 사용자의 친밀도는 5점 만점에 ${intimacy}점이야.`
  //     // `3점이하일 경우 ai는 존댓말을 사용하고, 4점이상일 경우 반말을 사용해서 대답해.`
  //   );
  // }
  if (character) {
    responseStyle.push(
      `너의 성격은 ${character} 성격이야. **성격에 맞게** 대답해.`
    );
    if (character === "예의없는") {
      responseStyle.push("너는 무례한 태도를 가지고 반말로 대답해야해");
    }
  }

  // console.log("지정한 ai스타일:", responseStyle.join(", "));
  return responseStyle.join(", ");
};

export const getAutoResponse = async (
  userQuery,
  userAddress,
  userWeathers,
  matchedArea = "",
  matchedStyle = "",
  aiStyleOptions = {}
) => {
  const { gender, character } = aiStyleOptions;

  const dateInfo = `오늘 날짜는 ${Object.keys(userWeathers)[0]}야`;
  const locationInfo = `사용자가 살고있는 지역은 ${userAddress}야`;
  const weatherInfo = `사용자가 살고있는 지역의 날씨정보는 ${userWeathers}야. 오늘날짜를 기준으로 5일의 날씨정보를 가지고 있어.`;
  const aiStyle = selectedAiStyleFromUser(gender, character);

  const baseQuery = `
    오늘 날짜: ${dateInfo},
    사용자 위치 정보: ${locationInfo},
    사용자 위치기준 날씨 정보: ${weatherInfo}(기온은 **섭씨**로 얘기해),
    질문: ${userQuery}
    대답하는 ai답변 스타일: ${aiStyle}
  `;

  let finalQuery = baseQuery;

  if (matchedArea !== "") {
    finalQuery = `${baseQuery}, 사용자가 참석예정인 장소: ${matchedArea}`;
  }

  if (matchedStyle !== "") {
    finalQuery = `${baseQuery}, 사용자가 선택한 스타일: ${matchedStyle}`;
  }

  // console.log(finalQuery);

  const aiResponse = await fetchAiResponse(finalQuery);
  return aiResponse;
};
