# SleepAI MVP - AI 助眠工具

一个基于 AI 的个性化催眠故事生成器，帮助失眠用户快速入睡。

## 🎯 项目目标

在 2 周内开发并测试 MVP，验证市场需求和用户付费意愿。

---

## ✅ 功能特性

### 核心功能（MVP）

1. **用户问卷** - 收集用户信息
   - 职业背景
   - 压力源（可多选）
   - 喜欢的场景
   - 声音偏好
   - 期望时长

2. **AI 催眠脚本生成**
   - 基于 GPT-4 API
   - 根据用户画像定制内容
   - 专业催眠治疗师风格

3. **音频生成**
   - 使用 coze-voice-gen TTS
   - 支持温柔女声和沉稳男声
   - 高质量输出

4. **音频播放器**
   - 在线播放
   - 进度控制
   - 音量调节
   - 下载功能

5. **反馈收集**
   - 满意度评分
   - 使用记录
   - 付费意愿调查
   - 功能建议

---

## 🚀 快速开始

### 前置要求

- Node.js 18+
- PostgreSQL 数据库（开发阶段可选）
- OpenAI API Key
- coze-voice-gen（需要配置）

### 安装

```bash
# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填入必要的配置

# 运行开发服务器
npm run dev
```

访问 http://localhost:3000

### 环境变量配置

```env
# 数据库
DATABASE_URL="postgresql://user:password@localhost:5432/hypnosis?schema=public"

# OpenAI API (GPT-4)
OPENAI_API_KEY="your_openai_api_key_here"

# 七牛云对象存储（可选，用于生产环境）
QINIU_ACCESS_KEY=""
QINIU_SECRET_KEY=""
QINIU_BUCKET=""
QINIU_DOMAIN=""
```

---

## 📁 项目结构

```
hypnosis-mvp/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── generate/          # 生成催眠故事 API
│   │   │   └── feedback/          # 反馈 API
│   │   ├── feedback/              # 反馈页面
│   │   ├── player/                # 播放器页面
│   │   ├── thank-you/             # 感谢页面
│   │   ├── layout.tsx             # 根布局
│   │   ├── page.tsx               # 首页（问卷）
│   │   └── globals.css            # 全局样式
│   ├── components/                # 可复用组件
│   ├── lib/
│   │   ├── openai.ts              # GPT-4 集成
│   │   ├── tts.ts                 # TTS 集成
│   │   └── utils.ts               # 工具函数
│   └── types/                     # TypeScript 类型定义
├── prisma/
│   └── schema.prisma              # 数据库模型
├── public/                        # 静态资源
│   └── audio/                     # 生成的音频文件
├── PROJECT_PLAN.md                # 项目计划
├── PRD.md                         # 产品需求文档
└── PROGRESS.md                    # 开发进度
```

---

## 🛠️ 技术栈

- **前端**：Next.js 14 + React 18 + Tailwind CSS
- **后端**：Next.js API Routes
- **数据库**：Prisma ORM + PostgreSQL
- **AI 服务**：GPT-4 + coze-voice-gen
- **部署**：阿里云轻量应用服务器（计划中）

---

## 📊 开发进度

- [x] 项目规划（PROJECT_PLAN.md, PRD.md）
- [x] 项目初始化
- [x] 数据库设计
- [x] GPT-4 催眠脚本生成
- [x] TTS 音频生成
- [x] 首页问卷页面
- [x] 播放器页面
- [x] 反馈页面
- [x] 反馈 API
- [ ] 数据库迁移和测试
- [ ] 本地完整测试
- [ ] 部署上线
- [ ] 用户测试

---

## 🎯 成功指标

- 至少 100 人完成测试
- 使用完成率 ≥ 30%
- 满意度 ≥ 4.0/5.0
- 付费意愿 ≥ 30%

---

## 📝 下一步

### 开发阶段（Day 1-2）
- [ ] 配置数据库
- [ ] 本地测试完整流程
- [ ] 修复 bug
- [ ] UI/UX 优化

### 测试阶段（Day 8-14）
- [ ] 招募 100 位测试用户
- [ ] 收集反馈
- [ ] 分析数据
- [ ] 决策继续/止损

---

## 💡 待优化事项

1. **数据库集成** - 当前使用模拟数据，需要集成真实数据库
2. **TTS 集成** - coze-voice-gen 的调用方式需要测试
3. **错误处理** - 需要更完善的错误处理和用户提示
4. **性能优化** - 大文件上传、缓存等
5. **SEO 优化** - 元标签、结构化数据

---

## 📄 许可证

仅供测试使用，未经授权不得商用

---

## 👥 团队

- 红线（AI 助手）- 开发
- 老大 - 产品负责人

---

**项目启动时间：** 2026-03-17
**预计上线：** 2026-03-31
