import { UserQuestionnaire } from "@/types";

/**
 * 生成催眠脚本的 Prompt
 */
export function generateHypnosisPrompt(questionnaire: UserQuestionnaire): string {
  const {
    occupation,
    stressors,
    scene,
    voiceStyle,
    duration,
  } = questionnaire;

  // 计算字数（每分钟 100 字）
  const wordCount = duration * 100;

  // 场景风格说明
  const sceneDescriptions = {
    forest: "宁静的森林：描述鸟鸣、微风、树叶沙沙声、阳光透过树叶的光影",
    ocean: "温柔的海浪：描述海浪拍岸、海风、沙滩、远处的海鸥",
    starry: "浩瀚的星空：描述星星闪烁、银河、宁静的夜空、宇宙的浩瀚",
    hometown: "童年的老家：描述老房子的温暖、童年的回忆、熟悉的声音、安全感",
  };

  // 声音风格说明
  const voiceStyles = {
    female: "温柔柔和",
    male: "平稳安定",
  };

  // 压力源应对策略
  const stressorStrategies: Record<string, string> = {
    work: "强调放下工作、放松紧绷的神经",
    emotion: "引导释放情绪、拥抱内心平静",
    health: "强调身体放松、免疫系统强大",
    money: "引导放下忧虑、享受当下",
  };

  // 构建压力源应对文本
  const stressorText = stressors
    .map((s) => {
      const key = Object.keys(stressorStrategies).find((k) =>
        s.includes(stressorStrategies[k as keyof typeof stressorStrategies].split("、")[0])
      );
      return key ? stressorStrategies[key as keyof typeof stressorStrategies] : `强调整体放松、释放${s}带来的压力`;
    })
    .join("、");

  return `你是一位专业的催眠治疗师，请为以下用户定制一个催眠故事。

用户画像：
- 职业：${occupation}
- 压力源：${stressors.join("、")}
- 喜欢的场景：${sceneDescriptions[scene]}
- 期望时长：${duration}分钟

要求：
1. 开头（30秒）：温和引导用户放松，调整呼吸节奏
2. 中间（大部分时长）：${sceneDescriptions[scene]}
3. 结尾（30秒）：温和暗示入睡，逐渐淡化声音
4. 语言风格：${voiceStyles[voiceStyle]}的语气
5. 字数控制在 ${wordCount} 字左右

压力源应对：
- ${stressorText}

请直接输出催眠故事文本，不要包含标题、引言或其他说明文字。`;
}

/**
 * 调用 GPT-4 API 生成催眠脚本
 */
export async function generateHypnosisScript(
  questionnaire: UserQuestionnaire
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const prompt = generateHypnosisPrompt(questionnaire);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "你是一位专业的催眠治疗师，擅长根据用户需求定制个性化的催眠故事。",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`GPT-4 API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  const script = data.choices[0]?.message?.content;

  if (!script) {
    throw new Error("Failed to generate script");
  }

  return script.trim();
}
