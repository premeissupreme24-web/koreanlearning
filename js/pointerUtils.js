function pointerTool(event) {
  if (event.pointerType === "pen") return "pen";
  if (event.pointerType === "touch") return "touch";
  return "mouse";
}

function pressureFromEvent(event) {
  if (typeof event.pressure === "number" && event.pressure > 0) {
    return Math.min(1, Math.max(0.08, event.pressure));
  }
  return event.pointerType === "pen" ? 0.45 : 0.65;
}

function lineWidthForPointer(event, base = 5.2) {
  const pressure = pressureFromEvent(event);
  const tool = pointerTool(event);
  const multiplier = tool === "pen" ? 0.72 : tool === "touch" ? 1.12 : 0.86;
  return Math.max(2.6, base * multiplier * (0.72 + pressure));
}

function canvasPointFromEvent(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
    pressure: pressureFromEvent(event),
    timestamp: Date.now()
  };
}

function createStroke(event, firstPoint) {
  const now = Date.now();
  return {
    id: `stroke-${now}-${Math.random().toString(36).slice(2, 8)}`,
    points: [firstPoint],
    startedAt: now,
    endedAt: now,
    tool: pointerTool(event)
  };
}

function normalizeLegacyStroke(stroke) {
  if (!stroke) return null;
  if (Array.isArray(stroke)) {
    return {
      id: `legacy-${Math.random().toString(36).slice(2, 8)}`,
      points: stroke.map((point) => ({
        x: point.x,
        y: point.y,
        pressure: point.pressure || 0.55,
        timestamp: point.timestamp || Date.now()
      })),
      startedAt: Date.now(),
      endedAt: Date.now(),
      tool: "touch"
    };
  }
  return stroke;
}
