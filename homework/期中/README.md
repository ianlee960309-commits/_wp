# 期中專案:DevFlow 開發者交流平台
>本專案使用 gemini 及 chatgpt 輔助生成
---

# Part A：專案報告（Project Report）

## 1. 專案簡介

### 1.1 開發動機

在學習程式設計的過程中，許多學生與初學者常常會遇到一個問題：雖然程式可以正常執行，但無法判斷程式碼是否具備良好的架構、效能與安全性。此外，缺乏與其他開發者交流與互相 Code Review 的機會，也會降低學習效率。

因此，本專案希望打造一個專為開發者設計的社群平台 —— **DevFlow**。

使用者除了可以分享自己的程式碼與技術文章外，也能透過 AI 協助進行程式碼審查，提升學習效率與程式品質。

---

### 1.2 專案目標

本專案的主要目標如下：

- 提供簡潔直覺的程式碼分享介面
- 建立開發者社群互動功能（按讚、留言、熱門貼文）
- 結合 AI 技術，實作「AI Code Review」功能
- 採用前後端分離架構，建立完整 Web 應用系統
- 使用 MongoDB 建立資料持久化機制
- 建立 RESTful API 供前端與後端溝通

---

## 2. 系統架構圖

本系統採用「前後端分離（Frontend / Backend Separation）」架構，前端負責使用者介面與互動，後端則負責資料處理與商業邏輯。

```text
+-------------------------------------------------------------+
|                        瀏覽器 (Frontend)                     |
|        React / Next.js + Tailwind CSS（UI 與互動）           |
+-------------------------------------------------------------+
                               |
                               | HTTP Request（RESTful API）
                               v
+-------------------------------------------------------------+
|                      後端伺服器 (Backend)                    |
|                  Node.js + Express.js Server                |
|                                                             |
|  - 路由控制（Routing）                                      |
|  - JWT 身分驗證                                             |
|  - AI Code Review 模組                                      |
+-------------------------------------------------------------+
             |                                    |
             | Mongoose ODM                       | HTTPS API
             v                                    v
+-------------------------+          +-------------------------+
|      MongoDB 資料庫      |          |       AI API 服務       |
|                          |          |   Ollama / NVIDIA API   |
|  儲存使用者、貼文、留言    |          |  程式碼分析與建議產生    |
+-------------------------+          +-------------------------+
```

---

## 3. 功能列表與實作狀況

| 功能模組 | 子功能說明 | 實作狀態 |
|---|---|---|
| 使用者系統 | 註冊、登入、JWT 驗證、個人頁面 | 已完成 |
| 動態牆（Feed） | 顯示所有公開貼文、語法高亮 | 已完成 |
| 發文系統 | 發表文章與程式碼 | 已完成 |
| 社群互動 | 按讚、留言、即時更新 | 已完成 |
| AI 輔助功能 | AI Code Review 程式碼分析 | 已完成 |

---

## 4. 資料庫設計（Database Schema）

本專案使用 MongoDB 作為資料庫，並搭配 Mongoose 建立 Schema。

---

### 4.1 User Schema（使用者資訊）

```javascript
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  avatar: {
    type: String,
    default: "https://api.dicebear.com/7.x/bottts/svg"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});
```

---

### 4.2 Post Schema（貼文資訊）

```javascript
const PostSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  title: {
    type: String,
    required: true
  },

  content: {
    type: String,
    required: true
  },

  codeSnippet: {
    type: String
  },

  language: {
    type: String,
    default: 'text'
  },

  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  aiReview: {
    reviewText: String,
    reviewedAt: Date
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});
```

---

### 4.3 Comment Schema（留言資訊）

```javascript
const CommentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  content: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});
```

---

## 5. RESTful API 說明

| Method | Endpoint | 功能說明 |
|---|---|---|
| POST | `/api/auth/register` | 註冊帳號 |
| POST | `/api/auth/login` | 使用者登入 |
| GET | `/api/posts` | 取得所有貼文 |
| POST | `/api/posts` | 發布新貼文 |
| POST | `/api/posts/:id/like` | 貼文按讚／取消讚 |
| POST | `/api/posts/:id/comments` | 新增留言 |
| POST | `/api/posts/:id/ai-review` | AI 程式碼分析 |

---

### API Request / Response 範例

#### 使用者登入

##### Request

