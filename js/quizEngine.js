let wrongReviewFilter = "all";

function renderSoundGame() {
  const options = shuffle([...soundGameItems]).slice(0, 3);
  soundGameTarget = options[Math.floor(Math.random() * options.length)];
  const wrap = document.getElementById("soundChoices");
  wrap.innerHTML = "";
  options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "control-button text-2xl";
    button.lang = "ko";
    button.textContent = option;
    button.addEventListener("click", () => {
      const feedback = document.getElementById("soundFeedback");
      if (option === soundGameTarget) {
        progress.scores.sound += 5;
        saveProgress();
        updateProgressUI();
        feedback.textContent = appLanguage === "en" ? "Correct. The sound and letter are connecting." : "答對了，音與字連起來了。";
        feedback.style.color = "var(--ok)";
      } else {
        recordWrong({
          itemType: "sound-basic",
          prompt: "聽音辨字",
          correctAnswer: soundGameTarget,
          userAnswer: option,
          choices: options,
          speakText: soundGameTarget
        });
        feedback.textContent = appLanguage === "en" ? `Listen again. This one is not ${option}.` : `再聽一次，這題不是 ${option}。`;
        feedback.style.color = "var(--danger)";
      }
    });
    wrap.appendChild(button);
  });
  const feedback = document.getElementById("soundFeedback");
  feedback.textContent = t("soundGame.ready");
  feedback.style.color = "var(--muted)";
}

function renderPronunciationCards() {
  const wrap = document.getElementById("pronunciationCards");
  wrap.innerHTML = pronunciationRules.map((rule) => `
    <button class="pronunciation-card" data-rule-speak="${rule.speak}">
      <span class="rule-chip"><i class="fa-solid fa-wave-square"></i>${localized(rule, "tag")}</span>
      <div>
        <h4 class="font-black">${localized(rule, "title")}</h4>
        <div class="sound-stack mt-3">
          ${rule.sounds.map((sound) => `<span class="sound-pill" lang="ko">${sound}</span>`).join("")}
        </div>
      </div>
      <p class="text-sm leading-relaxed" style="color: var(--muted)">${localized(rule, "note")}</p>
    </button>
  `).join("");
  wrap.querySelectorAll("[data-rule-speak]").forEach((button) => {
    button.addEventListener("click", () => speak(button.dataset.ruleSpeak));
  });
}

function renderSoundPairTrainer() {
  const set = pronunciationContrastItems[soundPairSetIndex] || pronunciationContrastItems[0];
  soundPairTarget = set.choices[Math.floor(Math.random() * set.choices.length)];
  document.getElementById("soundPairPrompt").textContent = `${localized(set, "title")}: ${localized(set, "hint")}`;
  const wrap = document.getElementById("soundPairChoices");
  wrap.innerHTML = shuffle([...set.choices]).map((choice) => `
    <button class="control-button text-2xl" data-sound-pair="${choice}" lang="ko">${choice}</button>
  `).join("");
  const feedback = document.getElementById("soundPairFeedback");
  feedback.textContent = appLanguage === "en" ? "Play first, listen only, then choose the sound." : "先按播放，只聽聲音，再選你聽到的字。";
  feedback.style.color = "var(--muted)";
  wrap.querySelectorAll("[data-sound-pair]").forEach((button) => {
    button.addEventListener("click", () => {
      speak(button.dataset.soundPair);
      if (button.dataset.soundPair === soundPairTarget) {
        progress.scores.sound += 5;
        saveProgress();
        updateProgressUI();
        feedback.textContent = appLanguage === "en" ? `Correct: ${soundPairTarget}. Keep training your ear.` : `答對了，是 ${soundPairTarget}。換一題繼續練耳朵。`;
        feedback.style.color = "var(--ok)";
        window.setTimeout(renderSoundPairTrainer, 650);
      } else {
        recordWrong({
          itemType: "pronunciation-listening",
          prompt: localized(set, "title"),
          correctAnswer: soundPairTarget,
          userAnswer: button.dataset.soundPair,
          choices: set.choices,
          speakText: soundPairTarget
        });
        feedback.textContent = appLanguage === "en" ? `Not ${button.dataset.soundPair}. Play again and listen for air or tension.` : `這次不是 ${button.dataset.soundPair}。再按播放，注意有沒有送氣或緊音。`;
        feedback.style.color = "var(--danger)";
      }
    });
  });
}

