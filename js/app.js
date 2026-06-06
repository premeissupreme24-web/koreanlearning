let currentLetterIndex = 0;
let activeFilter = "母音 1";
let focusedDialogueIndex = 0;
let flashcards = [...flashcardsBase];
let soundGameTarget = "가";
let soundPairSetIndex = 0;
let soundPairTarget = "가";
let visualQuizIndex = 0;
let vowelContrastIndex = 0;
let vowelContrastTarget = "애";
let euiQuizIndex = 0;
let wrongReviewItemId = null;
let dictationTarget = "아";
let buildChallengeIndex = 0;
let wordQuizIndex = 0;
let pictureWordQuizIndex = 0;
let listenPictureTarget = null;
let shadowIndex = 0;
let shadowTimer = null;
let selectedUnitId = "unit-0-1";
let selectedLessonMode = "learn";
let copyPracticeMode = "母音 1";
let copyTwoFingerScroll = true;
let copyAutoplayTimer = null;
let copyCompact = false;
let copyBoards = new Map();

let practiceBoard;
let dictationBoard;
let writingDockBoard;

document.addEventListener("DOMContentLoaded", () => {
  renderNavigation();
  renderLetterFilters();
  renderLetters();
  renderLetterDetail();
  renderSyllableLab();
  renderCopyFilters();
  renderFlashcards();
  renderGrammar();
  renderDialogue();
  renderSoundGame();
  renderPronunciationCards();
  renderSoundPairTrainer();
  renderVisualQuiz();
  renderVowelContrastTrainer();
  renderEuiQuiz();
  renderWrongReview();
  renderDictation();
  renderBuildChallenge();
  renderWordQuiz();
  renderPictureWordQuiz();
  renderListenPictureQuiz();
  renderSentenceChallenge();
  renderShadow();
  renderDashboard();
  renderLearnMap();
  renderLessonPage();
  renderGrammarTrackPage();
  renderStatsPage();
  renderSettingsPage();

  practiceBoard = new WritingBoard(document.getElementById("practiceCanvas"), () => selectedLetter().glyph);
  dictationBoard = new WritingBoard(document.getElementById("dictationCanvas"), () => dictationBoard?.showGuide ? dictationTarget : "");
  dictationBoard.showGuide = false;
  dictationBoard.redraw();

  window.addEventListener("resize", () => copyBoards.forEach((board) => board.resize()));
  updateProgressUI();
  bindUI();
  applyTranslations();
  const initialView = window.location.hash.replace("#", "");
  if (initialView && document.getElementById(initialView)?.classList.contains("view-section")) {
    setView(initialView);
  }
});

function bindUI() {
  document.querySelectorAll("[data-view-shortcut]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.viewShortcut));
  });

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      appLanguage = button.dataset.lang === "en" ? "en" : "zh";
      localStorage.setItem(LANGUAGE_KEY, appLanguage);
      applyTranslations();
      renderLetterFilters();
      renderLetters();
      renderLetterDetail();
      renderCopyFilters();
      renderCopyPractice();
      renderPronunciationCards();
      renderSoundPairTrainer();
      renderVisualQuiz();
      renderVowelContrastTrainer();
      renderEuiQuiz();
      renderSoundGame();
      renderDictation();
      renderBuildChallenge();
      renderWordQuiz();
      renderPictureWordQuiz();
      renderListenPictureQuiz();
      renderSentenceChallenge();
      renderWrongReview();
      renderDashboard();
      renderLearnMap();
      renderLessonPage();
      renderGrammarTrackPage();
      renderStatsPage();
      renderSettingsPage();
      updateProgressUI();
    });
  });

  document.getElementById("resetProgress").addEventListener("click", () => {
    progress = cloneProgressDefault();
    saveProgress();
    renderLetters();
    renderLetterDetail();
    renderFlashcards();
    renderDashboard();
    renderLearnMap();
    renderLessonPage();
    renderGrammarTrackPage();
    renderStatsPage();
    renderSettingsPage();
    updateProgressUI();
    renderWrongReview();
    toast(appLanguage === "en" ? "Progress reset. You can start again." : "進度已重置，可以重新開始。");
  });

  document.getElementById("speakLetter").addEventListener("click", () => speak(selectedLetter().sound));
  document.getElementById("markLetterLearned").addEventListener("click", () => toggleLearnedLetter(selectedLetter().glyph));
  document.getElementById("clearPractice").addEventListener("click", () => practiceBoard.clear());
  document.getElementById("undoPractice")?.addEventListener("click", () => practiceBoard.undo());
  document.getElementById("replayPractice")?.addEventListener("click", () => practiceBoard.replay());
  document.querySelectorAll("[data-practice-rating]").forEach((button) => {
    button.addEventListener("click", () => {
      const rating = button.dataset.practiceRating;
      const letter = selectedLetter();
      practiceBoard.saveAttempt(rating);
      if (rating === "good" && !progress.learnedLetters.includes(letter.glyph)) {
        progress.learnedLetters.push(letter.glyph);
        saveProgress();
        renderLetters();
        renderLetterDetail();
        updateProgressUI();
      }
      if (rating === "again") {
        recordWrong({
          exerciseId: `letter-writing::${letter.glyph}`,
          unitId: "unit1",
          itemType: "handwriting",
          prompt: `手写：${letter.glyph}`,
          correctAnswer: "已掌握",
          userAnswer: "再练一次",
          choices: ["再练一次", "还可以", "已掌握"],
          speakText: letter.sound,
          errorTags: ["spelling", letter.type === "母音" ? "hangul-vowel" : "hangul-consonant"]
        });
      }
      toast(rating === "good" ? `${letter.glyph} 已保存並標記掌握。` : rating === "okay" ? `${letter.glyph} 已保存，之後繼續練。` : `${letter.glyph} 已加入錯字復習。`);
    });
  });
  document.getElementById("toggleGuide").addEventListener("click", () => {
    practiceBoard.showGuide = !practiceBoard.showGuide;
    practiceBoard.redraw();
    toast(practiceBoard.showGuide
      ? (appLanguage === "en" ? "Guides and stroke hints are visible." : "已顯示參考線與筆順。")
      : (appLanguage === "en" ? "Guides are hidden." : "已隱藏參考線。"));
  });
  document.getElementById("nextLetter").addEventListener("click", () => {
    currentLetterIndex = (currentLetterIndex + 1) % letterData.length;
    activeFilter = selectedLetter().group;
    renderLetterFilters();
    renderLetters();
    renderLetterDetail();
    practiceBoard.redraw();
  });

  document.getElementById("onsetSelect").addEventListener("change", updateSyllablePreview);
  document.getElementById("vowelSelect").addEventListener("change", updateSyllablePreview);
  document.getElementById("speakSyllable").addEventListener("click", () => speak(document.getElementById("syllablePreview").textContent));

  document.getElementById("copyClearAll").addEventListener("click", () => {
    copyBoards.forEach((board) => board.clear());
    toast(appLanguage === "en" ? "The writing grids on this page are clear." : "這一頁的手寫格已經清空。");
  });
  document.getElementById("copyAutoplay").addEventListener("click", toggleCopyAutoplay);
  document.getElementById("copyTwoFinger").addEventListener("click", () => {
    copyTwoFingerScroll = !copyTwoFingerScroll;
    document.getElementById("copybookShell").classList.toggle("two-finger-scroll", copyTwoFingerScroll);
    document.getElementById("copyTwoFinger").classList.toggle("active", copyTwoFingerScroll);
    toast(copyTwoFingerScroll
      ? (appLanguage === "en" ? "Two-finger scrolling on: write with one finger or Pencil." : "已開啟兩指滾動：一指/筆寫字，兩指滑動頁面。")
      : (appLanguage === "en" ? "Two-finger scrolling is off." : "已關閉兩指滾動。"));
  });
  document.getElementById("copyPhoneMode").addEventListener("click", () => {
    copyCompact = !copyCompact;
    document.getElementById("copybookShell").classList.toggle("compact", copyCompact);
    document.getElementById("copyPhoneMode").classList.toggle("active", copyCompact);
    requestAnimationFrame(() => copyBoards.forEach((board) => board.resize()));
  });
  document.getElementById("copyComplete").addEventListener("click", completeCopyLesson);

  document.getElementById("newSoundGame").addEventListener("click", renderSoundGame);
  document.getElementById("playSoundGame").addEventListener("click", () => speak(soundGameTarget));
  document.getElementById("playPronunciationSet").addEventListener("click", () => speak(pronunciationRules.map((rule) => rule.speak).join(" ")));
  document.getElementById("newSoundPair").addEventListener("click", () => {
    soundPairSetIndex = (soundPairSetIndex + 1) % pronunciationContrastItems.length;
    renderSoundPairTrainer();
  });
  document.getElementById("playSoundPair").addEventListener("click", () => speak(soundPairTarget));
  document.getElementById("newVisualQuiz").addEventListener("click", () => {
    visualQuizIndex = (visualQuizIndex + 1) % quizItems.length;
    renderVisualQuiz();
  });
  document.getElementById("newVowelContrast").addEventListener("click", () => {
    vowelContrastIndex = (vowelContrastIndex + 1) % vowelContrastItems.length;
    renderVowelContrastTrainer();
  });
  document.getElementById("playVowelContrast").addEventListener("click", () => speak(vowelContrastTarget));
  document.getElementById("newEuiQuiz").addEventListener("click", () => {
    euiQuizIndex = (euiQuizIndex + 1) % euiQuizItems.length;
    renderEuiQuiz();
  });
  document.getElementById("newWrongReview").addEventListener("click", () => {
    wrongReviewItemId = null;
    renderWrongReview();
  });
  document.getElementById("playWrongReview").addEventListener("click", () => {
    const item = progress.wrongItems.find((wrong) => wrong.id === wrongReviewItemId);
    if (item?.speakText) speak(item.speakText);
  });
  document.getElementById("shuffleCards").addEventListener("click", () => {
    flashcards = shuffle([...flashcards]);
    renderFlashcards();
  });
  document.getElementById("speakUnitDialogue").addEventListener("click", () => speak(dialogueLines.map((line) => line.ko).join(" ")));
  document.getElementById("speakFocusedLine").addEventListener("click", () => speak(dialogueLines[focusedDialogueIndex].ko));

  document.getElementById("newDictation").addEventListener("click", renderDictation);
  document.getElementById("playDictation").addEventListener("click", () => speak(dictationTarget));
  document.getElementById("clearDictation").addEventListener("click", () => dictationBoard.clear());
  document.getElementById("showDictationAnswer").addEventListener("click", () => {
    dictationBoard.showGuide = true;
    dictationBoard.redraw();
    document.getElementById("dictationAnswer").textContent = dictationTarget;
    document.getElementById("dictationAnswer").classList.remove("hidden");
    document.getElementById("dictationPrompt").textContent = appLanguage === "en" ? "Answer:" : "答案：";
  });
  document.getElementById("dictationCorrect").addEventListener("click", () => {
    progress.scores.dictation += 10;
    saveProgress();
    updateProgressUI();
    toast(appLanguage === "en" ? "Dictation challenge: +10 points." : "聽寫挑戰加 10 分。");
    renderDictation();
  });
  document.getElementById("dictationRetry").addEventListener("click", () => {
    dictationBoard.showGuide = false;
    document.getElementById("dictationAnswer").classList.add("hidden");
    document.getElementById("dictationPrompt").textContent = appLanguage === "en" ? "Listen again and rewrite it." : "再聽一次，重新寫。";
    dictationBoard.clear();
  });

  document.getElementById("newBuildChallenge").addEventListener("click", () => {
    buildChallengeIndex = (buildChallengeIndex + 1) % buildChallenges.length;
    renderBuildChallenge();
  });
  document.getElementById("checkBuild").addEventListener("click", checkBuildChallenge);
  document.getElementById("clearBuild").addEventListener("click", () => clearSlots("#buildSlots .drop-zone", appLanguage === "en" ? "Drop here" : "拖到這裡"));

  document.getElementById("playWordQuiz").addEventListener("click", () => speak(wordQuizItems[wordQuizIndex].ko));
  document.getElementById("newPictureWordQuiz").addEventListener("click", () => {
    pictureWordQuizIndex = (pictureWordQuizIndex + 1) % vocabularyVisualItems.length;
    renderPictureWordQuiz();
  });
  document.getElementById("newListenPictureQuiz").addEventListener("click", renderListenPictureQuiz);
  document.getElementById("playListenPictureQuiz").addEventListener("click", () => {
    if (listenPictureTarget) speak(listenPictureTarget);
  });
  document.getElementById("checkSentence").addEventListener("click", checkSentenceChallenge);
  document.getElementById("clearSentence").addEventListener("click", () => clearSlots("#sentenceSlots .drop-zone", appLanguage === "en" ? "Place here" : "放這裡"));

  document.getElementById("startShadow").addEventListener("click", startShadow);
  document.getElementById("finishShadow").addEventListener("click", finishShadow);
  installKeyboardShortcuts();
}

