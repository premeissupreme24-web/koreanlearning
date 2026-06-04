const flashcardsBase = [
  { ko: "안녕하세요?", roman: "annyeonghaseyo", zh: "你好嗎？正式安全的問候", tag: "問候" },
  { ko: "저는 마리예요.", roman: "jeoneun Mari-yeyo", zh: "我是瑪莉。", tag: "自我介紹" },
  { ko: "만나서 반가워요.", roman: "mannaseo bangawoyo", zh: "見到你很高興。", tag: "問候" },
  { ko: "감사합니다.", roman: "gamsahamnida", zh: "謝謝。", tag: "禮貌語" },
  { ko: "안녕히 가세요.", roman: "annyeonghi gaseyo", zh: "請慢走。對離開的人說", tag: "告別" },
  { ko: "안녕히 계세요.", roman: "annyeonghi gyeseyo", zh: "請留步。對留下的人說", tag: "告別" },
  { ko: "학생", roman: "haksaeng", zh: "學生", tag: "職業" },
  { ko: "회사원", roman: "hoesawon", zh: "公司職員", tag: "職業" },
  { ko: "요리사", roman: "yorisa", zh: "廚師", tag: "職業" },
  { ko: "프로그래머", roman: "peurogeuraemeo", zh: "程式設計師", tag: "職業" },
  { ko: "운동선수", roman: "undongseonsu", zh: "運動選手", tag: "職業" },
  { ko: "어느 나라 사람이에요?", roman: "eoneu nara saram-ieyo", zh: "你是哪一國人？", tag: "國籍" },
  { ko: "한국 사람", roman: "hanguk saram", zh: "韓國人", tag: "國籍" },
  { ko: "미국 사람", roman: "miguk saram", zh: "美國人", tag: "國籍" },
  { ko: "호주 사람", roman: "hoju saram", zh: "澳洲人", tag: "國籍" },
  { ko: "브라질 사람", roman: "beurajil saram", zh: "巴西人", tag: "國籍" },
  { ko: "아니에요.", roman: "anieyo", zh: "不是。", tag: "否定" },
  { ko: "네.", roman: "ne", zh: "是、好的。", tag: "回應" }
];

const grammarItems = [
  {
    title: "저는 N이에요 / 예요",
    body: "想說「我是 N」時，用 저는 放在自己後面當主題。N 以子音收尾接 이에요，例如 학생이에요；以母音收尾接 예요，例如 마리예요。",
    example: "저는 학생이에요. / 저는 마리예요."
  },
  {
    title: "은 / 는：把話題拿出來",
    body: "Byon 語法書把 은/는 視為 special particle。初學先理解成「至於 X 呢」。저는 的 는 告訴對方：接下來要說我的資訊。",
    example: "저는 크리스예요."
  },
  {
    title: "아니에요：不是",
    body: "否定名詞句時，不要直接把 이에요 改掉；常用 N이/가 아니에요。生活對話裡也常直接說 아니에요。",
    example: "학생이 아니에요. 요리사예요."
  },
  {
    title: "敬語先用安全版",
    body: "Byon 提到韓語必須選語尾層級。初學見陌生人先用 안녕하세요, 반가워요, 감사합니다 這些禮貌形式，既自然也不冒犯。",
    example: "만나서 반가워요."
  }
];

const buildChallenges = [
  { target: "날", hint: "目標：拼出「날」。結構是 ㄴ + ㅏ + ㄹ。", blocks: ["ㄹ", "ㅏ", "ㄴ", "ㅁ", "ㅓ"], answer: ["ㄴ", "ㅏ", "ㄹ"] },
  { target: "한", hint: "目標：拼出「한」。結構是 ㅎ + ㅏ + ㄴ。", blocks: ["ㅏ", "ㄴ", "ㅎ", "ㄱ", "ㅗ"], answer: ["ㅎ", "ㅏ", "ㄴ"] },
  { target: "국", hint: "目標：拼出「국」。結構是 ㄱ + ㅜ + ㄱ。", blocks: ["ㅜ", "ㄱ", "ㄷ", "ㅗ", "ㄱ"], answer: ["ㄱ", "ㅜ", "ㄱ"] }
];

