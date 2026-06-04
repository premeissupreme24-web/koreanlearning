const STORAGE_KEY = "ultimateKoreanApp.progress.v1";

const defaultProgress = {
  learnedLetters: [],
  masteredCards: [],
  completedLessons: [],
  exerciseAttempts: [],
  wrongAnswers: [],
  weakTags: {},
  streak: 0,
  lastStudyDate: null,
  masteryByItem: {},
  handwritingDone: [],
  handwritingAttempts: [],
  speakingReview: [],
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

function recordWrong({ exerciseId = "", unitId = "", itemType, prompt, correctAnswer, userAnswer, choices = [], speakText = "", errorTags = [], skipAttempt = false }) {
  const id = exerciseId || `${itemType}::${prompt}::${correctAnswer}`;
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
    existing.errorTags = [...new Set([...(existing.errorTags || []), ...errorTags])];
    existing.unitId = unitId || existing.unitId || "";
  } else {
    progress.wrongItems.push({
      id,
      exerciseId: exerciseId || id,
      unitId,
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
      correctStreak: 0,
      errorTags: [...errorTags]
    });
  }
  if (!skipAttempt) {
    recordExerciseAttempt({ exerciseId: exerciseId || id, unitId, itemType, correct: false, selectedAnswer: userAnswer, correctAnswer, errorTags });
  }
  recomputeWeakTags();
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
  recordExerciseAttempt({
    exerciseId: item.exerciseId || item.id,
    unitId: item.unitId || "",
    itemType: item.itemType,
    correct: true,
    selectedAnswer: item.correctAnswer,
    correctAnswer: item.correctAnswer,
    errorTags: item.errorTags || []
  });
  if (item.correctStreak >= 2 || item.wrongCount <= 0) {
    progress.wrongItems = progress.wrongItems.filter((wrong) => wrong.id !== id);
    wrongReviewItemId = null;
  }
  recomputeWeakTags();
  saveProgress();
  updateProgressUI();
  renderWrongReview();
}

function recordExerciseAttempt({ exerciseId, unitId = "", itemType = "exercise", correct = false, selectedAnswer = "", correctAnswer = "", errorTags = [] }) {
  updateLearningStreak();
  const attempt = {
    exerciseId,
    unitId,
    itemType,
    correct: Boolean(correct),
    selectedAnswer,
    correctAnswer,
    errorTags: [...errorTags],
    at: new Date().toISOString()
  };
  progress.exerciseAttempts.push(attempt);
  if (progress.exerciseAttempts.length > 400) {
    progress.exerciseAttempts = progress.exerciseAttempts.slice(-400);
  }
  const current = progress.masteryByItem[exerciseId] || { attempts: 0, correct: 0, streak: 0 };
  current.attempts += 1;
  current.correct += correct ? 1 : 0;
  current.streak = correct ? (current.streak || 0) + 1 : 0;
  current.lastAttemptAt = attempt.at;
  progress.masteryByItem[exerciseId] = current;
}

function markLessonComplete(unitId) {
  if (!progress.completedLessons.includes(unitId)) {
    progress.completedLessons.push(unitId);
  }
  updateLearningStreak();
  saveProgress();
  updateProgressUI();
}

function markHandwritingComplete(key) {
  if (!progress.handwritingDone.includes(key)) {
    progress.handwritingDone.push(key);
  }
  updateLearningStreak();
  saveProgress();
  updateProgressUI();
}

function markSpeakingReview(sentence, status) {
  progress.speakingReview = progress.speakingReview.filter((item) => item.sentence !== sentence);
  if (status === "weak") {
    progress.speakingReview.push({
      sentence,
      status,
      lastMarkedAt: new Date().toISOString(),
      errorTags: ["speaking"]
    });
    recordWrong({
      exerciseId: `speaking::${sentence}`,
      unitId: "speaking",
      itemType: "shadowing",
      prompt: sentence,
      correctAnswer: "会说",
      userAnswer: "还不熟",
      choices: ["会说", "还不熟"],
      speakText: sentence,
      errorTags: ["speaking"]
    });
  }
  saveProgress();
  updateProgressUI();
}

function updateLearningStreak() {
  const today = new Date().toISOString().slice(0, 10);
  const last = progress.lastStudyDate;
  if (last === today) return;
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  progress.streak = last === yesterday ? (progress.streak || 0) + 1 : 1;
  progress.lastStudyDate = today;
}

function recomputeWeakTags() {
  const counts = {};
  (progress.wrongItems || []).forEach((item) => {
    (item.errorTags || []).forEach((tag) => {
      counts[tag] = (counts[tag] || 0) + (item.wrongCount || 1);
    });
  });
  progress.weakTags = counts;
  progress.wrongAnswers = progress.wrongItems;
}