function installKeyboardShortcuts() {
  document.addEventListener("keydown", (event) => {
    const active = document.activeElement;
    const isTyping = active && ["INPUT", "TEXTAREA", "SELECT"].includes(active.tagName);
    if (isTyping) return;
    const currentView = document.querySelector(".view-section.active")?.id || "roadmap";
    const activeBoard = currentView === "lesson" ? writingDockBoard
      : currentView === "review" ? dictationBoard
      : currentView === "unit1" ? practiceBoard
      : null;

    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "z") {
      event.preventDefault();
      activeBoard?.undo?.();
      return;
    }
    if (event.key === " ") {
      event.preventDefault();
      if (currentView === "lesson") {
        const target = document.querySelector(".writing-dock-head h4")?.textContent || "";
        if (target) speak(target);
      } else if (currentView === "unit1") {
        speak(selectedLetter().sound);
      } else if (currentView === "review") {
        speak(dictationTarget);
      }
      return;
    }
    if (event.key.toLowerCase() === "r") {
      event.preventDefault();
      activeBoard?.replay?.();
      return;
    }
    if (event.key.toLowerCase() === "c") {
      event.preventDefault();
      activeBoard?.clear?.();
    }
  });
}

function renderNavigation() {
  document.querySelectorAll(".nav-button").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });
}

