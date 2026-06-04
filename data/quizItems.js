const quizItems = [
  { prompt: "ㄱ", correctAnswer: "g/k", choices: ["g/k", "k", "kk"], speakText: "그" },
  { prompt: "ㅋ", correctAnswer: "k", choices: ["g/k", "k", "kk"], speakText: "크" },
  { prompt: "ㄲ", correctAnswer: "kk", choices: ["g/k", "k", "kk"], speakText: "끄" },
  { prompt: "ㄴ", correctAnswer: "n", choices: ["n", "m", "r/l"], speakText: "느" },
  { prompt: "ㄷ", correctAnswer: "d/t", choices: ["d/t", "t", "tt"], speakText: "드" },
  { prompt: "ㅌ", correctAnswer: "t", choices: ["d/t", "t", "tt"], speakText: "트" },
  { prompt: "ㄸ", correctAnswer: "tt", choices: ["d/t", "t", "tt"], speakText: "뜨" },
  { prompt: "ㄹ", correctAnswer: "r/l", choices: ["r/l", "n", "d/t"], speakText: "르" },
  { prompt: "ㅁ", correctAnswer: "m", choices: ["m", "n", "b/p"], speakText: "므" },
  { prompt: "ㅂ", correctAnswer: "b/p", choices: ["b/p", "p", "pp"], speakText: "브" },
  { prompt: "ㅍ", correctAnswer: "p", choices: ["b/p", "p", "pp"], speakText: "프" },
  { prompt: "ㅃ", correctAnswer: "pp", choices: ["b/p", "p", "pp"], speakText: "쁘" },
  { prompt: "ㅈ", correctAnswer: "j/ch", choices: ["j/ch", "ch", "jj"], speakText: "즈" },
  { prompt: "ㅊ", correctAnswer: "ch", choices: ["j/ch", "ch", "jj"], speakText: "츠" },
  { prompt: "ㅉ", correctAnswer: "jj", choices: ["j/ch", "ch", "jj"], speakText: "쯔" },
  { prompt: "ㅅ", correctAnswer: "s", choices: ["s", "ss", "h"], speakText: "스" },
  { prompt: "ㅆ", correctAnswer: "ss", choices: ["s", "ss", "h"], speakText: "쓰" },
  { prompt: "ㅇ", correctAnswer: "initial silent / final ng", choices: ["initial silent / final ng", "always h", "always ng"], speakText: "응" },
  { prompt: "ㅎ", correctAnswer: "h", choices: ["h", "silent", "ss"], speakText: "흐" },
  { prompt: "ㅏ", correctAnswer: "a", choices: ["a", "eo", "o", "u"], speakText: "아" },
  { prompt: "ㅓ", correctAnswer: "eo", choices: ["a", "eo", "o", "u"], speakText: "어" },
  { prompt: "ㅗ", correctAnswer: "o", choices: ["a", "eo", "o", "u"], speakText: "오" },
  { prompt: "ㅜ", correctAnswer: "u", choices: ["u", "eu", "i", "o"], speakText: "우" },
  { prompt: "ㅡ", correctAnswer: "eu", choices: ["u", "eu", "i", "o"], speakText: "으" },
  { prompt: "ㅣ", correctAnswer: "i", choices: ["u", "eu", "i", "o"], speakText: "이" },
  { prompt: "ㅑ", correctAnswer: "ya", choices: ["ya", "yeo", "yo", "yu"], speakText: "야" },
  { prompt: "ㅕ", correctAnswer: "yeo", choices: ["ya", "yeo", "yo", "yu"], speakText: "여" },
  { prompt: "ㅛ", correctAnswer: "yo", choices: ["ya", "yeo", "yo", "yu"], speakText: "요" },
  { prompt: "ㅠ", correctAnswer: "yu", choices: ["ya", "yeo", "yo", "yu"], speakText: "유" },
  { prompt: "ㅒ", correctAnswer: "yae", choices: ["ae", "e", "yae", "ye"], speakText: "얘" },
  { prompt: "ㅖ", correctAnswer: "ye", choices: ["ae", "e", "yae", "ye"], speakText: "예" },
  { prompt: "ㅐ", correctAnswer: "ae", choices: ["ae", "e", "yae", "ye"], speakText: "애" },
  { prompt: "ㅔ", correctAnswer: "e", choices: ["ae", "e", "yae", "ye"], speakText: "에" },
  { prompt: "ㅘ", correctAnswer: "wa", choices: ["wa", "wo", "wae", "we"], speakText: "와" },
  { prompt: "ㅝ", correctAnswer: "wo", choices: ["wa", "wo", "wae", "we"], speakText: "워" },
  { prompt: "ㅙ", correctAnswer: "wae", choices: ["wa", "wo", "wae", "we"], speakText: "왜" },
  { prompt: "ㅞ", correctAnswer: "we", choices: ["wa", "wo", "wae", "we"], speakText: "웨" },
  { prompt: "ㅚ", correctAnswer: "oe/we", choices: ["oe/we", "wi", "ui", "wa"], speakText: "외" },
  { prompt: "ㅟ", correctAnswer: "wi", choices: ["oe/we", "wi", "ui", "wo"], speakText: "위" },
  { prompt: "ㅢ", correctAnswer: "ui/eui", choices: ["ui/eui", "wi", "wae", "e only"], speakText: "의" },
  { prompt: "받침 ㄱ", correctAnswer: "k stop", choices: ["k stop", "t stop", "p stop", "ng"], speakText: "각" },
  { prompt: "받침 ㄷ", correctAnswer: "t stop", choices: ["k stop", "t stop", "p stop", "ng"], speakText: "갇" },
  { prompt: "받침 ㅂ", correctAnswer: "p stop", choices: ["k stop", "t stop", "p stop", "ng"], speakText: "갑" },
  { prompt: "받침 ㅇ", correctAnswer: "ng", choices: ["k stop", "t stop", "p stop", "ng"], speakText: "강" }
];

