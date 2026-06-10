# 網頁設計作業統整

**學生：** 李丞晏  
**學號：** 111410501  
**學校：** 國立金門大學  

---

## 目錄

- [作業一：個人網站 HTML](#作業一個人網站-html)
- [作業二：表單問卷 HTML](#作業二表單問卷-html)
- [作業三：Node.js 初探](#作業三nodejs-初探)
- [作業四：JavaScript 基礎語法練習](#作業四javascript-基礎語法練習)
- [作業五：Threads 風格部落格 (Express + EJS + SQLite)](#作業五threads-風格部落格-express--ejs--sqlite)
- [作業六：JavaScript 進階概念練習](#作業六javascript-進階概念練習)
- [作業七：JavaScript 實戰練習](#作業七javascript-實戰練習)
- [期中專案：踩地雷 Minesweeper](#期中專案踩地雷-minesweeper)

---

## 作業一：個人網站 HTML

**目錄：** `01_個人網站/aboutme.html`

一個介紹自己的靜態個人網站頁面，採用卡片式設計。

### 功能模組

- **個人頭像區** — 姓名縮寫圓形大頭貼
- **基本資料展示區** — 顯示姓名、學號、就讀學校
- **聯絡資訊區** — 電子郵件、電話號碼

### 使用技術

- **HTML5** — 語意化標籤
- **CSS3** — 卡片陰影設計、flexbox 排版、hover 動畫、響應式設計

### 程式碼

```html
<!-- 卡片容器 -->
<div class="card">
    <div class="profile-img">李</div>
    <h1>李丞晏</h1>
    <div class="dept">國立金門大學 資訊工程學系</div>
    <div class="info-list">
        <div class="info-item">
            <span class="label">學號：</span>
            <span class="value">111410501</span>
        </div>
        <div class="info-item">
            <span class="label">電子郵件：</span>
            <span class="value">s111410501@student.nqu.edu.tw</span>
        </div>
        <div class="info-item">
            <span class="label">電話：</span>
            <span class="value">0918-872-290</span>
        </div>
    </div>
</div>
```

---

## 作業二：表單問卷 HTML

**目錄：** `02_表單問卷/index.html`

一個綜合性的表單頁面，包含登入、註冊與問卷調查功能。

### 功能模組

- **登入系統** — 帳號（學號）與密碼輸入
- **新用戶註冊** — Email、系所選擇、出生日期
- **問卷調查** — 興趣領域多選 checkbox、文字建議區

### 使用技術

- **HTML5** — 各式表單元素（`<input>` text/password/email/date/checkbox, `<select>`, `<textarea>`）
- **CSS3** — 卡片陰影、flexbox 排版、focus 發光效果、hover 互動

### 畫面預覽

| 區塊 | 內容 |
|------|------|
| 登入系統 | 帳號（學號）+ 密碼輸入 |
| 新用戶註冊 | Email + 系所選單 + 出生日期 |
| 問卷調查 | 技術領域多選 + 文字建議 |

---

## 作業三：Node.js 初探

**目錄：** `03_Node.js初探/hello.js`

第一個 Node.js 程式。

```javascript
console.log('hello 你好')
```

**執行結果：**
```
hello 你好
```

---

## 作業四：JavaScript 基礎語法練習

**目錄：** `04_JavaScript基礎語法/`

十題 JavaScript 基礎綜合練習，涵蓋 `if`、`for`、`while`、`function`、`array`、`object`、`JSON`。

### 第一題：數值正負判斷 (`if`)

```javascript
let num = -5;
if (num > 0) {
    console.log("正數");
} else if (num < 0) {
    console.log("負數");
} else {
    console.log("這是零");
}
```
**結果：** `負數`

### 第二題：九九乘法表 (`for`)

```javascript
for (let i = 1; i <= 9; i++) {
    console.log(`2 * ${i} = ${2 * i}`);
}
```
**結果：** `2 * 1 = 2` ~ `2 * 9 = 18`

### 第三題：倒數計時器 (`while`)

```javascript
let count = 5;
while (count > 0) {
    console.log(count);
    count--;
}
console.log("Go!");
```
**結果：** `5` `4` `3` `2` `1` `Go!`

### 第四題：單位轉換器 (`function`)

```javascript
function toFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
}
console.log(toFahrenheit(25));
```
**結果：** `77`

### 第五題：水果清單管理 (`array`)

```javascript
let fruits = ["蘋果", "香蕉", "橘子"];
fruits.push("葡萄");
console.log(fruits);
console.log("總共有 " + fruits.length + " 種水果");
```
**結果：** `[ '蘋果', '香蕉', '橘子', '葡萄' ]` `總共有 4 種水果`

### 第六題：個人資訊卡 (`object`)

```javascript
let user = {
    name: "小明",
    age: 20,
    skills: ["JavaScript", "HTML"]
};
console.log(user.name + " 的技能有: " + user.skills.join(", "));
```
**結果：** `小明 的技能有: JavaScript, HTML`

### 第七題：成績過濾器 (`array` + `if`)

```javascript
let scores = [45, 78, 90, 59, 100];
let passed = [];
for (let i = 0; i < scores.length; i++) {
    if (scores[i] >= 60) {
        passed.push(scores[i]);
    }
}
console.log("及格的分數：", passed);
```
**結果：** `及格的分數： [ 78, 90, 100 ]`

### 第八題：JSON 資料解析

```javascript
let jsonString = '{"product": "電腦", "price": 30000}';
let productObj = JSON.parse(jsonString);
console.log("產品名稱: " + productObj.product);
console.log("價格: " + productObj.price);
```
**結果：** `產品名稱: 電腦` `價格: 30000`

### 第九題：累加計算器 (`for` + `function`)

```javascript
function sumUp(n) {
    let total = 0;
    for (let i = 1; i <= n; i++) {
        total += i;
    }
    return total;
}
console.log(sumUp(10));
```
**結果：** `55`

### 第十題：學生資料搜尋 (`array` + `object` + `for`)

```javascript
let students = [
    { name: "Alice", id: 101 },
    { name: "Bob", id: 102 },
    { name: "Charlie", id: 103 }
];
let target = "Bob";
for (let i = 0; i < students.length; i++) {
    if (students[i].name === target) {
        console.log("找到學生：" + students[i].name + "，學號為：" + students[i].id);
    }
}
```
**結果：** `找到學生：Bob，學號為：102`

---

## 作業五：Threads 風格部落格 (Express + EJS + SQLite)

**目錄：** `05_Threads社群平台/blog/`

使用 Node.js + Express + EJS + SQLite 打造的部落格應用，具備 AI 摘要生成功能。

### 使用技術

- **後端：** Express.js
- **資料庫：** SQLite (sql.js)
- **模板引擎：** EJS
- **AI 整合：** Google Gemini API（自動生成文章摘要）
- **前端：** HTML / CSS

### 功能列表

- 瀏覽所有文章（首頁列表）
- 檢視單篇文章
- 新增文章（含標題、內容、摘要）
- AI 自動生成摘要（呼叫 Gemini API）
- SQLite 持久化儲存

### 路由架構

| 路由 | 方法 | 說明 |
|------|------|------|
| `/` | GET | 重新導向至 `/posts` |
| `/posts` | GET | 文章列表首頁 |
| `/posts/new` | GET | 新增文章表單 |
| `/posts/:id` | GET | 檢視單篇文章 |
| `/posts` | POST | 建立新文章 |
| `/posts/generate-summary` | POST | AI 產生摘要 |

### 資料庫結構

```sql
CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  summary TEXT DEFAULT '',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 啟動方式

```bash
cd 05_Threads社群平台/blog
npm install
npm start
```

伺服器啟動於 `http://127.0.0.1:3000`

---

## 作業六：JavaScript 進階概念練習

**目錄：** `06_JavaScript進階概念/`

十題 JavaScript 進階練習，涵蓋 Callback、IIFE、map、陣列操作、箭頭函式、自訂 filter、setTimeout、reduce 等。

### 第一題：Callback 函式

```javascript
function mathTool(num1, num2, action) {
  return action(num1, num2);
}
console.log(mathTool(10, 5, (a, b) => a + b)); // 15
console.log(mathTool(10, 5, (a, b) => a - b)); // 5
```

### 第二題：IIFE（立即呼叫函式）

```javascript
(function() {
  const count = 100;
  console.log("Count is: " + count);
})();
// ReferenceError: count is not defined
```

### 第三題：`map()` 函式

```javascript
const prices = [100, 200, 300, 400];
const discountedPrices = prices.map(p => p * 0.8);
console.log(discountedPrices); // [80, 160, 240, 320]
```

### 第四題：陣列操作（pop / unshift）

```javascript
function cleanData(arr) {
  arr.pop();
  arr.unshift("Start");
}
let myData = [1, 2, 3];
cleanData(myData);
console.log(myData); // ["Start", 1, 2]
```

### 第五題：高階函式（箭頭函式回傳箭頭函式）

```javascript
function multiplier(factor) {
  return n => n * factor;
}
const double = multiplier(2);
console.log(double(10)); // 20
const triple = multiplier(3);
console.log(triple(10)); // 30
```

### 第六題：自訂 filter 函式

```javascript
function myFilter(arr, callback) {
  const result = [];
  for (let item of arr) {
    if (callback(item)) result.push(item);
  }
  return result;
}
const numbers = [1, 5, 8, 12];
const biggerThanSeven = myFilter(numbers, n => n > 7);
console.log(biggerThanSeven); // [8, 12]
```

### 第七題：`filter()` 過濾物件陣列

```javascript
const users = [
  {name: "Alice", age: 25},
  {name: "Bob", age: 17}
];
const adults = users.filter(u => u.age >= 18);
console.log(adults); // [{name: "Alice", age: 25}]
```

### 第八題：傳值 vs 傳參考

```javascript
let listA = [1, 2];
let listB = [3, 4];
function process(a, b) {
  a.push(99);
  b = [100];
}
process(listA, listB);
console.log(listA); // [1, 2, 99]
console.log(listB); // [3, 4]
```

### 第九題：`setTimeout()` 非同步

```javascript
const data = ["Task", "Completed"];
setTimeout(() => {
  console.log(data.join(" "));
}, 2000);
```

### 第十題：`reduce()` 搭配 Callback

```javascript
function calculateTotal(cart, discountFunc) {
  const sum = cart.reduce((acc, curr) => acc + curr, 0);
  return discountFunc(sum);
}
const result = calculateTotal([100, 200, 300], (total) => total - 50);
console.log(result); // 550
```

---

## 作業七：JavaScript 實戰練習

**目錄：** `07_JavaScript實戰練習/`

十題 JavaScript 實戰練習，涵蓋物件操作、解構賦值、`forEach`、動態鍵值、Callback 模擬資料庫、JSON 解析、字串樣板、`map` 處理、權限控制等。

### 第一題：物件屬性存取

```javascript
const post = { id: 1, title: "Hello World", content: "Markdown content" };
console.log(post.title);     // Dot notation
console.log(post["title"]);  // Bracket notation
```

### 第二題：解構賦值

```javascript
const req = { body: { title: "JS教學", content: "內容在此", author: "Gemini" } };
const { title, content } = req.body;
console.log(title);   // "JS教學"
console.log(content); // "內容在此"
```

### 第三題：`forEach()` 渲染 HTML

```javascript
const posts = [{id: 1, t: "A"}, {id: 2, t: "B"}];
let html = "";
posts.forEach(post => { html += `<div>${post.t}</div>`; });
console.log(html); // "<div>A</div><div>B</div>"
```

### 第四題：動態物件鍵值

```javascript
const params = {};
params["id"] = 99;
console.log(params); // { id: 99 }
```

### 第五題：Callback 模擬資料庫查詢

```javascript
function fetchData(id, callback) {
    callback(null, { id: id, status: "success" });
}
fetchData(101, (err, data) => {
    if (err) console.log("發生錯誤：" + err);
    else console.log("成功取得資料：", data);
});
```

### 第六題：JSON 解析實戰

```javascript
const jsonStr = '{"title": "Post 1", "tags": ["js", "node"]}';
const obj = JSON.parse(jsonStr);
console.log(obj.tags[1]); // "node"
```

### 第七題：模擬 SQL 資料庫查詢

```javascript
function fakeGet(sql, params, callback) {
    callback(null, { id: 1, title: "掌握 JavaScript 函數", content: "..." });
}
fakeGet("SELECT * FROM posts WHERE id = ?", [1], (err, row) => {
    console.log("抓到的文章標題是：", row.title);
});
```

### 第八題：字串樣板 + 三元運算子

```javascript
let user = "Guest";
const html = `<h1>Welcome, ${user ? user : "Stranger"}</h1>`;
console.log(html); // "<h1>Welcome, Guest</h1>"
```

### 第九題：`map()` 處理字串陣列

```javascript
const contents = [
  "Very long content here",
  "Another Very long content here",
  "3rd Very long content here"
];
const summaries = contents.map(str => str.substring(0, 10) + "...");
console.log(summaries);
// ["Very long ...", "Another Ve...", "3rd Very l..."]
```

### 第十題：權限控制與錯誤處理

```javascript
function checkAdmin(role, callback) {
  if (role !== "admin") callback("Access Denied", null);
  else callback(null, "Welcome");
}
checkAdmin("user", (err, msg) => {
  if (err) console.log("錯誤:", err); // "錯誤: Access Denied"
});
checkAdmin("admin", (err, msg) => {
  if (!err) console.log(msg); // "Welcome"
});
```

---

## 期中專案：踩地雷 Minesweeper

**目錄：** `期中_踩地雷Minesweeper/`

功能完整的經典踩地雷遊戲，具備前端遊戲介面與後端排行榜系統。前端使用原生 HTML、CSS、JavaScript 實作，後端使用 Node.js + Express + SQLite（sql.js）提供 RESTful API 與 SSR 頁面。

### 使用技術

| 層級 | 技術 |
|------|------|
| 前端 | 原生 HTML5 + CSS3 + Vanilla JavaScript |
| 後端 | Node.js + Express 4.x |
| 模板 | EJS（服務端渲染） |
| 資料庫 | SQLite（透過 sql.js） |
| 樣式 | CSS 深色主題、漸層背景、flexbox 排版 |

### 遊戲功能

- **三種難度選擇**
  - 簡單：9×9 棋盤，10 顆地雷
  - 中等：16×16 棋盤，40 顆地雷
  - 困難：16×30 棋盤，99 顆地雷
- **遊戲機制**
  - 左鍵點擊揭開格子
  - 右鍵標記／取消旗標
  - 第一次點擊保證安全（隨機生成地雷）
  - 點到空白格自動展開相鄰區域（DFS）
  - 即時計時器與地雷／旗標計數
- **勝利與排行榜**
  - 揭開所有非地雷格子即獲勝
  - 勝利彈窗可輸入玩家名稱提交分數
  - 排行榜依難度分類，顯示前十名最快紀錄
  - 分數同時儲存於前端 LocalStorage 與後端 SQLite

### 專案結構

```
期中_踩地雷Minesweeper/
├── index.html              # 遊戲主頁（純前端版本）
├── leaderboard.html        # 排行榜頁面（純前端版本）
├── README.md               # 專案說明文件
├── css/
│   └── style.css           # 共用樣式表（深色主題）
├── js/
│   ├── game.js             # 遊戲核心邏輯
│   └── leaderboard.js      # 排行榜前端邏輯
└── minesweeper/            # 後端應用（Node.js）
    ├── package.json
    ├── server.js           # Express 伺服器入口
    ├── db.js               # SQLite 資料庫模組
    ├── scores.db           # SQLite 資料庫檔案
    ├── routes/
    │   └── game.js         # API 與頁面路由
    ├── views/
    │   ├── index.ejs       # 遊戲頁面模板（SSR）
    │   └── leaderboard.ejs # 排行榜頁面模板（SSR）
    └── public/
        ├── css/style.css
        └── js/game.js
```

### API 文件

**`POST /api/scores`** — 提交遊戲分數

```json
{ "playerName": "玩家名稱", "difficulty": "easy|medium|hard", "timeSeconds": 42 }
```

**`GET /api/scores/:difficulty`** — 取得前十名排行榜 JSON

### 啟動方式

```bash
cd 期中_踩地雷Minesweeper/minesweeper
npm install
npm start
```

開啟瀏覽器前往 `http://127.0.0.1:3000`

---

> 全部作業原始碼位於本目錄各子資料夾中