function setView(viewId) {
  if (!document.getElementById(viewId)?.classList.contains("view-section")) return;
  document.querySelectorAll(".view-section").forEach((section) => section.classList.toggle("active", section.id === viewId));
  document.querySelectorAll(".nav-button").forEach((button) => button.classList.toggle("active", button.dataset.view === viewId));
  updateViewTitle(viewId);
  if (window.location.hash !== `#${viewId}`) {
    history.replaceState(null, "", `#${viewId}`);
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (viewId === "unit1") requestAnimationFrame(() => practiceBoard?.resize());
  if (viewId === "review") requestAnimationFrame(() => dictationBoard?.resize());
  if (viewId === "roadmap") renderDashboard();
  if (viewId === "learn") renderLearnMap();
  if (viewId === "lesson") renderLessonPage();
  if (viewId === "grammar") renderGrammarTrackPage();
  if (viewId === "stats") renderStatsPage();
  if (viewId === "settings") renderSettingsPage();
  if (viewId === "copybook") {
    requestAnimationFrame(() => {
      if (!document.getElementById("copyPracticeGrid").children.length) renderCopyPractice();
      copyBoards.forEach((board) => board.resize());
    });
  } else {
    stopCopyAutoplay();
  }
}

function renderLetterFilters() {
  const filters = ["全部", "母音 1", "子音 1", "母音 2", "子音 2", "雙子音", "複合母音"];
  const wrap = document.getElementById("letterFilters");
  wrap.innerHTML = "";
  filters.forEach((filter) => {
    const button = document.createElement("button");
    button.className = `chip ${activeFilter === filter ? "active" : ""}`;
    button.textContent = filterLabel(filter);
    button.addEventListener("click", () => {
      activeFilter = filter;
      renderLetterFilters();
      renderLetters();
    });
    wrap.appendChild(button);
  });
}

function filterLabel(filter) {
  if (appLanguage !== "en") return filter;
  const labels = {
    "全部": "All",
    "母音 1": "Vowels 1",
    "子音 1": "Consonants 1",
    "母音 2": "Vowels 2",
    "子音 2": "Consonants 2",
    "雙子音": "Tense consonants",
    "複合母音": "Complex vowels",
    "全部40音": "All 40 sounds",
    "全部單字": "All words",
    "動物單字": "Animal words",
    "身體單字": "Body words",
    "食物單字": "Food words",
    "日常單字": "Daily words",
    "顏色單字": "Color words",
    "數字單字": "Number words"
  };
  return labels[filter] || filter;
}

function renderLetters() {
  const grid = document.getElementById("letterGrid");
  grid.innerHTML = "";
  const items = activeFilter === "全部" ? letterData : letterData.filter((letter) => letter.group === activeFilter);
  items.forEach((letter) => {
    const realIndex = letterData.findIndex((item) => item.glyph === letter.glyph);
    const button = document.createElement("button");
    const isActive = realIndex === currentLetterIndex;
    const isLearned = progress.learnedLetters.includes(letter.glyph);
    button.className = `letter-tile ${isActive ? "active" : ""} ${isLearned ? "learned" : ""}`;
    button.innerHTML = `
      <div class="flex items-center justify-between gap-2">
        <span class="letter-glyph" lang="ko">${letter.glyph}</span>
        <span class="text-xs font-black px-2 py-1 rounded" style="background:${isLearned ? "#dff2e5" : "#eef1f0"}; color:${isLearned ? "var(--ok)" : "var(--muted)"}">${filterLabel(letter.group)}</span>
      </div>
      <span class="text-sm font-black">${letter.roman}</span>
      <span class="text-xs" style="color: var(--muted)">${letter.example} · ${appLanguage === "en" ? letter.exampleEn : letter.exampleZh}</span>
    `;
    button.addEventListener("click", () => {
      currentLetterIndex = realIndex;
      renderLetters();
      renderLetterDetail();
      practiceBoard?.redraw();
      speak(letter.sound);
    });
    grid.appendChild(button);
  });
}

function renderLetterDetail() {
  const letter = selectedLetter();
  document.getElementById("selectedLetter").textContent = letter.glyph;
  document.getElementById("selectedRoman").textContent = letter.roman;
  document.getElementById("selectedMnemonic").textContent = appLanguage === "en" ? letter.mnemonicEn : letter.mnemonicZh;
  document.getElementById("selectedExample").textContent = `${t("letterDetail.examplePrefix")}${letter.example} · ${appLanguage === "en" ? letter.exampleEn : letter.exampleZh}`;
  document.getElementById("selectedIcon").innerHTML = `<i class="fa-solid ${letter.icon}"></i>`;
  const learned = progress.learnedLetters.includes(letter.glyph);
  const markButton = document.getElementById("markLetterLearned");
  markButton.innerHTML = learned ? `<i class="fa-solid fa-check-double"></i>${t("letterDetail.unmark")}` : `<i class="fa-solid fa-check"></i>${t("letterDetail.mark")}`;
  markButton.classList.toggle("primary", learned);
}

function selectedLetter() {
  return letterData[currentLetterIndex] || letterData[0];
}

function toggleLearnedLetter(glyph) {
  if (progress.learnedLetters.includes(glyph)) {
    progress.learnedLetters = progress.learnedLetters.filter((item) => item !== glyph);
    toast(appLanguage === "en" ? `${glyph} removed from mastered letters.` : `${glyph} 已移出掌握清單。`);
  } else {
    progress.learnedLetters.push(glyph);
    toast(appLanguage === "en" ? `${glyph} marked as mastered.` : `${glyph} 已標記為掌握。`);
  }
  saveProgress();
  renderLetters();
  renderLetterDetail();
  updateProgressUI();
}

function renderSyllableLab() {
  const onsetSelect = document.getElementById("onsetSelect");
  const vowelSelect = document.getElementById("vowelSelect");
  onsetSelect.innerHTML = CHO.map((item) => `<option value="${item}">${item}</option>`).join("");
  vowelSelect.innerHTML = JUNG.map((item) => `<option value="${item}">${item}</option>`).join("");
  onsetSelect.value = "ㄱ";
  vowelSelect.value = "ㅏ";
  updateSyllablePreview();
}

function updateSyllablePreview() {
  const onset = document.getElementById("onsetSelect").value;
  const vowel = document.getElementById("vowelSelect").value;
  document.getElementById("syllablePreview").textContent = composeHangul(onset, vowel);
}

function renderFlashcards() {
  const wrap = document.getElementById("flashcards");
  wrap.innerHTML = "";
  flashcards.forEach((card) => {
    const cardEl = document.createElement("div");
    const learned = progress.masteredCards.includes(card.ko);
    cardEl.className = `flashcard ${learned ? "learned" : ""}`;
    cardEl.tabIndex = 0;
    cardEl.setAttribute("role", "button");
    cardEl.setAttribute("aria-label", `${card.ko} 單字卡`);
    cardEl.innerHTML = `
      <div class="flashcard-inner">
        <div class="flash-face">
          <div>
            <span class="text-xs font-black px-2 py-1 rounded" style="background: var(--indigo-weak); color: var(--indigo)">${card.tag}</span>
            <p class="text-3xl font-black mt-4" lang="ko">${card.ko}</p>
          </div>
          <div class="flex items-center justify-between gap-3">
            <span class="text-sm" style="color: var(--muted)">點擊翻面</span>
            <i class="fa-solid fa-rotate"></i>
          </div>
        </div>
        <div class="flash-face flash-back">
          <div>
            <p class="text-sm font-black" style="color: var(--muted)">${card.roman}</p>
            <p class="text-xl font-black mt-3">${card.zh}</p>
          </div>
          <div class="flex gap-2">
            <button class="control-button card-learn-toggle ${learned ? "primary" : ""}" data-card="${card.ko}">
              <i class="fa-solid ${learned ? "fa-check-double" : "fa-check"}"></i>${learned ? "已學會" : "標記已學會"}
            </button>
          </div>
        </div>
      </div>
    `;
    cardEl.addEventListener("click", (event) => {
      if (event.target.closest(".card-learn-toggle")) return;
      cardEl.classList.toggle("flipped");
      if (cardEl.classList.contains("flipped")) speak(card.ko);
    });
    cardEl.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      cardEl.click();
    });
    cardEl.querySelector(".card-learn-toggle").addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleCard(card.ko);
    });
    wrap.appendChild(cardEl);
  });
}

function toggleCard(ko) {
  if (progress.masteredCards.includes(ko)) {
    progress.masteredCards = progress.masteredCards.filter((item) => item !== ko);
  } else {
    progress.masteredCards.push(ko);
  }
  saveProgress();
  updateProgressUI();
  renderFlashcards();
}

function renderGrammar() {
  const wrap = document.getElementById("grammarCards");
  wrap.innerHTML = grammarItems.map((item, index) => `
    <div class="p-4 border rounded-lg" style="border-radius: 8px; border-color: var(--line)">
      <div class="flex items-start gap-3">
        <span class="avatar ${index % 2 ? "b" : "a"}">${index + 1}</span>
        <div>
          <h5 class="font-black">${item.title}</h5>
          <p class="text-sm leading-relaxed mt-2" style="color: var(--muted)">${item.body}</p>
          <button class="control-button mt-3" data-speak="${item.example.replaceAll('"', "&quot;")}"><i class="fa-solid fa-volume-high"></i><span lang="ko">${item.example}</span></button>
        </div>
      </div>
    </div>
  `).join("");
  wrap.querySelectorAll("[data-speak]").forEach((button) => {
    button.addEventListener("click", () => speak(button.dataset.speak));
  });
}

function renderDialogue() {
  const wrap = document.getElementById("dialogueList");
  wrap.innerHTML = "";
  dialogueLines.forEach((line, index) => {
    const button = document.createElement("button");
    button.className = `dialogue-line ${index === focusedDialogueIndex ? "active" : ""}`;
    button.innerHTML = `
      <span class="avatar ${line.speaker === "가" ? "a" : "b"}">${line.speaker}</span>
      <span class="grid gap-1">
        <span class="text-xl font-black" lang="ko">${line.ko}</span>
        <span class="text-sm" style="color: var(--muted)">${line.zh}</span>
      </span>
    `;
    button.addEventListener("click", () => {
      focusedDialogueIndex = index;
      renderDialogue();
      updateDialogueFocus();
      speak(line.ko);
    });
    wrap.appendChild(button);
  });
  updateDialogueFocus();
}

function updateDialogueFocus() {
  const line = dialogueLines[focusedDialogueIndex];
  document.getElementById("dialogueFocusKo").textContent = line.ko;
  document.getElementById("dialogueFocusZh").textContent = line.zh;
  document.getElementById("dialogueFocusNote").textContent = line.note;
}

