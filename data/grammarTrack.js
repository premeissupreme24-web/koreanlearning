const grammarTrack = [
  {
    id: "grammar-sov",
    title: "韩语语序：SOV",
    titleEn: "Korean word order: SOV",
    oneLine: "韩语常把动词放最后：谁 + 什么 + 做什么。",
    formula: "主语 + 宾语 + 谓语",
    examples: [
      { ko: "저는 밥을 먹어요.", literalZh: "我-话题 饭-宾格 吃。", naturalZh: "我吃饭。" },
      { ko: "학생이 책을 봐요.", literalZh: "学生-主格 书-宾格 看。", naturalZh: "学生看书。" },
      { ko: "저는 학교에 가요.", literalZh: "我-话题 学校-到 去。", naturalZh: "我去学校。" }
    ],
    commonMistake: "不要照中文或英文顺序直接把动词放中间。韩语句子的核心通常在最后。",
    masteryTag: "word-order",
    exercises: [
      { id: "g-sov-1", type: "sentence-builder", prompt: "重组：我是学生。", pieces: ["저는", "학생", "이에요"], answer: ["저는", "학생", "이에요"], explanation: "저는 是话题，학생 是名词，이에요 放最后。" },
      { id: "g-sov-2", type: "multiple-choice", prompt: "韩语最常见的基础语序是？", options: ["SOV", "SVO", "VSO"], answer: "SOV", explanation: "韩语常见顺序是主语-宾语-谓语，谓语放最后。" },
      { id: "g-sov-3", type: "fill-blank", prompt: "저는 학교에 ___.", options: ["가요", "학교", "저는"], answer: "가요", explanation: "动词 가요 放句尾。" },
      { id: "g-sov-4", type: "grammar-choice", prompt: "“我吃饭”最自然的顺序是？", options: ["저는 밥을 먹어요", "먹어요 저는 밥을", "밥을 저는 먹어요"], answer: "저는 밥을 먹어요", explanation: "话题 + 宾语 + 动词。" },
      { id: "g-sov-5", type: "multiple-choice", prompt: "韩语句尾最常出现的是？", options: ["谓语/结尾", "国籍", "图片"], answer: "谓语/结尾", explanation: "谓语和礼貌结尾通常收束整句。" }
    ]
  },
  {
    id: "grammar-noun",
    title: "名词",
    titleEn: "Nouns",
    oneLine: "名词是人、物、地点、身份；后面常接助词或 이에요/예요。",
    formula: "名词 + 助词 / 이에요 / 예요",
    examples: [
      { ko: "학생이에요.", literalZh: "学生-是。", naturalZh: "是学生。" },
      { ko: "책이에요.", literalZh: "书-是。", naturalZh: "是书。" },
      { ko: "학교에 가요.", literalZh: "学校-到 去。", naturalZh: "去学校。" }
    ],
    commonMistake: "不要把所有韩语词都当动词看。학생、책、학교 都是名词。",
    masteryTag: "vocabulary",
    exercises: []
  },
  {
    id: "grammar-predicate-ending",
    title: "谓词与结尾",
    titleEn: "Predicates and endings",
    oneLine: "韩语句子的语气、礼貌程度，很多时候靠最后的结尾表达。",
    formula: "词干 + 结尾",
    examples: [
      { ko: "가요.", literalZh: "去-礼貌。", naturalZh: "去。" },
      { ko: "먹어요.", literalZh: "吃-礼貌。", naturalZh: "吃。" },
      { ko: "좋아요.", literalZh: "好-礼貌。", naturalZh: "好 / 喜欢。" }
    ],
    commonMistake: "不要省略句尾 요。初学面对陌生人先用礼貌形。",
    masteryTag: "copula",
    exercises: []
  },
  {
    id: "grammar-polite",
    title: "尊敬体 / 礼貌体",
    titleEn: "Polite style",
    oneLine: "先把 요 体当作安全默认值：礼貌、自然、适合初学者。",
    formula: "常用表达 + 요 / 합니다",
    examples: [
      { ko: "안녕하세요?", literalZh: "安宁-做-尊敬-요？", naturalZh: "你好。" },
      { ko: "감사합니다.", literalZh: "感谢-합니다。", naturalZh: "谢谢。" },
      { ko: "반가워요.", literalZh: "高兴-요。", naturalZh: "很高兴见到你。" }
    ],
    commonMistake: "不要刚开始就用太随便的 반말。先用礼貌版更稳。",
    masteryTag: "speaking",
    exercises: []
  },
  {
    id: "grammar-i-ga",
    title: "主格助词 이/가",
    titleEn: "Subject particle 이/가",
    oneLine: "이/가 标记句子的主语，常用于说明谁/什么在做或处于某状态。",
    formula: "有收音 + 이 / 无收音 + 가",
    examples: [
      { ko: "학생이 있어요.", literalZh: "学生-主格 有。", naturalZh: "有学生。" },
      { ko: "친구가 와요.", literalZh: "朋友-主格 来。", naturalZh: "朋友来了。" },
      { ko: "책이 있어요.", literalZh: "书-主格 有。", naturalZh: "有书。" }
    ],
    commonMistake: "不要把 이/가 翻译成“是”。它主要标记主语。",
    masteryTag: "subject-particle",
    exercises: []
  },
  {
    id: "grammar-eun-neun",
    title: "主题助词 은/는",
    titleEn: "Topic particle 은/는",
    oneLine: "은/는 把话题拿出来，相当于“至于……”。",
    formula: "有收音 + 은 / 无收音 + 는",
    examples: [
      { ko: "저는 학생이에요.", literalZh: "至于我，学生-是。", naturalZh: "我是学生。" },
      { ko: "이것은 책이에요.", literalZh: "至于这个，书-是。", naturalZh: "这是书。" },
      { ko: "한국은 좋아요.", literalZh: "至于韩国，好。", naturalZh: "韩国很好。" }
    ],
    commonMistake: "은/는 不是“是”。真正表示“是”的常常是 이에요/예요 或 이다。",
    masteryTag: "topic-particle",
    exercises: []
  },
  {
    id: "grammar-pronoun",
    title: "代词",
    titleEn: "Pronouns",
    oneLine: "저、나、이것、그것、저것 是入门最常见代词。",
    formula: "代词 + 助词 / 이에요",
    examples: [
      { ko: "저는 학생이에요.", literalZh: "我-话题 学生-是。", naturalZh: "我是学生。" },
      { ko: "이것은 책이에요.", literalZh: "这个-话题 书-是。", naturalZh: "这是书。" },
      { ko: "그건 뭐예요?", literalZh: "那个-话题 什么-是？", naturalZh: "那是什么？" }
    ],
    commonMistake: "陌生或正式场合先用 저，不要一开始就用 나。",
    masteryTag: "vocabulary",
    exercises: []
  },
  {
    id: "grammar-number",
    title: "数字",
    titleEn: "Numbers",
    oneLine: "韩语有汉字数和固有数；先分别记 1-10，再学使用场景。",
    formula: "汉字数：일 이 삼 / 固有数：하나 둘 셋",
    examples: [
      { ko: "일, 이, 삼", literalZh: "一、二、三（汉字数）。", naturalZh: "一、二、三。" },
      { ko: "하나, 둘, 셋", literalZh: "一、二、三（固有数）。", naturalZh: "一个、两个、三个。" },
      { ko: "몇 시예요?", literalZh: "几 点-是？", naturalZh: "几点？" }
    ],
    commonMistake: "不要把两套数字混成一套。时间、年龄、号码会用到不同系统。",
    masteryTag: "vocabulary",
    exercises: []
  },
  { id: "grammar-counter", title: "量词", oneLine: "数东西时常需要量词，例如 개、명、잔。", formula: "数字 + 量词", examples: [], commonMistake: "不要只说数字，很多名词前要补量词。", masteryTag: "vocabulary", exercises: [] },
  { id: "grammar-ida-anida", title: "이다 / 아니다", oneLine: "이다 是“是”，아니다 是“不是”。", formula: "名词 + 이에요/예요；名词 + 이/가 아니에요", examples: [], commonMistake: "否定名词句常用 아니에요，不是简单删掉 이에요。", masteryTag: "copula", exercises: [] },
  { id: "grammar-itda-eopda", title: "있다 / 없다", oneLine: "있어요 表示有/在，없어요 表示没有/不在。", formula: "名词 + 이/가 있어요/없어요", examples: [], commonMistake: "있어요 既可表示“有”，也可表示“在”。", masteryTag: "vocabulary", exercises: [] },
  { id: "grammar-object", title: "宾格助词 을/를", oneLine: "을/를 标记动作影响的对象。", formula: "有收音 + 을 / 无收音 + 를", examples: [], commonMistake: "口语可省略，但练习时先会识别。", masteryTag: "topic-particle", exercises: [] },
  { id: "grammar-ro", title: "方向/手段 으로/로", oneLine: "表示方向、工具、方式。", formula: "名词 + 으로/로", examples: [], commonMistake: "有收音通常用 으로，但 ㄹ 收音后用 로。", masteryTag: "grammar", exercises: [] },
  { id: "grammar-ui", title: "의", oneLine: "의 可表示所属，也有特殊读音变化。", formula: "名词 + 의 + 名词", examples: [], commonMistake: "저의 的 의 常读作 에；不要每次都死读 의。", masteryTag: "vowel-confusion", exercises: [] },
  { id: "grammar-e", title: "에", oneLine: "表示到达点、存在位置、时间点。", formula: "地点/时间 + 에", examples: [], commonMistake: "에 和 에서 不同；에 更偏位置/方向点。", masteryTag: "grammar", exercises: [] },
  { id: "grammar-and", title: "와/과/하고/이랑", oneLine: "都可表示“和”，正式度和口语感不同。", formula: "名词 + 와/과/하고/이랑", examples: [], commonMistake: "有收音用 과，无收音用 와。하고 更好上手。", masteryTag: "grammar", exercises: [] },
  { id: "grammar-eseo", title: "에서", oneLine: "表示动作发生的地点。", formula: "地点 + 에서 + 动作", examples: [], commonMistake: "在某处“做动作”多用 에서，不是 에。", masteryTag: "grammar", exercises: [] },
  { id: "grammar-ege", title: "에게/한테/께", oneLine: "表示动作对象：给谁、对谁。", formula: "人 + 에게/한테/께", examples: [], commonMistake: "께 更尊敬，한테 更口语。", masteryTag: "grammar", exercises: [] },
  { id: "grammar-do-man", title: "도/만", oneLine: "도 是“也”，만 是“只”。", formula: "名词 + 도/만", examples: [], commonMistake: "도 和 만 位置像助词，会替换一些格助词。", masteryTag: "grammar", exercises: [] },
  { id: "grammar-buteo-kkaji", title: "부터/까지", oneLine: "부터 是从，까지 是到。", formula: "起点 + 부터 / 终点 + 까지", examples: [], commonMistake: "时间和地点都可能用，但语境要清楚。", masteryTag: "grammar", exercises: [] },
  { id: "grammar-past", title: "过去式 았/었어요", oneLine: "用 았/었어요 表示已经发生。", formula: "词干 + 았/었어요", examples: [], commonMistake: "看词干元音决定 았 还是 었。", masteryTag: "grammar", exercises: [] },
  { id: "grammar-negative", title: "否定 안 / 지 않다", oneLine: "안 放谓词前；지 않다 是较完整的否定结构。", formula: "안 + 谓词 / 词干 + 지 않아요", examples: [], commonMistake: "名词句否定要用 아니에요，不是 안 이에요。", masteryTag: "grammar", exercises: [] },
  { id: "grammar-irregular", title: "不规则动词", oneLine: "部分词干遇到结尾会变形。", formula: "词干变化 + 结尾", examples: [], commonMistake: "先认识常见变化，不要一开始硬背全部。", masteryTag: "grammar", exercises: [] },
  { id: "grammar-want", title: "-고 싶다", oneLine: "表示想做某事。", formula: "动词词干 + 고 싶어요", examples: [], commonMistake: "前面接动词词干，不接完整 요 体。", masteryTag: "grammar", exercises: [] },
  { id: "grammar-progressive", title: "-고 있다", oneLine: "表示正在进行。", formula: "动词词干 + 고 있어요", examples: [], commonMistake: "不要和想做 -고 싶다 混淆。", masteryTag: "grammar", exercises: [] }
];