function renderVisualQuiz() {
  const item = quizItems[visualQuizIndex] || quizItems[0];
  document.getElementById("visualQuizPrompt").textContent = item.prompt;
  const wrap = document.getElementById("visualQuizChoices");
  wrap.innerHTML = shuffle([...item.choices]).map((choice) => `
    <button class="control-button" data-visual-answer="${choice}">${choice}</button>
  `).join("");
  const feedback = document.getElementById("visualQuizFeedback");
  feedback.textContent = t("visualQuiz.feedbackReady");
  feedback.style.color = "var(--muted)";
  wrap.querySelectorAll("[data-visual-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const userAnswer = button.dataset.visualAnswer;
      if (userAnswer === item.correctAnswer) {
        progress.scores.sound += 4;
        saveProgress();
        updateProgressUI();
        feedback.textContent = appLanguage === "en" ? `Correct: ${item.prompt} = ${item.correctAnswer}` : `答對了：${item.prompt} = ${item.correctAnswer}`;
        feedback.style.color = "var(--ok)";
        speak(item.speakText);
        visualQuizIndex = (visualQuizIndex + 1) % quizItems.length;
        window.setTimeout(renderVisualQuiz, 650);
      } else {
        recordWrong({
          itemType: "visual-pronunciation",
          prompt: item.prompt,
          correctAnswer: item.correctAnswer,
          userAnswer,
          choices: item.choices,
          speakText: item.speakText
        });
        feedback.textContent = appLanguage === "en" ? `Not ${userAnswer}. Look at the shape and try again.` : `這次不是 ${userAnswer}。看清楚字形，再選一次。`;
        feedback.style.color = "var(--danger)";
      }
    });
  });
}

function renderVowelContrastTrainer() {
  const item = vowelContrastItems[vowelContrastIndex] || vowelContrastItems[0];
  vowelContrastTarget = item.choices[Math.floor(Math.random() * item.choices.length)];
  document.getElementById("vowelContrastPrompt").textContent = `${localized(item, "title")}: ${localized(item, "hint")}`;
  const wrap = document.getElementById("vowelContrastChoices");
  wrap.innerHTML = shuffle([...item.choices]).map((choice) => `
    <button class="control-button text-2xl" data-vowel-answer="${choice}" lang="ko">${choice}</button>
  `).join("");
  const feedback = document.getElementById("vowelContrastFeedback");
  feedback.textContent = t("vowelQuiz.promptReady");
  feedback.style.color = "var(--muted)";
  wrap.querySelectorAll("[data-vowel-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const userAnswer = button.dataset.vowelAnswer;
      speak(userAnswer);
      if (userAnswer === vowelContrastTarget) {
        progress.scores.sound += 5;
        saveProgress();
        updateProgressUI();
        feedback.textContent = appLanguage === "en" ? `Correct: ${vowelContrastTarget}.` : `答對了，是 ${vowelContrastTarget}。`;
        feedback.style.color = "var(--ok)";
        window.setTimeout(renderVowelContrastTrainer, 650);
      } else {
        recordWrong({
          itemType: "vowel-listening",
          prompt: localized(item, "title"),
          correctAnswer: vowelContrastTarget,
          userAnswer,
          choices: item.choices,
          speakText: vowelContrastTarget
        });
        feedback.textContent = appLanguage === "en" ? `Not ${userAnswer}. Listen again and notice the mouth shape.` : `這次不是 ${userAnswer}。再聽一次，注意嘴形方向。`;
        feedback.style.color = "var(--danger)";
      }
    });
  });
}

