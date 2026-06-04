const quizItems = [
  { prompt: "ㄱ", correctAnswer: "g/k", choices: ["g/k", "k", "kk"], speakText: "그" },
  { prompt: "ㅋ", correctAnswer: "k", choices: ["g/k", "k", "kk"], speakText: "크" },
  { prompt: "ㄲ", correctAnswer: "kk", choices: ["g/k", "k", "kk"], speakText: "끄" },
  { prompt: "ㄷ", correctAnswer: "d/t", choices: ["d/t", "t", "tt"], speakText: "드" },
  { prompt: "ㅌ", correctAnswer: "t", choices: ["d/t", "t", "tt"], speakText: "트" },
  { prompt: "ㄸ", correctAnswer: "tt", choices: ["d/t", "t", "tt"], speakText: "뜨" },
  { prompt: "ㅂ", correctAnswer: "b/p", choices: ["b/p", "p", "pp"], speakText: "브" },
  { prompt: "ㅍ", correctAnswer: "p", choices: ["b/p", "p", "pp"], speakText: "프" },
  { prompt: "ㅃ", correctAnswer: "pp", choices: ["b/p", "p", "pp"], speakText: "쁘" },
  { prompt: "ㅈ", correctAnswer: "j/ch", choices: ["j/ch", "ch", "jj"], speakText: "즈" },
  { prompt: "ㅊ", correctAnswer: "ch", choices: ["j/ch", "ch", "jj"], speakText: "츠" },
  { prompt: "ㅉ", correctAnswer: "jj", choices: ["j/ch", "ch", "jj"], speakText: "쯔" },
  { prompt: "ㅅ", correctAnswer: "s", choices: ["s", "ss", "h"], speakText: "스" },
  { prompt: "ㅆ", correctAnswer: "ss", choices: ["s", "ss", "h"], speakText: "쓰" },
  { prompt: "ㅏ", correctAnswer: "a", choices: ["a", "eo", "o", "u"], speakText: "아" },
  { prompt: "ㅓ", correctAnswer: "eo", choices: ["a", "eo", "o", "u"], speakText: "어" },
  { prompt: "ㅗ", correctAnswer: "o", choices: ["a", "eo", "o", "u"], speakText: "오" },
  { prompt: "ㅜ", correctAnswer: "u", choices: ["u", "eu", "i", "o"], speakText: "우" },
  { prompt: "ㅡ", correctAnswer: "eu", choices: ["u", "eu", "i", "o"], speakText: "으" },
  { prompt: "ㅣ", correctAnswer: "i", choices: ["u", "eu", "i", "o"], speakText: "이" },
  { prompt: "ㅐ", correctAnswer: "ae", choices: ["ae", "e", "yae", "ye"], speakText: "애" },
  { prompt: "ㅔ", correctAnswer: "e", choices: ["ae", "e", "yae", "ye"], speakText: "에" }
];

const euiQuizItems = [
  { prompt: "의사 中 의 讀作什麼？", correctAnswer: "의", choices: ["의", "이", "에"], speakText: "의사", note: "詞首 의 多保留 의/ui 的讀法。" },
  { prompt: "회의 中 의 讀作什麼？", correctAnswer: "이", choices: ["의", "이", "에"], speakText: "회의", note: "不在詞首時，의 常弱化成 이。" },
  { prompt: "저의 中 의 作為「的」常讀作什麼？", correctAnswer: "에", choices: ["의", "이", "에"], speakText: "저의", note: "表示「的」時，의 常讀作 에。" }
];

const vowelContrastItems = [
  { title: "ㅐ / ㅔ", hint: "現代口語很接近，但初學要知道字形不同。", choices: ["애", "에"] },
  { title: "왜 / 웨 / 외", hint: "三個現代發音常接近，先靠聽辨和字形一起記。", choices: ["왜", "웨", "외"] },
  { title: "위 / 의", hint: "위 是 wi；의 依位置可能變化，先聽基本差異。", choices: ["위", "의"] },
  { title: "와 / 워", hint: "와 是 wa；워 是 wo，嘴形從圓嘴打開到不同方向。", choices: ["와", "워"] }
];

const soundGameItems = ["가", "나", "다", "마", "바", "사", "아", "자", "하", "요", "유", "워"];

const vowelContrastEnglish = [
  ["ㅐ / ㅔ", "They are very close in modern speech, but the spellings are different."],
  ["왜 / 웨 / 외", "These can sound close today. Train ear and spelling together."],
  ["위 / 의", "위 is wi. 의 changes by position, so start with the basic contrast."],
  ["와 / 워", "와 is wa; 워 is wo. Listen for where the mouth opens."]
];

const euiQuizEnglish = [
  ["In 의사, how is 의 usually read?", "At the beginning, 의 usually keeps the ui/eui reading."],
  ["In 회의, how is 의 usually read?", "Away from the beginning, 의 often weakens to 이."],
  ["In 저의, when 의 means possessive “my/of,” how is it often read?", "As a possessive marker, 의 is often pronounced 에."]
];