const wordQuizItems = [
  { ko: "학생", answer: "學生", choices: ["學生", "廚師", "公司職員", "運動選手"] },
  { ko: "요리사", answer: "廚師", choices: ["程式設計師", "廚師", "澳洲人", "謝謝"] },
  { ko: "감사합니다", answer: "謝謝", choices: ["請慢走", "很高興", "謝謝", "不是"] },
  { ko: "브라질 사람", answer: "巴西人", choices: ["韓國人", "美國人", "澳洲人", "巴西人"] }
];

const vocabularyVisualItems = [
  { category: "動物", ko: "강아지", roman: "gangaji", meaningZh: "小狗", meaningEn: "puppy", visual: "🐶", audioUrl: null, slowAudioUrl: null },
  { category: "動物", ko: "고양이", roman: "goyangi", meaningZh: "猫", meaningEn: "cat", visual: "🐱", audioUrl: null, slowAudioUrl: null },
  { category: "動物", ko: "호랑이", roman: "horangi", meaningZh: "老虎", meaningEn: "tiger", visual: "🐯", audioUrl: null, slowAudioUrl: null },
  { category: "動物", ko: "사자", roman: "saja", meaningZh: "狮子", meaningEn: "lion", visual: "🦁", audioUrl: null, slowAudioUrl: null },
  { category: "動物", ko: "토끼", roman: "tokki", meaningZh: "兔子", meaningEn: "rabbit", visual: "🐰", audioUrl: null, slowAudioUrl: null },
  { category: "動物", ko: "햄스터", roman: "haemseuteo", meaningZh: "仓鼠", meaningEn: "hamster", visual: "🐹", audioUrl: null, slowAudioUrl: null },
  { category: "動物", ko: "새", roman: "sae", meaningZh: "鸟", meaningEn: "bird", visual: "🐦", audioUrl: null, slowAudioUrl: null },
  { category: "動物", ko: "물고기", roman: "mulgogi", meaningZh: "鱼", meaningEn: "fish", visual: "🐟", audioUrl: null, slowAudioUrl: null },
  { category: "動物", ko: "거북이", roman: "geobugi", meaningZh: "乌龟", meaningEn: "turtle", visual: "🐢", audioUrl: null, slowAudioUrl: null },
  { category: "動物", ko: "말", roman: "mal", meaningZh: "马", meaningEn: "horse", visual: "🐴", audioUrl: null, slowAudioUrl: null },
  { category: "動物", ko: "돼지", roman: "dwaeji", meaningZh: "猪", meaningEn: "pig", visual: "🐷", audioUrl: null, slowAudioUrl: null },
  { category: "動物", ko: "소", roman: "so", meaningZh: "牛", meaningEn: "cow", visual: "🐮", audioUrl: null, slowAudioUrl: null },
  { category: "動物", ko: "원숭이", roman: "wonsungi", meaningZh: "猴子", meaningEn: "monkey", visual: "🐵", audioUrl: null, slowAudioUrl: null },
  { category: "身體", ko: "눈", roman: "nun", meaningZh: "眼睛", meaningEn: "eye", visual: "👁️", audioUrl: null, slowAudioUrl: null },
  { category: "身體", ko: "코", roman: "ko", meaningZh: "鼻子", meaningEn: "nose", visual: "👃", audioUrl: null, slowAudioUrl: null },
  { category: "身體", ko: "입", roman: "ip", meaningZh: "嘴巴", meaningEn: "mouth", visual: "👄", audioUrl: null, slowAudioUrl: null },
  { category: "身體", ko: "손", roman: "son", meaningZh: "手", meaningEn: "hand", visual: "✋", audioUrl: null, slowAudioUrl: null },
  { category: "食物", ko: "밥", roman: "bap", meaningZh: "饭", meaningEn: "rice / meal", visual: "🍚", audioUrl: null, slowAudioUrl: null },
  { category: "食物", ko: "물", roman: "mul", meaningZh: "水", meaningEn: "water", visual: "💧", audioUrl: null, slowAudioUrl: null },
  { category: "食物", ko: "사과", roman: "sagwa", meaningZh: "苹果", meaningEn: "apple", visual: "🍎", audioUrl: null, slowAudioUrl: null },
  { category: "食物", ko: "우유", roman: "uyu", meaningZh: "牛奶", meaningEn: "milk", visual: "🥛", audioUrl: null, slowAudioUrl: null },
  { category: "日常", ko: "책", roman: "chaek", meaningZh: "书", meaningEn: "book", visual: "📘", audioUrl: null, slowAudioUrl: null },
  { category: "日常", ko: "집", roman: "jip", meaningZh: "家", meaningEn: "house", visual: "🏠", audioUrl: null, slowAudioUrl: null },
  { category: "日常", ko: "가방", roman: "gabang", meaningZh: "包包", meaningEn: "bag", visual: "🎒", audioUrl: null, slowAudioUrl: null },
  { category: "日常", ko: "전화", roman: "jeonhwa", meaningZh: "电话", meaningEn: "phone", visual: "📱", audioUrl: null, slowAudioUrl: null },
  { category: "顏色", ko: "빨간색", roman: "ppalgansaek", meaningZh: "红色", meaningEn: "red", color: "#ef4444", audioUrl: null, slowAudioUrl: null },
  { category: "顏色", ko: "파란색", roman: "paransaek", meaningZh: "蓝色", meaningEn: "blue", color: "#2299df", audioUrl: null, slowAudioUrl: null },
  { category: "顏色", ko: "노란색", roman: "noransaek", meaningZh: "黄色", meaningEn: "yellow", color: "#f6c945", audioUrl: null, slowAudioUrl: null },
  { category: "數字", ko: "하나", roman: "hana", meaningZh: "一", meaningEn: "one", visual: "1", visualType: "number", audioUrl: null, slowAudioUrl: null },
  { category: "數字", ko: "둘", roman: "dul", meaningZh: "二", meaningEn: "two", visual: "2", visualType: "number", audioUrl: null, slowAudioUrl: null },
  { category: "數字", ko: "셋", roman: "set", meaningZh: "三", meaningEn: "three", visual: "3", visualType: "number", audioUrl: null, slowAudioUrl: null }
];