const euiQuizItems = [
  { prompt: "의 單獨出現時通常讀作什麼？", correctAnswer: "의", choices: ["의", "이", "에"], speakText: "의", note: "單獨練字母時，先保留 의/ui 的讀法。" },
  { prompt: "의사 中 의 讀作什麼？", correctAnswer: "의", choices: ["의", "이", "에"], speakText: "의사", note: "詞首 의 多保留 의/ui 的讀法。" },
  { prompt: "회의 中 의 讀作什麼？", correctAnswer: "이", choices: ["의", "이", "에"], speakText: "회의", note: "不在詞首時，의 常弱化成 이。" },
  { prompt: "저의 中 의 作為「的」常讀作什麼？", correctAnswer: "에", choices: ["의", "이", "에"], speakText: "저의", note: "表示「的」時，의 常讀作 에。" }
];

const vowelContrastItems = [
  { title: "ㅏ / ㅓ / ㅗ / ㅜ", hint: "先抓嘴形方向：ㅏ 打開，ㅓ 往內，ㅗ 圓嘴往上，ㅜ 圓嘴往下。", choices: ["아", "어", "오", "우"] },
  { title: "ㅓ / ㅗ", hint: "中文學習者常把 ㅓ 和 ㅗ 混在一起；聽嘴巴有沒有圓起來。", choices: ["어", "오"] },
  { title: "ㅡ / ㅜ", hint: "ㅡ 是扁嘴 eu；ㅜ 是圓嘴 u。不要把 ㅡ 念成「烏」。", choices: ["으", "우"] },
  { title: "ㅑ / ㅕ / ㅛ / ㅠ", hint: "Y 行像先滑一下 y，再進入基本母音。", choices: ["야", "여", "요", "유"] },
  { title: "ㅒ / ㅖ", hint: "兩個都帶 y 滑音；現代口語很接近，先把字形和聲音綁在一起。", choices: ["얘", "예"] },
  { title: "와 / 워", hint: "와 是 wa；워 是 wo，嘴形從圓嘴打開到不同方向。", choices: ["와", "워"] },
  { title: "ㅐ / ㅔ", hint: "現代口語很接近，但初學要知道字形不同。", choices: ["애", "에"] },
  { title: "왜 / 웨 / 외", hint: "三個現代發音常接近，先靠聽辨和字形一起記。", choices: ["왜", "웨", "외"] },
  { title: "위 / 의", hint: "위 是 wi；의 依位置可能變化，先聽基本差異。", choices: ["위", "의"] },
  { title: "ㅢ 位置讀音", hint: "의 單練保留 ui/eui；助詞常像 에；部分詞中可接近 이。", choices: ["의", "이", "에"] }
];

const soundGameItems = ["가", "나", "다", "마", "바", "사", "아", "자", "하", "요", "유", "워"];

const vowelContrastEnglish = [
  ["ㅏ / ㅓ / ㅗ / ㅜ", "Track mouth direction first: open, inward, round-up, and round-down."],
  ["ㅓ / ㅗ", "A common confusion for Chinese speakers. Listen for whether the lips round."],
  ["ㅡ / ㅜ", "ㅡ is flat eu; ㅜ is rounded u. Do not turn ㅡ into oo."],
  ["ㅑ / ㅕ / ㅛ / ㅠ", "The Y row starts with a small y-glide before the base vowel."],
  ["ㅒ / ㅖ", "Both carry a y-glide and can sound close today; bind spelling and sound together."],
  ["와 / 워", "와 is wa; 워 is wo. Listen for where the rounded mouth opens."],
  ["ㅐ / ㅔ", "They are very close in modern speech, but the spellings are different."],
  ["왜 / 웨 / 외", "These can sound close today. Train ear and spelling together."],
  ["위 / 의", "위 is wi. 의 changes by position, so start with the basic contrast."],
  ["ㅢ by position", "의 keeps ui/eui in letter practice, often sounds like 에 as a possessive marker, and can approach 이 inside some words."]
];

const euiQuizEnglish = [
  ["When 의 appears by itself, how is it usually read?", "When practicing the letter by itself, keep the ui/eui reading."],
  ["In 의사, how is 의 usually read?", "At the beginning, 의 usually keeps the ui/eui reading."],
  ["In 회의, how is 의 usually read?", "Away from the beginning, 의 often weakens to 이."],
  ["In 저의, when 의 means possessive “my/of,” how is it often read?", "As a possessive marker, 의 is often pronounced 에."]
];
