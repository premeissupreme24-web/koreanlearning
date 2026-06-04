const HANDWRITING_STORAGE_KEY = "ultimateKoreanApp.handwritingAttempts.v1";

function loadHandwritingAttempts() {
  try {
    const raw = localStorage.getItem(HANDWRITING_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveHandwritingAttempts(attempts) {
  const trimmed = attempts.slice(-240);
  localStorage.setItem(HANDWRITING_STORAGE_KEY, JSON.stringify(trimmed));
  return trimmed;
}

function createHandwritingAttempt({ target, targetType = "jamo", strokes = [], durationMs = 0, selfRating = "" }) {
  const now = new Date().toISOString();
  return {
    id: `attempt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    target,
    targetType,
    strokes: strokes.map((stroke) => ({
      id: stroke.id,
      points: (stroke.points || []).map((point) => ({
        x: Number(point.x.toFixed ? point.x.toFixed(2) : point.x),
        y: Number(point.y.toFixed ? point.y.toFixed(2) : point.y),
        pressure: Number((point.pressure || 0.5).toFixed(3)),
        timestamp: point.timestamp || Date.now()
      })),
      startedAt: stroke.startedAt,
      endedAt: stroke.endedAt,
      tool: stroke.tool || "touch"
    })),
    durationMs,
    createdAt: now,
    selfRating: selfRating || undefined
  };
}

function recordHandwritingAttempt(attempt) {
  const attempts = loadHandwritingAttempts();
  attempts.push(attempt);
  saveHandwritingAttempts(attempts);
  if (typeof progress !== "undefined") {
    progress.handwritingAttempts = progress.handwritingAttempts || [];
    progress.handwritingAttempts.push({
      id: attempt.id,
      target: attempt.target,
      targetType: attempt.targetType,
      strokeCount: attempt.strokes.length,
      durationMs: attempt.durationMs,
      selfRating: attempt.selfRating || "",
      createdAt: attempt.createdAt
    });
    if (progress.handwritingAttempts.length > 120) {
      progress.handwritingAttempts = progress.handwritingAttempts.slice(-120);
    }
    updateLearningStreak();
    saveProgress();
    updateProgressUI();
  }
  return attempt;
}

function latestHandwritingAttemptFor(target) {
  return [...loadHandwritingAttempts()].reverse().find((attempt) => attempt.target === target) || null;
}

function handwritingStats() {
  const attempts = loadHandwritingAttempts();
  const today = new Date().toISOString().slice(0, 10);
  const todayAttempts = attempts.filter((attempt) => String(attempt.createdAt || "").startsWith(today));
  return {
    total: attempts.length,
    today: todayAttempts.length,
    todayTargets: [...new Set(todayAttempts.map((attempt) => attempt.target))],
    again: attempts.filter((attempt) => attempt.selfRating === "again").length,
    okay: attempts.filter((attempt) => attempt.selfRating === "okay").length,
    good: attempts.filter((attempt) => attempt.selfRating === "good").length
  };
}
