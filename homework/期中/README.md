期中專案報告與學習筆記：DevFlow 開發者交流平台

課程名稱：Web 程式設計與應用

專案名稱：DevFlow (開發者程式碼分享與 AI 助教社群)

繳交日期：2026 年 6 月 14 日

繳交人：[請填寫您的姓名/學號]

Part A: 專案報告 (Project Report)

1. 專案簡介

1.1 開發動機

在學習程式設計的過程中，學生與初學者常遇到「寫出能跑的程式碼，但不知道寫得好不好」的困境。此外，尋找志同道合的夥伴交流程式碼、互相 Code Review 也是提升實力的關鍵。因此，本專案旨在打造一個專為開發者設計的社群平台——DevFlow。

1.2 專案目標

提供一個簡潔、直覺的程式碼發表與分享介面。

實作社群互動核心功能（按讚、即時留言、熱門看板）。

結合 AI 技術（如 Ollama 或外部大語言模型 API），提供「一鍵 AI Code Review」功能，協助使用者檢查程式碼的安全缺陷與效能瓶頸。

建構前後端分離的系統架構，實現具備 Server、API 與資料庫的完整 MVP。

2. 系統架構圖

本系統採用前後端分離架構，前端負責 UI 渲染與使用者互動，後端負責商業邏輯處理，並透過資料庫進行資料持久化。

+-------------------------------------------------------------+
|                        瀏覽器 (Frontend)                     |
|  [React/Next.js] + [Tailwind CSS] (使用者介面 & 互動)        |
+-------------------------------------------------------------+
                               |
                               | HTTP Requests (RESTful API)
                               v
+-------------------------------------------------------------+
|                        後端伺服器 (Server)                   |
|                   [Node.js] + [Express.js]                  |
|  - 路由控制 (Routing)  - 身分驗證 (JWT)  - AI 串接模組     |
+-------------------------------------------------------------+
             |                                    |
             | Mongoose (ODM)                     | HTTPS API
             v                                    v
+-------------------------+          +-------------------------+
|      資料庫 (Database)  |          |       AI API 服務       |
|       [MongoDB]         |          |   [Ollama / NVIDIA]     |
| (儲存使用者、貼文、留言) |          | (分析並產出 Code Review) |
+-------------------------+          +-------------------------+


3. 功能列表與實作狀況

功能模組

子功能說明

實作狀態

使用者系統

註冊、登入（JWT 認證機制）、個人檔案頁面

已完成 (MVP 版本)

動態牆 (Feed)

瀏覽所有公開貼文、程式碼語法高亮 (Syntax Highlighting)

已完成

發文系統

發表文章、貼上程式碼、選擇程式語言標籤 (JavaScript, Python 等)

已完成

社群互動

對貼文點擊「讚/愛心」、發表留言、即時更新留言列表

已完成

AI 輔助功能

點擊貼文旁「AI Review」按鈕，獲得 AI 對該程式碼的詳細評語

已完成

4. 資料庫設計 (Database Schema)

本專案使用 MongoDB 作為資料庫，利用 Mongoose 定義了以下三個核心 Schema：

4.1 User Schema (使用者資訊)

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // 儲存經 bcrypt 加密後的密碼
  avatar: { type: String, default: "https://api.dicebear.com/7.x/bottts/svg" },
  createdAt: { type: Date, default: Date.now }
});


4.2 Post Schema (貼文資訊)

const PostSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true }, // 文章內文
  codeSnippet: { type: String },              // 程式碼片段
  language: { type: String, default: 'text' }, // 程式語言種類
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // 按讚使用者清單
  aiReview: {
    reviewText: { type: String },
    reviewedAt: { type: Date }
  },
  createdAt: { type: Date, default: Date.now }
});


4.3 Comment Schema (留言資訊)

const CommentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});


5. API 說明文件 (RESTful API)

Method

Endpoint

說明

Request Body / Query

Response (Success 200)

POST

/api/auth/register

註冊新帳號

{ username, email, password }

{ token, user }

POST

/api/auth/login

使用者登入

{ email, password }

{ token, user }

GET

/api/posts

