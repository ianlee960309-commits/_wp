# Blog App

一個基於 **Express.js**、**EJS** 和 **SQLite** (透過 `sql.js`) 的簡易部落格應用。

## 功能

- 瀏覽所有文章
- 建立新文章
- 檢視單篇文章
- SQLite 持久化儲存

## 技術棧

- **執行環境：** Node.js
- **框架：** Express.js
- **範本引擎：** EJS
- **資料庫：** SQLite (sql.js，記憶體搭配檔案持久化)

## 專案結構

```
blog/
├── routes/posts.js    # CRUD 路由處理
├── src/
│   ├── index.js       # Express 伺服器進入點
│   └── db.js          # 資料庫初始化與管理
├── views/
│   ├── index.ejs      # 文章列表頁
│   ├── new.ejs        # 新增文章表單
│   └── post.ejs       # 單篇文章檢視頁
├── blog.db            # SQLite 資料庫檔案
└── package.json
```

## 啟動方式

```bash
cd blog
npm install
npm start
```

伺服器啟動於 `http://127.0.0.1:3000`。

## 路由

| 方法   | 路徑          | 說明           |
|--------|---------------|----------------|
| GET    | `/posts`      | 列出所有文章   |
| GET    | `/posts/new`  | 顯示新增表單   |
| POST   | `/posts`      | 建立新文章     |
| GET    | `/posts/:id`  | 檢視單篇文章   |