function renderDashboard() {
  const wrap = document.getElementById("roadmap");
  if (!wrap) return;
  const isEn = appLanguage === "en";
  const wrongTotal = (progress.wrongItems || []).reduce((sum, item) => sum + (item.wrongCount || 0), 0);
  const vocabTotal = Array.isArray(vocabularyVisualItems) ? vocabularyVisualItems.length : 0;
  const score = Object.values(progress.scores).reduce((sum, value) => sum + value, 0);
  const handwritingAttempts = (progress.handwritingAttempts || []).length;
  const todayWriting = ["ㅏ", "ㅓ", "ㅗ", "ㅜ"];
  const todaySyllables = ["가", "거", "고", "구"];
  const todayWords = ["아이", "오이", "우유"];
  const wrongBuckets = dashboardWrongBuckets();
  const handwritingTargets = typeof handwritingPracticeTargets !== "undefined" ? handwritingPracticeTargets : { jamo: [], syllables: [], words: [] };
  wrap.innerHTML = `
    <article class="ipad-workspace-hero">
      <div class="hangul-bg" aria-hidden="true">한</div>
      <div class="ipad-hero-copy">
        <p class="section-kicker">${isEn ? "iPad Korean workspace" : "iPad 韩语手写训练室"}</p>
        <h3>${isEn ? "Write, hear, build, and review Korean every day" : "从 40 音到 142 个生活单字"}</h3>
        <p>${isEn ? "The core loop is handwriting first: see the sound, hear it, trace it, write it, build syllables, then review your weak spots." : "先会认、会写、会听 142 个核心单字，再进入问候与自我介绍。每天 5 分钟，从手写建立字母感。"}</p>
        <div class="ipad-hero-stats">
          ${statCard(isEn ? "Letters mastered" : "已掌握字母", "roadmapLettersLearned", `${progress.learnedLetters.length}/${letterData.length}`)}
          ${statCard(isEn ? "Synced words" : "同步单字", "roadmapWordBank", vocabTotal)}
          ${statCard(isEn ? "Mistakes due" : "待复习错题", "roadmapWrongItems", wrongTotal)}
          ${statCard(isEn ? "Challenge score" : "挑战分数", "roadmapScore", score)}
        </div>
        <div class="flex flex-wrap gap-3 mt-5">
          <button class="gradient-button" data-view-shortcut="copybook"><i class="fa-solid fa-pen-nib"></i>${isEn ? "Start handwriting" : "开始手写训练"}</button>
          <button class="control-button" data-view-shortcut="vocab"><i class="fa-solid fa-image"></i>${isEn ? "Practice picture words" : "练看图单字"}</button>
          <button class="control-button" data-view-shortcut="review"><i class="fa-solid fa-rotate"></i>${isEn ? "Review mistakes" : "复习错字 / 错音"}</button>
        </div>
      </div>
      <section class="pencil-practice-card">
        <div class="pencil-card-icon"><i class="fa-solid fa-pen-nib"></i></div>
        <p class="section-kicker">${isEn ? "Pencil Practice" : "Pencil Practice"}</p>
        <h4>${isEn ? "Pick up your Pencil and trace for 5 minutes" : "拿起笔，跟着笔顺写 5 分钟"}</h4>
        <div class="pencil-count-grid">
          <div>
            <strong>${handwritingTargets.jamo.length || 40}</strong>
            <span>${isEn ? "letters" : "待练字母"}</span>
          </div>
          <div>
            <strong>${handwritingTargets.syllables.length || 12}</strong>
            <span>${isEn ? "syllables" : "待练音节"}</span>
          </div>
          <div>
            <strong>${handwritingTargets.words.length || vocabTotal}</strong>
            <span>${isEn ? "words" : "待练单字"}</span>
          </div>
          <div>
            <strong>${handwritingAttempts}</strong>
            <span>${isEn ? "attempts" : "已存手写"}</span>
          </div>
        </div>
      </section>
    </article>

    <div class="ipad-learning-grid mt-4">
      <section class="panel ipad-task-card">
        <div class="task-card-head">
          <span><i class="fa-solid fa-pencil"></i></span>
          <div>
            <p class="section-kicker">${isEn ? "Today's handwriting" : "今日手写任务"}</p>
            <h3>${isEn ? "Trace first, then write from memory" : "先描红，再自己写"}</h3>
          </div>
        </div>
        <div class="mission-strip">
          <span>${isEn ? "Write" : "今天写"}：${todayWriting.join(" / ")}</span>
          <span>${isEn ? "Build" : "今天拼"}：${todaySyllables.join(" / ")}</span>
          <span>${isEn ? "Words" : "今天单字"}：${todayWords.join(" / ")}</span>
        </div>
        <button class="control-button primary w-full mt-4" data-view-shortcut="copybook"><i class="fa-solid fa-table-cells-large"></i>${isEn ? "Open copybook" : "打开手写本"}</button>
      </section>

      <section class="panel ipad-task-card">
        <div class="task-card-head">
          <span><i class="fa-solid fa-volume-high"></i></span>
          <div>
            <p class="section-kicker">${isEn ? "Today's listening" : "今日听辨任务"}</p>
            <h3>${isEn ? "Train the sounds Chinese learners mix up" : "专练中文学习者容易混的音"}</h3>
          </div>
        </div>
        <div class="mission-strip">
          <span>ㅓ vs ㅗ</span>
          <span>ㅡ vs ㅜ</span>
          <span>ㄱ / ㅋ / ㄲ</span>
          <span>ㅐ / ㅔ</span>
        </div>
        <button class="control-button w-full mt-4" data-view-shortcut="review"><i class="fa-solid fa-headphones"></i>${isEn ? "Start listening drills" : "开始听辨练习"}</button>
      </section>

      <section class="panel ipad-course-strip">
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="section-kicker">${isEn ? "Course map" : "课程地图"}</p>
            <h3>${isEn ? "Move in small, visible steps" : "横向路线，一步一步走"}</h3>
          </div>
          <button class="control-button" data-view-shortcut="learn"><i class="fa-solid fa-route"></i>${isEn ? "Full map" : "完整地图"}</button>
        </div>
        <div class="ipad-level-scroll mt-4">
          ${courseLevels.map((level, index) => {
            const done = level.units.filter((unit) => progress.completedLessons.includes(unit.id)).length;
            const pct = Math.round((done / Math.max(1, level.units.length)) * 100);
            return `
              <button class="ipad-level-chip" style="--level-color:${level.themeColor}; --pct:${pct * 3.6}deg" data-level-id="${level.id}">
                <span class="progress-ring"><b>${pct}%</b></span>
                <span class="level-copy">
                  <strong>${index === 0 ? "Level 0" : `Level ${index}`}</strong>
                  <small>${level.title}</small>
                  <em>${level.estimatedMinutes} ${isEn ? "min" : "分钟"}</em>
                </span>
              </button>
            `;
          }).join("")}
        </div>
      </section>

      <section class="panel ipad-mistake-card">
        <p class="section-kicker">${isEn ? "Mistake notebook" : "错字 / 错音复习"}</p>
        <h3>${isEn ? "Review what your hand and ear missed" : "写错、听错、拼错，会自动回到这里"}</h3>
        <div class="wrong-bucket-grid mt-4">
          ${wrongBuckets.map((item) => `
            <button class="wrong-bucket" data-view-shortcut="review">
              <span>${item.label}</span>
              <strong>${item.count}</strong>
            </button>
          `).join("")}
        </div>
        <div id="weakTagsSummary" class="weak-tags mt-4"></div>
        <p class="due-review-line">${isEn ? "Due reviews" : "到期复习"}：<span id="dashboardDueReviews">${dueReviewItems().length}</span></p>
      </section>
    </div>
  `;
  bindDynamicNavigation(wrap);
  wrap.querySelectorAll("[data-open-unit]").forEach((button) => {
    button.addEventListener("click", () => openLesson(button.dataset.openUnit));
  });
  wrap.querySelectorAll("[data-level-id]").forEach((button) => {
    button.addEventListener("click", () => {
      renderLearnMap(button.dataset.levelId);
      setView("learn");
    });
  });
}

function statCard(label, id, value) {
  return `
    <div class="stat-card">
      <strong id="${id}">${value}</strong>
      <span>${label}</span>
    </div>
  `;
}

function dashboardWrongBuckets() {
  const isEn = appLanguage === "en";
  const buckets = [
    { key: "handwriting", label: isEn ? "Writing" : "写错最多", match: ["handwriting", "spelling"] },
    { key: "listening", label: isEn ? "Listening" : "听错最多", match: ["listening", "sound", "vowel"] },
    { key: "visual", label: isEn ? "Picture/choice" : "选错最多", match: ["visual", "vocabulary"] },
    { key: "syllable", label: isEn ? "Building" : "拼错最多", match: ["syllable", "build"] }
  ];
  return buckets.map((bucket) => {
    const count = (progress.wrongItems || []).reduce((sum, item) => {
      const tags = item.errorTags || [];
      const type = item.itemType || "";
      const matched = bucket.match.some((token) => type.includes(token) || tags.some((tag) => String(tag).includes(token)));
      return matched ? sum + (item.wrongCount || 1) : sum;
    }, 0);
    return { ...bucket, count };
  });
}

