function renderCopyFilters() {
  const filters = ["母音 1", "母音 2", "子音 1", "子音 2", "雙子音", "複合母音", "全部40音", "全部單字", "動物單字", "身體單字", "食物單字", "日常單字", "顏色單字", "數字單字"];
  const wrap = document.getElementById("copyFilters");
  wrap.innerHTML = "";
  filters.forEach((filter) => {
    const button = document.createElement("button");
    button.className = `copy-filter ${copyPracticeMode === filter ? "active" : ""}`;
    button.textContent = filterLabel(filter);
    button.addEventListener("click", () => {
      copyPracticeMode = filter;
      stopCopyAutoplay();
      renderCopyFilters();
      renderCopyPractice();
    });
    wrap.appendChild(button);
  });
}

function renderCopyPractice() {
  const items = currentCopyItems();
  const grid = document.getElementById("copyPracticeGrid");
  const titleMap = {
    "母音 1": appLanguage === "en" ? "Pure Vowels Pt.1" : "母音 1",
    "母音 2": appLanguage === "en" ? "Pure Vowels Pt.2" : "母音 2",
    "子音 1": appLanguage === "en" ? "Consonants Pt.1" : "子音 1",
    "子音 2": appLanguage === "en" ? "Consonants Pt.2" : "子音 2",
    "雙子音": appLanguage === "en" ? "Tense Consonants" : "雙子音",
    "複合母音": appLanguage === "en" ? "Complex Vowels" : "複合母音",
    "全部40音": appLanguage === "en" ? "All Hangul Sounds" : "全部 40 音",
    "全部單字": appLanguage === "en" ? "All Picture Words" : "全部單字",
    "動物單字": appLanguage === "en" ? "Animal Words" : "動物單字",
    "身體單字": appLanguage === "en" ? "Body Words" : "身體單字",
    "食物單字": appLanguage === "en" ? "Food Words" : "食物單字",
    "日常單字": appLanguage === "en" ? "Daily Words" : "日常單字",
    "顏色單字": appLanguage === "en" ? "Color Words" : "顏色單字",
    "數字單字": appLanguage === "en" ? "Number Words" : "數字單字"
  };
  document.getElementById("copyLessonTitle").textContent = titleMap[copyPracticeMode] || copyPracticeMode;
  copyBoards.clear();
  grid.innerHTML = items.map((item) => {
    const learned = isCopyItemLearned(item);
    const visualClass = ["copy-picture", item.visualType === "number" ? "number" : "", item.color ? "color" : ""].filter(Boolean).join(" ");
    const visualMarkup = item.visual ? `<div class="${visualClass}" aria-hidden="true">${copyVisualMarkup(item)}</div>` : "";
    const titleClass = [
      "copy-title",
      item.copyText.length >= 4 ? "long-ko" : "",
      item.copyText.length >= 5 ? "very-long-ko" : "",
      item.roman.length >= 10 ? "long-roman" : "",
      item.roman.length >= 13 ? "very-long-roman" : ""
    ].filter(Boolean).join(" ");
    return `
      <article class="copy-card" data-copy-key="${item.key}" data-speak="${item.speakText}">
        <div class="copy-card-head">
          <button class="copy-play" data-copy-speak="${item.speakText}" aria-label="播放 ${item.copyText}"><i class="fa-solid fa-play"></i></button>
          <div class="${titleClass}">
            ${visualMarkup}
            <p class="copy-ko" lang="ko">${item.copyText}</p>
            <p class="copy-roman">${item.roman}</p>
            <p class="copy-meaning">${item.meaning}</p>
          </div>
          <button class="copy-mode-button ${learned ? "done" : ""}" data-copy-done="${item.progressKey}">
            <i class="fa-solid ${learned ? "fa-check-double" : "fa-check"}"></i>${learned ? "Done" : "Mark"}
          </button>
      </div>
      <div class="copy-actions">
          <button class="copy-action clear" data-copy-clear="${item.key}"><i class="fa-solid fa-trash-can"></i>${appLanguage === "en" ? "Clear" : "清除"}</button>
          <button class="copy-action" data-copy-undo="${item.key}"><i class="fa-solid fa-rotate-left"></i>${appLanguage === "en" ? "Undo" : "復原"}</button>
          <button class="copy-action" data-copy-replay="${item.key}"><i class="fa-solid fa-clock-rotate-left"></i>${appLanguage === "en" ? "Replay" : "回放"}</button>
          <button class="copy-action speak" data-copy-speak="${item.speakText}"><i class="fa-solid fa-microphone"></i>${appLanguage === "en" ? "Speak" : "發音"}</button>
          <button class="copy-action strokes" data-copy-strokes="${item.key}"><i class="fa-solid fa-wand-magic-sparkles"></i>${appLanguage === "en" ? "Show Strokes" : "顯示筆順"}</button>
          <button class="copy-action" data-copy-rate="${item.key}" data-copy-rating="again">${appLanguage === "en" ? "Again" : "再練"}</button>
          <button class="copy-action" data-copy-rate="${item.key}" data-copy-rating="okay">${appLanguage === "en" ? "Okay" : "還可以"}</button>
          <button class="copy-action speak" data-copy-rate="${item.key}" data-copy-rating="good">${appLanguage === "en" ? "Mastered" : "已掌握"}</button>
        </div>
        <div class="copy-canvas-wrap">
          <canvas class="copy-canvas" data-copy-canvas="${item.key}" aria-label="${item.copyText} 手寫練習格"></canvas>
        </div>
        <div class="copy-footer">
          <span>${filterLabel(item.lessonLabel)} · ${item.roman}</span>
          <span>${appLanguage === "en" ? "Write with one finger or Apple Pencil; scroll with two fingers" : "一指/Apple Pencil 寫字，兩指滑動頁面"}</span>
        </div>
      </article>
    `;
  }).join("");

  items.forEach((item) => {
    const canvas = grid.querySelector(`[data-copy-canvas="${cssEscape(item.key)}"]`);
    if (!canvas) return;
    copyBoards.set(item.key, new CopyPracticeBoard(canvas, item));
  });

  grid.querySelectorAll("[data-copy-speak]").forEach((button) => {
    button.addEventListener("click", () => speak(button.dataset.copySpeak));
  });
  grid.querySelectorAll("[data-copy-clear]").forEach((button) => {
    button.addEventListener("click", () => copyBoards.get(button.dataset.copyClear)?.clear());
  });
  grid.querySelectorAll("[data-copy-undo]").forEach((button) => {
    button.addEventListener("click", () => copyBoards.get(button.dataset.copyUndo)?.undo());
  });
  grid.querySelectorAll("[data-copy-replay]").forEach((button) => {
    button.addEventListener("click", () => copyBoards.get(button.dataset.copyReplay)?.replay());
  });
  grid.querySelectorAll("[data-copy-strokes]").forEach((button) => {
    button.addEventListener("click", () => {
      const board = copyBoards.get(button.dataset.copyStrokes);
      if (!board) return;
      const active = board.toggleStrokes();
      button.classList.toggle("active", active);
      button.innerHTML = active
        ? `<i class="fa-solid fa-wand-magic-sparkles"></i>${appLanguage === "en" ? "Hide Strokes" : "隱藏筆順"}`
        : `<i class="fa-solid fa-wand-magic-sparkles"></i>${appLanguage === "en" ? "Show Strokes" : "顯示筆順"}`;
    });
  });
  grid.querySelectorAll("[data-copy-done]").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest("[data-copy-key]");
      if (card) copyBoards.get(card.dataset.copyKey)?.saveAttempt("good");
      markCopyItemLearned(button.dataset.copyDone);
      renderCopyPractice();
    });
  });
  grid.querySelectorAll("[data-copy-rate]").forEach((button) => {
    button.addEventListener("click", () => {
      const board = copyBoards.get(button.dataset.copyRate);
      if (!board) return;
      const rating = button.dataset.copyRating;
      board.saveAttempt(rating);
      if (rating === "again") {
        recordWrong({
          exerciseId: `copybook::${board.item.progressKey}`,
          unitId: "copybook",
          itemType: "handwriting",
          prompt: `手写：${board.item.copyText}`,
          correctAnswer: "已掌握",
          userAnswer: "再练一次",
          choices: ["再练一次", "还可以", "已掌握"],
          speakText: board.item.speakText,
          errorTags: ["spelling"]
        });
      }
      if (rating === "good") markCopyItemLearned(board.item.progressKey);
      toast(rating === "good" ? `${board.item.copyText} 已保存並標記掌握。` : rating === "okay" ? `${board.item.copyText} 已保存。` : `${board.item.copyText} 已加入錯字復習。`);
      if (rating === "good") renderCopyPractice();
    });
  });

  requestAnimationFrame(() => copyBoards.forEach((board) => board.resize()));
}

