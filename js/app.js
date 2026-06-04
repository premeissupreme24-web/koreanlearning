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
let copyPracticeMode = "母音 1";
let copyTwoFingerScroll = true;
let copyAutoplayTimer = null;
let copyCompact = false;
let copyBoards = new Map();

let practiceBoard;
let dictationBoard;

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
      updateProgressUI();
    });
  });

  document.getElementById("resetProgress").addEventListener("click", () => {
    progress = cloneProgressDefault();
    saveProgress();
    renderLetters();
    renderLetterDetail();
    renderFlashcards();
    updateProgressUI();
    renderWrongReview();
    toast(appLanguage === "en" ? "Progress reset. You can start again." : "進度已重置，可以重新開始。");
  });

  document.getElementById("speakLetter").addEventListener("click", () => speak(selectedLetter().sound));
  document.getElementById("markLetterLearned").addEventListener("click", () => toggleLearnedLetter(selectedLetter().glyph));
  document.getElementById("clearPractice").addEventListener("click", () => practiceBoard.clear());
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
