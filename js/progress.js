const STORAGE_KEY = "ultimateKoreanApp.progress.v1";

const defaultProgress = {
  learnedLetters: [],
  masteredCards: [],
  scores: {
    sound: 0,
    dictation: 0,
    build: 0,
    word: 0,
    sentence: 0,
    shadow: 0
  },
  wrongItems: []
};

let progress = loadProgress();

function recordWrong({ itemType, prompt, correctAnswer, userAnswer, choices = [], speakText = "" }) {
  const id = `${itemType}::${prompt}::${correctAnswer}`;
  const now = new Date().toISOString();
  const nextReviewAt = nextReviewTime(1);
  const existing = progress.wrongItems.find((item) => item.id === id);
  if (existing) {
    existing.wrongCount = (existing.wrongCount || 0) + 1;
    existing.lastWrongAt = now;
    existing.nextReviewAt = nextReviewTime(existing.wrongCount);
    existing.userAnswer = userAnswer;
    existing.choices = [...choices];
    existing.speakText = speakText;
    existing.correctStreak = 0;
  } else {
    progress.wrongItems.push({
      id,
      itemType,
      prompt,
      correctAnswer,
      userAnswer,
      wrongCount: 1,
      lastWrongAt: now,
      lastReviewedAt: null,
      nextReviewAt,
      choices: [...choices],
      speakText,
      correctStreak: 0
    });
  }
  saveProgress();
  updateProgressUI();
  renderWrongReview();
}

function resolveWrongItem(id) {
  const item = progress.wrongItems.find((wrong) => wrong.id === id);
  if (!item) return;
  const now = new Date().toISOString();
  item.wrongCount = Math.max(0, (item.wrongCount || 1) - 1);
  item.correctStreak = (item.correctStreak || 0) + 1;
  item.lastReviewedAt = now;
  item.nextReviewAt = nextReviewTime(item.wrongCount || 1, item.correctStreak);
  if (item.correctStreak >= 2 || item.wrongCount <= 0) {
    progress.wrongItems = progress.wrongItems.filter((wrong) => wrong.id !== id);
    wrongReviewItemId = null;
  }
  saveProgress();
  updateProgressUI();
  renderWrongReview();
}

function nextReviewTime(wrongCount = 1, correctStreak = 0) {
  const minutes = Math.max(5, wrongCount * 10 - correctStreak * 3);
  return new Date(Date.now() + minutes * 60 * 1000).toISOString();
}

function formatTime(value) {
  if (!value) return "尚未記錄";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

function updateProgressUI() {
  const learnedCount = progress.learnedLetters.length;
  const score = Object.values(progress.scores).reduce((sum, value) => sum + value, 0);
  const cardCount = progress.masteredCards.length;
  const vocabTotal = Array.isArray(vocabularyVisualItems) ? vocabularyVisualItems.length : 0;
  const masteredVocabCount = progress.masteredCards.filter((item) => item.startsWith("word:")).length;
  const contentTotal = Math.max(1, flashcardsBase.length + vocabTotal);
  const wrongTotal = (progress.wrongItems || []).reduce((sum, item) => sum + (item.wrongCount || 0), 0);
  const percent = Math.min(100, Math.round(((learnedCount / letterData.length) * 62 + (cardCount / contentTotal) * 23 + Math.min(score, 120) / 120 * 15)));
  document.getElementById("lettersLearned").textContent = `${learnedCount}/${letterData.length}`;
  document.getElementById("scoreTotal").textContent = String(score);
  document.getElementById("overallProgress").style.width = `${percent}%`;
  document.getElementById("overallProgressText").textContent = `${percent}%`;
  const wrongCountEl = document.getElementById("wrongItemsCount");
  if (wrongCountEl) wrongCountEl.textContent = String(wrongTotal);
  document.getElementById("roadmapLettersLearned").textContent = `${learnedCount}/${letterData.length}`;
  const roadmapWordBank = document.getElementById("roadmapWordBank");
  if (roadmapWordBank) roadmapWordBank.textContent = String(vocabTotal);
  document.getElementById("roadmapWrongItems").textContent = String(wrongTotal);
  document.getElementById("roadmapScore").textContent = String(score);
  document.getElementById("stageOneProgress").style.setProperty("--value", `${Math.min(100, Math.round((learnedCount / letterData.length) * 100))}%`);
  document.getElementById("stageTwoProgress").style.setProperty("--value", `${Math.min(100, Math.round((masteredVocabCount / Math.max(1, vocabTotal)) * 100))}%`);
  document.getElementById("stageThreeProgress").style.setProperty("--value", `${Math.min(100, Math.round((Math.min(score, 120) / 120) * 100))}%`);
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return cloneProgressDefault();
    const parsed = JSON.parse(raw);
    const base = cloneProgressDefault();
    return {
      ...base,
      ...parsed,
      scores: { ...base.scores, ...(parsed.scores || {}) },
      wrongItems: Array.isArray(parsed.wrongItems)
        ? parsed.wrongItems.map((item) => ({
            ...item,
            wrongCount: item.wrongCount || 1,
            correctStreak: item.correctStreak || 0,
            lastReviewedAt: item.lastReviewedAt || null,
            nextReviewAt: item.nextReviewAt || nextReviewTime(item.wrongCount || 1, item.correctStreak || 0)
          }))
        : []
    };
  } catch {
    return cloneProgressDefault();
  }
}

function cloneProgressDefault() {
  return JSON.parse(JSON.stringify(defaultProgress));
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}