function renderEuiQuiz() {
  const item = euiQuizItems[euiQuizIndex] || euiQuizItems[0];
  document.getElementById("euiQuizPrompt").textContent = localized(item, "prompt");
  const wrap = document.getElementById("euiQuizChoices");
  wrap.innerHTML = item.choices.map((choice) => `
    <button class="control-button text-2xl" data-eui-answer="${choice}" lang="ko">${choice}</button>
  `).join("");
  const feedback = document.getElementById("euiQuizFeedback");
  feedback.textContent = t("euiQuiz.feedbackReady");
  feedback.style.color = "var(--muted)";
  wrap.querySelectorAll("[data-eui-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const userAnswer = button.dataset.euiAnswer;
      if (userAnswer === item.correctAnswer) {
        progress.scores.sound += 5;
        saveProgress();
        updateProgressUI();
        feedback.textContent = appLanguage === "en" ? `Correct. ${localized(item, "note")}` : `答對了。${localized(item, "note")}`;
        feedback.style.color = "var(--ok)";
        speak(item.speakText);
        euiQuizIndex = (euiQuizIndex + 1) % euiQuizItems.length;
        window.setTimeout(renderEuiQuiz, 850);
      } else {
        recordWrong({
          itemType: "eui-pronunciation",
          prompt: localized(item, "prompt"),
          correctAnswer: item.correctAnswer,
          userAnswer,
          choices: item.choices,
          speakText: item.speakText
        });
        feedback.textContent = appLanguage === "en" ? `Not ${userAnswer}. ${localized(item, "note")}` : `這題不是 ${userAnswer}。${localized(item, "note")}`;
        feedback.style.color = "var(--danger)";
      }
    });
  });
}

function renderWrongReview() {
  const summary = document.getElementById("wrongReviewSummary");
  if (!summary) return;
  renderWrongReviewFilters();
  const filteredWrongItems = (progress.wrongItems || []).filter((item) => wrongReviewFilter === "all" || matchesWrongFilter(item, wrongReviewFilter));
  const items = [...filteredWrongItems].sort((a, b) => {
    const countDiff = (b.wrongCount || 0) - (a.wrongCount || 0);
    if (countDiff) return countDiff;
    return String(b.lastWrongAt || "").localeCompare(String(a.lastWrongAt || ""));
  });
  const totalWrong = items.reduce((sum, item) => sum + (item.wrongCount || 0), 0);
  summary.textContent = items.length
    ? (appLanguage === "en" ? `${items.length} item(s), ${totalWrong} total mistake(s). Correct answers lower wrongCount.` : `目前 ${items.length} 題，累積錯誤 ${totalWrong} 次。答對會降低 wrongCount，連續答對可移除。`)
    : (appLanguage === "en" ? "No mistakes yet. Try listening, sound-choice, or 의 drills first." : "目前沒有錯題。先去做聽辨、看字母選發音或 의 測驗。");
  const promptEl = document.getElementById("wrongReviewPrompt");
  const metaEl = document.getElementById("wrongReviewMeta");
  const choicesEl = document.getElementById("wrongReviewChoices");
  const feedbackEl = document.getElementById("wrongReviewFeedback");
  if (!items.length) {
    wrongReviewItemId = null;
    promptEl.textContent = appLanguage === "en" ? "No mistakes" : "沒有錯題";
    metaEl.textContent = appLanguage === "en" ? "Mistakes are saved in this browser." : "錯題會保存在本機瀏覽器。";
    choicesEl.innerHTML = "";
    feedbackEl.textContent = appLanguage === "en" ? "Missed listening, sound-choice, and 의 items will appear here." : "答錯的聽辨、字母發音、의 題會出現在這裡。";
    feedbackEl.style.color = "var(--muted)";
    return;
  }
  let item = items.find((wrong) => wrong.id === wrongReviewItemId);
  if (!item) {
    item = items[Math.floor(Math.random() * items.length)];
    wrongReviewItemId = item.id;
  }
  promptEl.textContent = item.prompt;
  metaEl.textContent = appLanguage === "en"
    ? `${item.itemType} · wrongCount ${item.wrongCount || 0} · Last missed: ${formatTime(item.lastWrongAt)}`
    : `${item.itemType} · wrongCount ${item.wrongCount || 0} · 上次錯：${formatTime(item.lastWrongAt)}`;
  choicesEl.innerHTML = (item.choices || []).map((choice) => `
    <button class="control-button" data-wrong-answer="${choice}" lang="ko">${choice}</button>
  `).join("");
  feedbackEl.textContent = item.speakText
    ? (appLanguage === "en" ? "You can play it first, then answer." : "可以先播放，再作答。")
    : (appLanguage === "en" ? "Read the prompt, then answer." : "看題目後直接作答。");
  feedbackEl.style.color = "var(--muted)";
  choicesEl.querySelectorAll("[data-wrong-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const userAnswer = button.dataset.wrongAnswer;
      if (userAnswer === item.correctAnswer) {
        feedbackEl.textContent = appLanguage === "en" ? `Correct: ${item.correctAnswer}. wrongCount is lower.` : `答對了，${item.correctAnswer}。wrongCount 已降低。`;
        feedbackEl.style.color = "var(--ok)";
        resolveWrongItem(item.id);
      } else {
        feedbackEl.textContent = appLanguage === "en" ? `Not ${userAnswer}. Correct answer: ${item.correctAnswer}.` : `還不是 ${userAnswer}。正確答案是 ${item.correctAnswer}。`;
        feedbackEl.style.color = "var(--danger)";
        recordWrong({
          itemType: item.itemType,
          prompt: item.prompt,
          correctAnswer: item.correctAnswer,
          userAnswer,
          choices: item.choices || [],
          speakText: item.speakText || ""
        });
      }
    });
  });
}

