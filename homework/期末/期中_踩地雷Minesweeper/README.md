# 踩地雷 Minesweeper

> 此專案由 opencode 輔助生成

一個功能完整的經典踩地雷遊戲，具備前端遊戲介面與後端排行榜系統。前端使用原生 HTML、CSS、JavaScript 實作，後端使用 Node.js + Express + SQLite（sql.js）提供 RESTful API 與 SSR 頁面。

## 遊戲功能

- **三種難度選擇**
  - 簡單：9×9 棋盤，10 顆地雷
  - 中等：16×16 棋盤，40 顆地雷
  - 困難：16×30 棋盤，99 顆地雷
- **遊戲機制**
  - 左鍵點擊揭開格子
  - 右鍵標記／取消旗標
  - 第一次點擊保證安全（才隨機生成地雷）
  - 點到空白格自動展開相鄰區域
  - 即時計時器與剩餘地雷／旗標計數
- **勝利與排行榜**
  - 揭開所有非地雷格子即獲勝
  - 勝利彈窗可輸入玩家名稱提交分數
  - 排行榜依難度分類，顯示前十名最快紀錄
  - 分數同時儲存於前端 LocalStorage 與後端 SQLite

## 專案結構

```
期中/
├── index.html                    # 遊戲主頁（純前端版本）
├── leaderboard.html              # 排行榜頁面（純前端版本）
├── css/
│   └── style.css                 # 共用樣式表（深色主題）
├── js/
│   ├── game.js                   # 遊戲核心邏輯（306 行）
│   │   ├── 棋盤初始化與渲染
│   │   ├── 地雷隨機生成（含首次點擊保護）
│   │   ├── 左鍵揭開與遞迴展開（DFS）
│   │   ├── 右鍵旗標切換
│   │   ├── 計時器管理
│   │   ├── 勝敗判斷與顯示
│   │   └── LocalStorage 分數儲存
│   └── leaderboard.js            # 排行榜前端邏輯（50 行）
│       ├── 分頁切換（簡中難）
│       ├── LocalStorage 讀取渲染
│       └── XSS 防護（escapeHtml）
└── minesweeper/                  # 後端應用（Node.js）
    ├── package.json              # 依賴：express、ejs、sql.js
    ├── server.js                 # Express 伺服器入口（21 行）
    │   ├── 設定 EJS 模板引擎
    │   ├── 靜態檔案服務
    │   └── 掛載路由
    ├── db.js                     # SQLite 資料庫模組（61 行）
    │   ├── sql.js 初始化與持久化
    │   ├── 自動建表（scores）
    │   ├── 新增分數
    │   └── 查詢前十名（依時間升序）
    ├── routes/
    │   └── game.js               # API 與頁面路由（33 行）
    │       ├── GET  /                    → 渲染遊戲頁面
    │       ├── GET  /leaderboard         → 渲染排行榜（SSR）
    │       ├── POST /api/scores          → 提交分數（含驗證）
    │       └── GET  /api/scores/:difficulty → 取得前十名 JSON
    ├── views/
    │   ├── index.ejs             # 遊戲頁面模板（SSR 版本）
    │   └── leaderboard.ejs       # 排行榜頁面模板（SSR 版本）
    └── public/                   # 前端靜態資源
        ├── css/style.css
        └── js/game.js
```

## 技術棧

| 層級 | 技術 |
|------|------|
| 前端 | 原生 HTML5 + CSS3 + Vanilla JavaScript |
| 後端 | Node.js + Express 4.x |
| 模板 | EJS（服務端渲染） |
| 資料庫 | SQLite（透過 sql.js，純 JS 實作） |
| 樣式 | CSS 深色主題、漸層背景、flexbox 排版 |

## API 文件

### `POST /api/scores`
提交遊戲分數。

**Request Body:**
```json
{
  "playerName": "玩家名稱",
  "difficulty": "easy | medium | hard",
  "timeSeconds": 42
}
```

**Response:**
```json
{ "success": true }
```

### `GET /api/scores/:difficulty`
取得指定難度的排行榜前十名。

**Response:**
```json
[
  {
    "player_name": "玩家名稱",
    "time_seconds": 30,
    "played_at": "2026-06-10 12:00:00"
  }
]
```

## 啟動方式

```bash
# 進入後端目錄
cd minesweeper

# 安裝依賴
npm install

# 啟動伺服器（預設埠 3000）
npm start
```

啟動後開啟瀏覽器前往 `http://127.0.0.1:3000` 即可遊玩。

## 開發模式

```bash
npm run dev
```

使用 `node --watch` 自動重啟伺服器。

## 版本歷史

| 版本 | 說明 |
|------|------|
| 1.0.0 | 初始版本：完整遊戲邏輯、排行榜、後端 API |

---

*This project was created with the assistance of opencode.*