function renderLearnMap(focusedLevelId = "") {
  const wrap = document.getElementById("learnMap");
  if (!wrap) return;
  wrap.innerHTML = `
    <section class="panel p-5 md:p-6">
      <p class="section-kicker">Learn</p>
      <h3 class="text-3xl font-black mt-1">课程地图</h3>
      <p class="mt-2" style="color: var(--muted)">统一课程结构：Level → Unit → Goals → Exercises → Checkpoint。</p>
      <div class="course-map mt-5">
        ${courseLevels.map((level) => `
          <article class="course-level ${level.id === focusedLevelId ? "focus" : ""}" style="--level-color:${level.themeColor}">
            <div class="course-level-head">
              <div>
                <p class="section-kicker">${level.subtitle}</p>
                <h4>${level.title}</h4>
                <p>${level.description}</p>
              </div>
              <span>${level.estimatedMinutes} min</span>
            </div>
            <div class="unit-grid">
              ${level.units.map((unitItem) => {
                const done = progress.completedLessons.includes(unitItem.id);
                return `
                  <button class="unit-card ${done ? "done" : ""}" data-open-unit="${unitItem.id}">
                    <span>${done ? "已完成" : unitItem.theme}</span>
                    <strong>${unitItem.title}</strong>
                    <small>${unitItem.goals.slice(0, 2).join(" · ")}</small>
                  </button>
                `;
              }).join("")}
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
  wrap.querySelectorAll("[data-open-unit]").forEach((button) => {
    button.addEventListener("click", () => openLesson(button.dataset.openUnit));
  });
}

function openLesson(unitId) {
  selectedUnitId = unitId || selectedUnitId;
  renderLessonPage();
  setView("lesson");
}

function renderLessonPage() {
  const wrap = document.getElementById("lessonView");
  if (!wrap) return;
  const { level, unit } = findUnitById(selectedUnitId);
  const lessonExercises = exercisesForUnit(unit.id);
  const writingTarget = lessonWritingTarget(unit);
  wrap.innerHTML = `
    <div class="ipad-lesson-workspace">
      <article class="lesson-shell">
        <header class="lesson-header">
          <button class="control-button" data-view-shortcut="learn"><i class="fa-solid fa-arrow-left"></i>返回课程地图</button>
          <div>
            <p class="section-kicker">${level.title}</p>
            <h3>${unit.title}</h3>
            <p>${unit.goals.join(" · ")}</p>
          </div>
          <div class="lesson-time">${Math.max(5, lessonExercises.length * 2)} 分钟</div>
        </header>
        <div class="lesson-stepper">
          ${["看", "听", "描", "临", "拼", "用", "评", "总结"].map((step, index) => `<span class="${index === 2 ? "active" : ""}">${step}</span>`).join("")}
        </div>
        <section class="lesson-learn-card">
          <p class="section-kicker">Learn</p>
          <h4>这一单元先抓住这些点</h4>
          <div class="lesson-goals">
            ${unit.goals.map((goal) => `<span><i class="fa-solid fa-check"></i>${goal}</span>`).join("")}
          </div>
          <p class="mt-3" style="color: var(--muted)">相关词汇：${unit.vocabulary.length ? unit.vocabulary.join(" / ") : "本单元以发音和结构为主"}</p>
          <p class="mt-1" style="color: var(--muted)">错误标签：${unit.pronunciationPoints.join(" / ") || "grammar"}</p>
        </section>
        <section id="lessonExerciseDeck" class="mt-4"></section>
      </article>

      <aside class="writing-dock-panel">
        <div class="writing-dock-head">
          <div>
            <p class="section-kicker">Writing Panel</p>
            <h4 lang="ko">${writingTarget}</h4>
            <p>Step 3 描红 → Step 4 自己写 → Step 7 自评</p>
          </div>
          <button class="control-button primary" data-writing-speak><i class="fa-solid fa-volume-high"></i>播放</button>
        </div>
        <div class="writing-flow-mini">
          ${["看", "听", "描", "临", "拼", "用", "评"].map((step, index) => `<span class="${index <= 3 ? "active" : ""}">${step}</span>`).join("")}
        </div>
        <div class="canvas-wrap writing-dock-canvas-wrap">
          <canvas id="lessonWritingCanvas" class="practice-canvas writing-dock-canvas" aria-label="${writingTarget} 手写练习"></canvas>
          <div class="canvas-caption">Apple Pencil / 手指可写；画布区域不会滚动页面</div>
        </div>
        <div class="writing-toolbar">
          <button class="control-button" data-writing-clear><i class="fa-solid fa-eraser"></i>清除</button>
          <button class="control-button" data-writing-undo><i class="fa-solid fa-rotate-left"></i>撤销</button>
          <button class="control-button" data-writing-guide><i class="fa-solid fa-eye"></i>描红</button>
          <button class="control-button" data-writing-replay><i class="fa-solid fa-clock-rotate-left"></i>回放</button>
        </div>
        <div class="writing-rating-row">
          <button class="control-button" data-writing-rating="again">再练一次</button>
          <button class="control-button amber" data-writing-rating="okay">还可以</button>
          <button class="control-button primary" data-writing-rating="good">已掌握</button>
        </div>
        <p class="pencil-hint"><i class="fa-solid fa-pen-nib"></i> Space 播放，Cmd+Z 撤销，R 回放，C 清除。</p>
      </aside>
    </div>
  `;
  bindDynamicNavigation(wrap);
  writingDockBoard = new WritingBoard(document.getElementById("lessonWritingCanvas"), () => writingTarget, { targetType: inferTargetType(writingTarget) });
  bindWritingDockControls(wrap, writingTarget, unit);
  ExerciseRenderer.renderDeck(document.getElementById("lessonExerciseDeck"), lessonExercises, {
    unitId: unit.id,
    onComplete: () => {
      renderDashboard();
      renderLearnMap();
      renderStatsPage();
    }
  });
}

function lessonWritingTarget(unit) {
  if (unit.vocabulary?.length) return unit.vocabulary[0];
  const firstExercise = exercisesForUnit(unit.id)[0];
  return firstExercise?.korean || firstExercise?.answer || "ㅏ";
}

function bindWritingDockControls(root, target, unit) {
  root.querySelector("[data-writing-speak]")?.addEventListener("click", () => speak(target));
  root.querySelector("[data-writing-clear]")?.addEventListener("click", () => writingDockBoard?.clear());
  root.querySelector("[data-writing-undo]")?.addEventListener("click", () => writingDockBoard?.undo());
  root.querySelector("[data-writing-replay]")?.addEventListener("click", () => writingDockBoard?.replay());
  root.querySelector("[data-writing-guide]")?.addEventListener("click", () => {
    if (!writingDockBoard) return;
    writingDockBoard.showGuide = !writingDockBoard.showGuide;
    writingDockBoard.redraw();
  });
  root.querySelectorAll("[data-writing-rating]").forEach((button) => {
    button.addEventListener("click", () => {
      const rating = button.dataset.writingRating;
      writingDockBoard?.saveAttempt(rating);
      recordExerciseAttempt({
        exerciseId: `dock-writing::${unit.id}::${target}`,
        unitId: unit.id,
        itemType: "handwriting",
        correct: rating !== "again",
        selectedAnswer: rating,
        correctAnswer: "good",
        errorTags: ["spelling"]
      });
      if (rating === "again") {
        recordWrong({
          exerciseId: `dock-writing::${unit.id}::${target}`,
          unitId: unit.id,
          itemType: "handwriting",
          prompt: `手写：${target}`,
          correctAnswer: "已掌握",
          userAnswer: "再练一次",
          choices: ["再练一次", "还可以", "已掌握"],
          speakText: target,
          errorTags: ["spelling"],
          skipAttempt: true
        });
      }
      toast(rating === "good" ? "手写 attempt 已保存：已掌握。" : rating === "okay" ? "手写 attempt 已保存：还可以。" : "已加入错字复习。");
    });
  });
}

function courseSequence() {
  return courseLevels.flatMap((level) => level.units.map((unit) => ({ level, unit })));
}

