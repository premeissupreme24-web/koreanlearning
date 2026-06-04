const pronunciationRules = [
  {
    tag: "子音分類",
    title: "松音：先認基本形",
    sounds: ["ㄱ", "ㄷ", "ㅂ", "ㅅ", "ㅈ"],
    note: "影片用「歌德不識字」記住第一排。ㅅ 是摩擦音，後面要和 ㅆ 單獨比較，不把 ㅎ 當成它的送氣版。",
    speak: "가 다 바 사 자"
  },
  {
    tag: "送氣音",
    title: "多一畫，多一口氣；ㅎ 單獨記",
    sounds: ["ㅋ", "ㅌ", "ㅍ", "ㅊ", "ㅎ"],
    note: "主要對比是 ㄱ/ㅋ、ㄷ/ㅌ、ㅂ/ㅍ、ㅈ/ㅊ。ㅎ 是喉音/送氣感，單獨處理。",
    speak: "카 타 파 차 하"
  },
  {
    tag: "緊音",
    title: "雙寫，短而緊",
    sounds: ["ㄲ", "ㄸ", "ㅃ", "ㅆ", "ㅉ"],
    note: "不是念很大聲，而是先把喉嚨和口腔收緊，再短短地放出來。",
    speak: "까 따 빠 싸 짜"
  },
  {
    tag: "摩擦音",
    title: "ㅅ / ㅆ：單獨比較",
    sounds: ["사", "싸"],
    note: "ㅅ 和 ㅆ 是摩擦音鬆緊對比，不接 ㅎ 做三連組。",
    speak: "사 싸"
  },
  {
    tag: "ㅇ 規則",
    title: "初聲占位，終聲 /ŋ/",
    sounds: ["아", "오", "이", "강", "방", "공"],
    note: "初聲 ㅇ 只是占位，不發音；終聲 ㅇ 發 /ŋ/，像 강、방、공 的尾巴。",
    speak: "아 오 이 강 방 공"
  },
  {
    tag: "嘴形",
    title: "ㅡ：扁嘴發 eu",
    sounds: ["으", "그", "스"],
    note: "影片用哭臉提醒：嘴巴拉平，不要念成中文的「屋」。",
    speak: "으 그 스"
  },
  {
    tag: "易混規則",
    title: "의：位置不同，讀法會變",
    sounds: ["의사", "회의", "저의"],
    note: "詞首多讀 ui/eui；不在詞首常弱成 i；表示「的」時常讀成 e。",
    speak: "의사 회의 저의"
  }
];

const pronunciationContrastItems = [
  { title: "ㄱ / ㅋ / ㄲ", hint: "同樣是 a，只比較前面的力度和氣流。", choices: ["가", "카", "까"] },
  { title: "ㄷ / ㅌ / ㄸ", hint: "舌尖位置接近，差別在送氣和緊度。", choices: ["다", "타", "따"] },
  { title: "ㅂ / ㅍ / ㅃ", hint: "雙唇先閉住，再注意有沒有大氣流。", choices: ["바", "파", "빠"] },
  { title: "ㅈ / ㅊ / ㅉ", hint: "舌面靠近硬顎，送氣音會更明顯往外推。", choices: ["자", "차", "짜"] },
  { title: "ㅅ / ㅆ", hint: "摩擦音單獨比較：ㅆ 比 ㅅ 更緊、更短。", choices: ["사", "싸"] },
  { title: "ㅎ 喉音", hint: "ㅎ 是喉音/送氣感，和無聲初聲 ㅇ 分開聽。", choices: ["하", "아", "카"] },
  { title: "初聲 ㅇ：占位不發音", hint: "아、오、이 開頭的 ㅇ 只是讓母音可以站住，不發自己的音。", choices: ["아", "오", "이"] },
  { title: "아 / 앙", hint: "終聲 ㅇ 發 /ŋ/，聽尾巴有沒有收住。", choices: ["아", "앙"] },
  { title: "가 / 강", hint: "同樣是 가，강 的尾巴多一個 /ŋ/。", choices: ["가", "강"] },
  { title: "바 / 방", hint: "同樣是 바，방 的尾巴多一個 /ŋ/。", choices: ["바", "방"] }
];

const soundPairSets = pronunciationContrastItems;

const pronunciationRuleEnglish = [
  ["Consonant map", "Plain sounds: learn the base shapes first", "The first row gives you the base shapes. Treat ㅅ as a fricative and compare it with ㅆ, not with ㅎ."],
  ["Aspirated sounds", "Extra stroke, extra air; keep ㅎ separate", "The main pairs are ㄱ/ㅋ, ㄷ/ㅌ, ㅂ/ㅍ, and ㅈ/ㅊ. ㅎ is a throat sound with breath."],
  ["Tense sounds", "Double letters: short and tight", "Tense sounds are not just louder. Tighten first, then release briefly."],
  ["Fricatives", "ㅅ / ㅆ: compare them separately", "ㅅ and ㅆ are a loose/tight fricative pair. Do not attach ㅎ as a triplet."],
  ["ㅇ rule", "Initial placeholder, final /ng/", "Initial ㅇ does not make its own sound. Final ㅇ is /ng/, as in 강, 방, 공."],
  ["Mouth shape", "ㅡ: flat-mouth eu", "Keep the mouth flat; do not pronounce it like English oo."],
  ["Easy to mix", "의 changes by position", "At the start it often keeps ui/eui; later it may weaken to i; as possessive 의, it is often pronounced e."]
];

const pronunciationContrastEnglish = [
  ["ㄱ / ㅋ / ㄲ", "Same vowel, different force and airflow."],
  ["ㄷ / ㅌ / ㄸ", "Similar tongue position; listen for aspiration and tension."],
  ["ㅂ / ㅍ / ㅃ", "Close both lips first, then notice the airflow."],
  ["ㅈ / ㅊ / ㅉ", "The aspirated sound pushes more air forward."],
  ["ㅅ / ㅆ", "Fricative pair: ㅆ is tighter and shorter."],
  ["ㅎ throat sound", "ㅎ is breathy; compare it with silent initial ㅇ."],
  ["Initial ㅇ: silent placeholder", "아, 오, 이 begin with silent ㅇ so the vowel can stand."],
  ["아 / 앙", "Final ㅇ adds an /ng/ tail."],
  ["가 / 강", "강 has the same start as 가, plus final /ng/."],
  ["바 / 방", "방 has the same start as 바, plus final /ng/."]
];
