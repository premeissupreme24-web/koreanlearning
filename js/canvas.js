class WritingBoard {
  constructor(canvas, getGlyph) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.getGlyph = getGlyph;
    this.showGuide = true;
    this.isDrawing = false;
    this.last = null;
    this.pointerId = null;
    this.strokes = [];
    this.currentStroke = null;
    this.bind();
    this.resize();
  }

  bind() {
    window.addEventListener("resize", () => this.resize());
    this.canvas.addEventListener("pointerdown", (event) => this.startPointer(event));
    this.canvas.addEventListener("pointermove", (event) => this.movePointer(event));
    this.canvas.addEventListener("pointerup", (event) => this.endPointer(event));
    this.canvas.addEventListener("pointercancel", (event) => this.endPointer(event));
    this.canvas.addEventListener("touchstart", (event) => event.preventDefault(), { passive: false });
    this.canvas.addEventListener("touchmove", (event) => event.preventDefault(), { passive: false });
    this.canvas.addEventListener("touchend", (event) => event.preventDefault(), { passive: false });
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    this.canvas.width = Math.max(1, Math.floor(rect.width * ratio));
    this.canvas.height = Math.max(1, Math.floor(rect.height * ratio));
    this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    this.redraw();
  }

  clear() {
    this.strokes = [];
    this.currentStroke = null;
    this.redraw();
  }

  redraw() {
    const rect = this.canvas.getBoundingClientRect();
    this.ctx.clearRect(0, 0, rect.width, rect.height);
    this.drawBackground(rect.width, rect.height);
    this.drawStoredStrokes();
  }

  drawBackground(width, height) {
    this.ctx.fillStyle = "#fbfcfa";
    this.ctx.fillRect(0, 0, width, height);
    if (!this.showGuide) return;

    this.ctx.save();
    this.ctx.strokeStyle = "rgba(23,32,42,0.08)";
    this.ctx.lineWidth = 1;
    this.ctx.setLineDash([7, 8]);
    this.ctx.beginPath();
    this.ctx.moveTo(width / 2, 18);
    this.ctx.lineTo(width / 2, height - 18);
    this.ctx.moveTo(18, height / 2);
    this.ctx.lineTo(width - 18, height / 2);
    this.ctx.stroke();
    this.ctx.setLineDash([]);

    this.ctx.font = `900 ${Math.min(width, height) * 0.54}px "Noto Sans KR", system-ui`;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillStyle = "rgba(23,32,42,0.10)";
    this.ctx.fillText(this.getGlyph(), width / 2, height / 2 + 8);
    this.drawStrokeGuide(width, height, this.getGlyph());
    this.ctx.restore();
  }

  drawStrokeGuide(width, height, glyph) {
    const guides = guideForGlyph(glyph);
    this.ctx.lineWidth = 4;
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = "rgba(216,97,69,0.72)";
    this.ctx.fillStyle = "rgba(216,97,69,0.92)";
    guides.forEach((line, index) => {
      const x1 = line[0] * width;
      const y1 = line[1] * height;
      const x2 = line[2] * width;
      const y2 = line[3] * height;
      drawArrow(this.ctx, x1, y1, x2, y2);
      this.ctx.beginPath();
      this.ctx.arc(x1, y1, 13, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.fillStyle = "#fff";
      this.ctx.font = "800 13px system-ui";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillText(String(index + 1), x1, y1 + 0.5);
      this.ctx.fillStyle = "rgba(216,97,69,0.92)";
    });
  }

  startPointer(event) {
    event.preventDefault();
    this.pointerId = event.pointerId;
    this.canvas.setPointerCapture?.(event.pointerId);
    this.isDrawing = true;
    this.last = this.pointFromEvent(event);
    this.currentStroke = [this.last];
  }

  movePointer(event) {
    if (!this.isDrawing || event.pointerId !== this.pointerId) return;
    event.preventDefault();
    const point = this.pointFromEvent(event);
    this.ctx.save();
    this.ctx.strokeStyle = "#17202a";
    this.ctx.lineWidth = event.pointerType === "pen" ? 4.5 : 6;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
    this.ctx.beginPath();
    this.ctx.moveTo(this.last.x, this.last.y);
    this.ctx.lineTo(point.x, point.y);
    this.ctx.stroke();
    this.ctx.restore();
    this.currentStroke.push(point);
    this.last = point;
  }

  endPointer(event) {
    if (event.pointerId !== this.pointerId) return;
    event.preventDefault();
    if (this.currentStroke && this.currentStroke.length > 1) {
      this.strokes.push(this.currentStroke);
    }
    this.isDrawing = false;
    this.pointerId = null;
    this.last = null;
    this.currentStroke = null;
  }

  pointFromEvent(event) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  drawStoredStrokes() {
    this.ctx.save();
    this.ctx.strokeStyle = "#17202a";
    this.ctx.lineWidth = 5.5;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
    this.strokes.forEach((stroke) => {
      if (stroke.length < 2) return;
      this.ctx.beginPath();
      this.ctx.moveTo(stroke[0].x, stroke[0].y);
      stroke.slice(1).forEach((point) => this.ctx.lineTo(point.x, point.y));
      this.ctx.stroke();
    });
    this.ctx.restore();
  }
}