function renderWrongReviewFilters() {
  const wrap = document.getElementById("wrongReviewFilters");
  if (!wrap) return;
  const filters = [
    ["all", "全部错题"],
    ["listening", "只练听辨"],
    ["grammar", "只练语法"],
    ["handwriting", "只练手写"],
    ["vocabulary", "只练单词"]
  ];
  wrap.innerHTML = filters.map(([id, label]) => `
    <button class="review-filter ${wrongReviewFilter === id ? "active" : ""}" data-wrong-filter="${id}">${label}</button>
  `).join("");
  wrap.querySelectorAll("[data-wrong-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      wrongReviewFilter = button.dataset.wrongFilter;
      wrongReviewItemId = null;
      renderWrongReview();
    });
  });
}

function matchesWrongFilter(item, filter) {
  const tags = item.errorTags || [];
  const type = item.itemType || "";
  if (filter === "listening") return tags.includes("listening") || type.includes("listen") || type.includes("sound");
  if (filter === "grammar") return tags.some((tag) => tag.includes("particle") || tag === "copula" || tag === "grammar" || tag === "word-order") || type.includes("grammar");
  if (filter === "handwriting") return tags.includes("spelling") || type.includes("handwriting") || type.includes("dictation");
  if (filter === "vocabulary") return tags.includes("vocabulary") || type.includes("word") || type.includes("picture");
  return true;
}

function renderDictation() {
  dictationTarget = dictationPool[Math.floor(Math.random() * dictationPool.length)];
  document.getElementById("dictationPrompt").textContent = appLanguage === "en" ? "Press play first, then write what you hear." : "先按播放，聽到後再寫出來。";
  document.getElementById("dictationAnswer").textContent = "";
  document.getElementById("dictationAnswer").classList.add("hidden");
  if (dictationBoard) {
    dictationBoard.showGuide = false;
    dictationBoard.clear();
  }
}

