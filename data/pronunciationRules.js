const pronunciationRules = [
  {
    tag: "基本元音",
    title: "ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ：先抓嘴形方向",
    sounds: ["아", "어", "오", "우", "으", "이"],
    note: "先不要背太多術語。ㅏ 打開，ㅓ 往內，ㅗ/ㅜ 圓嘴，ㅡ 扁嘴，ㅣ 微笑拉開。",
    speak: "아 어 오 우 으 이"
  },
  {
    tag: "Y 行元音",
    title: "多一畫，前面加 y 滑音",
    sounds: ["야", "여", "요", "유", "얘", "예"],
    note: "ㅑ/ㅕ/ㅛ/ㅠ/ㅒ/ㅖ 可以先理解成 y + 基本母音。重點是聽到開頭那一下滑音。",
    speak: "야 여 요 유 얘 예"
  },
  {
    tag: "W 行元音",
    title: "圓嘴開始，再打開",
    sounds: ["와", "워", "왜", "웨"],
    note: "ㅘ/ㅝ/ㅙ/ㅞ 都先有 w 的圓嘴感，再滑到後面的母音。왜/웨 和 외 很容易接近，要連字形一起練。",
    speak: "와 워 왜 웨"
  },
  {
    tag: "複合元音",
    title: "ㅐ ㅔ ㅚ ㅟ ㅢ：聽辨 + 字形一起記",
    sounds: ["애", "에", "외", "위", "의"],
    note: "ㅐ/ㅔ 現代口語常接近；ㅚ 常像 we；ㅟ 是 wi；ㅢ 會因位置有 의/이/에 的變化。",
    speak: "애 에 외 위 의"
  },
  {
    tag: "子音分類",
    title: "松音：先認基本形",
    sounds: ["ㄱ", "ㄷ", "ㅂ", "ㅅ", "ㅈ"],
    note: "先記基本形：ㄱ/ㄷ/ㅂ/ㅅ/ㅈ。ㅅ 是摩擦音，後面要和 ㅆ 單獨比較，不把 ㅎ 當成它的送氣版。",
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
    note: "嘴巴拉平，不要念成中文的「屋」。如果嘴唇圓起來，就容易跑到 ㅜ。",
    speak: "으 그 스"
  },
  {
    tag: "ㄹ 規則",
    title: "ㄹ：介於 r/l，不等於中文 ㄌ",
    sounds: ["라", "알", "달", "말"],
    note: "ㄹ 在開頭常有輕彈 r 的感覺，在收音位置更像 l 收住。先用 라/알/달/말 聽位置差異。",
    speak: "라 알 달 말"
  },
  {
    tag: "收音易混",
    title: "ㄱ / ㄷ / ㅂ / ㅇ：尾巴收口不同",
    sounds: ["각", "갇", "갑", "강"],
    note: "收音 ㄱ/ㄷ/ㅂ 是短短收住，不要把尾巴完整爆破出來；ㅇ 是鼻音 /ŋ/，尾巴會震在鼻腔。",
    speak: "각 갇 갑 강"
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
  { title: "ㅓ / ㅗ", hint: "ㅓ 嘴唇不圓，ㅗ 嘴唇明顯圓起來。", choices: ["어", "오"] },
  { title: "ㅡ / ㅜ", hint: "ㅡ 是扁嘴，ㅜ 是圓嘴。這組要靠嘴形分開。", choices: ["으", "우"] },
  { title: "ㅐ / ㅔ", hint: "現代口語很接近，練習時同時記字形。", choices: ["애", "에"] },
  { title: "ㅚ / ㅙ / ㅞ", hint: "三個常聽起來接近；先用外/왜/웨 的字形去綁聲音。", choices: ["외", "왜", "웨"] },
  { title: "ㄹ 的 r/l 感", hint: "開頭 ㄹ 輕彈，收音 ㄹ 收住；不要完全套中文 ㄌ。", choices: ["라", "알", "달", "말"] },
  { title: "收音 ㄱ / ㄷ / ㅂ / ㅇ", hint: "前三個是短收口，ㅇ 是鼻音 /ŋ/。", choices: ["각", "갇", "갑", "강"] },
  { title: "ㅎ 喉音", hint: "ㅎ 是喉音/送氣感，和無聲初聲 ㅇ 分開聽。", choices: ["하", "아", "카"] },
  { title: "初聲 ㅇ：占位不發音", hint: "아、오、이 開頭的 ㅇ 只是讓母音可以站住，不發自己的音。", choices: ["아", "오", "이"] },
  { title: "아 / 앙", hint: "終聲 ㅇ 發 /ŋ/，聽尾巴有沒有收住。", choices: ["아", "앙"] },
  { title: "가 / 강", hint: "同樣是 가，강 的尾巴多一個 /ŋ/。", choices: ["가", "강"] },
  { title: "바 / 방", hint: "同樣是 바，방 的尾巴多一個 /ŋ/。", choices: ["바", "방"] }
];

const soundPairSets = pronunciationContrastItems;

const pronunciationRuleEnglish = [
  ["Basic vowels", "ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ: track mouth direction first", "Keep it physical first: ㅏ opens, ㅓ pulls inward, ㅗ/ㅜ round the lips, ㅡ stays flat, and ㅣ stretches like a smile."],
  ["Y-row vowels", "Extra stroke, add a y-glide", "ㅑ/ㅕ/ㅛ/ㅠ/ㅒ/ㅖ can be understood as y plus a base vowel. Listen for the small glide at the start."],
  ["W-row vowels", "Start rounded, then open", "ㅘ/ㅝ/ㅙ/ㅞ start with a rounded w feeling, then move into the following vowel. Train 왜/웨 with 외 by spelling and sound together."],
  ["Compound vowels", "ㅐ ㅔ ㅚ ㅟ ㅢ: train sound and shape together", "ㅐ/ㅔ are often close today; ㅚ can sound like we; ㅟ is wi; ㅢ changes by position."],
  ["Consonant map", "Plain sounds: learn the base shapes first", "The first row gives you the base shapes. Treat ㅅ as a fricative and compare it with ㅆ, not with ㅎ."],
  ["Aspirated sounds", "Extra stroke, extra air; keep ㅎ separate", "The main pairs are ㄱ/ㅋ, ㄷ/ㅌ, ㅂ/ㅍ, and ㅈ/ㅊ. ㅎ is a throat sound with breath."],
  ["Tense sounds", "Double letters: short and tight", "Tense sounds are not just louder. Tighten first, then release briefly."],
  ["Fricatives", "ㅅ / ㅆ: compare them separately", "ㅅ and ㅆ are a loose/tight fricative pair. Do not attach ㅎ as a triplet."],
  ["ㅇ rule", "Initial placeholder, final /ng/", "Initial ㅇ does not make its own sound. Final ㅇ is /ng/, as in 강, 방, 공."],
  ["Mouth shape", "ㅡ: flat-mouth eu", "Keep the mouth flat; do not pronounce it like English oo. If the lips round, it drifts toward ㅜ."],
  ["ㄹ rule", "ㄹ sits between r and l", "At the start it can feel like a light tap; in final position it closes more like l. Compare 라/알/달/말."],
  ["Final consonants", "ㄱ / ㄷ / ㅂ / ㅇ: different endings", "Final ㄱ/ㄷ/ㅂ stop short without a full release. Final ㅇ is nasal /ng/."],
  ["Easy to mix", "의 changes by position", "At the start it often keeps ui/eui; later it may weaken to i; as possessive 의, it is often pronounced e."]
];

const pronunciationContrastEnglish = [
  ["ㄱ / ㅋ / ㄲ", "Same vowel, different force and airflow."],
  ["ㄷ / ㅌ / ㄸ", "Similar tongue position; listen for aspiration and tension."],
  ["ㅂ / ㅍ / ㅃ", "Close both lips first, then notice the airflow."],
  ["ㅈ / ㅊ / ㅉ", "The aspirated sound pushes more air forward."],
  ["ㅅ / ㅆ", "Fricative pair: ㅆ is tighter and shorter."],
  ["ㅓ / ㅗ", "ㅓ is unrounded; ㅗ is clearly rounded."],
  ["ㅡ / ㅜ", "ㅡ is flat; ㅜ is rounded. Separate them by mouth shape."],
  ["ㅐ / ㅔ", "They are close in modern speech, so pair sound with spelling."],
  ["ㅚ / ㅙ / ㅞ", "These can sound close; bind the spellings to the sound."],
  ["ㄹ r/l feeling", "Initial ㄹ taps lightly; final ㄹ closes more like l."],
  ["Final ㄱ / ㄷ / ㅂ / ㅇ", "The first three are short stops; ㅇ is nasal /ng/."],
  ["ㅎ throat sound", "ㅎ is breathy; compare it with silent initial ㅇ."],
  ["Initial ㅇ: silent placeholder", "아, 오, 이 begin with silent ㅇ so the vowel can stand."],
  ["아 / 앙", "Final ㅇ adds an /ng/ tail."],
  ["가 / 강", "강 has the same start as 가, plus final /ng/."],
  ["바 / 방", "방 has the same start as 바, plus final /ng/."]
];