class CopyPracticeBoard {
  constructor(canvas, item) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.item = item;
    this.strokes = [];
    this.currentStroke = null;
    this.last = null;
    this.pointerId = null;
    this.showStrokes = false;
    this.bind();
    this.resize();
  }

  bind() {
    this.canvas.addEventListener("pointerdown", (event) => this.startPointer(event));
    this.canvas.addEventListener("pointermove", (event) => this.movePointer(event));
    this.canvas.addEventListener("pointerup", (event) => this.endPointer(event));
    this.canvas.addEventListener("pointercancel", (event) => this.endPointer(event));
    this.canvas.addEventListener("touchstart", (event) => this.blockSingleFingerScroll(event), { passive: false });
    this.canvas.addEventListener("touchmove", (event) => this.blockSingleFingerScroll(event), { passive: false });
    this.canvas.addEventListener("touchend", (event) => this.blockSingleFingerScroll(event), { passive: false });
  }

  blockSingleFingerScroll(event) {
    if (!copyTwoFingerScroll || event.touches.length < 2) {
      event.preventDefault();
    }
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const ratio = window.devicePixelRatio || 1;
    this.canvas.width = Math.floor(rect.width * ratio);
    this.canvas.height = Math.floor(rect.height * ratio);
    this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    this.redraw();
  }

  clear() {
    this.strokes = [];
    this.currentStroke = null;
    this.redraw();
  }

  undo() {
    this.strokes.pop();
    this.redraw();
  }

  toggleStrokes() {
    this.showStrokes = !this.showStrokes;
    this.redraw();
    return this.showStrokes;
  }

  redraw() {
    const rect = this.canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    this.ctx.clearRect(0, 0, rect.width, rect.height);
    this.drawCopyGrid(rect.width, rect.height);
    this.drawStoredStrokes();
  }

  drawCopyGrid(width, height) {
    if (this.item.type === "word") {
      this.drawWordGrid(width, height);
      return;
    }

    const columns = 5;
    const rows = 2;
    const gap = 8;
    const cellW = (width - gap * (columns + 1)) / columns;
    const cellH = (height - gap * (rows + 1)) / rows;

    this.ctx.fillStyle = "#f7fcff";
    this.ctx.fillRect(0, 0, width, height);

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < columns; col += 1) {
        const x = gap + col * (cellW + gap);
        const y = gap + row * (cellH + gap);
        this.drawCell(x, y, cellW, cellH, row === 0 && col < 3);
      }
    }
  }

  drawWordGrid(width, height) {
    const syllables = [...this.item.copyText];
    const columns = Math.max(1, syllables.length);
    const rows = 3;
    const gap = 10;
    const cellW = (width - gap * (columns + 1)) / columns;
    const cellH = (height - gap * (rows + 1)) / rows;

    this.ctx.fillStyle = "#f7fcff";
    this.ctx.fillRect(0, 0, width, height);

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < columns; col += 1) {
        const x = gap + col * (cellW + gap);
        const y = gap + row * (cellH + gap);
        this.drawCell(x, y, cellW, cellH, row === 0, syllables[col], row === 0 && col === 0);
      }
    }
  }

  drawCell(x, y, width, height, withGhost, ghostText = this.item.copyText, showGuide = withGhost) {
    this.ctx.save();
    this.roundRect(x, y, width, height, 5);
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fill();
    this.ctx.strokeStyle = "rgba(34,153,223,0.22)";
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

    this.ctx.strokeStyle = "rgba(34,153,223,0.16)";
    this.ctx.beginPath();
    this.ctx.moveTo(x + width / 2, y + 2);
    this.ctx.lineTo(x + width / 2, y + height - 2);
    this.ctx.moveTo(x + 2, y + height / 2);
    this.ctx.lineTo(x + width - 2, y + height / 2);
    this.ctx.stroke();

    if (withGhost) {
      const size = Math.min(width, height) * (ghostText.length > 1 ? 0.35 : 0.58);
      this.ctx.font = `900 ${size}px "Noto Sans KR", system-ui`;
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillStyle = "rgba(16,36,63,0.16)";
      this.ctx.fillText(ghostText, x + width / 2, y + height / 2 + 3);
    }

    if (showGuide && this.showStrokes) {
      this.drawMiniStrokeGuide(x, y, width, height);
    }
    this.ctx.restore();
  }

  drawMiniStrokeGuide(x, y, width, height) {
    const guides = guideForGlyph(this.item.strokeGlyph);
    this.ctx.save();
    this.ctx.strokeStyle = "rgba(22,127,192,0.95)";
    this.ctx.fillStyle = "rgba(22,127,192,0.95)";
    this.ctx.lineWidth = 3;
    guides.forEach((line, index) => {
      const x1 = x + line[0] * width;
      const y1 = y + line[1] * height;
      const x2 = x + line[2] * width;
      const y2 = y + line[3] * height;
      drawArrow(this.ctx, x1, y1, x2, y2);
      this.ctx.beginPath();
      this.ctx.arc(x1, y1, 10, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.fillStyle = "#ffffff";
      this.ctx.font = "800 11px system-ui";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillText(String(index + 1), x1, y1);
      this.ctx.fillStyle = "rgba(22,127,192,0.95)";
    });
    this.ctx.restore();
  }

  roundRect(x, y, width, height, radius) {
    this.ctx.beginPath();
    this.ctx.moveTo(x + radius, y);
    this.ctx.arcTo(x + width, y, x + width, y + height, radius);
    this.ctx.arcTo(x + width, y + height, x, y + height, radius);
    this.ctx.arcTo(x, y + height, x, y, radius);
    this.ctx.arcTo(x, y, x + width, y, radius);
    this.ctx.closePath();
  }

  startPointer(event) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    event.preventDefault();
    this.pointerId = event.pointerId;
    this.canvas.setPointerCapture?.(event.pointerId);
    this.last = this.pointFromEvent(event);
    this.currentStroke = [this.last];
  }

  movePointer(event) {
    if (event.pointerId !== this.pointerId || !this.currentStroke) return;
    event.preventDefault();
    const point = this.pointFromEvent(event);
    this.ctx.save();
    this.ctx.strokeStyle = "#10243f";
    this.ctx.lineWidth = event.pointerType === "pen" ? 4.2 : 5.6;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
    this.ctx.beginPath();
    this.ctx.moveTo(this.last.x, this.last.y);
    this.ctx.lineTo(point.x, point.y);
    this.ctx.stroke();
    this.ctx.restore();
    this.currentStroke.push(point);
    this.last = point;
  }

  endPointer(event) {
    if (event.pointerId !== this.pointerId) return;
    event.preventDefault();
    if (this.currentStroke && this.currentStroke.length > 1) {
      this.strokes.push(this.currentStroke);
    }
    this.pointerId = null;
    this.currentStroke = null;
    this.last = null;
  }

  pointFromEvent(event) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  drawStoredStrokes() {
    this.ctx.save();
    this.ctx.strokeStyle = "#10243f";
    this.ctx.lineWidth = 5.3;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
    this.strokes.forEach((stroke) => {
      if (stroke.length < 2) return;
      this.ctx.beginPath();
      this.ctx.moveTo(stroke[0].x, stroke[0].y);
      stroke.slice(1).forEach((point) => this.ctx.lineTo(point.x, point.y));
      this.ctx.stroke();
    });
    this.ctx.restore();
  }
}