vocabularyVisualItems.push(
  { category: "動物", ko: "닭", roman: "dak", meaningZh: "鸡", meaningEn: "chicken", visual: "🐔", audioUrl: null, slowAudioUrl: null },
  { category: "動物", ko: "오리", roman: "ori", meaningZh: "鸭子", meaningEn: "duck", visual: "🦆", audioUrl: null, slowAudioUrl: null },
  { category: "動物", ko: "양", roman: "yang", meaningZh: "羊", meaningEn: "sheep", visual: "🐑", audioUrl: null, slowAudioUrl: null },
  { category: "動物", ko: "염소", roman: "yeomso", meaningZh: "山羊", meaningEn: "goat", visual: "🐐", audioUrl: null, slowAudioUrl: null },
  { category: "動物", ko: "사슴", roman: "saseum", meaningZh: "鹿", meaningEn: "deer", visual: "🦌", audioUrl: null, slowAudioUrl: null },
  { category: "動物", ko: "곰", roman: "gom", meaningZh: "熊", meaningEn: "bear", visual: "🐻", audioUrl: null, slowAudioUrl: null },
  { category: "動物", ko: "코끼리", roman: "kokkiri", meaningZh: "大象", meaningEn: "elephant", visual: "🐘", audioUrl: null, slowAudioUrl: null },
  { category: "動物", ko: "기린", roman: "girin", meaningZh: "长颈鹿", meaningEn: "giraffe", visual: "🦒", audioUrl: null, slowAudioUrl: null },
  { category: "動物", ko: "뱀", roman: "baem", meaningZh: "蛇", meaningEn: "snake", visual: "🐍", audioUrl: null, slowAudioUrl: null },
  { category: "動物", ko: "개구리", roman: "gaeguri", meaningZh: "青蛙", meaningEn: "frog", visual: "🐸", audioUrl: null, slowAudioUrl: null },
  { category: "動物", ko: "나비", roman: "nabi", meaningZh: "蝴蝶", meaningEn: "butterfly", visual: "🦋", audioUrl: null, slowAudioUrl: null },

  { category: "身體", ko: "발", roman: "bal", meaningZh: "脚", meaningEn: "foot", visual: "🦶", audioUrl: null, slowAudioUrl: null },
  { category: "身體", ko: "머리", roman: "meori", meaningZh: "头", meaningEn: "head", visual: "🙂", audioUrl: null, slowAudioUrl: null },
  { category: "身體", ko: "얼굴", roman: "eolgul", meaningZh: "脸", meaningEn: "face", visual: "😊", audioUrl: null, slowAudioUrl: null },
  { category: "身體", ko: "귀", roman: "gwi", meaningZh: "耳朵", meaningEn: "ear", visual: "👂", audioUrl: null, slowAudioUrl: null },
  { category: "身體", ko: "치아", roman: "chia", meaningZh: "牙齿", meaningEn: "tooth", visual: "🦷", audioUrl: null, slowAudioUrl: null },
  { category: "身體", ko: "혀", roman: "hyeo", meaningZh: "舌头", meaningEn: "tongue", visual: "👅", audioUrl: null, slowAudioUrl: null },
  { category: "身體", ko: "목", roman: "mok", meaningZh: "脖子", meaningEn: "neck", visual: "🧍", audioUrl: null, slowAudioUrl: null },
  { category: "身體", ko: "어깨", roman: "eokkae", meaningZh: "肩膀", meaningEn: "shoulder", visual: "🤷", audioUrl: null, slowAudioUrl: null },
  { category: "身體", ko: "손목", roman: "sonmok", meaningZh: "手腕", meaningEn: "wrist", visual: "🤌", audioUrl: null, slowAudioUrl: null },
  { category: "身體", ko: "손가락", roman: "songarak", meaningZh: "手指", meaningEn: "finger", visual: "☝️", audioUrl: null, slowAudioUrl: null },
  { category: "身體", ko: "가슴", roman: "gaseum", meaningZh: "胸口", meaningEn: "chest", visual: "🫁", audioUrl: null, slowAudioUrl: null },
  { category: "身體", ko: "배", roman: "bae", meaningZh: "肚子", meaningEn: "belly", visual: "🧍", audioUrl: null, slowAudioUrl: null },
  { category: "身體", ko: "등", roman: "deung", meaningZh: "背", meaningEn: "back", visual: "🚶", audioUrl: null, slowAudioUrl: null },
  { category: "身體", ko: "허리", roman: "heori", meaningZh: "腰", meaningEn: "waist", visual: "🕺", audioUrl: null, slowAudioUrl: null },
  { category: "身體", ko: "다리", roman: "dari", meaningZh: "腿", meaningEn: "leg", visual: "🦵", audioUrl: null, slowAudioUrl: null },
  { category: "身體", ko: "무릎", roman: "mureup", meaningZh: "膝盖", meaningEn: "knee", visual: "🦵", audioUrl: null, slowAudioUrl: null },
  { category: "身體", ko: "피부", roman: "pibu", meaningZh: "皮肤", meaningEn: "skin", visual: "🤲", audioUrl: null, slowAudioUrl: null },
  { category: "身體", ko: "머리카락", roman: "meorikarak", meaningZh: "头发", meaningEn: "hair", visual: "💇", audioUrl: null, slowAudioUrl: null },
  { category: "身體", ko: "심장", roman: "simjang", meaningZh: "心脏", meaningEn: "heart", visual: "❤️", audioUrl: null, slowAudioUrl: null },
  { category: "身體", ko: "뇌", roman: "noe", meaningZh: "大脑", meaningEn: "brain", visual: "🧠", audioUrl: null, slowAudioUrl: null },

  { category: "食物", ko: "빵", roman: "ppang", meaningZh: "面包", meaningEn: "bread", visual: "🍞", audioUrl: null, slowAudioUrl: null },
  { category: "食物", ko: "계란", roman: "gyeran", meaningZh: "鸡蛋", meaningEn: "egg", visual: "🥚", audioUrl: null, slowAudioUrl: null },
  { category: "食物", ko: "고기", roman: "gogi", meaningZh: "肉", meaningEn: "meat", visual: "🥩", audioUrl: null, slowAudioUrl: null },
  { category: "食物", ko: "닭고기", roman: "dakgogi", meaningZh: "鸡肉", meaningEn: "chicken meat", visual: "🍗", audioUrl: null, slowAudioUrl: null },
  { category: "食物", ko: "생선", roman: "saengseon", meaningZh: "鱼肉", meaningEn: "fish", visual: "🐟", audioUrl: null, slowAudioUrl: null },
  { category: "食物", ko: "김치", roman: "gimchi", meaningZh: "泡菜", meaningEn: "kimchi", visual: "🥬", audioUrl: null, slowAudioUrl: null },
  { category: "食物", ko: "라면", roman: "ramyeon", meaningZh: "拉面", meaningEn: "ramyeon", visual: "🍜", audioUrl: null, slowAudioUrl: null },
  { category: "食物", ko: "국", roman: "guk", meaningZh: "汤", meaningEn: "soup", visual: "🥣", audioUrl: null, slowAudioUrl: null },
  { category: "食物", ko: "과자", roman: "gwaja", meaningZh: "饼干零食", meaningEn: "snack", visual: "🍪", audioUrl: null, slowAudioUrl: null },
  { category: "食物", ko: "커피", roman: "keopi", meaningZh: "咖啡", meaningEn: "coffee", visual: "☕", audioUrl: null, slowAudioUrl: null },
  { category: "食物", ko: "차", roman: "cha", meaningZh: "茶", meaningEn: "tea", visual: "🍵", audioUrl: null, slowAudioUrl: null },
  { category: "食物", ko: "주스", roman: "juseu", meaningZh: "果汁", meaningEn: "juice", visual: "🧃", audioUrl: null, slowAudioUrl: null },
  { category: "食物", ko: "바나나", roman: "banana", meaningZh: "香蕉", meaningEn: "banana", visual: "🍌", audioUrl: null, slowAudioUrl: null },
  { category: "食物", ko: "딸기", roman: "ttalgi", meaningZh: "草莓", meaningEn: "strawberry", visual: "🍓", audioUrl: null, slowAudioUrl: null },
  { category: "食物", ko: "포도", roman: "podo", meaningZh: "葡萄", meaningEn: "grapes", visual: "🍇", audioUrl: null, slowAudioUrl: null },
  { category: "食物", ko: "오렌지", roman: "orenji", meaningZh: "橙子", meaningEn: "orange", visual: "🍊", audioUrl: null, slowAudioUrl: null },
  { category: "食物", ko: "당근", roman: "danggeun", meaningZh: "胡萝卜", meaningEn: "carrot", visual: "🥕", audioUrl: null, slowAudioUrl: null },
  { category: "食物", ko: "감자", roman: "gamja", meaningZh: "土豆", meaningEn: "potato", visual: "🥔", audioUrl: null, slowAudioUrl: null },
  { category: "食物", ko: "치즈", roman: "chijeu", meaningZh: "奶酪", meaningEn: "cheese", visual: "🧀", audioUrl: null, slowAudioUrl: null },
  { category: "食物", ko: "아이스크림", roman: "aiseukeurim", meaningZh: "冰淇淋", meaningEn: "ice cream", visual: "🍦", audioUrl: null, slowAudioUrl: null },

  { category: "日常", ko: "학교", roman: "hakgyo", meaningZh: "学校", meaningEn: "school", visual: "🏫", audioUrl: null, slowAudioUrl: null },
  { category: "日常", ko: "문", roman: "mun", meaningZh: "门", meaningEn: "door", visual: "🚪", audioUrl: null, slowAudioUrl: null },
  { category: "日常", ko: "창문", roman: "changmun", meaningZh: "窗户", meaningEn: "window", visual: "🪟", audioUrl: null, slowAudioUrl: null },
  { category: "日常", ko: "의자", roman: "uija", meaningZh: "椅子", meaningEn: "chair", visual: "🪑", audioUrl: null, slowAudioUrl: null },
  { category: "日常", ko: "책상", roman: "chaeksang", meaningZh: "桌子", meaningEn: "desk", visual: "🪵", audioUrl: null, slowAudioUrl: null },
  { category: "日常", ko: "침대", roman: "chimdae", meaningZh: "床", meaningEn: "bed", visual: "🛏️", audioUrl: null, slowAudioUrl: null },
  { category: "日常", ko: "시계", roman: "sigye", meaningZh: "时钟", meaningEn: "clock", visual: "🕒", audioUrl: null, slowAudioUrl: null },
  { category: "日常", ko: "열쇠", roman: "yeolsoe", meaningZh: "钥匙", meaningEn: "key", visual: "🔑", audioUrl: null, slowAudioUrl: null },
  { category: "日常", ko: "지갑", roman: "jigap", meaningZh: "钱包", meaningEn: "wallet", visual: "👛", audioUrl: null, slowAudioUrl: null },
  { category: "日常", ko: "우산", roman: "usan", meaningZh: "雨伞", meaningEn: "umbrella", visual: "☂️", audioUrl: null, slowAudioUrl: null },
  { category: "日常", ko: "신발", roman: "sinbal", meaningZh: "鞋子", meaningEn: "shoes", visual: "👟", audioUrl: null, slowAudioUrl: null },
  { category: "日常", ko: "옷", roman: "ot", meaningZh: "衣服", meaningEn: "clothes", visual: "👕", audioUrl: null, slowAudioUrl: null },
  { category: "日常", ko: "컴퓨터", roman: "keompyuteo", meaningZh: "电脑", meaningEn: "computer", visual: "💻", audioUrl: null, slowAudioUrl: null },
  { category: "日常", ko: "버스", roman: "beoseu", meaningZh: "公交车", meaningEn: "bus", visual: "🚌", audioUrl: null, slowAudioUrl: null },
  { category: "日常", ko: "자동차", roman: "jadongcha", meaningZh: "汽车", meaningEn: "car", visual: "🚗", audioUrl: null, slowAudioUrl: null },
  { category: "日常", ko: "자전거", roman: "jajeongeo", meaningZh: "自行车", meaningEn: "bicycle", visual: "🚲", audioUrl: null, slowAudioUrl: null },
  { category: "日常", ko: "길", roman: "gil", meaningZh: "路", meaningEn: "road", visual: "🛣️", audioUrl: null, slowAudioUrl: null },
  { category: "日常", ko: "공원", roman: "gongwon", meaningZh: "公园", meaningEn: "park", visual: "🏞️", audioUrl: null, slowAudioUrl: null },
  { category: "日常", ko: "병원", roman: "byeongwon", meaningZh: "医院", meaningEn: "hospital", visual: "🏥", audioUrl: null, slowAudioUrl: null },
  { category: "日常", ko: "약국", roman: "yakguk", meaningZh: "药局", meaningEn: "pharmacy", visual: "💊", audioUrl: null, slowAudioUrl: null },

  { category: "顏色", ko: "초록색", roman: "choroksaek", meaningZh: "绿色", meaningEn: "green", color: "#22c55e", visual: "🟩", audioUrl: null, slowAudioUrl: null },
  { category: "顏色", ko: "검은색", roman: "geomeunsaek", meaningZh: "黑色", meaningEn: "black", color: "#111827", visual: "⬛", audioUrl: null, slowAudioUrl: null },
  { category: "顏色", ko: "흰색", roman: "huinsaek", meaningZh: "白色", meaningEn: "white", color: "#ffffff", visual: "⬜", audioUrl: null, slowAudioUrl: null },
  { category: "顏色", ko: "회색", roman: "hoesaek", meaningZh: "灰色", meaningEn: "gray", color: "#9ca3af", visual: "◻️", audioUrl: null, slowAudioUrl: null },
  { category: "顏色", ko: "분홍색", roman: "bunhongsaek", meaningZh: "粉红色", meaningEn: "pink", color: "#f9a8d4", visual: "🌸", audioUrl: null, slowAudioUrl: null },
  { category: "顏色", ko: "보라색", roman: "borasaek", meaningZh: "紫色", meaningEn: "purple", color: "#8b5cf6", visual: "🟪", audioUrl: null, slowAudioUrl: null },
  { category: "顏色", ko: "주황색", roman: "juhwangsaek", meaningZh: "橙色", meaningEn: "orange", color: "#f97316", visual: "🟧", audioUrl: null, slowAudioUrl: null },
  { category: "顏色", ko: "갈색", roman: "galsaek", meaningZh: "棕色", meaningEn: "brown", color: "#92400e", visual: "🟫", audioUrl: null, slowAudioUrl: null },
  { category: "顏色", ko: "하늘색", roman: "haneulsaek", meaningZh: "天蓝色", meaningEn: "sky blue", color: "#7dd3fc", visual: "🟦", audioUrl: null, slowAudioUrl: null },
  { category: "顏色", ko: "남색", roman: "namsaek", meaningZh: "深蓝色", meaningEn: "navy", color: "#1e3a8a", visual: "🔷", audioUrl: null, slowAudioUrl: null },
  { category: "顏色", ko: "금색", roman: "geumsaek", meaningZh: "金色", meaningEn: "gold", color: "#facc15", visual: "🟨", audioUrl: null, slowAudioUrl: null },
  { category: "顏色", ko: "은색", roman: "eunsaek", meaningZh: "银色", meaningEn: "silver", color: "#d1d5db", visual: "◽", audioUrl: null, slowAudioUrl: null },
  { category: "顏色", ko: "베이지색", roman: "beijisaek", meaningZh: "米色", meaningEn: "beige", color: "#d6b98c", visual: "🟨", audioUrl: null, slowAudioUrl: null },
  { category: "顏色", ko: "민트색", roman: "minteusaek", meaningZh: "薄荷色", meaningEn: "mint", color: "#99f6e4", visual: "🟩", audioUrl: null, slowAudioUrl: null },
  { category: "顏色", ko: "연두색", roman: "yeondusaek", meaningZh: "浅绿色", meaningEn: "light green", color: "#bef264", visual: "🟩", audioUrl: null, slowAudioUrl: null },
  { category: "顏色", ko: "자주색", roman: "jajusaek", meaningZh: "紫红色", meaningEn: "burgundy", color: "#9f1239", visual: "🟪", audioUrl: null, slowAudioUrl: null },
  { category: "顏色", ko: "청록색", roman: "cheongnoksaek", meaningZh: "青绿色", meaningEn: "teal", color: "#14b8a6", visual: "🟩", audioUrl: null, slowAudioUrl: null },

  { category: "數字", ko: "넷", roman: "net", meaningZh: "四（固有数）", meaningEn: "four native", visual: "4", visualType: "number", audioUrl: null, slowAudioUrl: null },
  { category: "數字", ko: "다섯", roman: "daseot", meaningZh: "五（固有数）", meaningEn: "five native", visual: "5", visualType: "number", audioUrl: null, slowAudioUrl: null },
  { category: "數字", ko: "여섯", roman: "yeoseot", meaningZh: "六（固有数）", meaningEn: "six native", visual: "6", visualType: "number", audioUrl: null, slowAudioUrl: null },
  { category: "數字", ko: "일곱", roman: "ilgop", meaningZh: "七（固有数）", meaningEn: "seven native", visual: "7", visualType: "number", audioUrl: null, slowAudioUrl: null },
  { category: "數字", ko: "여덟", roman: "yeodeol", meaningZh: "八（固有数）", meaningEn: "eight native", visual: "8", visualType: "number", audioUrl: null, slowAudioUrl: null },
  { category: "數字", ko: "아홉", roman: "ahop", meaningZh: "九（固有数）", meaningEn: "nine native", visual: "9", visualType: "number", audioUrl: null, slowAudioUrl: null },
  { category: "數字", ko: "열", roman: "yeol", meaningZh: "十（固有数）", meaningEn: "ten native", visual: "10", visualType: "number", audioUrl: null, slowAudioUrl: null },
  { category: "數字", ko: "일", roman: "il", meaningZh: "一（汉字数）", meaningEn: "one Sino-Korean", visual: "1", visualType: "number", audioUrl: null, slowAudioUrl: null },
  { category: "數字", ko: "이", roman: "i", meaningZh: "二（汉字数）", meaningEn: "two Sino-Korean", visual: "2", visualType: "number", audioUrl: null, slowAudioUrl: null },
  { category: "數字", ko: "삼", roman: "sam", meaningZh: "三（汉字数）", meaningEn: "three Sino-Korean", visual: "3", visualType: "number", audioUrl: null, slowAudioUrl: null },
  { category: "數字", ko: "사", roman: "sa", meaningZh: "四（汉字数）", meaningEn: "four Sino-Korean", visual: "4", visualType: "number", audioUrl: null, slowAudioUrl: null },
  { category: "數字", ko: "오", roman: "o", meaningZh: "五（汉字数）", meaningEn: "five Sino-Korean", visual: "5", visualType: "number", audioUrl: null, slowAudioUrl: null },
  { category: "數字", ko: "육", roman: "yuk", meaningZh: "六（汉字数）", meaningEn: "six Sino-Korean", visual: "6", visualType: "number", audioUrl: null, slowAudioUrl: null },
  { category: "數字", ko: "칠", roman: "chil", meaningZh: "七（汉字数）", meaningEn: "seven Sino-Korean", visual: "7", visualType: "number", audioUrl: null, slowAudioUrl: null },
  { category: "數字", ko: "팔", roman: "pal", meaningZh: "八（汉字数）", meaningEn: "eight Sino-Korean", visual: "8", visualType: "number", audioUrl: null, slowAudioUrl: null },
  { category: "數字", ko: "구", roman: "gu", meaningZh: "九（汉字数）", meaningEn: "nine Sino-Korean", visual: "9", visualType: "number", audioUrl: null, slowAudioUrl: null },
  { category: "數字", ko: "십", roman: "sip", meaningZh: "十（汉字数）", meaningEn: "ten Sino-Korean", visual: "10", visualType: "number", audioUrl: null, slowAudioUrl: null },
  { category: "數字", ko: "스물", roman: "seumul", meaningZh: "二十（固有数）", meaningEn: "twenty native", visual: "20", visualType: "number", audioUrl: null, slowAudioUrl: null },
  { category: "數字", ko: "서른", roman: "seoreun", meaningZh: "三十（固有数）", meaningEn: "thirty native", visual: "30", visualType: "number", audioUrl: null, slowAudioUrl: null },
  { category: "數字", ko: "마흔", roman: "maheun", meaningZh: "四十（固有数）", meaningEn: "forty native", visual: "40", visualType: "number", audioUrl: null, slowAudioUrl: null },
  { category: "數字", ko: "백", roman: "baek", meaningZh: "一百", meaningEn: "one hundred", visual: "100", visualType: "number", audioUrl: null, slowAudioUrl: null },
  { category: "數字", ko: "천", roman: "cheon", meaningZh: "一千", meaningEn: "one thousand", visual: "1000", visualType: "number", audioUrl: null, slowAudioUrl: null },
  { category: "數字", ko: "만", roman: "man", meaningZh: "一万", meaningEn: "ten thousand", visual: "10000", visualType: "number", audioUrl: null, slowAudioUrl: null }
);