function lessonState(unitId) {
  const completed = progress.completedLessons.includes(unitId);
  const reviewed = (progress.lessonReviews || []).includes(unitId);
  if (!completed) return "learn";
  if (!reviewed) return "review";
  return "done";
}

function currentLessonStep() {
  const sequence = courseSequence();
  return sequence.find(({ unit }) => lessonState(unit.id) !== "done") || sequence[sequence.length - 1];
}

function lessonNumber(unitId) {
  return Math.max(1, courseSequence().findIndex(({ unit }) => unit.id === unitId) + 1);
}

function canOpenUnit(unitId) {
  const sequence = courseSequence();
  const index = sequence.findIndex(({ unit }) => unit.id === unitId);
  if (index <= 0) return true;
  const previous = sequence[index - 1].unit;
  return lessonState(previous.id) === "done" || progress.completedLessons.includes(unitId);
}

function nextLockedReason(unitId) {
  const sequence = courseSequence();
  const index = sequence.findIndex(({ unit }) => unit.id === unitId);
  if (index <= 0) return "";
  const previous = sequence[index - 1].unit;
  const state = lessonState(previous.id);
  if (state === "learn") return `先学完第 ${lessonNumber(previous.id)} 课`;
  if (state === "review") return `先复习第 ${lessonNumber(previous.id)} 课`;
  return "";
}

function currentLessonModeFor(unitId) {
  return lessonState(unitId) === "review" ? "review" : "learn";
}

function renderDashboard() {
  const wrap = document.getElementById("roadmap");
  if (!wrap) return;
  const current = currentLessonStep();
  selectedUnitId = current.unit.id;
  selectedLessonMode = currentLessonModeFor(current.unit.id);
  const state = lessonState(current.unit.id);
  const sequence = courseSequence();
  const currentIndex = sequence.findIndex(({ unit }) => unit.id === current.unit.id);
  const completedCount = sequence.filter(({ unit }) => lessonState(unit.id) === "done").length;
  const lessonExercises = exercisesForUnit(current.unit.id);
  const modeText = state === "review" ? "先复习这一课，再进入下一课" : "今天只学这一课，不跳到后面";
  const actionText = state === "review" ? "复习本课" : "开始本课";
  const primaryIcon = state === "review" ? "fa-rotate" : "fa-play";
  wrap.innerHTML = `
    <section class="beginner-home">
      <article class="beginner-hero panel">
        <div class="lesson-badge">第 ${lessonNumber(current.unit.id)} 课</div>
        <p class="section-kicker">从 0 开始</p>
        <h3>${current.unit.title}</h3>
        <p>${modeText}。顺序是：元音/辅音 → 发音 → 手写 → 小测 → 课后复习。</p>
        <div class="beginner-actions">
          <button class="control-button primary" data-open-current="${current.unit.id}" data-open-mode="${currentLessonModeFor(current.unit.id)}"><i class="fa-solid ${primaryIcon}"></i>${actionText}</button>
          <button class="control-button" data-view-shortcut="learn"><i class="fa-solid fa-route"></i>查看课程地图</button>
        </div>
      </article>

      <aside class="today-lesson-card panel">
        <p class="section-kicker">今天只做这些</p>
        <div class="lesson-focus-list">
          ${current.unit.goals.map((goal, index) => `
            <div>
              <span>${index + 1}</span>
              <strong>${goal}</strong>
            </div>
          `).join("")}
        </div>
        <div class="lesson-mini-meta">
          <span><i class="fa-solid fa-list-check"></i>${lessonExercises.length} 个练习</span>
          <span><i class="fa-solid fa-pen-nib"></i>${lessonWritingTarget(current.unit)}</span>
          <span><i class="fa-solid fa-rotate"></i>${state === "review" ? "复习阶段" : "学习阶段"}</span>
        </div>
      </aside>

      <section class="beginner-flow panel">
        <div>
          <p class="section-kicker">学习顺序</p>
          <h4>不要一次打开全部功能，按课堂走</h4>
        </div>
        <div class="lesson-flow-steps">
          ${[
            ["看", "认识本课字母/句型"],
            ["听", "播放发音，分清易混音"],
            ["写", "描红，再自己写"],
            ["练", "做本课小测"],
            ["复", "复习本课错题"],
            ["下", "再进入下一课"]
          ].map((step, index) => `
            <div class="${state === "review" && index === 4 ? "active" : state === "learn" && index === 0 ? "active" : ""}">
              <span>${step[0]}</span>
              <strong>${step[1]}</strong>
            </div>
          `).join("")}
        </div>
      </section>

      <section class="beginner-map-preview panel">
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="section-kicker">接下来几课</p>
            <h4>一课一课解锁</h4>
          </div>
          <span class="step-pill">${completedCount}/${sequence.length} 已复习</span>
        </div>
        <div class="next-lesson-list">
          ${sequence.slice(Math.max(0, currentIndex - 1), currentIndex + 5).map(({ level, unit }) => {
            const itemState = lessonState(unit.id);
            const locked = !canOpenUnit(unit.id);
            return `
              <button class="next-lesson-row ${itemState} ${locked ? "locked" : ""}" ${locked ? "disabled" : ""} data-open-unit="${unit.id}" data-open-mode="${currentLessonModeFor(unit.id)}">
                <span>${lessonNumber(unit.id)}</span>
                <div>
                  <strong>${unit.title}</strong>
                  <small>${locked ? nextLockedReason(unit.id) : itemState === "done" ? "已学完并复习" : itemState === "review" ? "待复习" : level.title}</small>
                </div>
                <em>${itemState === "done" ? "完成" : itemState === "review" ? "复习" : "学习"}</em>
              </button>
            `;
          }).join("")}
        </div>
      </section>

      <section class="beginner-tools panel">
        <p class="section-kicker">辅助工具</p>
        <h4>卡住时再打开</h4>
        <div class="tool-shortcuts">
          <button class="control-button" data-view-shortcut="unit1"><i class="fa-solid fa-volume-high"></i>发音训练</button>
          <button class="control-button" data-view-shortcut="copybook"><i class="fa-solid fa-table-cells-large"></i>手写本</button>
          <button class="control-button" data-view-shortcut="grammar"><i class="fa-solid fa-book-open"></i>语法库</button>
          <button class="control-button" data-view-shortcut="vocab"><i class="fa-solid fa-image"></i>单词库</button>
          <button class="control-button" data-view-shortcut="review"><i class="fa-solid fa-rotate"></i>错题复习</button>
        </div>
      </section>
    </section>
  `;
  bindDynamicNavigation(wrap);
  wrap.querySelector("[data-open-current]")?.addEventListener("click", (event) => {
    openLesson(event.currentTarget.dataset.openCurrent, event.currentTarget.dataset.openMode);
  });
  wrap.querySelectorAll("[data-open-unit]").forEach((button) => {
    button.addEventListener("click", () => openLesson(button.dataset.openUnit, button.dataset.openMode));
  });
}

function renderLearnMap(focusedLevelId = "") {
  const wrap = document.getElementById("learnMap");
  if (!wrap) return;
  const sequence = courseSequence();
  wrap.innerHTML = `
    <section class="panel p-5 md:p-6">
      <p class="section-kicker">课程地图</p>
      <h3 class="text-3xl font-black mt-1">按教材课型一课一课走</h3>
      <p class="mt-2" style="color: var(--muted)">每课必须先学完，再复习完，下一课才成为当前任务。这样新手不会在发音、语法、单词之间乱跳。</p>
      <div class="guided-course-map mt-5">
        ${sequence.map(({ level, unit }) => {
          const state = lessonState(unit.id);
          const locked = !canOpenUnit(unit.id);
          return `
            <button class="guided-unit ${state} ${locked ? "locked" : ""} ${level.id === focusedLevelId ? "focus" : ""}" ${locked ? "disabled" : ""} data-open-unit="${unit.id}" data-open-mode="${currentLessonModeFor(unit.id)}">
              <span class="guided-unit-number">${lessonNumber(unit.id)}</span>
              <div>
                <small>${level.title} · ${unit.theme}</small>
                <strong>${unit.title}</strong>
                <em>${locked ? nextLockedReason(unit.id) : unit.goals.join(" / ")}</em>
              </div>
              <b>${state === "done" ? "已复习" : state === "review" ? "待复习" : locked ? "锁定" : "开始"}</b>
            </button>
          `;
        }).join("")}
      </div>
    </section>
  `;
  wrap.querySelectorAll("[data-open-unit]").forEach((button) => {
    button.addEventListener("click", () => openLesson(button.dataset.openUnit, button.dataset.openMode));
  });
}

