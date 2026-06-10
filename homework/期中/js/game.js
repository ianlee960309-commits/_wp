const DIFFICULTIES = {
  easy:   { rows: 9,  cols: 9,  mines: 10 },
  medium: { rows: 16, cols: 16, mines: 40 },
  hard:   { rows: 16, cols: 30, mines: 99 },
};

let board = [];
let rows = 0, cols = 0, totalMines = 0;
let gameOver = false;
let gameWon = false;
let firstClick = true;
let flagCount = 0;
let timerInterval = null;
let seconds = 0;

const gameBoard = document.getElementById("gameBoard");
const mineCountEl = document.getElementById("mineCount");
const timerEl = document.getElementById("timer");
const flagCountEl = document.getElementById("flagCount");
const messageEl = document.getElementById("message");
const winModal = document.getElementById("winModal");
const finalTimeEl = document.getElementById("finalTime");
const playerNameInput = document.getElementById("playerName");
const submitScoreBtn = document.getElementById("submitScoreBtn");
const submitMsg = document.getElementById("submitMsg");
const newGameBtn = document.getElementById("newGameBtn");
const difficultySelect = document.getElementById("difficulty");

function getDifficulty() {
  return difficultySelect.value;
}

function initGame() {
  const diff = DIFFICULTIES[getDifficulty()];
  rows = diff.rows;
  cols = diff.cols;
  totalMines = diff.mines;
  firstClick = true;
  gameOver = false;
  gameWon = false;
  flagCount = 0;
  seconds = 0;

  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  board = [];
  for (let r = 0; r < rows; r++) {
    board[r] = [];
    for (let c = 0; c < cols; c++) {
      board[r][c] = {
        mine: false,
        revealed: false,
        flagged: false,
        adjacentMines: 0,
      };
    }
  }

  updateUI();
  renderBoard();
  hideMessage();
  winModal.classList.add("hidden");
  submitMsg.classList.add("hidden");
  submitMsg.textContent = "";
}

function placeMines(safeRow, safeCol) {
  let placed = 0;
  while (placed < totalMines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (board[r][c].mine) continue;
    if (Math.abs(r - safeRow) <= 1 && Math.abs(c - safeCol) <= 1) continue;
    board[r][c].mine = true;
    placed++;
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].mine) continue;
      let count = 0;
      forEachNeighbor(r, c, (nr, nc) => {
        if (board[nr][nc].mine) count++;
      });
      board[r][c].adjacentMines = count;
    }
  }
}

function forEachNeighbor(r, c, fn) {
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        fn(nr, nc);
      }
    }
  }
}

function renderBoard() {
  gameBoard.style.gridTemplateColumns = `repeat(${cols}, 32px)`;
  gameBoard.innerHTML = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement("div");
      cell.className = "cell hidden";
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.addEventListener("click", () => handleClick(r, c));
      cell.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        handleRightClick(r, c);
      });
      gameBoard.appendChild(cell);
    }
  }
}

function getCellEl(r, c) {
  return gameBoard.children[r * cols + c];
}

function updateUI() {
  mineCountEl.textContent = totalMines - flagCount;
  flagCountEl.textContent = flagCount;
  timerEl.textContent = String(seconds).padStart(3, "0");
}

function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    seconds++;
    timerEl.textContent = String(seconds).padStart(3, "0");
  }, 1000);
}

function handleClick(r, c) {
  if (gameOver || gameWon) return;
  const cell = board[r][c];
  if (cell.flagged) return;
  if (cell.revealed) return;

  if (firstClick) {
    firstClick = false;
    placeMines(r, c);
    startTimer();
  }

  reveal(r, c);
}

function reveal(r, c) {
  const cell = board[r][c];
  if (cell.revealed) return;

  cell.revealed = true;
  const el = getCellEl(r, c);
  el.classList.remove("hidden");

  if (cell.mine) {
    el.classList.add("mine-exploded");
    el.textContent = "💣";
    gameOverAction();
    return;
  }

  if (cell.adjacentMines > 0) {
    el.textContent = cell.adjacentMines;
    el.classList.add("n" + cell.adjacentMines);
  } else {
    el.classList.add("revealed");
    forEachNeighbor(r, c, (nr, nc) => {
      if (!board[nr][nc].revealed && !board[nr][nc].flagged) {
        reveal(nr, nc);
      }
    });
  }

  checkWin();
}

function handleRightClick(r, c) {
  if (gameOver || gameWon) return;
  if (firstClick) return;
  const cell = board[r][c];
  if (cell.revealed) return;

  cell.flagged = !cell.flagged;
  const el = getCellEl(r, c);
  if (cell.flagged) {
    el.classList.add("flagged");
    el.textContent = "🚩";
    flagCount++;
  } else {
    el.classList.remove("flagged");
    el.textContent = "";
    flagCount--;
  }
  updateUI();
}

function gameOverAction() {
  gameOver = true;
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  revealAllMines();
  showMessage("💥 踩到地雷了！遊戲結束", "lose");
}

function revealAllMines() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].mine) {
        const el = getCellEl(r, c);
        if (!el.classList.contains("flagged")) {
          el.classList.remove("hidden");
          el.textContent = "💣";
        }
      }
    }
  }
}

function checkWin() {
  let unrevealedSafe = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!board[r][c].mine && !board[r][c].revealed) {
        unrevealedSafe++;
      }
    }
  }
  if (unrevealedSafe === 0) {
    gameWon = true;
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    finalTimeEl.textContent = seconds;
    winModal.classList.remove("hidden");
    playerNameInput.focus();
  }
}

function showMessage(text, type) {
  messageEl.textContent = text;
  messageEl.className = "message " + type;
  messageEl.classList.remove("hidden");
}

function hideMessage() {
  messageEl.classList.add("hidden");
}

function getScores(difficulty) {
  try {
    return JSON.parse(localStorage.getItem("minesweeper_scores_" + difficulty)) || [];
  } catch {
    return [];
  }
}

function saveScores(difficulty, scores) {
  localStorage.setItem("minesweeper_scores_" + difficulty, JSON.stringify(scores));
}

function addScore(playerName, difficulty, timeSeconds) {
  const scores = getScores(difficulty);
  scores.push({
    player_name: playerName,
    time_seconds: timeSeconds,
    played_at: new Date().toLocaleString("zh-TW"),
  });
  scores.sort((a, b) => a.time_seconds - b.time_seconds);
  if (scores.length > 10) scores.length = 10;
  saveScores(difficulty, scores);
}

submitScoreBtn.addEventListener("click", () => {
  const playerName = playerNameInput.value.trim();
  if (!playerName) {
    submitMsg.textContent = "請輸入名字！";
    submitMsg.style.color = "#e74c3c";
    submitMsg.classList.remove("hidden");
    return;
  }

  addScore(playerName, getDifficulty(), seconds);
  submitMsg.textContent = "✅ 分數已提交！";
  submitMsg.style.color = "#27ae60";
  submitMsg.classList.remove("hidden");
  submitScoreBtn.disabled = true;
  playerNameInput.disabled = true;
});

newGameBtn.addEventListener("click", initGame);
difficultySelect.addEventListener("change", initGame);

initGame();