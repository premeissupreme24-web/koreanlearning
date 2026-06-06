const ExerciseRenderer = {
  recorder: null,
  recordedChunks: [],
  recordedUrl: null,

  renderDeck(container, exercises, options = {}) {
    if (!container) return;
    const state = {
      index: options.startIndex || 0,
      unitId: options.unitId || exercises[0]?.unitId || "",
      onComplete: options.onComplete || null,
      completeLabel: options.completeLabel || "保存完成状态",
      completeToast: options.completeToast === undefined ? "本单元已完成，已经保存到本地进度。" : options.completeToast
    };

    const renderCurrent = () => {
      const exercise = exercises[state.index];
      if (!exercise) {
        container.innerHTML = this.summaryMarkup(state.unitId, exercises, state.completeLabel);
        container.querySelector("[data-lesson-complete]")?.addEventListener("click", () => {
          markLessonComplete(state.unitId);
          if (state.onComplete) state.onComplete();
          if (state.completeToast) toast(state.completeToast);
        });
        return;
      }

      container.innerHTML = `
        <div class="exercise-shell">
          <div class="exercise-top">
            <button class="control-button" data-ex-prev ${state.index === 0 ? "disabled" : ""}><i class="fa-solid fa-arrow-left"></i>上一步</button>
            <div>
              <p class="section-kicker">Step ${state.index + 1} / ${exercises.length}</p>
              <h4 class="text-2xl font-black mt-1">${exercise.prompt}</h4>
            </div>
            <button class="control-button primary" data-ex-next>下一步<i class="fa-solid fa-arrow-right"></i></button>
          </div>
          <div class="exercise-body" data-exercise-body></div>
          <div class="exercise-feedback" data-ex-feedback>答题后会显示解释。</div>
        </div>
      `;

      const body = container.querySelector("[data-exercise-body]");
      this.renderExercise(body, exercise);
      container.querySelector("[data-ex-prev]")?.addEventListener("click", () => {
        state.index = Math.max(0, state.index - 1);
        renderCurrent();
      });
      container.querySelector("[data-ex-next]")?.addEventListener("click", () => {
        state.index += 1;
        renderCurrent();
      });
    };

    renderCurrent();
  },

  renderExercise(container, exercise) {
    if (!container) return;
    const type = exercise.type || "multiple-choice";
    if ([
      "multiple-choice",
      "listen-choice",
      "image-choice",
      "fill-blank",
      "grammar-choice",
      "dialogue-simulation",
      "particle-choice",
      "conjugation",
      "meaning-choice",
      "error-correction"
    ].includes(type)) {
      this.renderChoice(container, exercise);
      return;
    }
    if (type === "sentence-builder" || type === "syllable-builder" || type === "reorder") {
      this.renderBuilder(container, exercise);
      return;
    }
    if (type === "dictation") {
      this.renderDictation(container, exercise);
      return;
    }
    if (type === "shadowing") {
      this.renderShadowing(container, exercise);
      return;
    }
    if (type === "handwriting") {
      this.renderHandwriting(container, exercise);
      return;
    }
    this.renderChoice(container, exercise);
  },

  renderChoice(container, exercise) {
    const options = shuffle([...(exercise.options || [])]);
    const imageMarkup = exercise.type === "image-choice"
      ? `<div class="exercise-picture">${exercise.imageEmoji && String(exercise.imageEmoji).startsWith("#") ? `<span class="swatch" style="background:${exercise.imageEmoji}"></span>` : (exercise.imageEmoji || "📝")}</div>`
      : "";
    const listenMarkup = exercise.type === "listen-choice"
      ? `<button class="control-button primary" data-ex-speak><i class="fa-solid fa-volume-high"></i>播放</button>`
      : "";
    container.innerHTML = `
      <div class="exercise-prompt-card">
        ${exercise.passage ? `<pre class="topik-passage">${escapeHtml(exercise.passage)}</pre>` : ""}
        ${imageMarkup}
        <p class="exercise-korean" lang="ko">${exercise.korean || ""}</p>
        <p style="color: var(--muted)">${exercise.chinese || ""}</p>
        ${listenMarkup}
      </div>
      <div class="exercise-options">
        ${options.map((option) => `<button class="exercise-option" data-answer="${escapeHtml(option)}">${option}</button>`).join("")}
      </div>
    `;
    container.querySelector("[data-ex-speak]")?.addEventListener("click", () => speak(exercise.korean || exercise.answer));
    container.querySelectorAll("[data-answer]").forEach((button) => {
      button.addEventListener("click", () => this.checkAnswer(button.dataset.answer, exercise, container));
    });
  },

  renderBuilder(container, exercise) {
    const pieces = shuffle([...(exercise.options || [])]);
    container.innerHTML = `
      <div class="exercise-prompt-card">
        ${exercise.passage ? `<pre class="topik-passage">${escapeHtml(exercise.passage)}</pre>` : ""}
        <p class="exercise-korean" lang="ko">${exercise.korean || ""}</p>
        <p style="color: var(--muted)">${exercise.chinese || "点选字块组成答案。"}</p>
      </div>
      <div class="builder-target" data-builder-target></div>
      <div class="exercise-options">
        ${pieces.map((piece) => `<button class="exercise-option block-piece" data-piece="${escapeHtml(piece)}" lang="ko">${piece}</button>`).join("")}
      </div>
      <div class="flex flex-wrap gap-2">
        <button class="control-button primary" data-builder-check><i class="fa-solid fa-check"></i>检查答案</button>
        <button class="control-button" data-builder-clear><i class="fa-solid fa-eraser"></i>清空</button>
      </div>
    `;
    const selected = [];
    const target = container.querySelector("[data-builder-target]");
    const paint = () => {
      target.innerHTML = selected.map((piece) => `<span lang="ko">${piece}</span>`).join("");
    };
    container.querySelectorAll("[data-piece]").forEach((button) => {
      button.addEventListener("click", () => {
        selected.push(button.dataset.piece);
        paint();
      });
    });
    container.querySelector("[data-builder-clear]").addEventListener("click", () => {
      selected.length = 0;
      paint();
    });
    container.querySelector("[data-builder-check]").addEventListener("click", () => {
      const normalizedExercise = {
        ...exercise,
        answer: Array.isArray(exercise.answer) ? exercise.answer.join("|") : exercise.answer
      };
      this.checkAnswer(selected.join("|"), normalizedExercise, container);
    });
  },

  renderDictation(container, exercise) {
    container.innerHTML = `
      <div class="exercise-prompt-card">
        <button class="control-button primary" data-ex-speak><i class="fa-solid fa-volume-high"></i>播放句子</button>
        <p style="color: var(--muted)">听完后输入你听到的韩文。</p>
      </div>
      <input class="exercise-input" data-dictation-input placeholder="안녕하세요..." />
      <button class="control-button primary" data-dictation-check><i class="fa-solid fa-check"></i>检查答案</button>
    `;
    container.querySelector("[data-ex-speak]").addEventListener("click", () => speak(exercise.korean || exercise.answer));
    container.querySelector("[data-dictation-check]").addEventListener("click", () => {
      const value = container.querySelector("[data-dictation-input]").value.trim();
      this.checkAnswer(value, exercise, container);
    });
  },

  renderHandwriting(container, exercise) {
    const canvasId = `handwriting-${exercise.id}`;
    container.innerHTML = `
      <div class="exercise-prompt-card">
        <p class="exercise-korean" lang="ko">${exercise.korean || exercise.answer}</p>
        <p style="color: var(--muted)">${exercise.explanation || "照灰字描红，先练手感。"}</p>
      </div>
      <div class="canvas-wrap">
        <canvas id="${canvasId}" class="practice-canvas" aria-label="手写练习"></canvas>
        <div class="canvas-caption">Step 3 描红，Step 4 隐藏灰字自己写；完成后自评。</div>
      </div>
      <div class="flex flex-wrap gap-2 mt-3">
        <button class="control-button" data-hand-clear><i class="fa-solid fa-eraser"></i>清除</button>
        <button class="control-button" data-hand-undo><i class="fa-solid fa-rotate-left"></i>撤销</button>
        <button class="control-button" data-hand-guide><i class="fa-solid fa-eye"></i>描红/隐藏</button>
        <button class="control-button" data-hand-replay><i class="fa-solid fa-clock-rotate-left"></i>回放</button>
      </div>
      <div class="flex flex-wrap gap-2 mt-3">
        <button class="control-button" data-hand-rating="again"><i class="fa-solid fa-rotate-right"></i>再练一次</button>
        <button class="control-button amber" data-hand-rating="okay"><i class="fa-solid fa-circle"></i>还可以</button>
        <button class="control-button primary" data-hand-rating="good"><i class="fa-solid fa-check"></i>已掌握</button>
      </div>
    `;
    const board = new WritingBoard(document.getElementById(canvasId), () => exercise.korean || exercise.answer);
    board.showGuide = true;
    board.redraw();
    container.querySelector("[data-hand-clear]").addEventListener("click", () => board.clear());
    container.querySelector("[data-hand-undo]").addEventListener("click", () => board.undo());
    container.querySelector("[data-hand-replay]").addEventListener("click", () => board.replay());
    container.querySelector("[data-hand-guide]").addEventListener("click", () => {
      board.showGuide = !board.showGuide;
      board.redraw();
    });
    container.querySelectorAll("[data-hand-rating]").forEach((button) => button.addEventListener("click", () => {
      const rating = button.dataset.handRating;
      board.saveAttempt(rating);
      markHandwritingComplete(exercise.id);
      recordExerciseAttempt({ exerciseId: exercise.id, unitId: exercise.unitId, itemType: "handwriting", correct: rating !== "again", correctAnswer: exercise.answer, selectedAnswer: rating, errorTags: exercise.errorTags || [] });
      if (rating === "again") {
        recordWrong({
          exerciseId: `handwriting::${exercise.id}`,
          unitId: exercise.unitId,
          itemType: "handwriting",
          prompt: `手写：${exercise.korean || exercise.answer}`,
          correctAnswer: "已掌握",
          userAnswer: "再练一次",
          choices: ["再练一次", "还可以", "已掌握"],
          speakText: exercise.korean || exercise.answer,
          errorTags: [...(exercise.errorTags || []), "spelling"],
          skipAttempt: true
        });
      }
      this.showFeedback(container, rating !== "again", exercise, rating === "good" ? "已保存：已掌握。" : rating === "okay" ? "已保存：还可以，之后会继续复习。" : "已保存：加入手写复习。");
    }));
  },

  renderShadowing(container, exercise) {
    container.innerHTML = `
      <div class="exercise-prompt-card">
        <p class="exercise-korean" lang="ko">${exercise.korean}</p>
        <p style="color: var(--muted)">${exercise.chinese || "先听，再录自己的声音。"}</p>
        <button class="control-button primary" data-shadow-play><i class="fa-solid fa-volume-high"></i>播放原句</button>
      </div>
      <div class="shadow-recorder">
        <button class="control-button primary" data-record-start><i class="fa-solid fa-microphone"></i>开始录音</button>
        <button class="control-button" data-record-stop disabled><i class="fa-solid fa-stop"></i>停止</button>
        <button class="control-button" data-record-play disabled><i class="fa-solid fa-play"></i>回放</button>
        <button class="control-button" data-record-delete disabled><i class="fa-solid fa-trash"></i>删除</button>
      </div>
      <div class="flex flex-wrap gap-2">
        <button class="control-button primary" data-speaking-ok><i class="fa-solid fa-check"></i>会说</button>
        <button class="control-button" data-speaking-weak><i class="fa-solid fa-rotate"></i>还不熟</button>
      </div>
    `;
    container.querySelector("[data-shadow-play]").addEventListener("click", () => speak(exercise.korean));
    this.bindRecorder(container, exercise);
    container.querySelector("[data-speaking-ok]").addEventListener("click", () => {
      recordExerciseAttempt({ exerciseId: exercise.id, unitId: exercise.unitId, itemType: "shadowing", correct: true, correctAnswer: "会说", errorTags: ["speaking"] });
      this.showFeedback(container, true, exercise, "已标记会说。");
    });
    container.querySelector("[data-speaking-weak]").addEventListener("click", () => {
      markSpeakingReview(exercise.korean, "weak");
      this.showFeedback(container, false, exercise, "已加入口说复习。");
    });
  },

  bindRecorder(container, exercise) {
    const start = container.querySelector("[data-record-start]");
    const stop = container.querySelector("[data-record-stop]");
    const play = container.querySelector("[data-record-play]");
    const del = container.querySelector("[data-record-delete]");

    start.addEventListener("click", async () => {
      if (!navigator.mediaDevices || !window.MediaRecorder) {
        this.showFeedback(container, false, exercise, "当前浏览器不支持录音，但可以继续跟读练习。");
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.recordedChunks = [];
      this.recorder = new MediaRecorder(stream);
      this.recorder.ondataavailable = (event) => {
        if (event.data.size) this.recordedChunks.push(event.data);
      };
      this.recorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        const blob = new Blob(this.recordedChunks, { type: "audio/webm" });
        if (this.recordedUrl) URL.revokeObjectURL(this.recordedUrl);
        this.recordedUrl = URL.createObjectURL(blob);
        play.disabled = false;
        del.disabled = false;
      };
      this.recorder.start();
      start.disabled = true;
      stop.disabled = false;
    });

    stop.addEventListener("click", () => {
      this.recorder?.stop();
      start.disabled = false;
      stop.disabled = true;
    });

    play.addEventListener("click", () => {
      if (this.recordedUrl) new Audio(this.recordedUrl).play();
    });

    del.addEventListener("click", () => {
      if (this.recordedUrl) URL.revokeObjectURL(this.recordedUrl);
      this.recordedUrl = null;
      play.disabled = true;
      del.disabled = true;
    });
  },

  checkAnswer(userAnswer, exercise, container) {
    const correct = normalizeAnswer(userAnswer) === normalizeAnswer(exercise.answer);
    recordExerciseAttempt({
      exerciseId: exercise.id,
      unitId: exercise.unitId,
      itemType: exercise.type,
      correct,
      selectedAnswer: userAnswer,
      correctAnswer: exercise.answer,
      errorTags: exercise.errorTags || []
    });
    if (correct) {
      this.showFeedback(container, true, exercise);
      speak(exercise.korean || exercise.answer);
      return;
    }
    recordWrong({
      exerciseId: exercise.id,
      unitId: exercise.unitId,
      itemType: exercise.type,
      prompt: exercise.prompt,
      correctAnswer: exercise.answer,
      userAnswer,
      choices: exercise.options || [],
      speakText: exercise.korean || exercise.answer,
      errorTags: exercise.errorTags || [],
      skipAttempt: true
    });
    this.showFeedback(container, false, exercise, `正确答案：${exercise.answer}`);
  },

  showFeedback(container, correct, exercise, prefix = "") {
    const feedback = container.closest(".exercise-shell")?.querySelector("[data-ex-feedback]") || container.querySelector("[data-ex-feedback]");
    if (!feedback) return;
    feedback.classList.remove("ok", "bad", "shake");
    feedback.classList.add(correct ? "ok" : "bad");
    if (!correct) {
      feedback.classList.add("shake");
      window.setTimeout(() => feedback.classList.remove("shake"), 420);
    }
    feedback.innerHTML = `
      <strong>${correct ? "正确" : "还不对"}</strong>
      <span>${prefix ? `${prefix}<br>` : ""}${exercise.explanation || "看解释后再试一次。"}</span>
    `;
  },

  summaryMarkup(unitId, exercises, completeLabel = "保存完成状态") {
    return `
      <div class="lesson-summary-card">
        <p class="section-kicker">Summary</p>
        <h3 class="text-3xl font-black mt-2">本单元完成</h3>
        <p class="mt-2" style="color: var(--muted)">你完成了 ${exercises.length} 个练习。错题已经自动进入复习。</p>
        <button class="control-button primary mt-4" data-lesson-complete="${unitId}"><i class="fa-solid fa-check"></i>${completeLabel}</button>
      </div>
    `;
  }
};

function normalizeAnswer(value) {
  return String(value || "").replace(/\s+/g, "").replace(/[.。?？]/g, "").toLowerCase();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