function openLesson(unitId, mode = "") {
  selectedUnitId = unitId || selectedUnitId;
  selectedLessonMode = mode || currentLessonModeFor(selectedUnitId);
  renderLessonPage();
  setView("lesson");
}

function renderLessonPage() {
  const wrap = document.getElementById("lessonView");
  if (!wrap) return;
  const { level, unit } = findUnitById(selectedUnitId);
  const lessonExercises = exercisesForUnit(unit.id);
  const mode = selectedLessonMode || currentLessonModeFor(unit.id);
  const isReview = mode === "review";
  const stepLabels = isReview
    ? ["回看", "再听", "再写", "错题", "复习完成"]
    : ["目标", "认识", "发音", "手写", "小测", "学完"];
  wrap.innerHTML = `
    <section class="classroom-page">
      <header class="classroom-header panel">
        <button class="control-button" data-view-shortcut="roadmap"><i class="fa-solid fa-arrow-left"></i>回到当前课程</button>
        <div>
          <p class="section-kicker">${level.title} · 第 ${lessonNumber(unit.id)} 课</p>
          <h3>${isReview ? "复习：" : ""}${unit.title}</h3>
          <p>${isReview ? "复习这一课的目标、发音和练习。复习完成后，下一课才会出现在首页。" : "只完成这一课，不需要打开其他模块。"}</p>
        </div>
        <span class="lesson-time">${Math.max(8, lessonExercises.length * 2)} 分钟</span>
      </header>

      <div class="classroom-steps">
        ${stepLabels.map((label, index) => `<span class="${index === 0 ? "active" : ""}">${index + 1}. ${label}</span>`).join("")}
      </div>

      <div class="classroom-layout">
        <aside class="lesson-board panel">
          <p class="section-kicker">本课目标</p>
          <h4>学完要会这些</h4>
          <div class="lesson-goals">
            ${unit.goals.map((goal) => `<span><i class="fa-solid fa-check"></i>${goal}</span>`).join("")}
          </div>
          <div class="lesson-board-section">
            <strong>本课材料</strong>
            <p>${unit.vocabulary.length ? unit.vocabulary.join(" / ") : "这一课以字母和发音为主"}</p>
          </div>
          <div class="lesson-board-section">
            <strong>本课顺序</strong>
            <p>看字形 → 听发音 → 手写 → 小测 → 保存完成 → 回首页复习</p>
          </div>
          <div class="lesson-board-actions">
            <button class="control-button" data-view-shortcut="unit1"><i class="fa-solid fa-volume-high"></i>发音工具</button>
            <button class="control-button" data-view-shortcut="copybook"><i class="fa-solid fa-pen-nib"></i>手写工具</button>
          </div>
        </aside>

        <main class="lesson-deck-panel panel">
          <div id="lessonExerciseDeck"></div>
        </main>
      </div>
    </section>
  `;
  bindDynamicNavigation(wrap);
  ExerciseRenderer.renderDeck(document.getElementById("lessonExerciseDeck"), lessonExercises, {
    unitId: unit.id,
    onComplete: () => {
      if (isReview) {
        markLessonReviewComplete(unit.id);
        toast("本课复习完成，可以进入下一课。");
      } else {
        toast("本课已完成。请先复习这一课，再进入下一课。");
      }
      renderDashboard();
      renderLearnMap();
      renderStatsPage();
    }
  });
}