```http
POST /api/auth/login
```

##### Request Body

```json
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

##### Response

```json
{
  "token": "jwt_token",
  "user": {
    "username": "testUser"
  }
}
```

---

## 6. 專案啟動說明（README）

### 6.1 後端建置（Node.js + Express）

進入 `server` 資料夾並安裝套件：

```bash
cd server

npm install express mongoose cors dotenv jsonwebtoken bcryptjs
```

建立 `.env` 檔案：

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/devflow
JWT_SECRET=your_super_secret_key
OLLAMA_API_URL=http://localhost:11434/api/generate
```

啟動後端伺服器：

```bash
node server.js
```

---

### 6.2 前端建置（Next.js）

進入 `client` 資料夾：

```bash
cd client

npm install tailwindcss lucide-react
```

啟動前端開發環境：

```bash
npm run dev
```

---

# Part B：學習筆記（Learning Notes）

## 1. 技術學習心得

### 1.1 前後端分離的實務體驗

過去開發網頁時，大多以前後端混合的方式進行，但這次專案採用了 React / Next.js 作為前端框架，並搭配 Node.js / Express 建立後端 API。

這種前後端分離架構讓系統的職責更加明確：

- 前端專注於畫面與互動體驗
- 後端專注於資料處理與商業邏輯
- API 作為雙方溝通橋樑

透過這次實作，我更加理解現代 Web 開發的架構設計方式，也學會如何規劃 RESTful API 與資料流。

---

### 1.2 AI API 的應用與啟發

本專案最具特色的功能是「AI Code Review」。

使用者只需要點擊按鈕，系統便會將程式碼送往 AI API（如 Ollama 或 NVIDIA API），並取得 AI 對程式碼的分析與建議。

透過這項功能，我深刻感受到：

- AI 可以有效提升學習效率
- LLM 能協助發現潛在 Bug
- AI 能提供效能與安全性建議
- 傳統社群平台可以因 AI 而變得更智慧

這也讓我理解到，未來的軟體開發不再只是 CRUD，而是如何將 AI 的能力整合進產品流程中。

---

## 2. 踩坑紀錄與解決方案（Troubleshooting）

### 2.1 CORS 跨域問題

#### 問題描述

前端（localhost:3000）向後端（localhost:5000）發送請求時，瀏覽器出現：

```text
Access to fetch has been blocked by CORS policy
```

---

#### 問題原因

由於瀏覽器的 Same-Origin Policy（同源政策），不同 Port 之間的請求會被視為跨域請求，因此遭到阻擋。

---

#### 解決方式

在 Express 中加入 `cors` middleware：

```javascript
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000'
}));
```

---

### 2.2 AI API 回應時間過長

#### 問題描述

AI 進行程式碼分析時，常需要等待 5～10 秒以上，導致請求逾時。

---

#### 解決方式

##### 前端優化

加入 Loading 動畫與提示文字：

```javascript
setLoading(true);
```

讓使用者知道系統仍在分析中。

---

##### 架構優化

未來可採用：

- WebSocket 即時回傳結果
- 非同步 Queue 任務機制
- Polling 查詢任務進度

例如：

```text
Client -> 發送請求
Server -> 回傳 Task ID
Client -> 每隔 2 秒查詢進度
Server -> AI 完成後回傳結果
```

---

## 3. 未來展望（Future Work）

### 3.1 WebSocket 即時通知系統

當使用者收到留言或按讚時，可以即時收到通知。

功能包括：

- 即時通知氣泡
- 線上聊天室
- 一對一私訊功能

---

### 3.2 線上程式碼執行（Online Judge）

除了分享程式碼外，也能讓使用者直接在網頁執行程式。

預計功能：

- 支援 JavaScript / Python 執行
- 顯示 Console Output
- 沙盒（Sandbox）安全執行環境

這能讓 DevFlow 不只是社群平台，更成為互動式學習平台。

---

# 結論

透過 DevFlow 專案，我學習到完整的 Web 全端開發流程，包括：

- 前後端分離架構
- RESTful API 設計
- MongoDB 資料庫操作
- JWT 身分驗證
- AI API 整合
- 社群互動功能設計

本專案不僅提升了我的程式能力，也讓我更加理解現代 Web 與 AI 應用的整合方式。未來我也希望能持續優化 DevFlow，打造更完整的開發者學習社群平台。
