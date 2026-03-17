# SleepAI MVP - 线上部署指南

## 方案对比

| 方案 | 优点 | 缺点 | 适用场景 |
|------|------|------|----------|
| **ngrok 临时隧道** | 1分钟上线，免费 | 不稳定，临时URL | 快速测试 |
| **Vercel 部署** | 稳定、免费、多区域 | 需要配置环境变量 | 长期使用 |
| **阿里云/腾讯云** | 完全控制 | 需要购买服务器 | 商业部署 |
| **React Native APP** | 移动端体验好 | 开发周期长 | 正式产品 |

---

## 方案 1：ngrok 临时隧道（最快速）

### 步骤

1. **安装 ngrok**
   ```bash
   # 服务器上执行
   sudo apt install ngrok -y
   ```

2. **启动隧道**
   ```bash
   ngrok http 5173
   ```

3. **获取公网 URL**
   终端会显示：
   ```
   Forwarding  https://xxxx-xx-xx-xx-xx.ngrok-free.app -> http://localhost:5173
   ```

4. **访问应用**
   在任何浏览器访问：`https://xxxx-xx-xx-xx-xx.ngrok-free.app`

### 优缺点

✅ 优点：
- 1 分钟就能用
- 完全免费
- 支持多设备访问

❌ 缺点：
- URL 会变（每次启动不同）
- 不稳定（服务器关闭就断开）
- 不适合生产环境

---

## 方案 2：Vercel 部署（推荐，长期使用）

### 步骤

1. **安装 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **构建项目**
   ```bash
   cd /workspace/projects/workspace/projects/hypnosis-mvp
   npm run build
   ```

3. **部署到 Vercel**
   ```bash
   vercel
   ```

4. **配置环境变量**
   在 Vercel 控制台设置：
   - `OPENAI_API_KEY`: 你的 OpenAI API Key
   - `DATABASE_URL`: 数据库连接字符串（可选）

5. **获取域名**
   Vercel 会提供：
   - `https://sleepai-mvp.vercel.app`
   - 可以绑定自定义域名

### 优缺点

✅ 优点：
- 免费（够用）
- CDN 加速（全球访问快）
- 自动 HTTPS
- 支持自定义域名
- 多区域部署

❌ 缺点：
- 需要注册账号
- 首次配置需要时间

---

## 方案 3：React Native APP（移动端）

### 技术栈
- React Native + Expo
- 可以复用现有的前端代码

### 开发步骤

1. **创建 Expo 项目**
   ```bash
   npx create-expo-app sleepai-app
   ```

2. **移植代码**
   - 将 Next.js 页面转换为 React Native 组件
   - 使用 React Native 的替代组件（View, Text, TouchableOpacity 等）

3. **配置 API**
   - 使用相同的后端 API
   - 配置网络请求

4. **测试**
   ```bash
   npx expo start
   ```
   - iOS: 在 iPhone 上打开 Expo Go APP
   - Android: 扫描二维码

5. **构建发布**
   - iOS App Store
   - Google Play

### 开发时间
- **基础版本**: 1-2 周
- **完整版本**: 3-4 周

### 优缺点

✅ 优点：
- 原生体验
- 可以访问手机硬件（麦克风、存储）
- 可以在应用商店上架

❌ 缺点：
- 开发周期长
- 需要学习 React Native
- 上架需要审核

---

## 方案 4：PWA（渐进式 Web 应用）

### 什么是 PWA
- 看起来像 APP 的网页
- 可以安装到手机桌面
- 支持离线使用
- 用户体验接近原生 APP

### 实现步骤

1. **添加 PWA 支持**
   ```bash
   npm install next-pwa
   ```

2. **配置 next.config.js**
   ```javascript
   const withPWA = require('next-pwa')({
     dest: 'public',
     register: true,
   })

   module.exports = withPWA({})
   ```

3. **添加 manifest.json**
   ```json
   {
     "name": "SleepAI - AI助眠",
     "short_name": "SleepAI",
     "description": "个性化催眠故事，帮助你快速入睡",
     "start_url": "/",
     "display": "standalone",
     "background_color": "#0f172a",
     "theme_color": "#1e3a5f",
     "icons": [
       {
         "src": "/icon-192.png",
         "sizes": "192x192",
         "type": "image/png"
       },
       {
         "src": "/icon-512.png",
         "sizes": "512x512",
         "type": "image/png"
       }
     ]
   }
   ```

4. **测试安装**
   - 在 Chrome/Safari 中访问网站
   - 点击"添加到主屏幕"
   - 应用会像 APP 一样运行

### 开发时间
- **基础 PWA**: 2-3 小时
- **完整功能**: 1 天

### 优缺点

✅ 优点：
- 开发快速（只需几小时）
- 可以安装到手机
- 支持离线使用
- 跨平台（iOS + Android）
- 不需要审核

❌ 缺点：
- 性能略低于原生
- 不能访问所有硬件
- 部分浏览器支持不完整

---

## 推荐方案

### 阶段 1：快速测试（今天）
**使用 ngrok** - 1 分钟就能让老大访问

### 阶段 2：MVP 测试（下周）
**使用 Vercel** - 稳定的线上环境，方便用户测试

### 阶段 3：正式发布（如果成功）
**PWA + 可选的 React Native**
- PWA：快速上线，跨平台
- React Native：如果用户反馈好，再做原生 APP

---

## 快速开始

### 立即执行（ngrok）

1. 我帮你安装 ngrok
2. 启动隧道
3. 你通过公网 URL 访问

### 准备 Vercel（推荐）

1. 注册 Vercel 账号：https://vercel.com
2. 绑定 GitHub 仓库
3. 一键部署

---

## 成本估算

| 方案 | 成本 | 说明 |
|------|------|------|
| ngrok | 免费 | 有流量限制 |
| Vercel | 免费 | 每月 100GB 流量 |
| 阿里云 | ¥100/月起 | 根据配置 |
| React Native | 免费 | 开发成本，上架可能需要费用 |

---

## 下一步

1. **现在**：用 ngrok 快速测试
2. **明天**：部署到 Vercel
3. **下周**：收集用户反馈
4. **下月**：根据反馈决定是否做 PWA 或 APP

---

**总结**：推荐先做 PWA，开发快速（几小时），体验好（可安装），成本低（免费），后续可以根据用户反馈决定是否做原生 APP。
