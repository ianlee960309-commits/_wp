const initSqlJs = require("sql.js");
const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "scores.db");

let db = null;

async function initDB() {
  const SQL = await initSqlJs();
  if (fs.existsSync(DB_PATH)) {
    const buffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }
  db.run(`
    CREATE TABLE IF NOT EXISTS scores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      player_name TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      time_seconds INTEGER NOT NULL,
      played_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  saveDB();
}

function saveDB() {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buffer);
}

function getDB() {
  return db;
}

function addScore(playerName, difficulty, timeSeconds) {
  const stmt = db.prepare(
    "INSERT INTO scores (player_name, difficulty, time_seconds) VALUES (?, ?, ?)"
  );
  stmt.run([playerName, difficulty, timeSeconds]);
  stmt.free();
  saveDB();
}

function getTopScores(difficulty, limit = 10) {
  const stmt = db.prepare(
    "SELECT player_name, time_seconds, played_at FROM scores WHERE difficulty = ? ORDER BY time_seconds ASC LIMIT ?"
  );
  stmt.bind([difficulty, limit]);
  const results = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();
  return results;
}

module.exports = { initDB, getDB, addScore, getTopScores };