function renderBuildChallenge() {
  const challenge = buildChallenges[buildChallengeIndex];
  document.getElementById("buildHint").textContent = appLanguage === "en" ? `Target: build 「${challenge.target}」 in onset, vowel, final order.` : challenge.hint;
  document.getElementById("buildSlots").innerHTML = ["聲母", "韻母", "收尾"].map((label, index) => `
    <button class="drop-zone" data-slot="${index}" aria-label="${label}">${appLanguage === "en" ? "Drop here" : "拖到這裡"}</button>
  `).join("");
  document.getElementById("buildBlocks").innerHTML = shuffle([...challenge.blocks]).map((block) => `
    <button class="draggable-block" data-value="${block}" lang="ko">${block}</button>
  `).join("");
  document.getElementById("buildFeedback").textContent = appLanguage === "en" ? "Drag or tap a block, then tap a slot." : "拖曳或點選字塊，再點空格也可以。";
  document.getElementById("buildFeedback").style.color = "var(--muted)";
  installDragBlocks("buildBlocks", "#buildSlots .drop-zone");
}

function checkBuildChallenge() {
  const values = [...document.querySelectorAll("#buildSlots .drop-zone")].map((slot) => slot.dataset.value || "");
  const challenge = buildChallenges[buildChallengeIndex];
  const ok = values.join("|") === challenge.answer.join("|");
  const feedback = document.getElementById("buildFeedback");
  if (ok) {
    const composed = composeHangul(values[0], values[1], values[2]);
    progress.scores.build += 10;
    saveProgress();
    updateProgressUI();
    feedback.textContent = appLanguage === "en" ? `Correct, it is ${composed}.` : `正確，是 ${composed}。`;
    feedback.style.color = "var(--ok)";
    speak(composed);
  } else {
    feedback.textContent = appLanguage === "en" ? "Almost. Check the order: onset, vowel, final." : "還差一點，先看提示的順序：聲母、韻母、收尾。";
    feedback.style.color = "var(--danger)";
  }
}

function renderWordQuiz() {
  wordQuizIndex = Math.floor(Math.random() * wordQuizItems.length);
  const item = wordQuizItems[wordQuizIndex];
  const wrap = document.getElementById("wordQuizChoices");
  wrap.innerHTML = shuffle([...item.choices]).map((choice) => `
    <button class="control-button" data-choice="${choice}">${choice}</button>
  `).join("");
  document.getElementById("wordQuizFeedback").textContent = appLanguage === "en" ? "Listen first, then choose the meaning." : "先聽，再選中文意思。";
  document.getElementById("wordQuizFeedback").style.color = "var(--muted)";
  wrap.querySelectorAll("[data-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      const feedback = document.getElementById("wordQuizFeedback");
      if (button.dataset.choice === item.answer) {
        progress.scores.word += 5;
        saveProgress();
        updateProgressUI();
        feedback.textContent = appLanguage === "en" ? `Correct: ${item.ko} = ${item.answer}` : `正確：${item.ko} = ${item.answer}`;
        feedback.style.color = "var(--ok)";
        renderWordQuiz();
      } else {
        feedback.textContent = appLanguage === "en" ? "Listen again. Notice the first syllable." : "再聽一次，注意音節開頭。";
        feedback.style.color = "var(--danger)";
      }
    });
  });
}

