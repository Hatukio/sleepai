# SleepAI - Vercel 部署指南

## 🚀 一键部署（推荐）

### 前提条件

1. 代码已推送到 GitHub 仓库
2. 拥有 Vercel 账号（免费）
3. 拥有 OpenAI API Key（可选，用于真实功能）

### 步骤 1：推送代码到 GitHub

```bash
cd /workspace/projects/workspace/projects/hypnosis-mvp

# 方法 1：使用 GitHub CLI（推荐）
gh auth login
git push github main

# 方法 2：使用 Personal Access Token
# 1. 访问 https://github.com/settings/tokens
# 2. 创建新的 token，选择 repo 权限
# 3. 复制 token
# 4. 推送时会提示输入密码，粘贴 token 即可
```

### 步骤 2：在 Vercel 上部署

1. 访问 https://vercel.com/new
2. 点击 "Continue with GitHub"
3. 选择 `Hatukio/sleepai` 仓库
4. 点击 "Import"

### 步骤 3：配置环境变量

在 Vercel 项目设置中，添加以下环境变量：

```
OPENAI_API_KEY=你的OpenAI_API_Key
```

（可选）如果你的 OpenAI API Key 没有额度，可以暂时不配置，项目会使用模拟数据运行。

### 步骤 4：部署

点击 "Deploy" 按钮，等待 1-2 分钟。

### 步骤 5：访问

部署完成后，Vercel 会提供一个 URL，例如：
```
https://sleepai-xyz.vercel.app
```

复制这个 URL 就可以访问你的应用了！

---

## 🛠️ 手动部署（高级）

### 使用 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署
vercel
```

---

## 📊 部署配置说明

### 自动配置

Vercel 会自动检测 Next.js 项目，使用以下配置：

- **框架**: Next.js 14
- **构建命令**: `npm run build`
- **输出目录**: `.next`
- **启动命令**: `npm start`

### 自定义配置（可选）

如果需要自定义配置，可以在项目根目录创建 `vercel.json`：

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

---

## 🔧 环境变量说明

### 必需变量

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `OPENAI_API_KEY` | OpenAI API Key，用于 GPT-4 | `sk-...` |

### 可选变量

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `COZE_VOICE_API_KEY` | Coze TTS API Key | `xxx` |
| `DATABASE_URL` | 生产数据库 URL | `postgresql://...` |

---

## 🐛 常见问题

### Q1: 部署失败，提示 "Module not found"

**解决方案**:
```bash
# 清理并重新安装依赖
rm -rf node_modules package-lock.json
npm install
git add .
git commit -m "chore: 重新安装依赖"
git push github main
```

### Q2: API 调用失败

**原因**: 未配置环境变量或 API Key 无效

**解决方案**:
1. 检查 Vercel 项目设置中的环境变量
2. 确认 OpenAI API Key 是否有效
3. 检查 API Key 是否有额度

### Q3: 构建超时

**原因**: `node_modules` 太大或网络慢

**解决方案**:
1. 在 `vercel.json` 中设置超时时间：
   ```json
   {
     "build": {
       "timeout": 300
     }
   }
   ```

### Q4: 图片无法加载

**原因**: Next.js 图片优化需要配置域名

**解决方案**:
在 `next.config.js` 中添加图片域名配置。

---

## 🎯 部署后检查清单

- [ ] 访问首页，检查问卷页面是否正常
- [ ] 填写问卷并提交，检查生成流程
- [ ] 检查音频播放器是否工作
- [ ] 检查反馈功能是否正常
- [ ] 测试移动端访问（响应式）
- [ ] 检查控制台是否有错误

---

## 📝 部署后的下一步

### 1. 配置自定义域名（可选）

在 Vercel 项目设置中，点击 "Domains"，添加你的域名。

### 2. 设置自动部署

Vercel 默认会在每次 `git push` 后自动部署。你可以在设置中调整部署频率。

### 3. 监控和分析

Vercel 提供免费的分析功能，可以查看：
- 访问量
- 页面加载时间
- 错误率

### 4. 准备推广

部署成功后，可以开始推广：
- 生成推广链接
- 准备推广文案
- 招募种子用户

---

## 💰 成本说明

### Vercel 免费额度

- **带宽**: 100GB/月
- **构建时间**: 6000 分钟/月
- **函数执行**: 100GB-Hours/月

**对于 SleepAI MVP，免费额度完全够用！**

### OpenAI API 成本

- GPT-4 生成脚本：每次约 $0.01
- 生成 100 个脚本：约 $1

**总计：$1-2/100 次生成**

---

## 🎉 完成！

部署完成后，你的 SleepAI MVP 就可以上线了！

接下来可以进行：
1. 功能测试
2. 用户招募（目标 100 人）
3. 收集反馈
4. 数据分析

祝测试顺利！🚀
