# 开发测试指南

## 快速测试（无需配置 API Key）

如果你想快速测试 UI 和流程，可以先不配置 API Key，系统会使用模拟数据。

## 完整测试（需要 API Key）

### 1. 配置环境变量

编辑 `.env` 文件，填入你的 OpenAI API Key：

```env
OPENAI_API_KEY="your_openai_api_key_here"
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 3. 测试流程

1. **首页** - 填写 5 个问题
2. **播放器** - 查看生成的催眠音频
3. **反馈** - 填写反馈问卷
4. **感谢** - 查看感谢页面

## 注意事项

1. **首次测试**：会生成真实的 GPT-4 响应，需要 OpenAI API Key
2. **音频生成**：需要 coze-voice-gen 正常工作
3. **数据库**：当前使用文件存储（feedbacks.json），未来会迁移到数据库

## 常见问题

### Q: 提示 "OPENAI_API_KEY is not configured"
A: 在 `.env` 文件中配置你的 OpenAI API Key

### Q: 音频播放失败
A: 检查 `public/audio` 目录是否有权限，确保音频文件生成成功

### Q: 反馈提交失败
A: 检查项目根目录的 `feedbacks.json` 文件是否有写入权限

## 费用估算

- GPT-4 API：每次生成约 $0.01-0.02（1000 tokens）
- 测试 10 次约 $0.10-0.20