const copyGroupByVocabularyCategory = {
  "動物": "動物單字",
  "身體": "身體單字",
  "食物": "食物單字",
  "日常": "日常單字",
  "顏色": "顏色單字",
  "數字": "數字單字"
};

function firstHangulOnsetGlyph(text) {
  const onsetTable = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
  const code = text.charCodeAt(0) - 0xac00;
  if (code < 0 || code > 11171) return "ㅇ";
  return onsetTable[Math.floor(code / (21 * 28))] || "ㅇ";
}

function copyVisualForVocabulary(item) {
  if (item.visual) return item.visual;
  if (item.color) return "■";
  return item.visualType === "number" ? item.visual : "□";
}

vocabularyCopyData = vocabularyVisualItems.map((item) => ({
  group: copyGroupByVocabularyCategory[item.category] || "全部單字",
  ko: item.ko,
  roman: item.roman,
  meaning: `${item.meaningZh} / ${item.meaningEn}`,
  visual: copyVisualForVocabulary(item),
  visualType: item.visualType || null,
  color: item.color || null,
  strokeGlyph: firstHangulOnsetGlyph(item.ko),
  audioUrl: null,
  slowAudioUrl: null
}));

const dictationPool = ["아", "오", "우", "가", "나", "마", "안", "한", "학생", "마리"];
const shadowPool = [
  "안녕하세요? 저는 마리예요.",
  "만나서 반가워요.",
  "저는 학생이에요.",
  "저는 호주 사람이에요."
];