function renderGrammarTrackPage() {
  const wrap = document.getElementById("grammarTrackView");
  if (!wrap) return;
  const totalPoints = grammarPracticeSummary?.totalPoints || grammarTrack.length;
  const fullPoints = grammarPracticeSummary?.fullPoints || 15;
  const totalDrills = grammarPracticeSummary?.totalDrills || grammarTrack.reduce((sum, point) => sum + (point.drills || point.exercises || []).length, 0);
  const topikCount = Array.isArray(topikQuestionBank) ? topikQuestionBank.length : 0;
  const verbCount = Array.isArray(verbConjugationTrack) ? verbConjugationTrack.length : 0;
  wrap.innerHTML = `
    <div class="grammar-layout">
      <section class="panel p-5 md:p-6">
        <p class="section-kicker">Grammar Track</p>
        <h3 class="text-3xl font-black mt-1">${totalPoints} 个基础语法点</h3>
        <p class="mt-2" style="color: var(--muted)">前 ${fullPoints} 个已做完整讲解与练习；当前共有 ${totalDrills} 道语法练习，另有 ${verbCount} 个动词变形和 ${topikCount} 道 TOPIK I 风格原创题。</p>
        <div class="grammar-count-grid mt-4">
          ${statCard("完整语法点", "grammarFullCount", `${fullPoints}/${totalPoints}`)}
          ${statCard("语法练习", "grammarDrillCount", totalDrills)}
          ${statCard("动词词条", "grammarVerbCount", verbCount)}
          ${statCard("TOPIK 题", "grammarTopikCount", topikCount)}
        </div>
        <div class="grammar-track-list mt-5">
          ${grammarTrack.map((point, index) => `
            <button class="grammar-point ${index < fullPoints ? "ready" : ""}" data-grammar-id="${point.id}">
              <span>${index + 1}</span>
              <strong>${point.title}</strong>
              <small>${grammarCategoryLabel(point.category)} · ${point.oneLine}</small>
            </button>
          `).join("")}
        </div>
      </section>
      <section class="panel p-5 md:p-6">
        <div id="grammarPointDetail"></div>
        <div id="grammarPracticeDeck" class="mt-4"></div>
      </section>
    </div>
    <div class="grammar-extra-layout mt-4">
      <section id="verbTrainingView" class="panel p-5 md:p-6"></section>
      <section id="topikPracticeView" class="panel p-5 md:p-6"></section>
    </div>
  `;
  wrap.querySelectorAll("[data-grammar-id]").forEach((button) => {
    button.addEventListener("click", () => {
      wrap.querySelectorAll("[data-grammar-id]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderGrammarPoint(button.dataset.grammarId);
    });
  });
  wrap.querySelector("[data-grammar-id]")?.classList.add("active");
  renderGrammarPoint(grammarTrack[0].id);
  renderVerbTrainingBlock();
  renderTopikPracticeBlock();
}

function renderGrammarPoint(grammarId) {
  const point = grammarTrack.find((item) => item.id === grammarId) || grammarTrack[0];
  const detail = document.getElementById("grammarPointDetail");
  if (!detail) return;
  const examples = point.examples || [];
  const usage = point.usage || [];
  const formation = point.formation || [];
  const mistakes = point.commonMistakes || [];
  const comparisons = point.comparison || [];
  detail.innerHTML = `
    <p class="section-kicker">${grammarCategoryLabel(point.category)} · ${point.titleEn || "Grammar"}</p>
    <h3 class="text-3xl font-black mt-1">${point.title}</h3>
    <p class="mt-2 font-black">${point.oneLine}</p>
    <div class="formula-card mt-3">${point.formula}</div>
    <div class="grammar-detail-grid mt-4">
      <article class="grammar-info-card">
        <strong>使用规则</strong>
        <ul>${usage.map((item) => `<li>${item}</li>`).join("") || "<li>先看公式，再用例句理解。</li>"}</ul>
      </article>
      <article class="grammar-info-card">
        <strong>构成方式</strong>
        <ul>${formation.map((item) => `<li>${item}</li>`).join("") || "<li>把结构放进完整句子里练习。</li>"}</ul>
      </article>
    </div>
    <div class="example-list grammar-example-list mt-4">
      ${examples.slice(0, 4).map((example) => `
        <div>
          <strong lang="ko">${example.ko || example.korean}</strong>
          <span>${example.romanization || ""}</span>
          <span>${example.literalZh || example.literalChinese || ""}</span>
          <em>${example.naturalZh || example.naturalChinese || ""}</em>
          ${example.note ? `<small>${example.note}</small>` : ""}
        </div>
      `).join("") || `<p style="color: var(--muted)">这个语法点已有结构，练习会继续扩展。</p>`}
    </div>
    ${comparisons.length ? `
      <div class="grammar-info-card mt-4">
        <strong>对比说明</strong>
        ${comparisons.map((item) => `
          <p class="mt-2"><b>${item.pointA}</b> vs <b>${item.pointB}</b>：${item.explanation}</p>
          <p class="grammar-mini-examples">${(item.examples || []).join(" / ")}</p>
        `).join("")}
      </div>
    ` : ""}
    <div class="mistake-note mt-4"><i class="fa-solid fa-triangle-exclamation"></i><span>${mistakes.map((item) => `${item.mistake} → ${item.correction}。${item.explanation}`).join("<br>") || point.commonMistake}</span></div>
    ${(point.relatedVocabulary || []).length ? `<div class="related-vocab mt-4">${point.relatedVocabulary.map((word) => `<span>${word}</span>`).join("")}</div>` : ""}
  `;
  const exercises = (point.drills || point.exercises || []).map((exercise) => ({
    ...exercise,
    unitId: point.id,
    errorTags: exercise.errorTags || exercise.tags || point.reviewTags || [point.masteryTag || "grammar"]
  }));
  const deck = document.getElementById("grammarPracticeDeck");
  if (exercises.length) {
    ExerciseRenderer.renderDeck(deck, exercises, {
      unitId: point.id,
      onComplete: () => {
        progress.masteryByItem[point.id] = { attempts: 1, correct: 1, streak: 1, lastAttemptAt: new Date().toISOString() };
        saveProgress();
        updateProgressUI();
        renderStatsPage();
      }
    });
  } else {
    deck.innerHTML = `<div class="lesson-summary-card"><p>基础结构已建立，练习将在下一轮扩展。</p></div>`;
  }
}

function renderVerbTrainingBlock() {
  const wrap = document.getElementById("verbTrainingView");
  if (!wrap) return;
  const verbs = Array.isArray(verbConjugationTrack) ? verbConjugationTrack : [];
  const drills = Array.isArray(verbDrills) ? verbDrills.slice(0, 18) : [];
  wrap.innerHTML = `
    <p class="section-kicker">Verb Lab</p>
    <h3 class="text-3xl font-black mt-1">动词变形训练</h3>
    <p class="mt-2" style="color: var(--muted)">先把常用动词的现在时、过去式、将来、否定、想做、正在做练熟。这里是原创练习，不是背一张死表。</p>
    <div class="verb-grid mt-4">
      ${verbs.slice(0, 8).map((verb) => `
        <article class="verb-card">
          <div>
            <strong lang="ko">${verb.dictionary}</strong>
            <span>${verb.roman} · ${verb.meaningZh}</span>
          </div>
          <dl>
            <dt>现在</dt><dd lang="ko">${verb.present}</dd>
            <dt>过去</dt><dd lang="ko">${verb.past}</dd>
            <dt>将来</dt><dd lang="ko">${verb.future}</dd>
            <dt>否定</dt><dd lang="ko">${verb.negative}</dd>
          </dl>
        </article>
      `).join("")}
    </div>
    <div id="verbPracticeDeck" class="mt-4"></div>
  `;
  if (drills.length) {
    ExerciseRenderer.renderDeck(document.getElementById("verbPracticeDeck"), drills.map((exercise) => ({
      ...exercise,
      unitId: "verb-conjugation"
    })), { unitId: "verb-conjugation" });
  }
}

function renderTopikPracticeBlock() {
  const wrap = document.getElementById("topikPracticeView");
  if (!wrap) return;
  const questions = Array.isArray(topikQuestionBank) ? topikQuestionBank.slice(0, 24) : [];
  wrap.innerHTML = `
    <p class="section-kicker">TOPIK I</p>
    <h3 class="text-3xl font-black mt-1">TOPIK 风格原创题</h3>
    <p class="mt-2" style="color: var(--muted)">练助词、语序、名词句、阅读短文和对话选择。题目按 TOPIK I 风格原创编写，不复制真题。</p>
    <div id="topikPracticeDeck" class="mt-4"></div>
  `;
  if (questions.length) {
    ExerciseRenderer.renderDeck(document.getElementById("topikPracticeDeck"), questions.map((exercise) => ({
      ...exercise,
      unitId: "topik-i-basic"
    })), { unitId: "topik-i-basic" });
  }
}

function grammarCategoryLabel(category) {
  const labels = {
    sentence: "句子结构",
    particle: "助词",
    verb: "动词/形容词",
    noun: "名词",
    number: "数字",
    honorific: "敬语",
    expression: "常用表达"
  };
  return labels[category] || "语法";
}

function renderStatsPage() {
  const wrap = document.getElementById("statsView");
  if (!wrap) return;
  const attempts = progress.exerciseAttempts || [];
  const correct = attempts.filter((item) => item.correct).length;
  const accuracy = attempts.length ? Math.round((correct / attempts.length) * 100) : 0;
  const wrongTotal = (progress.wrongItems || []).reduce((sum, item) => sum + (item.wrongCount || 0), 0);
  wrap.innerHTML = `
    <section class="panel p-5 md:p-6">
      <p class="section-kicker">Stats</p>
      <h3 class="text-3xl font-black mt-1">学习统计</h3>
      <div class="stat-grid mt-5">
        ${statCard("完成单元", "statsCompleted", `${progress.completedLessons.length}/${courseLevels.reduce((sum, level) => sum + level.units.length, 0)}`)}
        ${statCard("练习次数", "statsAttempts", attempts.length)}
        ${statCard("正确率", "statsAccuracy", `${accuracy}%`)}
        ${statCard("错题次数", "statsWrong", wrongTotal)}
        ${statCard("手写完成", "statsHandwriting", progress.handwritingDone.length)}
        ${statCard("连续天数", "statsStreak", progress.streak || 0)}
      </div>
      <div class="panel p-4 mt-5">
        <p class="section-kicker">Weak tags</p>
        <div class="weak-tags mt-3">
          ${getWeakTags(8).map((item) => `<span class="weak-tag"><span>${item.tag}</span><strong>${item.count}</strong></span>`).join("") || `<p style="color: var(--muted)">还没有足够错题数据。</p>`}
        </div>
      </div>
    </section>
  `;
}

function renderSettingsPage() {
  const wrap = document.getElementById("settingsView");
  if (!wrap) return;
  wrap.innerHTML = `
    <section class="panel p-5 md:p-6">
      <p class="section-kicker">Settings</p>
      <h3 class="text-3xl font-black mt-1">设置</h3>
      <div class="settings-grid mt-5">
        <div class="setting-row">
          <div>
            <strong>界面语言</strong>
            <p>切换后会保存到 localStorage。</p>
          </div>
          <div class="language-toggle">
            <button type="button" data-settings-lang="zh" class="${appLanguage === "zh" ? "active" : ""}">中文</button>
            <button type="button" data-settings-lang="en" class="${appLanguage === "en" ? "active" : ""}">English</button>
          </div>
        </div>
        <div class="setting-row">
          <div>
            <strong>罗马音</strong>
            <p>当前作为辅助显示。后续可以做成开关。</p>
          </div>
          <span class="step-pill">基础版</span>
        </div>
        <div class="setting-row">
          <div>
            <strong>音频速度</strong>
            <p>当前用浏览器 SpeechSynthesis。真实音频字段已预留 audioUrl / slowAudioUrl。</p>
          </div>
          <span class="step-pill">预留</span>
        </div>
        <div class="setting-row danger-zone">
          <div>
            <strong>重置学习数据</strong>
            <p>会清除本地进度、错题和统计。</p>
          </div>
          <button class="control-button" id="settingsResetProgress"><i class="fa-solid fa-rotate-left"></i>重置</button>
        </div>
      </div>
    </section>
  `;
  wrap.querySelectorAll("[data-settings-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      appLanguage = button.dataset.settingsLang === "en" ? "en" : "zh";
      localStorage.setItem(LANGUAGE_KEY, appLanguage);
      applyTranslations();
      renderSettingsPage();
    });
  });
  document.getElementById("settingsResetProgress")?.addEventListener("click", () => {
    progress = cloneProgressDefault();
    saveProgress();
    updateProgressUI();
    renderDashboard();
    renderStatsPage();
    toast("学习数据已重置。");
  });
}

function bindDynamicNavigation(root) {
  root.querySelectorAll("[data-view-shortcut]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.viewShortcut));
  });
}

function composeHangul(onset, vowel, coda = "") {
  const cho = CHO.indexOf(onset);
  const jung = JUNG.indexOf(vowel);
  const jong = JONG.indexOf(coda);
  if (cho < 0 || jung < 0 || jong < 0) return `${onset}${vowel}${coda}`;
  return String.fromCharCode(0xac00 + cho * 588 + jung * 28 + jong);
}

function shuffle(items) {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

function toast(message) {
  const box = document.getElementById("toast");
  box.textContent = message;
  box.classList.add("show");
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => box.classList.remove("show"), 2100);
}
