function grammarExample(korean, romanization, literalChinese, naturalChinese, note = "") {
  return {
    korean,
    ko: korean,
    romanization,
    literalChinese,
    literalZh: literalChinese,
    naturalChinese,
    naturalZh: naturalChinese,
    note
  };
}

function grammarDrill(id, type, prompt, options, answer, explanation, tags, korean = "", chinese = "") {
  return {
    id,
    type,
    prompt,
    options,
    answer,
    explanation,
    tags,
    errorTags: tags,
    korean,
    chinese
  };
}

function grammarPoint(config) {
  const firstMistake = config.commonMistakes?.[0];
  return {
    ...config,
    titleEn: config.shortTitle,
    oneLine: config.summary,
    formula: config.pattern,
    examples: config.examples || [],
    commonMistake: firstMistake ? `${firstMistake.mistake} → ${firstMistake.correction}。${firstMistake.explanation}` : "",
    masteryTag: config.reviewTags?.[0] || "grammar",
    exercises: config.drills || []
  };
}

const fullGrammarPoints = [
  grammarPoint({
    id: "grammar-word-order-sov",
    title: "韩语基本语序：SOV",
    shortTitle: "SOV 语序",
    level: "beginner",
    category: "sentence",
    summary: "韩语常把谓语放在句末：谁 + 什么 + 做什么。",
    pattern: "主语/话题 + 宾语/地点 + 谓语",
    usage: ["动词和形容词通常在句尾收束整句。", "宾语常在动词前面，并可带 을/를。", "地点、时间等信息一般放在谓语前。", "中文“我吃饭”到韩语会变成“我 饭 吃”。"],
    formation: ["先找动作或状态，把它放句尾。", "名词后加合适助词。", "其他信息放在谓语前，保持句尾稳定。"],
    examples: [
      grammarExample("저는 밥을 먹어요.", "jeoneun babeul meogeoyo", "至于我，饭-宾格 吃。", "我吃饭。", "먹어요 放在句末。"),
      grammarExample("학생이 책을 읽어요.", "haksaengi chaegeul ilgeoyo", "学生-主格 书-宾格 读。", "学生读书。", "읽어요 是谓语。"),
      grammarExample("저는 학교에 가요.", "jeoneun hakgyoe gayo", "至于我，学校-到 去。", "我去学校。", "학교에 放在 가요 前。"),
      grammarExample("친구가 커피를 마셔요.", "chinguga keopireul masyeoyo", "朋友-主格 咖啡-宾格 喝。", "朋友喝咖啡。", "动作对象在动词前。")
    ],
    comparison: [{ pointA: "中文/英语常见 SVO", pointB: "韩语常见 SOV", explanation: "中文说“我吃饭”，韩语更像“我饭吃”。先习惯句尾看谓语。", examples: ["저는 밥을 먹어요.", "저는 커피를 마셔요."] }],
    commonMistakes: [{ mistake: "저는 먹어요 밥을", correction: "저는 밥을 먹어요", explanation: "不要把动词提前到中间，韩语基本句要让谓语收尾。" }],
    drills: [
      grammarDrill("sov-1", "reorder", "重组：我吃饭。", ["저는", "밥을", "먹어요"], "저는|밥을|먹어요", "谓语 먹어요 放最后。", ["grammar-word-order"]),
      grammarDrill("sov-2", "multiple-choice", "韩语最常见基础语序是？", ["SOV", "SVO", "VSO", "OSV"], "SOV", "韩语常见顺序是主语/话题 + 宾语 + 谓语。", ["grammar-word-order"]),
      grammarDrill("sov-3", "fill-blank", "저는 학교에 ___.", ["가요", "학교", "저는", "책"], "가요", "去的动作 가요 放句尾。", ["grammar-word-order", "grammar-location-e"]),
      grammarDrill("sov-4", "reorder", "重组：朋友喝咖啡。", ["친구가", "커피를", "마셔요"], "친구가|커피를|마셔요", "主语 + 宾语 + 谓语。", ["grammar-word-order", "grammar-object-particle"]),
      grammarDrill("sov-5", "meaning-choice", "저는 책을 읽어요. 的自然中文是？", ["我读书。", "书读我。", "我是书。", "我去学校。"], "我读书。", "책을 是动作对象，읽어요 是读。", ["grammar-word-order", "topik-i"])
    ],
    relatedVocabulary: ["밥", "책", "학교", "커피"],
    reviewTags: ["grammar-word-order"]
  }),
  grammarPoint({
    id: "grammar-omission",
    title: "韩语句子成分可以省略",
    shortTitle: "省略",
    level: "beginner",
    category: "sentence",
    summary: "上下文清楚时，韩语常省略主语、宾语或重复信息。",
    pattern: "(主语/宾语) + 谓语",
    usage: ["对话里常不重复“我/你”。", "먹어요 可以根据语境理解成“我吃/他吃/吃”。", "回答问题时可只说重点。", "省略不代表没有语法，而是靠上下文补足。"],
    formation: ["先判断上下文已经知道什么。", "保留新信息或动作。", "保持谓语结尾礼貌清楚。"],
    examples: [
      grammarExample("먹어요.", "meogeoyo", "吃。", "吃 / 我吃 / 他吃。", "主语由上下文决定。"),
      grammarExample("가요.", "gayo", "去。", "去 / 我去。", "常见简短回答。"),
      grammarExample("학생이에요.", "haksaeng-ieyo", "学生-是。", "是学生。", "省略了“我/他”。"),
      grammarExample("있어요.", "isseoyo", "有 / 在。", "有 / 在。", "存在对象可能在前文出现。")
    ],
    comparison: [{ pointA: "完整句", pointB: "省略句", explanation: "完整句适合初学练结构；真实对话会省略已知部分。", examples: ["저는 밥을 먹어요.", "먹어요."] }],
    commonMistakes: [{ mistake: "每句都硬加 너", correction: "根据关系和上下文省略或用称呼", explanation: "韩语里直接说“你”可能不自然，常用称呼或省略。" }],
    drills: [
      grammarDrill("omission-1", "meaning-choice", "먹어요. 在上下文清楚时可以表示？", ["吃。", "名字。", "学校。", "多少钱。"], "吃。", "먹어요 是“吃”的礼貌现在时。", ["grammar-omission"]),
      grammarDrill("omission-2", "multiple-choice", "韩语为什么常省略主语？", ["上下文已经知道是谁", "韩语没有主语", "所有句子都不能有主语", "因为助词不存在"], "上下文已经知道是谁", "省略依赖上下文，不是没有主语概念。", ["grammar-omission"]),
      grammarDrill("omission-3", "meaning-choice", "학생이에요. 最自然可理解为？", ["是学生。", "学生吃饭。", "去学生。", "学生没有。"], "是学生。", "名词 + 이에요/예요 表示“是……”。", ["grammar-copula", "grammar-omission"]),
      grammarDrill("omission-4", "multiple-choice", "朋友问：학교에 가요? 你回答“去。”可以说？", ["가요.", "책이에요.", "밥을", "없어요."], "가요.", "回答可省略“我/学校”，只保留谓语。", ["grammar-omission", "grammar-location-e"]),
      grammarDrill("omission-5", "error-correction", "哪种想法更正确？", ["省略的信息由上下文补足", "省略就是随便删词", "韩语不需要礼貌结尾", "먹어요 一定只能是他吃"], "省略的信息由上下文补足", "省略要靠上下文，句尾仍然重要。", ["grammar-omission"])
    ],
    relatedVocabulary: ["먹다", "가다", "학생", "있다"],
    reviewTags: ["grammar-omission"]
  }),
  grammarPoint({
    id: "grammar-particles-function",
    title: "助词决定名词功能",
    shortTitle: "助词功能",
    level: "beginner",
    category: "particle",
    summary: "韩语不是只靠词序，名词后的小尾巴会标记话题、主语、宾语、地点。",
    pattern: "名词 + 助词",
    usage: ["은/는 常标记话题。", "이/가 常标记主语或新信息。", "을/를 标记动作对象。", "에/에서 标记地点、时间或动作发生处。"],
    formation: ["先判断名词在句子里的作用。", "再按有无收音选择助词形态。", "最后把谓语放句末。"],
    examples: [
      grammarExample("저는 학생이에요.", "jeoneun haksaeng-ieyo", "至于我，学生-是。", "我是学生。", "는 标记话题。"),
      grammarExample("책이 있어요.", "chaegi isseoyo", "书-主格 有。", "有书。", "이 标记存在的对象。"),
      grammarExample("밥을 먹어요.", "babeul meogeoyo", "饭-宾格 吃。", "吃饭。", "을 标记动作对象。"),
      grammarExample("학교에서 공부해요.", "hakgyoeseo gongbuhaeyo", "学校-动作地点 学习。", "在学校学习。", "에서 标记动作发生地。")
    ],
    comparison: [{ pointA: "词序", pointB: "助词", explanation: "词序给大方向，助词告诉名词具体功能；两者一起看。", examples: ["책이 있어요.", "책을 읽어요."] }],
    commonMistakes: [{ mistake: "把所有助词都翻译成“是”", correction: "按功能理解助词", explanation: "助词多数不是独立词义，而是语法标记。" }],
    drills: [
      grammarDrill("particles-function-1", "particle-choice", "밥___ 먹어요.", ["을", "이", "에", "는"], "을", "밥 是吃的对象，有收音用 을。", ["grammar-object-particle"]),
      grammarDrill("particles-function-2", "particle-choice", "책___ 있어요.", ["이", "를", "에서", "도"], "이", "책 是存在的对象，有收音用 이。", ["grammar-subject-particle"]),
      grammarDrill("particles-function-3", "particle-choice", "저___ 학생이에요.", ["는", "가", "를", "에"], "는", "저는 把“我”作为话题。", ["grammar-topic-particle"]),
      grammarDrill("particles-function-4", "particle-choice", "학교___ 공부해요.", ["에서", "에", "을", "는"], "에서", "在学校做 공부 这个动作，用 에서。", ["grammar-location-eseo"]),
      grammarDrill("particles-function-5", "meaning-choice", "책을 읽어요. 中 을 的作用是？", ["标记动作对象", "标记时间", "表示也", "表示从"], "标记动作对象", "읽다 的对象是 책，所以用 을。", ["grammar-object-particle"])
    ],
    relatedVocabulary: ["책", "밥", "학교", "저"],
    reviewTags: ["grammar-particle-system"]
  }),
  grammarPoint({
    id: "grammar-predicate",
    title: "谓词概念：动词和形容词都能收句",
    shortTitle: "谓词",
    level: "beginner",
    category: "sentence",
    summary: "韩语的动词和形容词都可以像谓语一样放在句尾。",
    pattern: "动词/形容词词干 + 结尾",
    usage: ["动作动词：가다, 먹다, 보다。", "状态形容词：좋다, 크다, 작다。", "谓词通过结尾表达礼貌、时态、语气。", "初学先把 요 体当作安全默认。"],
    formation: ["找到原形 -다。", "去掉 다 得到词干。", "接合适结尾：아요/어요/해요。"],
    examples: [
      grammarExample("가요.", "gayo", "去-요。", "去。", "가다 的 요 体。"),
      grammarExample("먹어요.", "meogeoyo", "吃-어요。", "吃。", "먹다 的 요 体。"),
      grammarExample("좋아요.", "joayo", "好-아요。", "好 / 喜欢。", "形容词也能收句。"),
      grammarExample("커요.", "keoyo", "大-어요。", "大。", "크다 的 요 体。")
    ],
    comparison: [{ pointA: "动词", pointB: "形容词", explanation: "韩语形容词不像中文必须加“是”，它本身可以在句末表达状态。", examples: ["밥을 먹어요.", "눈이 커요."] }],
    commonMistakes: [{ mistake: "눈이 큰이에요", correction: "눈이 커요", explanation: "形容词 크다 用谓词结尾，不要硬接 이에요。" }],
    drills: [
      grammarDrill("predicate-1", "conjugation", "가다 的礼貌现在时是？", ["가요", "가다요", "갔어요", "갈게요"], "가요", "가다 去掉 다 后接 요：가요。", ["grammar-conjugation"]),
      grammarDrill("predicate-2", "conjugation", "먹다 的礼貌现在时是？", ["먹어요", "먹아요", "먹다요", "먹이에요"], "먹어요", "먹다 → 먹어요。", ["grammar-conjugation"]),
      grammarDrill("predicate-3", "multiple-choice", "哪个是形容词谓词句？", ["눈이 커요.", "저는 책을 읽어요.", "학교에 가요.", "밥을 먹어요."], "눈이 커요.", "커요 表示“大”，是状态谓词。", ["grammar-predicate"]),
      grammarDrill("predicate-4", "error-correction", "“房间大。”最自然的是？", ["방이 커요.", "방이 큰이에요.", "방을 커요.", "방에 책이에요."], "방이 커요.", "크다 变 커요，直接放句末。", ["grammar-predicate", "grammar-conjugation"]),
      grammarDrill("predicate-5", "meaning-choice", "좋아요. 的自然中文可以是？", ["好 / 喜欢。", "是学生。", "去学校。", "没有。"], "好 / 喜欢。", "좋다 是状态形容词，语境中也可表达喜欢。", ["grammar-predicate"])
    ],
    relatedVocabulary: ["가다", "먹다", "좋다", "크다"],
    reviewTags: ["grammar-predicate"]
  }),
  grammarPoint({
    id: "grammar-imnida",
    title: "名词 + 입니다",
    shortTitle: "입니다",
    level: "beginner",
    category: "noun",
    summary: "입니다 是正式陈述“是……”，常用于自我介绍、课堂、正式场合。",
    pattern: "名词 + 입니다",
    usage: ["比 이에요/예요 更正式。", "有无收音都直接接 입니다。", "常用于介绍身份、职业、国籍。", "句尾语气稳重。"],
    formation: ["选一个名词。", "直接接 입니다。", "前面可加 저는/이것은 等话题。"],
    examples: [
      grammarExample("저는 학생입니다.", "jeoneun haksaeng-imnida", "至于我，学生-是。", "我是学生。", "正式自我介绍。"),
      grammarExample("마리는 의사입니다.", "marineun uisa-imnida", "至于玛丽，医生-是。", "玛丽是医生。", "职业介绍。"),
      grammarExample("이것은 책입니다.", "igeoseun chaegimnida", "至于这个，书-是。", "这是书。", "物品说明。"),
      grammarExample("저는 중국 사람입니다.", "jeoneun jung-guk saram-imnida", "至于我，中国人-是。", "我是中国人。", "国籍介绍。")
    ],
    comparison: [{ pointA: "입니다", pointB: "이에요/예요", explanation: "입니다 更正式；이에요/예요 更日常口语。初学两者都要认得。", examples: ["학생입니다.", "학생이에요."] }],
    commonMistakes: [{ mistake: "학생입니다요", correction: "학생입니다", explanation: "입니다 已经是完整正式结尾，不再加 요。" }],
    drills: [
      grammarDrill("imnida-1", "fill-blank", "저는 학생___.", ["입니다", "입니까", "이에요?", "을"], "입니다", "正式陈述用 입니다。", ["grammar-formal", "grammar-copula"]),
      grammarDrill("imnida-2", "multiple-choice", "의사 + 입니다 正确是？", ["의사입니다", "의사입니까", "의사이에요?", "의사을"], "의사입니다", "名词后直接接 입니다。", ["grammar-formal", "grammar-copula"]),
      grammarDrill("imnida-3", "meaning-choice", "저는 중국 사람입니다. 的意思是？", ["我是中国人。", "我去中国。", "中国有书。", "我不是中国人。"], "我是中国人。", "N입니다 表示“是……”。", ["grammar-copula"]),
      grammarDrill("imnida-4", "error-correction", "哪个句子更正确？", ["저는 학생입니다.", "저는 학생입니다요.", "저는 학생을 입니다.", "저는 학생에서 입니다."], "저는 학생입니다.", "입니다 不能再叠加 요。", ["grammar-formal"]),
      grammarDrill("imnida-5", "sentence-builder", "组成：这是书。", ["이것은", "책", "입니다"], "이것은|책|입니다", "이것은 + 책 + 입니다。", ["grammar-copula", "grammar-word-order"])
    ],
    relatedVocabulary: ["학생", "의사", "책", "중국 사람"],
    reviewTags: ["grammar-copula", "grammar-formal"]
  }),
  grammarPoint({
    id: "grammar-imnikka",
    title: "名词 + 입니까?",
    shortTitle: "입니까?",
    level: "beginner",
    category: "noun",
    summary: "입니까? 是正式疑问“是……吗？”。",
    pattern: "名词 + 입니까?",
    usage: ["正式场合提问身份、名称、物品。", "有无收音都直接接 입니까?", "语调和问号表达疑问。", "回答可用 네/아니요。"],
    formation: ["选一个名词。", "直接接 입니까?", "需要主语/话题时放前面。"],
    examples: [
      grammarExample("학생입니까?", "haksaeng-imnikka", "学生-是吗？", "是学生吗？", "正式身份疑问。"),
      grammarExample("의사입니까?", "uisa-imnikka", "医生-是吗？", "是医生吗？", "无收音也直接接。"),
      grammarExample("이것은 책입니까?", "igeoseun chaegimnikka", "这个-话题 书-是吗？", "这是书吗？", "物品确认。"),
      grammarExample("마리 씨입니까?", "mari ssi-imnikka", "玛丽-씨 是吗？", "是玛丽吗？", "确认对方身份。")
    ],
    comparison: [{ pointA: "입니다", pointB: "입니까?", explanation: "입니다 是陈述，입니까? 是疑问。一个句尾就会改变句子功能。", examples: ["학생입니다.", "학생입니까?"] }],
    commonMistakes: [{ mistake: "학생입니다?", correction: "학생입니까?", explanation: "正式疑问要用 입니까?，不是把陈述句只加问号。" }],
    drills: [
      grammarDrill("imnikka-1", "fill-blank", "학생___?", ["입니까", "입니다", "이에요", "가"], "입니까", "正式疑问用 입니까?。", ["grammar-formal", "grammar-question"]),
      grammarDrill("imnikka-2", "meaning-choice", "의사입니까? 的意思是？", ["是医生吗？", "我是医生。", "不是医生。", "医生来了。"], "是医生吗？", "입니까? 是正式疑问。", ["grammar-question"]),
      grammarDrill("imnikka-3", "error-correction", "哪个是正式疑问？", ["학생입니까?", "학생입니다.", "학생을 입니까?", "학생에 입니까?"], "학생입니까?", "N + 입니까?。", ["grammar-question", "grammar-copula"]),
      grammarDrill("imnikka-4", "sentence-builder", "组成：这是书吗？", ["이것은", "책", "입니까"], "이것은|책|입니까", "이것은 책입니까?。", ["grammar-question", "grammar-word-order"]),
      grammarDrill("imnikka-5", "multiple-choice", "입니까? 的语气更接近？", ["正式疑问", "随便命令", "过去式", "正在进行"], "正式疑问", "입니까? 用于正式提问。", ["grammar-question"])
    ],
    relatedVocabulary: ["학생", "의사", "책", "마리 씨"],
    reviewTags: ["grammar-question", "grammar-copula"]
  }),
  grammarPoint({
    id: "grammar-ieyo-yeyo",
    title: "名词 + 이에요/예요",
    shortTitle: "이에요/예요",
    level: "beginner",
    category: "noun",
    summary: "이에요/예요 是日常礼貌口语“是……”。有收音用 이에요，无收音用 예요。",
    pattern: "有收音名词 + 이에요 / 无收音名词 + 예요",
    usage: ["日常自我介绍最常用。", "有收音：학생이에요, 책이에요。", "无收音：의사예요, 마리예요。", "比 입니다 更口语，但仍然礼貌。"],
    formation: ["看名词最后一个音节有没有收音。", "有收音接 이에요。", "无收音接 예요。"],
    examples: [
      grammarExample("저는 학생이에요.", "jeoneun haksaeng-ieyo", "至于我，学生-是。", "我是学生。", "학생 有收音。"),
      grammarExample("마리는 의사예요.", "marineun uisa-yeyo", "至于玛丽，医生-是。", "玛丽是医生。", "의사 无收音。"),
      grammarExample("이건 책이에요.", "igeon chaegieyo", "这个-话题 书-是。", "这是书。", "책 有收音。"),
      grammarExample("제 이름은 마리예요.", "je ireumeun mari-yeyo", "我的 名字-话题 玛丽-是。", "我的名字是玛丽。", "마리 无收音。")
    ],
    comparison: [{ pointA: "이에요", pointB: "예요", explanation: "差别只看前面名词有没有收音，不看中文意思。", examples: ["학생이에요.", "의사예요."] }],
    commonMistakes: [{ mistake: "학생예요", correction: "학생이에요", explanation: "학생 最后有收音 ㅇ，所以要用 이에요。" }, { mistake: "의사이에요", correction: "의사예요", explanation: "의사 没有收音，所以用 예요。" }],
    drills: [
      grammarDrill("ieyo-yeyo-1", "fill-blank", "저는 학생___.", ["이에요", "예요", "입니까", "을"], "이에요", "학생 有收音，用 이에요。", ["grammar-copula"]),
      grammarDrill("ieyo-yeyo-2", "fill-blank", "마리는 의사___.", ["예요", "이에요", "을", "가"], "예요", "의사 无收音，用 예요。", ["grammar-copula"]),
      grammarDrill("ieyo-yeyo-3", "fill-blank", "이건 책___.", ["이에요", "예요", "에서", "를"], "이에요", "책 有收音 ㄱ，用 이에요。", ["grammar-copula"]),
      grammarDrill("ieyo-yeyo-4", "error-correction", "哪个句子正确？", ["제 이름은 마리예요.", "제 이름은 마리이에요.", "제 이름은 마리을.", "제 이름은 마리에 가요."], "제 이름은 마리예요.", "마리 无收音，接 예요。", ["grammar-copula"]),
      grammarDrill("ieyo-yeyo-5", "meaning-choice", "이거 뭐예요? 的自然中文是？", ["这是什么？", "你去哪儿？", "我吃饭。", "有书。"], "这是什么？", "뭐예요 是“是什么”。", ["grammar-copula", "topik-dialogue"])
    ],
    relatedVocabulary: ["학생", "의사", "책", "마리"],
    reviewTags: ["grammar-copula"]
  }),
  grammarPoint({
    id: "grammar-anieyo",
    title: "名词 + 이/가 아니에요",
    shortTitle: "아니에요",
    level: "beginner",
    category: "noun",
    summary: "名词句否定用 N이/가 아니에요，表示“不是……”。",
    pattern: "有收音名词 + 이 아니에요 / 无收音名词 + 가 아니에요",
    usage: ["否定身份、职业、物品。", "有收音名词后用 이。", "无收音名词后用 가。", "不要把 안 放在 이에요 前面。"],
    formation: ["看名词有无收音。", "有收音：N이 아니에요。", "无收音：N가 아니에요。"],
    examples: [
      grammarExample("저는 학생이 아니에요.", "jeoneun haksaengi anieyo", "至于我，学生-主格 不是。", "我不是学生。", "학생 有收音，用 이。"),
      grammarExample("마리는 의사가 아니에요.", "marineun uisaga anieyo", "至于玛丽，医生-主格 不是。", "玛丽不是医生。", "의사 无收音，用 가。"),
      grammarExample("이건 책이 아니에요.", "igeon chaegi anieyo", "这个-话题 书-主格 不是。", "这不是书。", "책 有收音。"),
      grammarExample("저는 한국 사람이 아니에요.", "jeoneun hanguk sarami anieyo", "至于我，韩国人-主格 不是。", "我不是韩国人。", "사람 有收音。")
    ],
    comparison: [{ pointA: "이에요/예요", pointB: "이/가 아니에요", explanation: "肯定名词句直接接 이에요/예요；否定要加 이/가 아니에요。", examples: ["학생이에요.", "학생이 아니에요."] }],
    commonMistakes: [{ mistake: "학생 안 이에요", correction: "학생이 아니에요", explanation: "名词句否定不用 안 + 이에요。" }],
    drills: [
      grammarDrill("anieyo-1", "fill-blank", "저는 학생___ 아니에요.", ["이", "가", "을", "는"], "이", "학생 有收音，用 이。", ["grammar-negation", "grammar-copula"]),
      grammarDrill("anieyo-2", "fill-blank", "마리는 의사___ 아니에요.", ["가", "이", "을", "에"], "가", "의사 无收音，用 가。", ["grammar-negation", "grammar-copula"]),
      grammarDrill("anieyo-3", "error-correction", "“我不是学生。”正确是？", ["저는 학생이 아니에요.", "저는 학생 안 이에요.", "저는 학생을 아니에요.", "저는 학생에 아니에요."], "저는 학생이 아니에요.", "名词句否定用 이/가 아니에요。", ["grammar-negation"]),
      grammarDrill("anieyo-4", "meaning-choice", "이건 책이 아니에요. 的意思是？", ["这不是书。", "这是书。", "我读书。", "书在这里。"], "这不是书。", "아니에요 表示“不是”。", ["grammar-negation"]),
      grammarDrill("anieyo-5", "sentence-builder", "组成：玛丽不是医生。", ["마리는", "의사가", "아니에요"], "마리는|의사가|아니에요", "의사 无收音，否定用 의사가 아니에요。", ["grammar-negation", "grammar-word-order"])
    ],
    relatedVocabulary: ["학생", "의사", "책", "한국 사람"],
    reviewTags: ["grammar-negation", "grammar-copula"]
  }),
  grammarPoint({
    id: "grammar-i-geu-jeo",
    title: "这个/那个/那个：이/그/저",
    shortTitle: "이/그/저",
    level: "beginner",
    category: "noun",
    summary: "이 指近说话人，그 指近听话人或前文提到，저 指离双方都远。",
    pattern: "이/그/저 + 名词",
    usage: ["이 책：这本书，靠近我。", "그 책：那本书，靠近你或刚提到。", "저 책：那边那本书，离我们都远。", "后面常接 은/는/이/가/이에요。"],
    formation: ["先判断距离或上下文。", "放在名词前。", "后面名词再接句子所需助词。"],
    examples: [
      grammarExample("이 책은 제 책이에요.", "i chaegeun je chaegieyo", "这 书-话题 我的 书-是。", "这本书是我的书。", "이 = 近说话人。"),
      grammarExample("그 가방은 예뻐요.", "geu gabangeun yeppeoyo", "那 包-话题 漂亮。", "那个包很漂亮。", "그 可指对方附近。"),
      grammarExample("저 사람은 선생님이에요.", "jeo sarameun seonsaengnim-ieyo", "那边 人-话题 老师-是。", "那个人是老师。", "저 = 离双方远。"),
      grammarExample("이 커피가 좋아요.", "i keopiga joayo", "这 咖啡-主格 好。", "这杯咖啡好。", "이 + 名词 + 가。")
    ],
    comparison: [{ pointA: "이", pointB: "그 / 저", explanation: "이 离我近；그 离你近或前文提到；저 离我们都远。", examples: ["이 책", "그 책", "저 책"] }],
    commonMistakes: [{ mistake: "把 그 只理解成英语 the", correction: "按距离/上下文理解 그", explanation: "그 在初级韩语里常表示“那个”或前文提到的对象。" }],
    drills: [
      grammarDrill("i-geu-jeo-1", "multiple-choice", "靠近说话人的“这本书”是？", ["이 책", "그 책", "저 책", "책이"], "이 책", "이 表示近说话人。", ["grammar-demonstrative"]),
      grammarDrill("i-geu-jeo-2", "multiple-choice", "离说话人和听话人都远的“那个人”是？", ["저 사람", "이 사람", "그 사람", "사람이"], "저 사람", "저 表示远指。", ["grammar-demonstrative"]),
      grammarDrill("i-geu-jeo-3", "fill-blank", "___ 가방은 예뻐요.（靠近听话人）", ["그", "이", "저", "제"], "그", "靠近听话人可用 그。", ["grammar-demonstrative"]),
      grammarDrill("i-geu-jeo-4", "meaning-choice", "이 커피가 좋아요. 的意思是？", ["这杯咖啡好。", "那边的老师来。", "我是咖啡。", "没有咖啡。"], "这杯咖啡好。", "이 커피 是这杯咖啡。", ["grammar-demonstrative"]),
      grammarDrill("i-geu-jeo-5", "error-correction", "“那边那个人是老师。”较合适的是？", ["저 사람은 선생님이에요.", "이 사람은 선생님이에요.", "저 사람을 선생님이에요.", "사람 저는 선생님이에요."], "저 사람은 선생님이에요.", "远指用 저。", ["grammar-demonstrative", "grammar-topic-particle"])
    ],
    relatedVocabulary: ["책", "가방", "사람", "커피"],
    reviewTags: ["grammar-demonstrative"]
  }),
  grammarPoint({
    id: "grammar-igeo-geugeo-jeogeo",
    title: "이것/그것/저것 与 이거/그거/저거",
    shortTitle: "这个/那个",
    level: "beginner",
    category: "noun",
    summary: "이것/그것/저것 是完整形式；이거/그거/저거 是更口语的缩略形式。",
    pattern: "이것/그것/저것 + 助词 / 이거/그거/저거 + 助词",
    usage: ["이것은 可缩成 이건。", "이것이 可缩成 이게。", "口语常说 이거 뭐예요?", "书面或解释中常见完整形式。"],
    formation: ["完整形式：이것, 그것, 저것。", "口语缩略：이거, 그거, 저거。", "接 은/는 时可变成 이건/그건/저건。"],
    examples: [
      grammarExample("이것은 책이에요.", "igeoseun chaegieyo", "这个-话题 书-是。", "这是书。", "完整形式。"),
      grammarExample("이건 책이에요.", "igeon chaegieyo", "这个-话题 书-是。", "这是书。", "口语缩略。"),
      grammarExample("그거 뭐예요?", "geugeo mwoyeyo", "那个 什么-是？", "那是什么？", "日常问物品。"),
      grammarExample("저것이 학교예요.", "jeogeosi hakgyo-yeyo", "那个-主格 学校-是。", "那是学校。", "远指完整形式。")
    ],
    comparison: [{ pointA: "이것은", pointB: "이건", explanation: "意思接近；이건 更口语、更短。", examples: ["이것은 책이에요.", "이건 책이에요."] }],
    commonMistakes: [{ mistake: "이거은", correction: "이건 / 이것은", explanation: "이거 + 는 在口语里常收缩成 이건；完整形式是 이것은。" }],
    drills: [
      grammarDrill("igeo-1", "meaning-choice", "이거 뭐예요? 的意思是？", ["这是什么？", "你叫什么名字？", "去哪里？", "多少钱？"], "这是什么？", "이거 是“这个”，뭐예요 是“是什么”。", ["grammar-demonstrative", "grammar-copula"]),
      grammarDrill("igeo-2", "multiple-choice", "이것은 的口语缩略常见是？", ["이건", "이게", "그건", "저건"], "이건", "이것은 → 이건。", ["grammar-demonstrative"]),
      grammarDrill("igeo-3", "multiple-choice", "이것이 的口语缩略常见是？", ["이게", "이건", "그건", "저게"], "이게", "이것이 → 이게。", ["grammar-demonstrative", "grammar-subject-particle"]),
      grammarDrill("igeo-4", "error-correction", "哪个句子正确？", ["이건 책이에요.", "이거은 책이에요.", "이건 책을이에요.", "이건 책에서예요."], "이건 책이에요.", "이거은 不自然，常用 이건。", ["grammar-demonstrative", "grammar-copula"]),
      grammarDrill("igeo-5", "sentence-builder", "组成：那是什么？", ["그거", "뭐", "예요"], "그거|뭐|예요", "그거 뭐예요?。", ["grammar-demonstrative", "grammar-word-order"])
    ],
    relatedVocabulary: ["이거", "그거", "저거", "책"],
    reviewTags: ["grammar-demonstrative"]
  }),
  grammarPoint({
    id: "grammar-pronouns",
    title: "人称代词：저/나/우리/너",
    shortTitle: "人称代词",
    level: "beginner",
    category: "noun",
    summary: "저 更礼貌，나 更随便；韩语常省略“你”或用称呼代替。",
    pattern: "代词 + 助词",
    usage: ["저：礼貌的我。", "나：熟人间随便的我。", "우리：我们，也常用于“我家/我学校”这类表达。", "너：你，但初学不要过度使用。"],
    formation: ["根据关系选择 저 或 나。", "代词后接 은/는/이/가/를 等助词。", "能省略时不要硬翻“你”。"],
    examples: [
      grammarExample("저는 학생이에요.", "jeoneun haksaeng-ieyo", "至于我，学生-是。", "我是学生。", "礼貌自称。"),
      grammarExample("나는 커피를 좋아해.", "naneun keopireul joahae", "至于我，咖啡-宾格 喜欢。", "我喜欢咖啡。", "非敬语，先认得即可。"),
      grammarExample("우리는 한국어를 공부해요.", "urineun hangugeoreul gongbuhaeyo", "我们-话题 韩语-宾格 学习。", "我们学习韩语。", "우리 + 는。"),
      grammarExample("이름이 뭐예요?", "ireumi mwoyeyo", "名字-主格 什么-是？", "你叫什么名字？", "不直接说“你”。")
    ],
    comparison: [{ pointA: "저", pointB: "나", explanation: "저 更礼貌安全；나 用在亲近或随便语境。自学先用 저는。", examples: ["저는 학생이에요.", "나는 학생이야."] }],
    commonMistakes: [{ mistake: "너는 이름이 뭐예요?", correction: "이름이 뭐예요?", explanation: "礼貌场合直接用 너 可能突兀，问名字时可省略“你”。" }],
    drills: [
      grammarDrill("pronouns-1", "multiple-choice", "初学面对陌生人，自称更安全的是？", ["저", "나", "너", "그거"], "저", "저 是礼貌自称。", ["grammar-pronoun"]),
      grammarDrill("pronouns-2", "meaning-choice", "저는 학생이에요. 的意思是？", ["我是学生。", "你是学生。", "我们去学校。", "这是学生。"], "我是学生。", "저는 是“至于我”。", ["grammar-pronoun", "grammar-topic-particle"]),
      grammarDrill("pronouns-3", "multiple-choice", "“你叫什么名字？”礼貌自然可说？", ["이름이 뭐예요?", "너는 뭐 이름?", "나 이름이에요?", "저 이름을 먹어요."], "이름이 뭐예요?", "韩语可省略“你”。", ["grammar-pronoun", "grammar-omission"]),
      grammarDrill("pronouns-4", "particle-choice", "저___ 학생이에요.", ["는", "가", "를", "에서"], "는", "저는 是入门固定高频结构。", ["grammar-topic-particle"]),
      grammarDrill("pronouns-5", "error-correction", "哪句更礼貌安全？", ["저는 마리예요.", "나는 마리야.", "너는 마리예요.", "그거 마리예요."], "저는 마리예요.", "面对陌生人先用 저는 + 요 体。", ["grammar-pronoun", "grammar-politeness"])
    ],
    relatedVocabulary: ["저", "나", "우리", "이름"],
    reviewTags: ["grammar-pronoun"]
  }),
  grammarPoint({
    id: "grammar-topic-eun-neun",
    title: "主题助词 은/는",
    shortTitle: "은/는",
    level: "beginner",
    category: "particle",
    summary: "은/는 把某个对象拿出来当话题，像“至于……”。",
    pattern: "有收音 + 은 / 无收音 + 는",
    usage: ["提出话题：저는 학생이에요。", "可表示对比：커피는 좋아요, 차는 안 좋아해요。", "常接已知信息或要讨论的对象。", "不要简单理解成“是”。"],
    formation: ["看前面名词有没有收音。", "有收音接 은。", "无收音接 는。"],
    examples: [
      grammarExample("저는 학생이에요.", "jeoneun haksaeng-ieyo", "至于我，学生-是。", "我是学生。", "저 无收音，用 는。"),
      grammarExample("이것은 책이에요.", "igeoseun chaegieyo", "至于这个，书-是。", "这是书。", "것 有收音，用 은。"),
      grammarExample("커피는 좋아요.", "keopineun joayo", "至于咖啡，好。", "咖啡不错 / 我喜欢咖啡。", "可作话题。"),
      grammarExample("오늘은 토요일이에요.", "oneureun toyoil-ieyo", "至于今天，星期六-是。", "今天是星期六。", "오늘 有收音，用 은。")
    ],
    comparison: [{ pointA: "은", pointB: "는", explanation: "选择取决于前面音节有没有收音：학생은, 저는。", examples: ["학생은", "저는"] }],
    commonMistakes: [{ mistake: "저은", correction: "저는", explanation: "저 没有收音，用 는。" }, { mistake: "은/는 = 是", correction: "은/는 = 话题标记", explanation: "“是”通常由 이에요/예요/입니다 表达。" }],
    drills: [
      grammarDrill("eun-neun-1", "particle-choice", "저___ 학생이에요.", ["는", "은", "이", "가"], "는", "저 没有收音，用 는。", ["grammar-topic-particle"]),
      grammarDrill("eun-neun-2", "particle-choice", "오늘___ 토요일이에요.", ["은", "는", "이", "가"], "은", "오늘 有收音 ㄹ，用 은。", ["grammar-topic-particle"]),
      grammarDrill("eun-neun-3", "particle-choice", "커피___ 좋아요.", ["는", "은", "을", "에"], "는", "커피 无收音，用 는。", ["grammar-topic-particle"]),
      grammarDrill("eun-neun-4", "meaning-choice", "저는 학생이에요. 里 는 的作用是？", ["把“我”设为话题", "表示过去", "表示地点", "表示宾语"], "把“我”设为话题", "은/는 是主题助词。", ["grammar-topic-particle"]),
      grammarDrill("eun-neun-5", "error-correction", "哪个句子正确？", ["이것은 책이에요.", "이것는 책이에요.", "이것을 책이에요.", "이것에 책이에요."], "이것은 책이에요.", "이것 有收音，用 은。", ["grammar-topic-particle", "grammar-copula"])
    ],
    relatedVocabulary: ["저", "이것", "커피", "오늘"],
    reviewTags: ["grammar-topic-particle"]
  }),
  grammarPoint({
    id: "grammar-subject-i-ga",
    title: "主格助词 이/가",
    shortTitle: "이/가",
    level: "beginner",
    category: "particle",
    summary: "이/가 标记主语、新信息或“是谁/什么”的焦点。",
    pattern: "有收音 + 이 / 无收音 + 가",
    usage: ["存在句：책이 있어요。", "动作主语：친구가 와요。", "回答谁/什么：제가 학생이에요。", "强调具体是谁/什么。"],
    formation: ["看前面名词有没有收音。", "有收音接 이。", "无收音接 가。"],
    examples: [
      grammarExample("책이 있어요.", "chaegi isseoyo", "书-主格 有。", "有书。", "책 有收音，用 이。"),
      grammarExample("친구가 와요.", "chinguga wayo", "朋友-主格 来。", "朋友来了。", "친구 无收音，用 가。"),
      grammarExample("제가 학생이에요.", "jega haksaeng-ieyo", "我-主格 学生-是。", "是我，我是学生。", "저 + 가 = 제가。"),
      grammarExample("이름이 뭐예요?", "ireumi mwoyeyo", "名字-主格 什么-是？", "名字是什么？", "이름 有收音，用 이。")
    ],
    comparison: [{ pointA: "이", pointB: "가", explanation: "选择只看收音：책이, 친구가。", examples: ["책이 있어요.", "친구가 와요."] }],
    commonMistakes: [{ mistake: "책가 있어요", correction: "책이 있어요", explanation: "책 有收音 ㄱ，用 이。" }, { mistake: "친구이 와요", correction: "친구가 와요", explanation: "친구 无收音，用 가。" }],
    drills: [
      grammarDrill("i-ga-1", "particle-choice", "책___ 있어요.", ["이", "가", "은", "를"], "이", "책 有收音，用 이。", ["grammar-subject-particle"]),
      grammarDrill("i-ga-2", "particle-choice", "친구___ 와요.", ["가", "이", "는", "을"], "가", "친구 无收音，用 가。", ["grammar-subject-particle"]),
      grammarDrill("i-ga-3", "particle-choice", "이름___ 뭐예요?", ["이", "가", "을", "에서"], "이", "이름 有收音，用 이。", ["grammar-subject-particle"]),
      grammarDrill("i-ga-4", "multiple-choice", "저 + 가 的常见缩写是？", ["제가", "저가", "저는", "제는"], "제가", "저가 常缩成 제가。", ["grammar-subject-particle", "grammar-pronoun"]),
      grammarDrill("i-ga-5", "meaning-choice", "친구가 와요. 的意思是？", ["朋友来了。", "我去朋友。", "朋友是书。", "没有朋友。"], "朋友来了。", "친구가 是主语，와요 是来。", ["grammar-subject-particle"])
    ],
    relatedVocabulary: ["책", "친구", "이름", "저"],
    reviewTags: ["grammar-subject-particle"]
  }),
  grammarPoint({
    id: "grammar-topic-vs-subject",
    title: "은/는 vs 이/가",
    shortTitle: "主题 vs 主格",
    level: "beginner",
    category: "particle",
    summary: "은/는 偏话题、对比、已知信息；이/가 偏主语、新信息、焦点。",
    pattern: "名词 + 은/는 / 名词 + 이/가",
    usage: ["은/는：至于……，拿出来谈。", "은/는：可表示对比。", "이/가：谁/什么是主语或新信息。", "이/가：回答“是谁/什么”。"],
    formation: ["先判断是话题还是焦点。", "再按收音选择 은/는 或 이/가。", "初学可用对比句反复感受差别。"],
    examples: [
      grammarExample("저는 학생이에요.", "jeoneun haksaeng-ieyo", "至于我，学生-是。", "我是学生。", "把“我”作为话题。"),
      grammarExample("제가 학생이에요.", "jega haksaeng-ieyo", "我-主格 学生-是。", "是我，我是学生。", "强调“是我”。"),
      grammarExample("이건 책이에요.", "igeon chaegieyo", "这个-话题 书-是。", "这个是书。", "说明这个东西。"),
      grammarExample("이게 책이에요.", "ige chaegieyo", "这个-主格 书-是。", "这个才是书 / 这个是书。", "更像指出答案。")
    ],
    comparison: [{ pointA: "저는 학생이에요.", pointB: "제가 학생이에요.", explanation: "前者是在介绍“我”；后者常像回答“谁是学生？”强调“是我”。", examples: ["저는 학생이에요.", "제가 학생이에요."] }],
    commonMistakes: [{ mistake: "把 은/는 和 이/가 完全当同义替换", correction: "按话题/焦点区分", explanation: "两者都可能译不出来，但语气和信息结构不同。" }],
    drills: [
      grammarDrill("topic-vs-subject-1", "particle-choice", "___ 학생이에요.（自我介绍：至于我）", ["저는", "제가", "저를", "저에"], "저는", "自我介绍常用 저는。", ["grammar-topic-particle"]),
      grammarDrill("topic-vs-subject-2", "particle-choice", "___ 학생이에요.（回答：谁是学生？是我）", ["제가", "저는", "저를", "저에"], "제가", "回答“谁”时常用 이/가 焦点。", ["grammar-subject-particle"]),
      grammarDrill("topic-vs-subject-3", "particle-choice", "이___ 책이에요.（说明这个东西）", ["건", "게", "를", "에서"], "건", "이건 = 이것은，偏话题说明。", ["grammar-topic-particle", "grammar-demonstrative"]),
      grammarDrill("topic-vs-subject-4", "particle-choice", "이___ 책이에요.（指出：这个才是书）", ["게", "건", "를", "도"], "게", "이게 = 이것이，偏主语/焦点。", ["grammar-subject-particle", "grammar-demonstrative"]),
      grammarDrill("topic-vs-subject-5", "meaning-choice", "은/는 vs 이/가 的核心差别更接近？", ["话题/对比 vs 主语/焦点", "过去 vs 将来", "敬语 vs 非敬语", "地点 vs 时间"], "话题/对比 vs 主语/焦点", "这是入门助词最重要的对比。", ["grammar-topic-particle", "grammar-subject-particle"])
    ],
    relatedVocabulary: ["저", "이것", "학생", "책"],
    reviewTags: ["grammar-topic-vs-subject", "grammar-topic-particle", "grammar-subject-particle"]
  }),
  grammarPoint({
    id: "grammar-object-eul-reul",
    title: "宾格助词 을/를",
    shortTitle: "을/를",
    level: "beginner",
    category: "particle",
    summary: "을/를 标记动作直接影响的对象。",
    pattern: "有收音 + 을 / 无收音 + 를",
    usage: ["吃饭：밥을 먹어요。", "喝咖啡：커피를 마셔요。", "读书：책을 읽어요。", "口语可省略，但练习时先完整掌握。"],
    formation: ["找到动作对象。", "看对象名词有没有收音。", "有收音接 을，无收音接 를。"],
    examples: [
      grammarExample("밥을 먹어요.", "babeul meogeoyo", "饭-宾格 吃。", "吃饭。", "밥 有收音，用 을。"),
      grammarExample("커피를 마셔요.", "keopireul masyeoyo", "咖啡-宾格 喝。", "喝咖啡。", "커피 无收音，用 를。"),
      grammarExample("책을 읽어요.", "chaegeul ilgeoyo", "书-宾格 读。", "读书。", "책 有收音。"),
      grammarExample("영화를 봐요.", "yeonghwareul bwayo", "电影-宾格 看。", "看电影。", "영화 无收音。")
    ],
    comparison: [{ pointA: "이/가", pointB: "을/를", explanation: "이/가 标记主语或存在对象；을/를 标记动作对象。", examples: ["책이 있어요.", "책을 읽어요."] }],
    commonMistakes: [{ mistake: "커피을 마셔요", correction: "커피를 마셔요", explanation: "커피 无收音，用 를。" }, { mistake: "책이 읽어요", correction: "책을 읽어요", explanation: "书是读的对象，不是做动作的主语。" }],
    drills: [
      grammarDrill("eul-reul-1", "particle-choice", "밥___ 먹어요.", ["을", "를", "이", "가"], "을", "밥 有收音，用 을。", ["grammar-object-particle"]),
      grammarDrill("eul-reul-2", "particle-choice", "커피___ 마셔요.", ["를", "을", "가", "에"], "를", "커피 无收音，用 를。", ["grammar-object-particle"]),
      grammarDrill("eul-reul-3", "particle-choice", "책___ 읽어요.", ["을", "를", "이", "에서"], "을", "책 有收音，用 을。", ["grammar-object-particle"]),
      grammarDrill("eul-reul-4", "particle-choice", "영화___ 봐요.", ["를", "을", "가", "는"], "를", "영화 无收音，用 를。", ["grammar-object-particle"]),
      grammarDrill("eul-reul-5", "sentence-builder", "组成：我喝咖啡。", ["저는", "커피를", "마셔요"], "저는|커피를|마셔요", "커피 是喝的对象，用 를。", ["grammar-object-particle", "grammar-word-order"])
    ],
    relatedVocabulary: ["밥", "커피", "책", "영화"],
    reviewTags: ["grammar-object-particle"]
  })
];

