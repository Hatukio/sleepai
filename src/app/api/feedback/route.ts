import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      storyId,
      rating,
      completed,
      likes,
      dislikes,
      willingness,
      moreFeatures,
    } = body;

    // 验证必填字段
    if (!rating || !completed) {
      return NextResponse.json(
        { success: false, error: "请填写必填项" },
        { status: 400 }
      );
    }

    // TODO: 保存到数据库
    // await prisma.feedback.create({
    //   data: {
    //     storyId,
    //     rating,
    //     completed,
    //     likes,
    //     dislikes,
    //     willingness,
    //     moreFeatures,
    //   },
    // });

    console.log("收到反馈:", {
      storyId,
      rating,
      completed,
      willingness,
    });

    // 保存到临时文件（用于测试）
    const fs = require("fs");
    const feedbackData = {
      storyId,
      rating,
      completed,
      likes,
      dislikes,
      willingness,
      moreFeatures,
      timestamp: new Date().toISOString(),
    };

    const feedbackFile = "./feedbacks.json";
    let feedbacks = [];

    if (fs.existsSync(feedbackFile)) {
      const data = fs.readFileSync(feedbackFile, "utf-8");
      feedbacks = JSON.parse(data);
    }

    feedbacks.push(feedbackData);
    fs.writeFileSync(feedbackFile, JSON.stringify(feedbacks, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("保存反馈失败:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "保存失败",
      },
      { status: 500 }
    );
  }
}