grammarTrack.slice(1, 8).forEach((point, index) => {
  if (point.exercises.length) return;
  point.exercises = [
    {
      id: `${point.id}-mc-1`,
      type: "multiple-choice",
      prompt: `${point.title} 的核心作用是什么？`,
      options: [point.oneLine, "表示价格一定很贵", "只用于写名字"],
      answer: point.oneLine,
      explanation: point.commonMistake
    },
    {
      id: `${point.id}-mc-2`,
      type: "grammar-choice",
      prompt: `选择更合适的结构：${point.formula}`,
      options: [point.formula, "动词 + 图片 + 数字", "只写罗马音"],
      answer: point.formula,
      explanation: `这一点先记公式：${point.formula}`
    },
    {
      id: `${point.id}-mc-3`,
      type: "multiple-choice",
      prompt: `哪一句可以作为 ${point.title} 的例句？`,
      options: [point.examples[0]?.ko || "저는 학생이에요.", "banana", "A B C"],
      answer: point.examples[0]?.ko || "저는 학생이에요.",
      explanation: "优先看韩文句尾和助词，不要只看中文意思。"
    },
    {
      id: `${point.id}-mc-4`,
      type: "multiple-choice",
      prompt: "常见错误提醒是？",
      options: [point.commonMistake, "韩语不需要语序", "所有 의 都读 에"],
      answer: point.commonMistake,
      explanation: point.commonMistake
    },
    {
      id: `${point.id}-mc-5`,
      type: "fill-blank",
      prompt: "完成后把这个语法点标记为已练习。",
      options: ["已练习", "跳过", "删除"],
      answer: "已练习",
      explanation: "每个语法点都要进入 学 → 练 → 复习 的循环。"
    }
  ];
});
