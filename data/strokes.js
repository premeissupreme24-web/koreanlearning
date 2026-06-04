const strokeGuideData = [
  strokeGuide("ㅏ", "jamo", [
    strokeStep(1, "先寫中間直線，由上往下。", 0.48, 0.24, 0.48, 0.76),
    strokeStep(2, "再從中線往右寫短橫。", 0.48, 0.5, 0.7, 0.5)
  ]),
  strokeGuide("ㅓ", "jamo", [
    strokeStep(1, "先寫中間直線，由上往下。", 0.54, 0.24, 0.54, 0.76),
    strokeStep(2, "再從中線往左寫短橫。", 0.54, 0.5, 0.32, 0.5)
  ]),
  strokeGuide("ㅗ", "jamo", [
    strokeStep(1, "先寫短直，從上往下。", 0.5, 0.3, 0.5, 0.52),
    strokeStep(2, "再寫底部橫線，從左到右。", 0.3, 0.58, 0.7, 0.58)
  ]),
  strokeGuide("ㅜ", "jamo", [
    strokeStep(1, "先寫上方橫線，從左到右。", 0.3, 0.42, 0.7, 0.42),
    strokeStep(2, "再寫中間短直，往下收。", 0.5, 0.48, 0.5, 0.72)
  ]),
  strokeGuide("ㅡ", "jamo", [
    strokeStep(1, "一筆橫線，穩穩從左寫到右。", 0.28, 0.52, 0.72, 0.52)
  ]),
  strokeGuide("ㅣ", "jamo", [
    strokeStep(1, "一筆直線，從上往下。", 0.5, 0.24, 0.5, 0.78)
  ]),
  strokeGuide("ㄱ", "jamo", [
    strokeStep(1, "先寫上方橫線。", 0.32, 0.32, 0.68, 0.32),
    strokeStep(2, "再往下轉折收住。", 0.68, 0.32, 0.68, 0.7)
  ]),
  strokeGuide("ㄴ", "jamo", [
    strokeStep(1, "先寫左邊直線。", 0.32, 0.3, 0.32, 0.68),
    strokeStep(2, "再寫底部橫線。", 0.32, 0.68, 0.7, 0.68)
  ]),
  strokeGuide("ㄷ", "jamo", [
    strokeStep(1, "先寫上方橫線。", 0.66, 0.32, 0.32, 0.32),
    strokeStep(2, "再寫左邊直線。", 0.32, 0.32, 0.32, 0.68),
    strokeStep(3, "最後寫底部橫線。", 0.32, 0.68, 0.7, 0.68)
  ]),
  strokeGuide("ㄹ", "jamo", [
    strokeStep(1, "先寫第一段橫線。", 0.32, 0.3, 0.68, 0.3),
    strokeStep(2, "往左下轉折。", 0.68, 0.3, 0.34, 0.48),
    strokeStep(3, "寫中間橫線。", 0.34, 0.48, 0.68, 0.48),
    strokeStep(4, "再往左下轉折。", 0.68, 0.48, 0.34, 0.68),
    strokeStep(5, "最後寫底線。", 0.34, 0.68, 0.72, 0.68)
  ]),
  strokeGuide("ㅁ", "jamo", [
    strokeStep(1, "先寫上橫。", 0.34, 0.32, 0.66, 0.32),
    strokeStep(2, "寫左直。", 0.34, 0.32, 0.34, 0.68),
    strokeStep(3, "寫右直。", 0.66, 0.32, 0.66, 0.68),
    strokeStep(4, "最後封底。", 0.34, 0.68, 0.66, 0.68)
  ]),
  strokeGuide("ㅂ", "jamo", [
    strokeStep(1, "先寫左直。", 0.34, 0.28, 0.34, 0.7),
    strokeStep(2, "再寫右直。", 0.66, 0.28, 0.66, 0.7),
    strokeStep(3, "寫中間橫線。", 0.34, 0.5, 0.66, 0.5),
    strokeStep(4, "最後寫底部橫線。", 0.34, 0.7, 0.66, 0.7)
  ]),
  strokeGuide("ㅅ", "jamo", [
    strokeStep(1, "從上往左下撇。", 0.5, 0.28, 0.32, 0.72),
    strokeStep(2, "再從上往右下撇。", 0.5, 0.28, 0.7, 0.72)
  ]),
  strokeGuide("ㅇ", "jamo", [
    strokeStep(1, "從上方開始畫圓，順著收回起點。", 0.5, 0.28, 0.5, 0.28, "circle")
  ]),
  strokeGuide("ㅈ", "jamo", [
    strokeStep(1, "先寫上方橫線。", 0.34, 0.34, 0.68, 0.34),
    strokeStep(2, "從中間往左下。", 0.51, 0.34, 0.32, 0.72),
    strokeStep(3, "從中間往右下。", 0.51, 0.34, 0.72, 0.72)
  ]),
  strokeGuide("ㅎ", "jamo", [
    strokeStep(1, "先寫上方小橫。", 0.44, 0.24, 0.6, 0.24),
    strokeStep(2, "再寫中間橫線。", 0.32, 0.38, 0.68, 0.38),
    strokeStep(3, "最後畫下面的圓。", 0.5, 0.46, 0.5, 0.72, "circle")
  ]),
  strokeGuide("ㅋ", "jamo", [
    strokeStep(1, "先寫 ㄱ 的上橫。", 0.32, 0.32, 0.68, 0.32),
    strokeStep(2, "再往下。", 0.68, 0.32, 0.68, 0.72),
    strokeStep(3, "中間補一橫，表示送氣。", 0.42, 0.52, 0.68, 0.52)
  ]),
  strokeGuide("ㅌ", "jamo", [
    strokeStep(1, "先寫上橫。", 0.68, 0.3, 0.32, 0.3),
    strokeStep(2, "寫左直。", 0.32, 0.3, 0.32, 0.7),
    strokeStep(3, "中間補一橫。", 0.32, 0.5, 0.64, 0.5),
    strokeStep(4, "最後封底。", 0.32, 0.7, 0.7, 0.7)
  ]),
  strokeGuide("ㅍ", "jamo", [
    strokeStep(1, "先寫上橫。", 0.34, 0.3, 0.66, 0.3),
    strokeStep(2, "寫左直。", 0.34, 0.3, 0.34, 0.7),
    strokeStep(3, "寫右直。", 0.66, 0.3, 0.66, 0.7),
    strokeStep(4, "中間補橫。", 0.34, 0.5, 0.66, 0.5),
    strokeStep(5, "最後封底。", 0.34, 0.7, 0.66, 0.7)
  ]),
  strokeGuide("ㅊ", "jamo", [
    strokeStep(1, "先寫上方短直。", 0.5, 0.22, 0.5, 0.34),
    strokeStep(2, "再寫橫線。", 0.34, 0.4, 0.68, 0.4),
    strokeStep(3, "往左下。", 0.51, 0.4, 0.32, 0.72),
    strokeStep(4, "往右下。", 0.51, 0.4, 0.72, 0.72)
  ]),
  strokeGuide("ㄲ", "jamo", [
    strokeStep(1, "先寫第一個 ㄱ。", 0.26, 0.32, 0.52, 0.32),
    strokeStep(2, "第一個 ㄱ 往下。", 0.52, 0.32, 0.52, 0.72),
    strokeStep(3, "再寫第二個 ㄱ。", 0.46, 0.38, 0.72, 0.38),
    strokeStep(4, "第二個 ㄱ 往下。", 0.72, 0.38, 0.72, 0.72)
  ]),
  strokeGuide("ㄸ", "jamo", [
    strokeStep(1, "先寫左邊 ㄷ。", 0.2, 0.32, 0.48, 0.68),
    strokeStep(2, "再寫右邊 ㄷ。", 0.48, 0.32, 0.76, 0.68)
  ]),
  strokeGuide("ㅃ", "jamo", [
    strokeStep(1, "先寫左邊 ㅂ。", 0.2, 0.3, 0.46, 0.7),
    strokeStep(2, "再寫右邊 ㅂ。", 0.48, 0.3, 0.74, 0.7)
  ]),
  strokeGuide("ㅆ", "jamo", [
    strokeStep(1, "先寫左邊 ㅅ。", 0.38, 0.3, 0.26, 0.7),
    strokeStep(2, "補左邊第二撇。", 0.38, 0.3, 0.5, 0.7),
    strokeStep(3, "再寫右邊 ㅅ。", 0.58, 0.3, 0.48, 0.7),
    strokeStep(4, "補右邊第二撇。", 0.58, 0.3, 0.74, 0.7)
  ]),
  strokeGuide("ㅉ", "jamo", [
    strokeStep(1, "先寫左邊 ㅈ。", 0.22, 0.34, 0.5, 0.72),
    strokeStep(2, "再寫右邊 ㅈ。", 0.5, 0.34, 0.78, 0.72)
  ])
];

const handwritingPracticeTargets = {
  jamo: strokeGuideData.map((item) => item.target),
  syllables: ["아", "어", "오", "우", "가", "거", "고", "구", "나", "다", "라", "마"],
  words: ["아이", "오이", "우유", "가방", "사과", "고양이", "강아지", "학교", "학생", "책"]
};

const strokeGuideMap = strokeGuideData.reduce((map, item) => {
  map[item.target] = item;
  return map;
}, {});

function strokeGuide(target, targetType, strokes) {
  return { target, targetType, strokes };
}

function strokeStep(order, description, startX, startY, endX, endY, path = "") {
  return {
    order,
    description,
    path,
    start: { x: startX, y: startY },
    end: { x: endX, y: endY }
  };
}