const compactGrammarSeed = [
  ["grammar-location-e", "位置/时间助词 에", "에", "particle", "地点/时间 + 에", "에 标记目的地、存在位置或时间点。", "학교에 가요.", "hakgyoe gayo", "学校-到 去。", "去学校。", "grammar-location-e"],
  ["grammar-location-eseo", "动作发生地点 에서", "에서", "particle", "地点 + 에서 + 动作", "에서 标记动作发生的地方。", "학교에서 공부해요.", "hakgyoeseo gongbuhaeyo", "学校-动作地点 学习。", "在学校学习。", "grammar-location-eseo"],
  ["grammar-possessive-ui", "所有格 의", "의", "particle", "名词 + 의 + 名词", "의 表示所属，口语常省略或弱读。", "친구의 가방이에요.", "chingu-ui gabang-ieyo", "朋友-的 包-是。", "是朋友的包。", "grammar-possessive-ui"],
  ["grammar-and-particles", "和/与：와/과/하고/이랑", "和", "particle", "名词 + 와/과/하고/이랑", "这些形式都能连接名词，正式度不同。", "친구하고 가요.", "chingu-hago gayo", "和朋友 去。", "和朋友去。", "grammar-and"],
  ["grammar-euro-ro", "方向/工具 으로/로", "으로/로", "particle", "名词 + 으로/로", "表示方向、工具或方式；ㄹ 收音后用 로。", "버스로 가요.", "beoseuro gayo", "公交车-工具 去。", "坐公交去。", "grammar-instrument-direction"],
  ["grammar-do", "也：도", "도", "particle", "名词 + 도", "도 表示“也”。", "저도 학생이에요.", "jeodo haksaeng-ieyo", "我-也 学生-是。", "我也是学生。", "grammar-do"],
  ["grammar-man", "只：만", "만", "particle", "名词 + 만", "만 表示“只、仅”。", "물만 마셔요.", "mulman masyeoyo", "水-只 喝。", "只喝水。", "grammar-man"],
  ["grammar-buteo-kkaji", "从……到……：부터/까지", "부터/까지", "particle", "起点 + 부터 / 终点 + 까지", "부터 是从，까지 是到。", "9시부터 5시까지 공부해요.", "ahop-sibuteo daseot-sikkaji gongbuhaeyo", "9点-从 5点-到 学习。", "从九点学习到五点。", "grammar-range"],
  ["grammar-ege-hante-kke", "给某人：에게/한테/께", "에게/한테/께", "particle", "人 + 에게/한테/께", "表示动作对象；께 更尊敬，한테 更口语。", "친구한테 말해요.", "chingu-hante malhaeyo", "朋友-给/对 说。", "对朋友说。", "grammar-recipient"],
  ["grammar-itda-eopda", "있다 / 없다", "있다/없다", "verb", "名词 + 이/가 있어요/없어요", "있어요 表示有/在，없어요 表示没有/不在。", "책이 있어요.", "chaegi isseoyo", "书-主格 有。", "有书。", "grammar-existence"],
  ["grammar-existence-location", "N이/가 있다 vs N에 있다", "存在 vs 位置", "verb", "对象 + 이/가 있다 / 地点 + 에 있다", "一个表达有什么，一个表达在什么地方。", "책이 책상에 있어요.", "chaegi chaeksang-e isseoyo", "书-主格 桌子-上 在。", "书在桌上。", "grammar-existence-location"],
  ["grammar-sino-numbers", "汉字数词", "汉字数", "number", "일 이 삼 사 오", "汉字数常用于日期、价格、号码、分钟等。", "전화번호는 일이삼이에요.", "jeonhwabeonhoneun il-i-sam-ieyo", "电话号码-话题 一二三-是。", "电话号码是一二三。", "grammar-number"],
  ["grammar-native-numbers", "固有数词", "固有数", "number", "하나 둘 셋 넷", "固有数常用于年龄、数量、小时等。", "사과 두 개 주세요.", "sagwa du gae juseyo", "苹果 两 个 请给。", "请给我两个苹果。", "grammar-number"],
  ["grammar-counters", "量词/单位", "量词", "number", "数字 + 量词 + 名词", "数人、动物、杯、书常用不同量词。", "학생 두 명이에요.", "haksaeng du myeong-ieyo", "学生 两 名-是。", "是两名学生。", "grammar-counter"],
  ["grammar-time", "时间表达", "时间", "number", "固有数 + 시 / 汉字数 + 분", "几点用固有数，分钟多用汉字数。", "두 시 삼십 분이에요.", "du si samsip bun-ieyo", "两 点 三十 分-是。", "两点三十分。", "grammar-time"],
  ["grammar-dictionary-form", "动词/形容词原形 -다", "-다 原形", "verb", "词干 + 다", "查词典看到的是 -다 原形，变形时先去掉 다。", "가다의 어간은 가예요.", "gada-ui eoganeun ga-yeyo", "가다 的 词干-话题 가-是。", "가다 的词干是 가。", "grammar-conjugation"],
  ["grammar-present-ayo-eoyo-haeyo", "礼貌现在时 아요/어요/해요", "现在时", "verb", "词干 + 아요/어요/해요", "入门最常用的礼貌现在时。", "먹다 → 먹어요.", "meokda meogeoyo", "吃-原形 → 吃-요。", "먹다 变 먹어요。", "grammar-conjugation"],
  ["grammar-past-asseoyo-eosseoyo", "过去式 았/었어요", "过去式", "verb", "词干 + 았/었어요", "表示已经发生的动作或状态。", "가다 → 갔어요.", "gada gasseoyo", "去-原形 → 去了。", "去了。", "grammar-tense"],
  ["grammar-negation-an", "否定 안", "안 否定", "verb", "안 + 谓词", "안 放在谓词前，常用于简单口语否定。", "안 가요.", "an gayo", "不 去。", "不去。", "grammar-negation"],
  ["grammar-negation-ji-anta", "否定 지 않다", "지 않다", "verb", "词干 + 지 않아요", "比 안 更完整、书面一点的否定。", "가지 않아요.", "gaji anayo", "去-지 不。", "不去。", "grammar-negation"],
  ["grammar-want-go-sipda", "想要/想做 -고 싶다", "-고 싶다", "verb", "动词词干 + 고 싶어요", "表示想做某事。", "한국에 가고 싶어요.", "hanguge gago sipeoyo", "韩国-到 去-想。", "想去韩国。", "grammar-want"],
  ["grammar-progressive-go-itda", "正在 -고 있다", "-고 있다", "verb", "动词词干 + 고 있어요", "表示动作正在进行。", "공부하고 있어요.", "gongbuhago isseoyo", "学习-正在。", "正在学习。", "grammar-progressive"],
  ["grammar-future-eul-geoyeyo", "将来/打算 -(으)ㄹ 거예요", "将来", "verb", "词干 + (으)ㄹ 거예요", "表示将来、打算或推测。", "내일 갈 거예요.", "naeil gal geoyeyo", "明天 去-将来。", "明天会去。", "grammar-future"],
  ["grammar-suggestion-eulkkayo", "提议/询问 -(으)ㄹ까요?", "ㄹ까요?", "verb", "词干 + (으)ㄹ까요?", "表示一起做吗、要不要、会不会。", "같이 갈까요?", "gachi galkkayo", "一起 去-吗？", "一起去吗？", "grammar-suggestion"],
  ["grammar-promise-eulgeyo", "意愿/承诺 -(으)ㄹ게요", "ㄹ게요", "verb", "词干 + (으)ㄹ게요", "表示说话人的承诺或意愿。", "제가 할게요.", "jega halgeyo", "我-主格 做-会。", "我来做。", "grammar-promise"],
  ["grammar-polite-vs-formal", "礼貌体 vs 正式体", "요体/합니다体", "honorific", "가요 / 갑니다", "요体日常礼貌，합니다体更正式。", "학교에 갑니다.", "hakgyoe gamnida", "学校-到 去-正式。", "去学校。", "grammar-politeness"],
  ["grammar-honorific-si", "尊敬词尾 -(으)시", "尊敬시", "honorific", "词干 + (으)세요", "用于尊敬主语。", "선생님이 오세요.", "seonsaengnimi oseyo", "老师-主格 来-尊敬。", "老师来。", "grammar-honorific"],
  ["grammar-honorific-words", "常用尊敬词", "尊敬词", "honorific", "먹다→드시다 / 자다→주무시다 / 있다→계시다", "有些常用词有专门尊敬说法。", "선생님이 계세요.", "seonsaengnimi gyeseyo", "老师-主格 在-尊敬。", "老师在。", "grammar-honorific"],
  ["grammar-juseyo", "请给我 주세요", "주세요", "expression", "名词/动词아/어 + 주세요", "购物、点餐、请求时很实用。", "물 주세요.", "mul juseyo", "水 请给。", "请给我水。", "grammar-expression"],
  ["grammar-like-joahada-jota", "喜欢 좋아하다 / 좋다", "喜欢", "verb", "N을/를 좋아하다 / N이/가 좋다", "좋아하다 是喜欢某物；좋다 是某物好/喜欢。", "저는 커피를 좋아해요.", "jeoneun keopireul joahaeyo", "至于我 咖啡-宾格 喜欢。", "我喜欢咖啡。", "grammar-like"],
  ["grammar-hada-verbs", "做 하다", "하다", "verb", "名词 + 하다", "很多动作名词可接 하다 变动词。", "한국어를 공부해요.", "hangugeoreul gongbuhaeyo", "韩语-宾格 学习。", "学习韩语。", "grammar-hada"],
  ["grammar-mot-jal", "会/能 못 / 잘", "못/잘", "expression", "못 + 动词 / 잘 + 动词", "못 表示不能，잘 表示做得好。", "한국어를 잘해요.", "hangugeoreul jalhaeyo", "韩语-宾格 好好做。", "韩语说得好。", "grammar-ability"],
  ["grammar-gachi", "和别人一起 같이", "같이", "expression", "같이 + 动词", "같이 表示一起。", "같이 가요.", "gachi gayo", "一起 去。", "一起去。", "grammar-expression"]
];

