const express = require("express");
const router = express.Router();
const { addScore, getTopScores } = require("../db");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/leaderboard", (req, res) => {
  const difficulty = req.query.difficulty || "easy";
  const scores = getTopScores(difficulty);
  res.render("leaderboard", { scores, difficulty });
});

router.post("/api/scores", (req, res) => {
  const { playerName, difficulty, timeSeconds } = req.body;
  if (!playerName || !difficulty || timeSeconds == null) {
    return res.status(400).json({ error: "缺少必要欄位" });
  }
  if (timeSeconds < 1) {
    return res.status(400).json({ error: "時間不正確" });
  }
  addScore(playerName, difficulty, timeSeconds);
  res.json({ success: true });
});

router.get("/api/scores/:difficulty", (req, res) => {
  const { difficulty } = req.params;
  const scores = getTopScores(difficulty);
  res.json(scores);
});

module.exports = router;