取得所有貼文列表

無

[ { _id, title, codeSnippet, ... } ]

POST

/api/posts

發表新貼文 (需帶 Token)

{ title, content, codeSnippet, language }

{ post }

POST

/api/posts/:id/like

對貼文點讚/取消讚

無 (需帶 Token)

{ likesCount, hasLiked }

POST

/api/posts/:id/comments

發表留言

{ content }

{ comment }

POST

/api/posts/:id/ai-review

呼叫 AI 進行程式碼審查

無

{ aiReview: "..." }

6. 專案啟動說明 (README)

要在本地端啟動 DevFlow 完整專案（含 Server 與資料庫），請遵循以下步驟：

6.1 後端建置 (Node.js + Express)

進入 server 資料夾，安裝依賴套件：

cd server
npm install express mongoose cors dotenv jsonwebtoken bcryptjs


設定環境變數：在 server 目錄下建立 .env 檔案：

PORT=5000
MONGO_URI=mongodb://localhost:27017/devflow
JWT_SECRET=your_super_secret_key
OLLAMA_API_URL=http://localhost:11434/api/generate


啟動後端伺服器：

node server.js


6.2 前端建置 (Next.js / HTML)

進入 client 資料夾，安裝依賴：

cd client
npm install tailwindcss lucide-react


啟動前端開發伺服器：

npm run dev


Part B: 學習筆記 (Learning Notes)

1. 技術學習心得

1.1 前後端分離的實務體驗

以往開發網頁多半是前後端寫在一起，這次專案採用了 React / Next.js 作為前端，配合 Node.js / Express 作為後端。這樣做最大的好處是分工明確、職責分離。後端只需要專注於提供穩定的 JSON 資料（API），前端則專注於如何呈現資料與優化使用者體驗。

1.2 引入 AI API 的啟發

在實作「AI Code Review」時，我深刻體會到 LLM（大語言模型）對現代網頁應用的賦能。透過簡單的 fetch 呼叫當地的 Ollama 服務或雲端的 API，就能將原本死板的社群軟體注入靈魂，轉變成一個「智慧型學習平台」。這讓我意識到，未來的軟體開發不僅是寫好 CRUD（增刪查改），如何將 AI 的推理能力無縫整合到產品流程中將是核心競爭力。

2. 踩坑紀錄與解決方案 (Troubleshooting)

2.1 跨來源資源共享 (CORS) 阻擋問題

遇到的問題：當前端（localhost:3000）嘗試向後端（localhost:5000）發送 POST 請求進行登入時，瀏覽器控制台噴出紅字錯誤：Access to fetch at ... has been blocked by CORS policy。

成因分析：瀏覽器的同源政策（Same-Origin Policy）為了安全性，會阻止一個網域的網頁去請求另一個網域的資源。

解決方法：在後端 Express 中引入 cors 套件，並設定允許前端的網域進行跨域請求：

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' }));


2.2 非同步 AI 請求時間過長導致逾時 (Timeout)

遇到的問題：呼叫 AI API 進行程式碼審查時，因為 AI 需要思考並逐步生成文字，後端常需要等候超過 5~10 秒，有時會造成 HTTP 請求連線逾時中斷。

解決方法：

前端優化：加入精緻的 Loading 動畫，告知使用者 AI 正在分析中，避免重複點擊。

架構設計優化：未來可以採用 WebSocket 進行雙向溝通，或者採用「非同步隊列」機制：前端發出 Request 後，後端立刻回傳 202 Accepted 並附帶任務 ID，由前端每隔 2 秒 polling 查詢進度，或是等 AI 跑完後再推播給前端。

3. 未來展望

如果還有更多開發時間，我希望能為 DevFlow 增添以下功能：

WebSocket 即時通知與聊天室：當其他使用者對我的程式碼點讚或留言時，能收到即時的通知氣泡，也可以直接與其他線上開發者建立一對一聊天室。

程式碼線上編譯與執行 (Online Judge)：不只是靜態分享程式碼，更能提供一個微型的沙盒環境，讓讀者可以直接在網頁上「執行」這段程式碼並看見 output，提升互動學習的價值。
