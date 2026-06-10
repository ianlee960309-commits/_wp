const express = require("express");
const path = require("path");
const { initDB } = require("./db");
const gameRouter = require("./routes/game");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", gameRouter);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`伺服器啟動於 http://127.0.0.1:${PORT}`);
  });
});