function renderPictureWordQuiz() {
  const item = vocabularyVisualItems[pictureWordQuizIndex % vocabularyVisualItems.length];
  const options = enforceVocabularyTarget(item, vocabularyChoiceSet(item));
  const prompt = document.getElementById("pictureWordPrompt");
  prompt.innerHTML = `
    ${vocabularyVisualMarkup(item)}
    <div>
      <p class="text-sm font-black" style="color: var(--teal)">${localizedVocabularyCategory(item)}</p>
      <p class="text-xl font-black mt-1">${vocabularyMeaning(item)}</p>
    </div>
  `;
  const wrap = document.getElementById("pictureWordChoices");
  wrap.innerHTML = options.map((option) => `
    <button class="vocab-word-choice" data-picture-word="${option.ko}">
      <strong lang="ko">${option.ko}</strong>
      <span>${option.roman}</span>
    </button>
  `).join("");
  const feedback = document.getElementById("pictureWordFeedback");
  feedback.textContent = t("pictureWord.feedbackReady");
  feedback.style.color = "var(--muted)";
  wrap.querySelectorAll("[data-picture-word]").forEach((button) => {
    button.addEventListener("click", () => {
      const userAnswer = button.dataset.pictureWord;
      const selected = vocabularyVisualItems.find((entry) => entry.ko === userAnswer);
      if (selected) speak(selected);
      if (userAnswer === item.ko) {
        progress.scores.word += 5;
        saveProgress();
        updateProgressUI();
        feedback.textContent = appLanguage === "en" ? `Correct: ${item.ko} = ${vocabularyMeaning(item)}` : `答對了：${item.ko} = ${vocabularyMeaning(item)}`;
        feedback.style.color = "var(--ok)";
        pictureWordQuizIndex = (pictureWordQuizIndex + 1) % vocabularyVisualItems.length;
        window.setTimeout(renderPictureWordQuiz, 720);
      } else {
        recordWrong({
          itemType: "picture-word",
          prompt: `${appLanguage === "en" ? "Picture to word" : "看圖選字"}: ${vocabularyMeaning(item)}`,
          correctAnswer: item.ko,
          userAnswer,
          choices: options.map((option) => option.ko),
          speakText: item.ko
        });
        feedback.textContent = appLanguage === "en" ? `Not ${userAnswer}. Look again and choose the Korean word.` : `這次不是 ${userAnswer}。再看圖片，選韓文單字。`;
        feedback.style.color = "var(--danger)";
      }
    });
  });
}

function renderListenPictureQuiz() {
  listenPictureTarget = vocabularyVisualItems[Math.floor(Math.random() * vocabularyVisualItems.length)];
  const options = enforceVocabularyTarget(listenPictureTarget, vocabularyChoiceSet(listenPictureTarget));
  document.getElementById("listenPicturePrompt").innerHTML = `
    <div>
      <p class="text-4xl font-black" lang="ko">${listenPictureTarget.ko}</p>
      <p class="text-sm font-black mt-2" style="color: var(--muted)">${listenPictureTarget.roman}</p>
    </div>
  `;
  const wrap = document.getElementById("listenPictureChoices");
  wrap.innerHTML = options.map((option) => `
    <button class="vocab-picture-choice" data-listen-picture="${option.ko}">
      ${vocabularyVisualMarkup(option, "small")}
      <strong>${vocabularyMeaning(option)}</strong>
      <span>${localizedVocabularyCategory(option)}</span>
    </button>
  `).join("");
  const feedback = document.getElementById("listenPictureFeedback");
  feedback.textContent = t("listenPicture.feedbackReady");
  feedback.style.color = "var(--muted)";
  wrap.querySelectorAll("[data-listen-picture]").forEach((button) => {
    button.addEventListener("click", () => {
      const userAnswer = button.dataset.listenPicture;
      if (userAnswer === listenPictureTarget.ko) {
        progress.scores.word += 5;
        saveProgress();
        updateProgressUI();
        feedback.textContent = appLanguage === "en" ? `Correct: ${listenPictureTarget.ko} is ${vocabularyMeaning(listenPictureTarget)}.` : `答對了：${listenPictureTarget.ko} 是 ${vocabularyMeaning(listenPictureTarget)}。`;
        feedback.style.color = "var(--ok)";
        speak(listenPictureTarget);
        window.setTimeout(renderListenPictureQuiz, 760);
      } else {
        recordWrong({
          itemType: "listen-picture",
          prompt: `${appLanguage === "en" ? "Listen and choose" : "聽字選圖"}: ${listenPictureTarget.ko}`,
          correctAnswer: listenPictureTarget.ko,
          userAnswer,
          choices: options.map((option) => option.ko),
          speakText: listenPictureTarget.ko
        });
        feedback.textContent = appLanguage === "en" ? "Not that picture. Play it again and listen for the first syllable." : "不是這張圖。再播放一次，注意第一個音節。";
        feedback.style.color = "var(--danger)";
      }
    });
  });
}