function guideForGlyph(glyph) {
  const map = {
    "ㄱ": [[0.34, 0.34, 0.66, 0.34], [0.66, 0.34, 0.66, 0.67]],
    "ㄴ": [[0.34, 0.32, 0.34, 0.66], [0.34, 0.66, 0.68, 0.66]],
    "ㄷ": [[0.66, 0.34, 0.34, 0.34], [0.34, 0.34, 0.34, 0.66], [0.34, 0.66, 0.68, 0.66]],
    "ㄹ": [[0.35, 0.32, 0.67, 0.32], [0.67, 0.32, 0.35, 0.49], [0.35, 0.49, 0.67, 0.49], [0.67, 0.49, 0.35, 0.68], [0.35, 0.68, 0.69, 0.68]],
    "ㅁ": [[0.35, 0.34, 0.65, 0.34], [0.35, 0.34, 0.35, 0.66], [0.65, 0.34, 0.65, 0.66], [0.35, 0.66, 0.65, 0.66]],
    "ㅂ": [[0.35, 0.31, 0.35, 0.67], [0.65, 0.31, 0.65, 0.67], [0.35, 0.48, 0.65, 0.48], [0.35, 0.67, 0.65, 0.67]],
    "ㅅ": [[0.5, 0.31, 0.34, 0.68], [0.5, 0.31, 0.68, 0.68]],
    "ㅇ": [[0.5, 0.3, 0.62, 0.37], [0.62, 0.37, 0.62, 0.62], [0.62, 0.62, 0.38, 0.62], [0.38, 0.62, 0.5, 0.3]],
    "ㅈ": [[0.35, 0.34, 0.66, 0.34], [0.5, 0.34, 0.34, 0.68], [0.5, 0.34, 0.68, 0.68]],
    "ㅎ": [[0.48, 0.26, 0.6, 0.26], [0.34, 0.38, 0.66, 0.38], [0.5, 0.44, 0.62, 0.56], [0.62, 0.56, 0.38, 0.65]],
    "ㅋ": [[0.34, 0.33, 0.66, 0.33], [0.66, 0.33, 0.66, 0.68], [0.42, 0.5, 0.66, 0.5]],
    "ㅌ": [[0.66, 0.31, 0.34, 0.31], [0.34, 0.31, 0.34, 0.68], [0.34, 0.49, 0.63, 0.49], [0.34, 0.68, 0.68, 0.68]],
    "ㅍ": [[0.35, 0.32, 0.65, 0.32], [0.35, 0.32, 0.35, 0.68], [0.65, 0.32, 0.65, 0.68], [0.35, 0.5, 0.65, 0.5], [0.35, 0.68, 0.65, 0.68]],
    "ㅊ": [[0.5, 0.26, 0.5, 0.36], [0.35, 0.39, 0.66, 0.39], [0.5, 0.39, 0.34, 0.69], [0.5, 0.39, 0.68, 0.69]],
    "ㅏ": [[0.48, 0.28, 0.48, 0.72], [0.48, 0.5, 0.68, 0.5]],
    "ㅓ": [[0.52, 0.28, 0.52, 0.72], [0.52, 0.5, 0.32, 0.5]],
    "ㅗ": [[0.5, 0.32, 0.5, 0.52], [0.32, 0.58, 0.68, 0.58]],
    "ㅜ": [[0.32, 0.42, 0.68, 0.42], [0.5, 0.48, 0.5, 0.68]],
    "ㅡ": [[0.32, 0.52, 0.68, 0.52]],
    "ㅣ": [[0.5, 0.28, 0.5, 0.72]]
  };
  if (map[glyph]) return map[glyph];
  if (glyph.includes("ㄲ")) return [...map["ㄱ"], [0.43, 0.38, 0.74, 0.38], [0.74, 0.38, 0.74, 0.7]];
  if (glyph.includes("ㅆ")) return [[0.42, 0.31, 0.3, 0.68], [0.42, 0.31, 0.53, 0.68], [0.57, 0.31, 0.48, 0.68], [0.57, 0.31, 0.7, 0.68]];
  if (glyph.startsWith("ㅑ")) return [[0.46, 0.28, 0.46, 0.72], [0.46, 0.42, 0.66, 0.42], [0.46, 0.58, 0.66, 0.58]];
  if (glyph.startsWith("ㅕ")) return [[0.54, 0.28, 0.54, 0.72], [0.54, 0.42, 0.34, 0.42], [0.54, 0.58, 0.34, 0.58]];
  if (glyph.startsWith("ㅛ")) return [[0.42, 0.33, 0.42, 0.5], [0.58, 0.33, 0.58, 0.5], [0.31, 0.58, 0.69, 0.58]];
  if (glyph.startsWith("ㅠ")) return [[0.31, 0.42, 0.69, 0.42], [0.42, 0.5, 0.42, 0.69], [0.58, 0.5, 0.58, 0.69]];
  return [[0.36, 0.34, 0.64, 0.34], [0.5, 0.3, 0.5, 0.72]];
}

function drawArrow(ctx, x1, y1, x2, y2) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const head = 12;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - head * Math.cos(angle - Math.PI / 6), y2 - head * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(x2 - head * Math.cos(angle + Math.PI / 6), y2 - head * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();
}