function currentCopyItems() {
  const items = makeCopyPracticeItems();
  if (copyPracticeMode === "全部40音") return items.filter((item) => item.type === "letter");
  if (copyPracticeMode === "全部單字") return items.filter((item) => item.type === "word");
  return items.filter((item) => item.group === copyPracticeMode);
}

function makeCopyPracticeItems() {
  const letterItems = letterData.map((letter) => {
    const copyText = letter.type === "母音" ? letter.sound : letter.example;
    const meaning = letter.type === "母音" ? `${letter.roman} sound` : letter.exampleZh;
    return {
      key: `${letter.group}-${letter.glyph}`,
      type: "letter",
      group: letter.group,
      letterGlyph: letter.glyph,
      progressKey: `letter:${letter.glyph}`,
      strokeGlyph: letter.glyph,
      copyText,
      speakText: copyText,
      roman: letter.roman,
      meaning,
      lessonLabel: letter.group
    };
  });
  const wordItems = vocabularyCopyData.map((word) => ({
    key: `${word.group}-${word.ko}`,
    type: "word",
    group: word.group,
    letterGlyph: "",
    progressKey: `word:${word.ko}`,
    strokeGlyph: word.strokeGlyph,
    copyText: word.ko,
    speakText: word.ko,
    roman: word.roman,
    meaning: word.meaning,
    lessonLabel: word.group,
    visual: word.visual,
    visualType: word.visualType,
    color: word.color
  }));
  return [...letterItems, ...wordItems];
}