function vocabularyChoiceSet(target) {
  const sameCategory = vocabularyVisualItems.filter((item) => item.category === target.category && item.ko !== target.ko);
  const otherItems = vocabularyVisualItems.filter((item) => item.category !== target.category && item.ko !== target.ko);
  const distractors = [...shuffle([...sameCategory]).slice(0, 2), ...shuffle([...otherItems])]
    .filter((item, index, list) => list.findIndex((entry) => entry.ko === item.ko) === index)
    .slice(0, 3);
  return shuffle([target, ...distractors]);
}

function enforceVocabularyTarget(target, options) {
  const deduped = options.filter((item, index, list) => list.findIndex((entry) => entry.ko === item.ko) === index);
  if (deduped.some((item) => item.ko === target.ko)) return deduped.slice(0, 4);
  return shuffle([target, ...deduped.filter((item) => item.ko !== target.ko).slice(0, 3)]);
}

function vocabularyVisualMarkup(item, size = "") {
  const classes = ["vocab-visual", size, item.visualType === "number" ? "number" : ""].filter(Boolean).join(" ");
  if (item.color) {
    return `<div class="${classes}" aria-hidden="true"><span class="swatch" style="background: ${item.color}"></span></div>`;
  }
  return `<div class="${classes}" aria-hidden="true">${item.visual || "?"}</div>`;
}

function vocabularyMeaning(item) {
  return appLanguage === "en" ? item.meaningEn : item.meaningZh;
}

function localizedVocabularyCategory(item) {
  if (appLanguage !== "en") return item.category;
  const labels = {
    "動物": "Animals",
    "身體": "Body",
    "食物": "Food",
    "日常": "Daily life",
    "顏色": "Colors",
    "數字": "Numbers"
  };
  return labels[item.category] || item.category;
}

function renderSentenceChallenge() {
  document.getElementById("sentenceSlots").innerHTML = [0, 1, 2].map((index) => `
    <button class="drop-zone" data-slot="${index}" aria-label="句子位置 ${index + 1}">${appLanguage === "en" ? "Place here" : "放這裡"}</button>
  `).join("");
  document.getElementById("sentenceBlocks").innerHTML = shuffle(["저는", "학생", "이에요", "마리", "아니에요"]).map((block) => `
    <button class="draggable-block text-base" data-value="${block}" lang="ko">${block}</button>
  `).join("");
  installDragBlocks("sentenceBlocks", "#sentenceSlots .drop-zone");
}

function checkSentenceChallenge() {
  const values = [...document.querySelectorAll("#sentenceSlots .drop-zone")].map((slot) => slot.dataset.value || "");
  const feedback = document.getElementById("sentenceFeedback");
  if (values.join(" ") === "저는 학생 이에요") {
    progress.scores.sentence += 10;
    saveProgress();
    updateProgressUI();
    feedback.textContent = appLanguage === "en" ? "Correct: 저는 학생이에요. In speech, 학생 and 이에요 connect." : "正確：저는 학생이에요。口語中學生和이에요會連起來。";
    feedback.style.color = "var(--ok)";
    speak("저는 학생이에요.");
  } else {
    feedback.textContent = appLanguage === "en" ? "Adjust the order: topic 저는, noun 학생, then 이에요." : "順序再調整：主題 저는，名詞 학생，最後 이에요。";
    feedback.style.color = "var(--danger)";
  }
}

