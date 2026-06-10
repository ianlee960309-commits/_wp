const difficultyTabs = document.querySelectorAll(".difficulty-tabs a");
const scoreBody = document.getElementById("scoreBody");
let currentDifficulty = "medium";

function getScores(difficulty) {
  try {
    return JSON.parse(localStorage.getItem("minesweeper_scores_" + difficulty)) || [];
  } catch {
    return [];
  }
}

function renderScores(difficulty) {
  const scores = getScores(difficulty);
  scoreBody.innerHTML = "";

  if (scores.length === 0) {
    scoreBody.innerHTML = '<tr><td colspan="4" class="empty-msg">尚無紀錄，快去玩一局吧！</td></tr>';
    return;
  }

  scores.forEach((s, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${escapeHtml(s.player_name)}</td>
      <td>${s.time_seconds}</td>
      <td>${s.played_at || ""}</td>
    `;
    scoreBody.appendChild(tr);
  });
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

difficultyTabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    e.preventDefault();
    difficultyTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    currentDifficulty = tab.dataset.difficulty;
    renderScores(currentDifficulty);
  });
});

renderScores(currentDifficulty);