function copyVisualMarkup(item) {
  if (item.color) return `<span class="copy-color-swatch" style="background: ${item.color}"></span>`;
  return item.visual;
}

function completeCopyLesson() {
  const items = currentCopyItems();
  const learned = new Set(progress.learnedLetters);
  items.filter((item) => item.type === "letter").forEach((item) => learned.add(item.letterGlyph));
  progress.learnedLetters = [...learned];
  const cards = new Set(progress.masteredCards);
  items.filter((item) => item.type === "word").forEach((item) => cards.add(item.progressKey));
  progress.masteredCards = [...cards];
  saveProgress();
  renderLetters();
  renderLetterDetail();
  renderCopyPractice();
  updateProgressUI();
  toast(appLanguage === "en" ? `${filterLabel(copyPracticeMode)} marked complete.` : `${copyPracticeMode} 已全部標記完成。`);
}

function isCopyItemLearned(item) {
  if (item.type === "letter") return progress.learnedLetters.includes(item.letterGlyph);
  return progress.masteredCards.includes(item.progressKey);
}

function toggleCopyItemLearned(progressKey) {
  if (progressKey.startsWith("letter:")) {
    toggleLearnedLetter(progressKey.slice(7));
    return;
  }
  if (progress.masteredCards.includes(progressKey)) {
    progress.masteredCards = progress.masteredCards.filter((item) => item !== progressKey);
  } else {
    progress.masteredCards.push(progressKey);
  }
  saveProgress();
  updateProgressUI();
}

function markCopyItemLearned(progressKey) {
  if (progressKey.startsWith("letter:")) {
    const glyph = progressKey.slice(7);
    if (!progress.learnedLetters.includes(glyph)) {
      progress.learnedLetters.push(glyph);
    }
  } else if (!progress.masteredCards.includes(progressKey)) {
    progress.masteredCards.push(progressKey);
  }
  saveProgress();
  updateProgressUI();
}

function toggleCopyAutoplay() {
  if (copyAutoplayTimer) {
    stopCopyAutoplay();
    return;
  }
  const cards = [...document.querySelectorAll("#copyPracticeGrid .copy-card")];
  if (!cards.length) return;
  const button = document.getElementById("copyAutoplay");
  button.classList.add("active");
  let index = 0;
  const playCurrent = () => {
    const card = cards[index];
    if (!card) {
      stopCopyAutoplay();
      return;
    }
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    speak(card.dataset.speak);
    index += 1;
    if (index >= cards.length) index = 0;
  };
  playCurrent();
  copyAutoplayTimer = window.setInterval(playCurrent, 2200);
}

function stopCopyAutoplay() {
  if (copyAutoplayTimer) window.clearInterval(copyAutoplayTimer);
  copyAutoplayTimer = null;
  document.getElementById("copyAutoplay")?.classList.remove("active");
}

function cssEscape(value) {
  if (window.CSS && CSS.escape) return CSS.escape(value);
  return value.replace(/"/g, '\\"');
}
