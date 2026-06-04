const errorTagCatalog = [
  "hangul-vowel",
  "hangul-consonant",
  "tense-consonant",
  "aspirated-consonant",
  "final-consonant",
  "vowel-confusion",
  "eui-pronunciation",
  "batchim",
  "topic-particle",
  "subject-particle",
  "copula",
  "word-order",
  "vocabulary",
  "listening",
  "spelling",
  "speaking"
];

const courseLevels = [
  {
    id: "level-0",
    title: "Level 0：Hangul 入门",
    subtitle: "한글 배우기",
    description: "先用通关式训练掌握字母、发音、拼读、手写与收音基础。",
    estimatedMinutes: 54,
    themeColor: "#FF8A3D",
    units: [
      unit("unit-0-1", "基本元音 ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ", "Hangul", ["认得 6 个基本元音", "分清 ㅓ/ㅗ 与 ㅡ/ㅜ", "能用手写板描红"], ["ㅏ", "ㅓ", "ㅗ", "ㅜ", "ㅡ", "ㅣ"], [], ["hangul-vowel"], ["ex-h-vowel-1", "ex-h-vowel-2", "ex-h-vowel-3", "ex-h-vowel-4", "ex-h-vowel-5", "ex-h-vowel-6", "ex-h-vowel-7"]),
      unit("unit-0-2", "基本辅音 ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅇ ㅈ ㅎ", "Hangul", ["认得基础辅音", "知道 ㅇ 初声不发音", "开始拼 가/나/다"], ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅎ"], [], ["hangul-consonant"], ["ex-h-cons-1", "ex-h-cons-2", "ex-h-cons-3", "ex-h-cons-4"]),
      unit("unit-0-3", "送气音 ㅋ ㅌ ㅍ ㅊ", "Hangul", ["比较普通音/送气音", "听出多一口气"], ["ㅋ", "ㅌ", "ㅍ", "ㅊ"], [], ["aspirated-consonant"], ["ex-h-asp-1", "ex-h-asp-2", "ex-h-asp-3"]),
      unit("unit-0-4", "紧音 ㄲ ㄸ ㅃ ㅆ ㅉ", "Hangul", ["听出短促紧音", "避免把紧音念成大声"], ["ㄲ", "ㄸ", "ㅃ", "ㅆ", "ㅉ"], [], ["tense-consonant"], ["ex-h-tense-1", "ex-h-tense-2", "ex-h-tense-3"]),
      unit("unit-0-5", "复合元音 ㅐ ㅔ ㅚ ㅟ ㅢ", "Hangul", ["分辨 ㅐ/ㅔ", "比较 ㅚ/ㅙ/ㅞ", "认识 ㅢ 位置读音"], ["ㅐ", "ㅔ", "ㅚ", "ㅟ", "ㅢ"], [], ["vowel-confusion"], ["ex-h-complex-1", "ex-h-complex-2", "ex-h-complex-3", "ex-h-eui-1", "ex-h-eui-2", "ex-h-eui-3"]),
      unit("unit-0-6", "Y 行元音 ㅑ ㅕ ㅛ ㅠ ㅒ ㅖ", "Hangul", ["理解多一画常加 y 滑音", "能听出 야/여/요/유", "分清 얘/예"], ["ㅑ", "ㅕ", "ㅛ", "ㅠ", "ㅒ", "ㅖ"], [], ["hangul-vowel"], ["ex-h-y-1", "ex-h-y-2", "ex-h-y-3", "ex-h-y-4"]),
      unit("unit-0-7", "W 行元音 ㅘ ㅝ ㅙ ㅞ", "Hangul", ["分辨 와/워", "比较 왜/웨/외", "用字形记住组合"], ["ㅘ", "ㅝ", "ㅙ", "ㅞ"], [], ["vowel-confusion"], ["ex-h-w-1", "ex-h-w-2", "ex-h-w-3", "ex-h-w-4"]),
      unit("unit-0-8", "收音入门 ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ", "Hangul", ["理解终声", "听 아/앙、가/강、바/방", "分清 ㄱ/ㄷ/ㅂ/ㅇ 尾音"], ["강", "방", "공", "각", "갇", "갑"], [], ["batchim", "final-consonant"], ["ex-h-batchim-1", "ex-h-batchim-2", "ex-h-batchim-3", "ex-h-batchim-4", "ex-h-batchim-5", "ex-h-r-l-1"]),
      unit("unit-0-9", "综合 Hangul 小测", "Hangul", ["混合听辨", "拼读", "手写复盘", "复查中文学习者易混音"], [], [], ["listening", "spelling"], ["ex-h-review-1", "ex-h-review-2", "ex-h-review-3", "ex-h-review-4", "ex-h-review-5"])
    ]
  },
  {
    id: "level-1",
    title: "Level 1：问候与自我介绍",
    subtitle: "인사와 자기소개",
    description: "从 안녕하세요 到说出第一段完整自我介绍。",
    estimatedMinutes: 60,
    themeColor: "#8BBF61",
    units: [
      unit("unit-1-1", "안녕하세요", "问候", ["会打招呼", "会回答见面问候"], ["안녕하세요", "만나서 반가워요"], ["grammar-polite"], ["speaking", "vocabulary"], ["ex-greet-1", "ex-greet-2", "ex-greet-shadow"]),
      unit("unit-1-2", "저는 ___예요/이에요", "自我介绍", ["会说我是某人/某身份", "分辨 이에요/예요"], ["저", "학생"], ["grammar-eun-neun", "grammar-ida-anida"], ["copula", "topic-particle"], ["ex-intro-1", "ex-intro-2", "ex-intro-builder"]),
      unit("unit-1-3", "이름이 뭐예요?", "名字", ["会问名字", "会回答名字"], ["이름", "뭐"], ["grammar-i-ga"], ["subject-particle"], ["ex-name-1"]),
      unit("unit-1-4", "저는 중국 사람이에요", "国籍", ["会说国籍", "会问哪国人"], ["한국", "중국", "일본", "미국"], ["grammar-eun-neun"], ["vocabulary"], ["ex-country-1"]),
      unit("unit-1-5", "저는 학생이에요", "身份", ["会说职业/身份"], ["학생", "선생님", "회사원", "의사"], ["grammar-ida-anida"], ["copula"], ["ex-job-1"]),
      unit("unit-1-6", "完整自我介绍", "综合", ["串起问候、名字、国籍、身份"], ["안녕하세요", "저는", "학생이에요"], ["grammar-sov", "grammar-eun-neun"], ["speaking", "word-order"], ["ex-self-intro"])
    ]
  },
  {
    id: "level-2",
    title: "Level 2：这是/那是什么",
    subtitle: "이거 / 그거 / 저거",
    description: "把名词句和生活物品连起来。",
    estimatedMinutes: 38,
    themeColor: "#60A5FA",
    units: [
      unit("unit-2-1", "이거 / 그거 / 저거", "指示词", ["区分这个/那个/那个远处"], ["이거", "그거", "저거"], ["grammar-pronoun"], ["vocabulary"], []),
      unit("unit-2-2", "뭐예요?", "提问", ["会问这是什么"], ["뭐예요"], ["grammar-ida-anida"], ["copula"], []),
      unit("unit-2-3", "명사 + 이에요/예요", "名词句", ["会说这是某物"], ["책", "가방"], ["grammar-ida-anida"], ["copula"], []),
      unit("unit-2-4", "이건 ___예요", "缩略", ["认识 이건"], ["이건", "책"], ["grammar-eun-neun"], ["topic-particle"], [])
    ]
  },
  {
    id: "level-3",
    title: "Level 3：有/没有",
    subtitle: "있어요 / 없어요",
    description: "表达存在、拥有与位置。",
    estimatedMinutes: 32,
    themeColor: "#F59E0B",
    units: [
      unit("unit-3-1", "있어요 / 없어요", "存在", ["会说有/没有"], ["있어요", "없어요"], ["grammar-itda-eopda"], ["vocabulary"], []),
      unit("unit-3-2", "장소 + 에 있어요", "位置", ["会说在哪里"], ["집", "학교"], ["grammar-e"], ["grammar"], []),
      unit("unit-3-3", "물건 + 이/가 있어요", "物品", ["会说某物存在"], ["책", "가방"], ["grammar-i-ga"], ["subject-particle"], [])
    ]
  },
  {
    id: "level-4",
    title: "Level 4：数字、时间、地点",
    subtitle: "숫자와 장소",
    description: "数字系统、时间问答和地点词。",
    estimatedMinutes: 48,
    themeColor: "#A78BFA",
    units: [
      unit("unit-4-1", "韩语数字一：일 이 삼", "汉字数", ["认识汉字数"], ["일", "이", "삼", "백", "천", "만"], ["grammar-number"], ["vocabulary"], []),
      unit("unit-4-2", "固有数词：하나 둘 셋", "固有数", ["认识固有数"], ["하나", "둘", "셋"], ["grammar-number"], ["vocabulary"], []),
      unit("unit-4-3", "몇 시예요?", "时间", ["会问几点"], ["몇", "시"], ["grammar-number"], ["grammar"], []),
      unit("unit-4-4", "어디예요?", "地点", ["会问哪里"], ["어디", "집"], ["grammar-pronoun"], ["vocabulary"], []),
      unit("unit-4-5", "학교 / 집 / 회사 / 카페", "地点词", ["认识常用地点"], ["학교", "집", "회사", "카페"], ["grammar-e"], ["vocabulary"], [])
    ]
  },
  {
    id: "level-5",
    title: "Level 5：点餐、购物、日常",
    subtitle: "일상 대화",
    description: "把词汇和句型变成生活对话。",
    estimatedMinutes: 58,
    themeColor: "#EF4444",
    units: [
      unit("unit-5-1", "주세요", "请求", ["会说请给我"], ["주세요", "물"], ["grammar-object"], ["speaking"], []),
      unit("unit-5-2", "얼마예요?", "购物", ["会问价格"], ["얼마예요"], ["grammar-number"], ["speaking"], []),
      unit("unit-5-3", "좋아해요", "喜好", ["会说喜欢"], ["좋아해요"], ["grammar-object"], ["speaking"], []),
      unit("unit-5-4", "먹어요 / 가요 / 봐요", "动作", ["认识基础动作"], ["먹어요", "가요", "봐요"], ["grammar-predicate-ending"], ["vocabulary"], []),
      unit("unit-5-5", "안 먹어요 / 안 가요", "否定", ["会用 안 否定"], ["안 먹어요", "안 가요"], ["grammar-negative"], ["grammar"], []),
      unit("unit-5-6", "종합 대화", "综合", ["完成基础生活对话"], ["주세요", "얼마예요"], ["grammar-sov"], ["speaking"], [])
    ]
  }
];

function unit(id, title, theme, goals, vocabulary, grammarPoints, pronunciationPoints, exercises) {
  return {
    id,
    title,
    theme,
    goals,
    vocabulary,
    grammarPoints,
    pronunciationPoints,
    exercises,
    checkpoint: `${title} 小结`
  };
}

const baseExerciseItems = [
  { id: "ex-h-vowel-1", unitId: "unit-0-1", type: "listen-choice", prompt: "听音，选择对应元音。", korean: "아", chinese: "ㅏ 的音", options: ["ㅏ", "ㅓ", "ㅗ", "ㅜ"], answer: "ㅏ", explanation: "아 由 ㅇ + ㅏ 组成；初声 ㅇ 不发音。", errorTags: ["hangul-vowel", "listening"], difficulty: 1 },
  { id: "ex-h-vowel-2", unitId: "unit-0-1", type: "multiple-choice", prompt: "ㅓ 的罗马音辅助是？", korean: "ㅓ", chinese: "嘴形比 a 收一点", options: ["a", "eo", "o", "u"], answer: "eo", explanation: "ㅓ 常写作 eo，嘴形比 ㅏ 更收。", errorTags: ["hangul-vowel"], difficulty: 1 },
  { id: "ex-h-vowel-3", unitId: "unit-0-1", type: "handwriting", prompt: "写 ㅗ / 오。", korean: "오", chinese: "圆嘴 o", options: [], answer: "오", explanation: "ㅗ 往上，配占位 ㅇ 组成 오。", errorTags: ["hangul-vowel", "spelling"], difficulty: 1 },
  { id: "ex-h-vowel-4", unitId: "unit-0-1", type: "syllable-builder", prompt: "拼出 아。", korean: "아", chinese: "ㅇ + ㅏ", options: ["ㅇ", "ㅏ", "ㄱ", "ㅓ"], answer: "ㅇ|ㅏ", explanation: "初声 ㅇ 是占位，不发音。", errorTags: ["hangul-vowel", "spelling"], difficulty: 1 },
  { id: "ex-h-vowel-5", unitId: "unit-0-1", type: "listen-choice", prompt: "听音，区分 ㅓ / ㅗ。", korean: "어", chinese: "ㅓ 不圆嘴", options: ["어", "오"], answer: "어", explanation: "ㅓ 嘴唇不需要圆起来；ㅗ 有明显圆嘴感。", errorTags: ["hangul-vowel", "vowel-confusion", "listening"], difficulty: 2 },
  { id: "ex-h-vowel-6", unitId: "unit-0-1", type: "listen-choice", prompt: "听音，区分 ㅡ / ㅜ。", korean: "으", chinese: "扁嘴 eu", options: ["으", "우"], answer: "으", explanation: "ㅡ 是扁嘴，ㅜ 是圆嘴；先用嘴形帮耳朵分开。", errorTags: ["hangul-vowel", "vowel-confusion", "listening"], difficulty: 2 },
  { id: "ex-h-vowel-7", unitId: "unit-0-1", type: "multiple-choice", prompt: "哪个元音最容易被误念成「乌」但其实要扁嘴？", korean: "ㅡ", chinese: "eu", options: ["ㅡ", "ㅜ", "ㅗ"], answer: "ㅡ", explanation: "ㅡ 不要圆嘴；嘴巴拉平，声音才不会跑到 ㅜ。", errorTags: ["hangul-vowel", "vowel-confusion"], difficulty: 2 },
  { id: "ex-h-cons-1", unitId: "unit-0-2", type: "multiple-choice", prompt: "ㄱ + ㅏ 组成什么？", korean: "가", chinese: "ga/ka", options: ["가", "나", "다", "아"], answer: "가", explanation: "ㄱ 在初声接 ㅏ，组成 가。", errorTags: ["hangul-consonant", "spelling"], difficulty: 1 },
  { id: "ex-h-cons-2", unitId: "unit-0-2", type: "listen-choice", prompt: "听音选择：나 / 다 / 마。", korean: "나", chinese: "我", options: ["나", "다", "마", "바"], answer: "나", explanation: "ㄴ 的舌尖顶上齿后方，声音是 n。", errorTags: ["hangul-consonant", "listening"], difficulty: 1 },
  { id: "ex-h-cons-3", unitId: "unit-0-2", type: "multiple-choice", prompt: "初声 ㅇ 的规则是？", korean: "ㅇ", chinese: "占位", options: ["不发音", "一定读 ng", "一定读 h"], answer: "不发音", explanation: "ㅇ 在初声是占位，不发音；在收音读 /ŋ/。", errorTags: ["hangul-consonant"], difficulty: 1 },
  { id: "ex-h-cons-4", unitId: "unit-0-2", type: "listen-choice", prompt: "听音，区分 아 / 앙。", korean: "앙", chinese: "带 ng 尾音", options: ["아", "앙", "오", "옹"], answer: "앙", explanation: "终声 ㅇ 读 /ŋ/，所以 앙 结尾有鼻音。", errorTags: ["batchim", "final-consonant", "listening"], difficulty: 2 },
  { id: "ex-h-asp-1", unitId: "unit-0-3", type: "listen-choice", prompt: "听音，选送气音。", korean: "카", chinese: "ㅋ + ㅏ", options: ["가", "카", "까"], answer: "카", explanation: "ㅋ 是 ㄱ 的送气音，多一口气。", errorTags: ["aspirated-consonant", "listening"], difficulty: 2 },
  { id: "ex-h-asp-2", unitId: "unit-0-3", type: "multiple-choice", prompt: "ㅂ 的送气音是？", korean: "ㅍ", chinese: "p", options: ["ㅃ", "ㅍ", "ㅁ"], answer: "ㅍ", explanation: "ㅂ / ㅍ / ㅃ 是普通、送气、紧音对比。", errorTags: ["aspirated-consonant"], difficulty: 2 },
  { id: "ex-h-asp-3", unitId: "unit-0-3", type: "listen-choice", prompt: "听音，区分 자 / 차 / 짜。", korean: "차", chinese: "送气 ch", options: ["자", "차", "짜"], answer: "차", explanation: "ㅊ 比 ㅈ 多明显气流。", errorTags: ["aspirated-consonant", "listening"], difficulty: 2 },
  { id: "ex-h-tense-1", unitId: "unit-0-4", type: "listen-choice", prompt: "听音，选紧音。", korean: "까", chinese: "ㄲ + ㅏ", options: ["가", "카", "까"], answer: "까", explanation: "ㄲ 是短促紧音，不是更大声的 ㄱ。", errorTags: ["tense-consonant", "listening"], difficulty: 2 },
  { id: "ex-h-tense-2", unitId: "unit-0-4", type: "multiple-choice", prompt: "ㅅ 的紧音对比是？", korean: "ㅆ", chinese: "ss", options: ["ㅎ", "ㅆ", "ㅊ"], answer: "ㅆ", explanation: "ㅅ/ㅆ 单独作为摩擦音松紧对比；不要把 ㅅ→ㅎ 当送气关系。", errorTags: ["tense-consonant"], difficulty: 2 },
  { id: "ex-h-tense-3", unitId: "unit-0-4", type: "listen-choice", prompt: "听音，区分 바 / 파 / 빠。", korean: "빠", chinese: "紧 pp", options: ["바", "파", "빠"], answer: "빠", explanation: "ㅃ 是双唇更紧的短促音。", errorTags: ["tense-consonant", "listening"], difficulty: 2 },
  { id: "ex-h-complex-1", unitId: "unit-0-5", type: "listen-choice", prompt: "听音，选 ㅐ/ㅔ。", korean: "애", chinese: "ㅐ", options: ["애", "에"], answer: "애", explanation: "现代口语接近，但字形不同，先一起训练听辨和拼写。", errorTags: ["vowel-confusion", "listening"], difficulty: 2 },
  { id: "ex-h-complex-2", unitId: "unit-0-5", type: "listen-choice", prompt: "听音，区分 왜 / 웨 / 외。", korean: "왜", chinese: "why", options: ["왜", "웨", "외"], answer: "왜", explanation: "三者现代音常接近，所以要连字形一起练。", errorTags: ["vowel-confusion", "listening"], difficulty: 3 },
  { id: "ex-h-complex-3", unitId: "unit-0-5", type: "listen-choice", prompt: "听音，区分 위 / 의。", korean: "위", chinese: "wi", options: ["위", "의"], answer: "위", explanation: "위 是 wi；의 是 ㅡ + ㅣ，之后还会因位置有读音变化。", errorTags: ["vowel-confusion", "listening"], difficulty: 3 },
  { id: "ex-h-eui-1", unitId: "unit-0-5", type: "grammar-choice", prompt: "저의 中 의 作为“的”常读作？", korean: "저의", chinese: "我的", options: ["의", "이", "에"], answer: "에", explanation: "表示所属的 의 在口语中常读作 에。", errorTags: ["vowel-confusion"], difficulty: 3 },
  { id: "ex-h-eui-2", unitId: "unit-0-5", type: "grammar-choice", prompt: "의사 开头的 의 通常读作？", korean: "의사", chinese: "医生", options: ["의", "이", "에"], answer: "의", explanation: "词首 의 先保留 의/ui 的读法。", errorTags: ["vowel-confusion", "eui-pronunciation"], difficulty: 3 },
  { id: "ex-h-eui-3", unitId: "unit-0-5", type: "grammar-choice", prompt: "회의 中后面的 의 常接近？", korean: "회의", chinese: "会议", options: ["의", "이", "에"], answer: "이", explanation: "不在词首时，의 在口语里常弱化，可能接近 이。", errorTags: ["vowel-confusion", "eui-pronunciation"], difficulty: 3 },
  { id: "ex-h-y-1", unitId: "unit-0-6", type: "multiple-choice", prompt: "ㅑ 的发音辅助是？", korean: "ㅑ", chinese: "ya", options: ["a", "ya", "yo"], answer: "ya", explanation: "基本元音多一画，通常加 y 滑音。", errorTags: ["hangul-vowel"], difficulty: 1 },
  { id: "ex-h-y-2", unitId: "unit-0-6", type: "listen-choice", prompt: "听音，选 요。", korean: "요", chinese: "礼貌句尾常见", options: ["야", "여", "요", "유"], answer: "요", explanation: "ㅛ 是 yo，很多礼貌句尾会听到 요。", errorTags: ["hangul-vowel", "listening"], difficulty: 1 },
  { id: "ex-h-y-3", unitId: "unit-0-6", type: "handwriting", prompt: "写 예。", korean: "예", chinese: "是、礼貌回答", options: [], answer: "예", explanation: "ㅖ 是 ㅔ 加 y 滑音。", errorTags: ["hangul-vowel", "spelling"], difficulty: 2 },
  { id: "ex-h-y-4", unitId: "unit-0-6", type: "listen-choice", prompt: "听音，区分 얘 / 예。", korean: "예", chinese: "ye", options: ["얘", "예"], answer: "예", explanation: "ㅒ/ㅖ 现代口语也很接近，先把声音和字形一起记。", errorTags: ["hangul-vowel", "vowel-confusion", "listening"], difficulty: 2 },
  { id: "ex-h-w-1", unitId: "unit-0-7", type: "listen-choice", prompt: "听音，区分 와 / 워。", korean: "와", chinese: "wa", options: ["와", "워"], answer: "와", explanation: "와 从圆嘴打开到 ㅏ；워 打开到 ㅓ。", errorTags: ["vowel-confusion", "listening"], difficulty: 2 },
  { id: "ex-h-w-2", unitId: "unit-0-7", type: "multiple-choice", prompt: "ㅜ + ㅔ 组成？", korean: "ㅞ", chinese: "we", options: ["ㅙ", "ㅞ", "ㅘ"], answer: "ㅞ", explanation: "ㅞ 是 ㅜ + ㅔ。", errorTags: ["vowel-confusion", "spelling"], difficulty: 2 },
  { id: "ex-h-w-3", unitId: "unit-0-7", type: "listen-choice", prompt: "听音，选 워。", korean: "워", chinese: "wo", options: ["와", "워", "왜", "웨"], answer: "워", explanation: "워 是 ㅜ + ㅓ。", errorTags: ["vowel-confusion", "listening"], difficulty: 2 },
  { id: "ex-h-w-4", unitId: "unit-0-7", type: "multiple-choice", prompt: "ㅗ + ㅐ 组成？", korean: "ㅙ", chinese: "wae", options: ["ㅙ", "ㅞ", "ㅚ"], answer: "ㅙ", explanation: "ㅙ 是 ㅗ + ㅐ；웨 是 ㅜ + ㅔ；외 是 ㅗ + ㅣ。", errorTags: ["vowel-confusion", "spelling"], difficulty: 2 },
  { id: "ex-h-batchim-1", unitId: "unit-0-8", type: "listen-choice", prompt: "听音，区分 가 / 강。", korean: "강", chinese: "有 ㅇ 收音", options: ["가", "강"], answer: "강", explanation: "终声 ㅇ 读 /ŋ/，강 末尾有鼻音。", errorTags: ["batchim", "final-consonant", "listening"], difficulty: 2 },
  { id: "ex-h-batchim-2", unitId: "unit-0-8", type: "listen-choice", prompt: "听音，区分 바 / 방。", korean: "방", chinese: "房间", options: ["바", "방"], answer: "방", explanation: "방 的 ㅇ 在收音，读 /ŋ/。", errorTags: ["batchim", "final-consonant", "listening"], difficulty: 2 },
  { id: "ex-h-batchim-3", unitId: "unit-0-8", type: "multiple-choice", prompt: "终声 ㅇ 的读法是？", korean: "ㅇ", chinese: "ng", options: ["不发音", "/ŋ/ ng", "h"], answer: "/ŋ/ ng", explanation: "ㅇ 初声不发音，终声读 /ŋ/。", errorTags: ["batchim", "final-consonant"], difficulty: 2 },
  { id: "ex-h-batchim-4", unitId: "unit-0-8", type: "listen-choice", prompt: "听音，区分收音 ㄱ / ㄷ / ㅂ / ㅇ。", korean: "갑", chinese: "ㅂ 收音", options: ["각", "갇", "갑", "강"], answer: "갑", explanation: "ㅂ 收音是短短 p stop，不要把尾巴完整爆破出来。", errorTags: ["batchim", "final-consonant", "listening"], difficulty: 3 },
  { id: "ex-h-batchim-5", unitId: "unit-0-8", type: "multiple-choice", prompt: "哪一个有鼻音 ng 收尾？", korean: "강", chinese: "ng", options: ["각", "갇", "갑", "강"], answer: "강", explanation: "终声 ㅇ 是 /ŋ/，会有鼻音尾巴。", errorTags: ["batchim", "final-consonant"], difficulty: 2 },
  { id: "ex-h-r-l-1", unitId: "unit-0-8", type: "listen-choice", prompt: "听音，感受 ㄹ 在开头和收音的 r/l 差异。", korean: "라", chinese: "开头 ㄹ", options: ["라", "알", "달", "말"], answer: "라", explanation: "开头 ㄹ 常像轻轻弹一下；收音 ㄹ 更像 l 收住。", errorTags: ["hangul-consonant", "final-consonant", "listening"], difficulty: 3 },
  { id: "ex-h-review-1", unitId: "unit-0-9", type: "listen-choice", prompt: "综合听辨：가/카/까。", korean: "카", chinese: "送气", options: ["가", "카", "까"], answer: "카", explanation: "普通/送气/紧音要成组比较。", errorTags: ["aspirated-consonant", "listening"], difficulty: 3 },
  { id: "ex-h-review-2", unitId: "unit-0-9", type: "syllable-builder", prompt: "拼出 날。", korean: "날", chinese: "日子", options: ["ㄴ", "ㅏ", "ㄹ", "ㅁ"], answer: "ㄴ|ㅏ|ㄹ", explanation: "ㄴ + ㅏ + ㄹ = 날。", errorTags: ["batchim", "spelling"], difficulty: 3 },
  { id: "ex-h-review-3", unitId: "unit-0-9", type: "handwriting", prompt: "写 학생。", korean: "학생", chinese: "学生", options: [], answer: "학생", explanation: "先照字块写，不要求识别；完成会保存手写练习状态。", errorTags: ["spelling"], difficulty: 3 },
  { id: "ex-h-review-4", unitId: "unit-0-9", type: "listen-choice", prompt: "易混复查：ㅚ / ㅙ / ㅞ。", korean: "외", chinese: "oe/we", options: ["외", "왜", "웨"], answer: "외", explanation: "这组三个声音很接近，复习时要把字形也拉进来。", errorTags: ["vowel-confusion", "listening"], difficulty: 3 },
  { id: "ex-h-review-5", unitId: "unit-0-9", type: "listen-choice", prompt: "易混复查：收音 ㄱ / ㄷ / ㅂ / ㅇ。", korean: "갇", chinese: "ㄷ 收音", options: ["각", "갇", "갑", "강"], answer: "갇", explanation: "ㄷ 收音是 t stop，短短收住，不要拖出完整的 d。", errorTags: ["batchim", "final-consonant", "listening"], difficulty: 3 },
  { id: "ex-greet-1", unitId: "unit-1-1", type: "dialogue-simulation", prompt: "别人说 안녕하세요? 你可以怎么回应？", korean: "안녕하세요?", chinese: "你好", options: ["안녕하세요?", "사과예요", "백이에요"], answer: "안녕하세요?", explanation: "见面问候可以用同一句礼貌回应。", errorTags: ["speaking", "vocabulary"], difficulty: 1 },
  { id: "ex-greet-2", unitId: "unit-1-1", type: "listen-choice", prompt: "听音，选择对应意思。", korean: "감사합니다", chinese: "谢谢", options: ["谢谢", "不是", "你叫什么名字"], answer: "谢谢", explanation: "감사합니다 是比较正式安全的“谢谢”。", errorTags: ["listening", "vocabulary"], difficulty: 1 },
  { id: "ex-greet-shadow", unitId: "unit-1-1", type: "shadowing", prompt: "跟读问候。", korean: "안녕하세요? 저는 학생이에요.", chinese: "你好，我是学生。", options: [], answer: "会说", explanation: "先播放原句，再录自己；不上传录音。", errorTags: ["speaking"], difficulty: 2 },
  { id: "ex-intro-1", unitId: "unit-1-2", type: "fill-blank", prompt: "저는 학생___.", korean: "저는 학생이에요.", chinese: "我是学生。", options: ["이에요", "예요", "은"], answer: "이에요", explanation: "학생 有收音 ㅇ，所以接 이에요。", errorTags: ["copula"], difficulty: 2 },
  { id: "ex-intro-2", unitId: "unit-1-2", type: "fill-blank", prompt: "저는 마리___.", korean: "저는 마리예요.", chinese: "我是 Mari。", options: ["이에요", "예요", "이"], answer: "예요", explanation: "마리 以母音结尾，所以接 예요。", errorTags: ["copula"], difficulty: 2 },
  { id: "ex-intro-builder", unitId: "unit-1-2", type: "sentence-builder", prompt: "重组：我是学生。", korean: "저는 학생이에요.", chinese: "我是学生。", options: ["저는", "학생", "이에요"], answer: "저는|학생|이에요", explanation: "저는 + 학생 + 이에요，句尾表达“是”。", errorTags: ["word-order", "copula"], difficulty: 2 },
  { id: "ex-name-1", unitId: "unit-1-3", type: "multiple-choice", prompt: "이름이 뭐예요? 的意思是？", korean: "이름이 뭐예요?", chinese: "你叫什么名字？", options: ["你叫什么名字？", "你去哪里？", "多少钱？"], answer: "你叫什么名字？", explanation: "이름 是名字，뭐예요 是“是什么”。", errorTags: ["vocabulary"], difficulty: 1 },
  { id: "ex-country-1", unitId: "unit-1-4", type: "fill-blank", prompt: "저는 중국 사람___.", korean: "저는 중국 사람이에요.", chinese: "我是中国人。", options: ["이에요", "예요", "가"], answer: "이에요", explanation: "사람 有收音 ㅁ，所以接 이에요。", errorTags: ["copula"], difficulty: 2 },
  { id: "ex-job-1", unitId: "unit-1-5", type: "multiple-choice", prompt: "학생 的意思是？", korean: "학생", chinese: "学生", options: ["学生", "医生", "歌手"], answer: "学生", explanation: "학생 是入门最核心身份词。", errorTags: ["vocabulary"], difficulty: 1 },
  { id: "ex-self-intro", unitId: "unit-1-6", type: "dictation", prompt: "听写完整自我介绍。", korean: "안녕하세요? 저는 학생이에요.", chinese: "你好，我是学生。", options: [], answer: "안녕하세요? 저는 학생이에요.", explanation: "先听再写；不要求完全识别手写，可自行核对。", errorTags: ["listening", "spelling"], difficulty: 3 }
];

function createVocabularyExercises() {
  return vocabularyVisualItems.slice(0, 50).flatMap((item, index) => {
    const options = vocabularyVisualItems
      .filter((entry) => entry.ko !== item.ko)
      .slice(index + 1, index + 4)
      .map((entry) => entry.ko);
    const koreanOptions = [item.ko, ...options].slice(0, 4);
    const meaningOptions = [item.meaningZh, ...vocabularyVisualItems.filter((entry) => entry.ko !== item.ko).slice(index + 2, index + 5).map((entry) => entry.meaningZh)].slice(0, 4);
    return [
      {
        id: `vocab-${index + 1}-image`,
        unitId: "practice-vocabulary",
        type: "image-choice",
        prompt: `看图选择韩文：${item.meaningZh}`,
        korean: item.ko,
        chinese: item.meaningZh,
        imageEmoji: item.visual || item.color || item.visualType,
        options: koreanOptions,
        answer: item.ko,
        explanation: `${item.ko} = ${item.meaningZh}。点选后也要跟读一次。`,
        errorTags: ["vocabulary"],
        difficulty: item.ko.length > 3 ? 2 : 1
      },
      {
        id: `vocab-${index + 1}-listen`,
        unitId: "practice-vocabulary",
        type: "listen-choice",
        prompt: `听韩文，选择中文意思：${item.ko}`,
        korean: item.ko,
        chinese: item.meaningZh,
        options: meaningOptions,
        answer: item.meaningZh,
        explanation: `${item.ko} 的意思是 ${item.meaningZh}。`,
        errorTags: ["vocabulary", "listening"],
        difficulty: item.ko.length > 3 ? 2 : 1
      }
    ];
  });
}

function createGrammarExercises() {
  return grammarTrack.slice(0, 8).flatMap((point) => (
    point.exercises || []
  ).map((exercise) => ({
    unitId: point.id,
    korean: exercise.korean || point.examples[0]?.ko || "",
    chinese: exercise.chinese || point.oneLine,
    errorTags: [point.masteryTag || "grammar"],
    difficulty: 2,
    ...exercise
  })));
}

function createHangulLetterExercises() {
  return letterData.slice(0, 40).map((letter, index) => ({
    id: `letter-card-${index + 1}`,
    unitId: "practice-hangul",
    type: "multiple-choice",
    prompt: `${letter.glyph} 的发音辅助是？`,
    korean: letter.glyph,
    chinese: letter.exampleZh,
    options: [letter.roman, "ng only", "silent only", "eui"].slice(0, 3),
    answer: letter.roman,
    explanation: `${letter.glyph}：${letter.mnemonic}`,
    errorTags: [letter.type === "母音" ? "hangul-vowel" : "hangul-consonant"],
    difficulty: 1
  }));
}

const exerciseItems = [
  ...baseExerciseItems,
  ...createVocabularyExercises(),
  ...createGrammarExercises(),
  ...createHangulLetterExercises()
];

const dailyMissionSteps = [
  { id: "letters", label: "认识字母", icon: "fa-font", view: "unit1" },
  { id: "listen", label: "听音辨字", icon: "fa-headphones", view: "unit1" },
  { id: "write", label: "手写练习", icon: "fa-pen-nib", view: "copybook" },
  { id: "build", label: "拼读音节", icon: "fa-cubes", view: "review" },
  { id: "words", label: "单词应用", icon: "fa-image", view: "vocab" },
  { id: "quiz", label: "小测验", icon: "fa-circle-check", view: "lesson" }
];

function findUnitById(unitId) {
  for (const level of courseLevels) {
    const unit = level.units.find((item) => item.id === unitId);
    if (unit) return { level, unit };
  }
  return { level: courseLevels[0], unit: courseLevels[0].units[0] };
}

function exercisesForUnit(unitId) {
  const { unit } = findUnitById(unitId);
  const ids = new Set(unit.exercises || []);
  const direct = exerciseItems.filter((exercise) => ids.has(exercise.id) || exercise.unitId === unitId);
  return direct.length ? direct : exerciseItems.filter((exercise) => exercise.unitId === "practice-hangul").slice(0, 5);
}