function getWeakTags(limit = 4) {
  return Object.entries(progress.weakTags || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag, count]) => ({ tag, count }));
}

function dueReviewItems() {
  const now = Date.now();
  return (progress.wrongItems || []).filter((item) => !item.nextReviewAt || new Date(item.nextReviewAt).getTime() <= now);
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
  setProgressText("lettersLearned", `${learnedCount}/${letterData.length}`);
  setProgressText("scoreTotal", String(score));
  setProgressWidth("overallProgress", `${percent}%`);
  setProgressText("overallProgressText", `${percent}%`);
  setProgressText("wrongItemsCount", String(wrongTotal));
  setProgressText("roadmapLettersLearned", `${learnedCount}/${letterData.length}`);
  const roadmapWordBank = document.getElementById("roadmapWordBank");
  if (roadmapWordBank) roadmapWordBank.textContent = `${vocabTotal}/142`;
  setProgressText("roadmapWrongItems", String(wrongTotal));
  setProgressText("roadmapScore", String(score));
  setProgressText("dashboardGrammar", `${Object.keys(progress.masteryByItem || {}).filter((key) => key.startsWith("grammar-")).length}/25`);
  setProgressText("dashboardStreak", String(progress.streak || 0));
  setProgressText("dashboardDueReviews", String(dueReviewItems().length));
  setProgressWidth("stageOneProgress", `${Math.min(100, Math.round((learnedCount / letterData.length) * 100))}%`, true);
  setProgressWidth("stageTwoProgress", `${Math.min(100, Math.round((masteredVocabCount / Math.max(1, vocabTotal)) * 100))}%`, true);
  setProgressWidth("stageThreeProgress", `${Math.min(100, Math.round((Math.min(score, 120) / 120) * 100))}%`, true);
  renderWeakTagsSummary();
}

function setProgressText(id, value) {
  const node = document.getElementById(id);
  if (node) node.textContent = value;
}

function setProgressWidth(id, value, customProperty = false) {
  const node = document.getElementById(id);
  if (!node) return;
  if (customProperty) {
    node.style.setProperty("--value", value);
  } else {
    node.style.width = value;
  }
}

function renderWeakTagsSummary() {
  const wrap = document.getElementById("weakTagsSummary");
  if (!wrap) return;
  const tags = getWeakTags(5);
  if (!tags.length) {
    wrap.innerHTML = `<p class="text-sm" style="color: var(--muted)">目前没有明显薄弱点。先完成今日训练，系统会自动记录。</p>`;
    return;
  }
  wrap.innerHTML = tags.map((item) => `
    <button class="weak-tag" data-view-shortcut="review">
      <span>${item.tag}</span>
      <strong>${item.count}</strong>
    </button>
  `).join("");
  wrap.querySelectorAll("[data-view-shortcut]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.viewShortcut));
  });
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
      completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
      exerciseAttempts: Array.isArray(parsed.exerciseAttempts) ? parsed.exerciseAttempts : [],
      weakTags: parsed.weakTags || {},
      streak: parsed.streak || 0,
      lastStudyDate: parsed.lastStudyDate || null,
      masteryByItem: parsed.masteryByItem || {},
      handwritingDone: Array.isArray(parsed.handwritingDone) ? parsed.handwritingDone : [],
      handwritingAttempts: Array.isArray(parsed.handwritingAttempts) ? parsed.handwritingAttempts : [],
      speakingReview: Array.isArray(parsed.speakingReview) ? parsed.speakingReview : [],
      wrongItems: Array.isArray(parsed.wrongItems)
        ? parsed.wrongItems.map((item) => ({
            ...item,
            wrongCount: item.wrongCount || 1,
            correctStreak: item.correctStreak || 0,
            lastReviewedAt: item.lastReviewedAt || null,
            nextReviewAt: item.nextReviewAt || nextReviewTime(item.wrongCount || 1, item.correctStreak || 0),
            errorTags: Array.isArray(item.errorTags) ? item.errorTags : []
          }))
        : Array.isArray(parsed.wrongAnswers) ? parsed.wrongAnswers : [],
      wrongAnswers: Array.isArray(parsed.wrongAnswers) ? parsed.wrongAnswers : []
    };
  } catch {
    return cloneProgressDefault();
  }
}

function cloneProgressDefault() {
  return JSON.parse(JSON.stringify(defaultProgress));
}

function saveProgress() {
  progress.wrongAnswers = progress.wrongItems;
  recomputeWeakTags();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}
