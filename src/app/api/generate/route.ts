import { NextRequest, NextResponse } from "next/server";
import { generateHypnosisScript } from "@/lib/openai";
import { generateAudio } from "@/lib/tts";
import { UserQuestionnaire } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const questionnaire: UserQuestionnaire = body;

    // 验证问卷数据
    if (!questionnaire.occupation?.trim()) {
      return NextResponse.json(
        { success: false, error: "职业不能为空" },
        { status: 400 }
      );
    }

    if (!questionnaire.stressors || questionnaire.stressors.length === 0) {
      return NextResponse.json(
        { success: false, error: "请选择至少一个压力源" },
        { status: 400 }
      );
    }

    // 检查是否配置了 API Key
    const apiKey = process.env.OPENAI_API_KEY;
    const useMockData = !apiKey || apiKey === "";

    let script: string;
    let audioUrl: string;
    let duration: number;

    if (useMockData) {
      console.log("未配置 OPENAI_API_KEY，使用模拟数据");
      // 使用模拟数据（用于 UI 测试）
      script = generateMockScript(questionnaire);
      audioUrl = "/audio/mock.mp3"; // 模拟音频文件
      duration = questionnaire.duration * 60;
    } else {
      // Step 1: 生成催眠脚本
      console.log("生成催眠脚本...");
      script = await generateHypnosisScript(questionnaire);
      console.log("脚本生成完成，长度:", script.length);

      // Step 2: 生成音频
      console.log("生成音频...");
      const result = await generateAudio(
        script,
        questionnaire.voiceStyle
      );
      audioUrl = result.audioUrl;
      duration = result.duration;
      console.log("音频生成完成:", audioUrl);
    }

    // Step 3: 保存到数据库
    // 注意：这里需要等数据库配置完成后才能正常工作
    // 暂时返回模拟数据
    const storyId = generateId();

    // 保存到 localStorage（前端会读取）
    // 由于这是 API，无法直接设置 localStorage
    // 我们在响应中返回脚本，前端会保存

    // TODO: 实际保存到数据库
    // const story = await prisma.hypnosisStory.create({
    //   data: {
    //     userId: generateId(), // 临时用户 ID
    //     occupation: questionnaire.occupation,
    //     stressors: JSON.stringify(questionnaire.stressors),
    //     scene: questionnaire.scene,
    //     voiceStyle: questionnaire.voiceStyle,
    //     duration: questionnaire.duration,
    //     script,
    //     audioUrl,
    //     audioLength: duration,
    //   },
    // });

    const response = NextResponse.json({
      success: true,
      id: storyId,
      script,
      audioUrl,
      duration,
    });

    // 设置一个自定义 header，让前端保存到 localStorage
    response.headers.set("X-Story-Id", storyId);

    return response;
  } catch (error) {
    console.error("生成失败:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "生成失败",
      },
      { status: 500 }
    );
  }
}

// 生成简单的 ID（临时方案）
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// 生成模拟脚本（用于测试）
function generateMockScript(questionnaire: UserQuestionnaire): string {
  const { occupation, stressors, scene, voiceStyle, duration } = questionnaire;

  const sceneNames = {
    forest: "宁静的森林",
    ocean: "温柔的海浪",
    starry: "浩瀚的星空",
    hometown: "童年的老家",
  };

  const sceneText = {
    forest: "森林里鸟鸣声此起彼伏，微风轻拂，树叶沙沙作响。阳光透过树叶洒下斑驳的光影，空气中弥漫着青草的清香。",
    ocean: "海浪轻轻拍打着海岸，海风轻抚脸庞。沙滩上留下一串串脚印，远处的海鸥在自由飞翔。海水的蓝色温柔而深沉，像你的呼吸一样平静。",
    starry: "夜空中繁星点点，银河缓缓流淌。每一颗星星都在眨眼，像是无数个温柔的目光。宇宙浩瀚无垠，你的思绪也随之飘向远方，所有烦恼都变得渺小。",
    hometown: "老房子的墙壁依然温暖，童年的记忆涌上心头。熟悉的书架、旧书、窗外的蝉鸣，一切都那么安心。在这里，你感受到无条件的爱与安全。",
  };

  return `你好，${occupation}。现在，请放松你的身心，找一个最舒服的姿势，闭上眼睛。

首先，深呼吸...吸气...感受空气充满你的胸腔...呼气...让所有的压力都随着呼吸释放出去。

再来一次，更深地吸气...更慢地呼气...很好，你做得很好。

现在，想象你来到了${sceneNames[scene]}。${sceneText[scene]}

你听到了${voiceStyle === "female" ? "温柔的女声" : "沉稳的男声"}在引导你，每一步都让你更加放松。你的肩颈放松了，你的手臂放松了，你的腿部也完全放松了。

所有的压力${stressors.join("、")}都慢慢消散，像云朵一样飘向远方。你的内心变得平静、安宁，就像${sceneNames[scene]}一样宁静。

现在，开始数数，每数一个数，你都会更加困倦、更加放松。

十...你的眼皮越来越重...

九...你的身体越来越轻...

八...你的思绪越来越慢...

七...所有的烦恼都已远去...

六...平静的暖流包裹着你...

五...你感到无比的舒适...

四...渐渐地，进入梦乡...

三...二...一...

晚安，好好休息吧。愿你有一个美好的睡眠。`;
}