function renderShadow() {
  const wrap = document.getElementById("shadowBars");
  wrap.innerHTML = "";
  for (let i = 0; i < 16; i += 1) {
    const bar = document.createElement("span");
    bar.style.height = `${18 + ((i * 19) % 62)}px`;
    wrap.appendChild(bar);
  }
  document.getElementById("shadowSentence").textContent = shadowPool[shadowIndex];
}

function startShadow() {
  stopShadowTimer();
  const sentence = shadowPool[shadowIndex];
  document.getElementById("shadowSentence").textContent = sentence;
  document.getElementById("shadowBars").classList.add("playing");
  speak(sentence);
  let tick = 0;
  shadowTimer = window.setInterval(() => {
    tick += 1;
    const bars = [...document.querySelectorAll("#shadowBars span")];
    bars.forEach((bar, index) => {
      bar.style.height = `${12 + ((tick * 11 + index * 17) % 72)}px`;
    });
    document.getElementById("shadowMeter").style.width = `${Math.min(100, tick * 8)}%`;
    if (tick >= 13) stopShadowTimer();
  }, 220);
}

function finishShadow() {
  stopShadowTimer();
  progress.scores.shadow += 10;
  saveProgress();
  updateProgressUI();
  toast(appLanguage === "en" ? "Shadowing complete: +10 points." : "口說跟讀完成，加 10 分。");
  shadowIndex = (shadowIndex + 1) % shadowPool.length;
  renderShadow();
  document.getElementById("shadowMeter").style.width = "10%";
}

function stopShadowTimer() {
  if (shadowTimer) window.clearInterval(shadowTimer);
  shadowTimer = null;
  document.getElementById("shadowBars")?.classList.remove("playing");
}

function installDragBlocks(blockContainerId, slotSelector) {
  let selected = null;
  const container = document.getElementById(blockContainerId);
  const blocks = [...container.querySelectorAll(".draggable-block")];
  const slots = [...document.querySelectorAll(slotSelector)];

  function selectBlock(block) {
    selected = block;
    blocks.forEach((item) => item.classList.toggle("selected", item === block));
  }

  blocks.forEach((block) => {
    block.addEventListener("click", () => selectBlock(block));
    block.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      event.preventDefault();
      selectBlock(block);
      const ghost = block.cloneNode(true);
      ghost.classList.add("drag-ghost");
      document.body.appendChild(ghost);
      moveGhost(ghost, event.clientX, event.clientY);

      const onMove = (moveEvent) => {
        moveEvent.preventDefault();
        moveGhost(ghost, moveEvent.clientX, moveEvent.clientY);
      };

      const onUp = (upEvent) => {
        upEvent.preventDefault();
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerup", onUp);
        const target = document.elementFromPoint(upEvent.clientX, upEvent.clientY)?.closest(slotSelector);
        ghost.remove();
        if (target) fillSlot(target, block.dataset.value);
      };

      document.addEventListener("pointermove", onMove, { passive: false });
      document.addEventListener("pointerup", onUp, { passive: false });
    });
  });

  slots.forEach((slot) => {
    slot.addEventListener("click", () => {
      if (selected) {
        fillSlot(slot, selected.dataset.value);
        blocks.forEach((item) => item.classList.remove("selected"));
        selected = null;
      } else if (slot.dataset.value) {
        fillSlot(slot, "");
      }
    });
  });
}

function moveGhost(ghost, x, y) {
  ghost.style.left = `${x}px`;
  ghost.style.top = `${y}px`;
}

function fillSlot(slot, value) {
  if (!value) {
    slot.dataset.value = "";
    slot.textContent = slot.closest("#sentenceSlots") ? "放這裡" : "拖到這裡";
    slot.classList.remove("filled");
    return;
  }
  slot.dataset.value = value;
  slot.textContent = value;
  slot.classList.add("filled");
  slot.lang = "ko";
}

function clearSlots(selector, label) {
  document.querySelectorAll(selector).forEach((slot) => {
    slot.dataset.value = "";
    slot.textContent = label;
    slot.classList.remove("filled");
  });
}
