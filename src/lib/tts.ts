/**
 * 使用 coze-voice-gen 生成音频
 */
export async function generateAudio(
  text: string,
  voiceStyle: "female" | "male"
): Promise<{ audioUrl: string; duration: number }> {
  // 这里应该调用 coze-voice-gen skill
  // 由于 skill 是在 OpenClaw 环境中运行的，我们需要通过子进程或 API 调用

  // 临时实现：使用本地的音频生成脚本
  // 实际部署时，需要集成 coze-voice-gen API 或使用其他 TTS 服务

  try {
    // 方案 1: 调用本地的 coze-voice-gen 脚本
    const { exec } = require("child_process");
    const util = require("util");
    const execPromise = util.promisify(exec);

    const timestamp = Date.now();
    const outputDir = "./public/audio";
    const outputFile = `${outputDir}/${timestamp}.mp3`;

    // 确保输出目录存在
    const fs = require("fs");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 调用 coze-voice-gen 脚本
    // 注意：这里需要根据实际的 coze-voice-gen 脚本路径调整
    const command = `npx ts-node /workspace/projects/workspace/skills/coze-voice-gen/scripts/tts.ts --text "${text.replace(/"/g, '\\"')}" --output ${outputFile}`;

    const { stdout, stderr } = await execPromise(command);

    if (stderr && !stderr.includes("警告") && !stderr.includes("warning")) {
      console.error("TTS error:", stderr);
    }

    // 返回音频 URL
    const audioUrl = `/audio/${timestamp}.mp3`;

    // 估算时长（粗略计算：每分钟 100 字）
    const duration = Math.ceil(text.length / 100 * 60);

    return { audioUrl, duration };
  } catch (error) {
    console.error("Failed to generate audio:", error);
    throw new Error("Failed to generate audio");
  }
}

/**
 * 备用方案：使用其他 TTS API
 * 如果 coze-voice-gen 不可用，可以使用这个函数
 */
export async function generateAudioFallback(
  text: string,
  voiceStyle: "female" | "male"
): Promise<{ audioUrl: string; duration: number }> {
  // 这里可以集成其他 TTS 服务，如：
  // - Azure TTS
  // - 阿里云 TTS
  // - 腾讯云 TTS
  // - Google Cloud Text-to-Speech

  throw new Error("Fallback TTS not implemented yet");
}