const compactGrammarPoints = compactGrammarSeed.map(([id, title, shortTitle, category, pattern, summary, ko, roman, literal, natural, tag], index) => grammarPoint({
  id,
  title,
  shortTitle,
  level: "beginner",
  category,
  summary,
  pattern,
  usage: [summary, "先通过例句掌握核心场景，再进入练习。", "答错会进入复习系统。"],
  formation: [pattern, "观察前后名词或词干。", "在完整句子里练习，不孤立背规则。"],
  examples: [grammarExample(ko, roman, literal, natural, "入门原创例句。")],
  comparison: [{ pointA: shortTitle, pointB: "相近语法", explanation: "后续可以继续扩展对比练习；当前先掌握最常见用法。", examples: [ko] }],
  commonMistakes: [{ mistake: "只背中文意思", correction: "连同结构和例句一起记", explanation: "语法点要在句子里反复练，才能迁移到 TOPIK 和表达。" }],
  drills: [
    grammarDrill(`${id}-core`, "multiple-choice", `${title} 的核心结构是？`, [pattern, "只写罗马音", "名词 + 图片", "所有句子都省略谓语"], pattern, `先记核心结构：${pattern}`, [tag]),
    grammarDrill(`${id}-meaning`, "meaning-choice", `${ko} 的自然中文是？`, [natural, "我不是学生。", "这是书吗？", "请再说一次。"], natural, summary, [tag])
  ],
  relatedVocabulary: [],
  reviewTags: [tag]
}));

const grammarTrack = [...fullGrammarPoints, ...compactGrammarPoints];

const grammarPracticeSummary = {
  totalPoints: grammarTrack.length,
  fullPoints: fullGrammarPoints.length,
  totalDrills: grammarTrack.reduce((sum, point) => sum + (point.drills || point.exercises || []).length, 0),
  topikStyle: "TOPIK I 风格题为原创练习，不复制真题。"
};
