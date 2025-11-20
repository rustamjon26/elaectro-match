import { LevelConfig, TokenType, QuizQuestion } from "./types";

export const GRID_SIZE = 8;

export const TOKEN_COLORS: Record<string, string> = {
  [TokenType.BJT]: "text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]",
  [TokenType.FET]:
    "text-fuchsia-400 drop-shadow-[0_0_10px_rgba(232,121,249,0.8)]",
  [TokenType.GAIN]:
    "text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.8)]",
  [TokenType.HIGH_Z]:
    "text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]",
  [TokenType.SWITCH]:
    "text-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.8)]",
  [TokenType.NOISE]: "text-gray-500 animate-pulse",
  [TokenType.LOCK]: "text-red-500",
  [TokenType.STATIC_FIELD]: "text-blue-800",
};

// Yurishlar soni kamaytirilgan versiya
export const LEVELS: LevelConfig[] = [
  {
    level: 1,
    moves: 3,
    activeTokens: [TokenType.BJT, TokenType.FET, TokenType.GAIN],
    goals: { [TokenType.BJT]: 5, [TokenType.FET]: 5, [TokenType.GAIN]: 5 },
    mechanics: { noiseChance: 0, lockChance: 0, staticChance: 0 },
    quizDifficulty: "Easy",
  },
  {
    level: 2,
    moves: 18,
    activeTokens: [
      TokenType.BJT,
      TokenType.FET,
      TokenType.GAIN,
      TokenType.HIGH_Z,
    ],
    goals: {
      [TokenType.BJT]: 8,
      [TokenType.FET]: 8,
      [TokenType.GAIN]: 6,
      [TokenType.HIGH_Z]: 4,
    },
    mechanics: { noiseChance: 0.05, lockChance: 0, staticChance: 0 },
    quizDifficulty: "Medium",
  },
  {
    level: 3,
    moves: 20,
    activeTokens: [
      TokenType.BJT,
      TokenType.FET,
      TokenType.GAIN,
      TokenType.HIGH_Z,
      TokenType.SWITCH,
    ],
    goals: {
      [TokenType.BJT]: 10,
      [TokenType.FET]: 10,
      [TokenType.GAIN]: 8,
      [TokenType.HIGH_Z]: 6,
      [TokenType.SWITCH]: 5,
    },
    mechanics: { noiseChance: 0.05, lockChance: 0.03, staticChance: 0 },
    quizDifficulty: "Medium",
  },
  {
    level: 4,
    moves: 22,
    activeTokens: [
      TokenType.BJT,
      TokenType.FET,
      TokenType.GAIN,
      TokenType.HIGH_Z,
      TokenType.SWITCH,
    ],
    goals: { [TokenType.BJT]: 12, [TokenType.FET]: 12, [TokenType.GAIN]: 10 },
    mechanics: { noiseChance: 0.08, lockChance: 0.05, staticChance: 0.02 },
    quizDifficulty: "Hard",
  },
  {
    level: 5,
    moves: 25,
    activeTokens: [
      TokenType.BJT,
      TokenType.FET,
      TokenType.GAIN,
      TokenType.HIGH_Z,
      TokenType.SWITCH,
    ],
    goals: {
      [TokenType.BJT]: 15,
      [TokenType.FET]: 15,
      [TokenType.GAIN]: 15,
      [TokenType.HIGH_Z]: 10,
      [TokenType.SWITCH]: 10,
    },
    mechanics: { noiseChance: 0.1, lockChance: 0.1, staticChance: 0.05 },
    quizDifficulty: "Expert",
  },
];

// Savollar ro'yxati (To'liq)
export const FALLBACK_QUESTIONS: QuizQuestion[] = [
  {
    question: "BT ning ishlash rejimi nechta?",
    options: ["5ta", "3ta", "4ta", "2ta"],
    correctIndex: 1,
  },
  {
    question: "Bipolyar tranzistorda baza elektrodining vazifasi nima?",
    options: [
      "Emitter va kollektor orasidagi tokni boshqarish",
      "Kuchlanishni pasaytirish",
      "Tokni kuchaytirish",
      "Tranzistorni sovutish",
    ],
    correctIndex: 0,
  },
  {
    question: "n-p-n tranzistorda tok qaysi yo‘nalishda oqadi?",
    options: [
      "Baza–emitter tomon",
      "Baza–kollektor tomon",
      "Kollektordan emitterga",
      "Emitterdan kollektor tomon",
    ],
    correctIndex: 3,
  },
  {
    question:
      "Bipolyar tranzistorning β kuchaytirish koeffitsienti nimani bildiradi?",
    options: [
      "Kollektor tokining baza tokiga nisbati",
      "Kollektor kuchlanishini",
      "Baza kuchlanishini",
      "Emitter kuchlanishini",
    ],
    correctIndex: 0,
  },
  {
    question: "Bipolyar tranzistor to‘yinish holatida qanday ishlaydi?",
    options: [
      "Kollektor va emitter orasida to‘liq tok oqadi",
      "Tranzistor o‘chirilgan bo‘ladi",
      "Baza-emitter kuchlanishi nolga teng bo‘ladi",
      "Kollektor-baza kuchlanishi katta bo‘ladi",
    ],
    correctIndex: 0,
  },
  {
    question: "Bipolyar tranzistorning 'berk' holati nimani anglatadi?",
    options: [
      "Tranzistor to‘yingan holat",
      "Baza toki yo‘q va tranzistor yopiq",
      "Tranzistor maksimal tokni uzatadi",
      "Tranzistor kuchaytirish holatida",
    ],
    correctIndex: 1,
  },
  {
    question: "Bipolyar tranzistorda aktiv rejim qanday holatni bildiradi?",
    options: [
      "Baza-emitter kuchlanishi ijobiy, kollektor-baza kuchlanishi salbiy",
      "Tranzistor to‘yingan holat",
      "Kollektor-emitter kuchlanishi nol",
      "Tranzistor o‘chirilgan holat",
    ],
    correctIndex: 0,
  },
  {
    question:
      "Bipolyar tranzistorning ishlashiga ta’sir qiluvchi asosiy omil nima?",
    options: [
      "Kollektor tokining yo‘nalishi",
      "Baza tokining mavjudligi",
      "Emitter kuchlanishi",
      "Kollektor kuchlanishi",
    ],
    correctIndex: 1,
  },
  {
    question: "p-n-p tranzistorda tok qaysi yo‘nalishda harakat qiladi?",
    options: [
      "Kollektordan emitterga",
      "Baza–kollektor tomon",
      "Emitterdan kollektor tomon",
      "Baza–emitter tomon",
    ],
    correctIndex: 0,
  },
  {
    question: "Bipolyar tranzistorning termal barqarorligi nimaga bog‘liq?",
    options: [
      "Baza kuchlanishiga",
      "Kollektor-emitter kuchlanishiga",
      "Tranzistorning ichki tuzilishiga",
      "Kollektor tokiga",
    ],
    correctIndex: 2,
  },
  {
    question: "Yarimo’tkazgichli diodga to‘g‘ri ta’rif bering:",
    options: [
      "Ikkita diodli elektron asbob",
      "Elektrodlari anod va katod",
      "Ikkita elektrodli elektron asbob",
      "O‘zgaruvchan tokni o‘zgarmas tokka aylantiradi",
    ],
    correctIndex: 2,
  },
  {
    question: "Rasmda qanday diod keltirilgan?",
    options: [
      "Yarimo‘tkazgichli diod",
      "Optron diod",
      "Fotodiod",
      "To‘g‘rilovchi diod",
    ],
    correctIndex: 0,
  },
  {
    question: "O‘tish 3-elektrod orqali boshqariladigan diod qaysi?",
    options: ["Tiristor diod", "Foto diod", "Optron diod", "Tunel diod"],
    correctIndex: 0,
  },
  {
    question:
      "Elektronlar p–n o‘tishdan p-sohaga harakatlanganda qanday tok hosil bo‘ladi?",
    options: [
      "To‘g‘ri tok",
      "Teskari tok",
      "Aralash tok",
      "Tok hosil bo‘lmaydi",
    ],
    correctIndex: 0,
  },
  {
    question: "Qaysi diod 1.2 mm – 1.74 μm diapazonda nurlantiradi?",
    options: ["Sariq", "Yashil", "UV", "IQ (infraqizil)"],
    correctIndex: 3,
  },
  {
    question:
      "Quyidagi ta’rif qaysi diodga tegishli: 'Yorug‘likni elektr tokiga aylantiradi'?",
    options: ["Tiristor diod", "Nurlanuvchi diod", "Fotodiod", "Optron diod"],
    correctIndex: 2,
  },
  {
    question: "Stabilitron diod qaysi?",
    options: ["A", "B", "C", "D"],
    correctIndex: 2,
  },
  {
    question: "Shottki diodning xususiyati qaysi?",
    options: [
      "Optik signallarni uzatadi",
      "Teskari ulanadi",
      "Diffuziya yo‘q, tezkor injeksiya bilan bog‘liq",
      "Yorug‘likni tokka aylantiradi",
    ],
    correctIndex: 2,
  },
  {
    question: "Bu rasm qaysi diodga tegishli?",
    options: ["Varikap diod", "Shottki diod", "Tunel diod", "Stabilitron diod"],
    correctIndex: 1,
  },
  {
    question: "Bu qanday sxema? (Darlington/Uilson faylidan)",
    options: [
      "Ulison tok ko‘zgusi",
      "Aktiv tok transformatori",
      "Darlingtong juftligi",
      "Tarkibiy transistor",
    ],
    correctIndex: 2,
  },
  {
    question:
      "Natijaviy tok bo‘yicha kuchaytirish koeffitsienti qanday topiladi?",
    options: ["I1 × I2", "I1 + I2", "β1 + β2", "β1 × β2"],
    correctIndex: 3,
  },
  {
    question:
      "Eng ko‘p ishlatiladigan tranzistor kaskadlari qaysi ulanish asosida?",
    options: [
      "Umumiy emitter / umumiy istok",
      "Umumiy zatvor / umumiy istok",
      "Umumiy baza / umumiy zatvor",
      "Umumiy stok / umumiy istok",
    ],
    correctIndex: 0,
  },
  {
    question:
      "Kuchlanish bo‘yicha kuchaytirishni oshirish uchun eng yaxshi yechim?",
    options: [
      "β1 va β2 maksimal bo‘lishi",
      "I1 dan I2 ga qarshilik berish",
      "Rk yoki Rs yuklama o‘rniga tok manbasi ishlatish",
      "Barcha javoblar to‘g‘ri",
    ],
    correctIndex: 2,
  },
  {
    question: "Emitter toki va kollektor toki qanday munosabatda?",
    options: [
      "Emitter toki kollektor tokidan ikki baravar",
      "O‘zaro bog‘liq emas",
      "Ikkalasi deyarli teng",
      "Emitter toki kollektor tokining yarmi",
    ],
    correctIndex: 2,
  },
  {
    question: "Ikki kirishli kuchaytirgich nima deb ataladi?",
    options: [
      "Operatsion kuchaytirgich",
      "Differensial kuchaytirgich",
      "Kaskadli kuchaytirgich",
      "Chastota kuchaytirgich",
    ],
    correctIndex: 1,
  },
  {
    question: "Differensial kuchaytirgichning asosiy vazifasi nima?",
    options: [
      "Chastotani oshirish",
      "Ikki signal farqini kuchaytirish",
      "Kuchlanishni stabilizatsiya qilish",
      "Tokni o‘lchash",
    ],
    correctIndex: 1,
  },
  {
    question:
      "Differensial kuchaytirgichning chiqish signali qanday hosil bo‘ladi?",
    options: [
      "Kirish signallari yig‘indisidan",
      "Kirish signallari farqidan",
      "Bir kirish signalidan",
      "Filtrlangan signalidan",
    ],
    correctIndex: 1,
  },
  {
    question:
      "Differensial kuchaytirgich odatda qaysi elementlar asosida quriladi?",
    options: ["Diodlar", "Transistorlar", "Relelar", "Transformatorlar"],
    correctIndex: 1,
  },
  {
    question:
      "Differensial kuchaytirgichning ideal kirish qarshiligi qanday bo‘ladi?",
    options: ["Juda kichik", "Juda katta", "Nol", "O‘rtacha"],
    correctIndex: 1,
  },
  {
    question: "Differensial kuchaytirgichning kirishlari qanday nomlanadi?",
    options: [
      "Aktiv va passiv",
      "Asosiy va yordamchi",
      "Invertor va neinvertor kirishlar",
      "Analog va raqamli",
    ],
    correctIndex: 2,
  },
  {
    question: "Differensial kuchaytirgichni simmetrik qilish uchun nima muhim?",
    options: [
      "Tranzistorlarning β koeffitsienti bir xil bo‘lishi",
      "Chiqish qarshiligi katta bo‘lishi",
      "Faqat bir kirishdan foydalanish",
      "Chastota filtri bo‘lishi",
    ],
    correctIndex: 0,
  },
  {
    question:
      "Differensial kuchaytirgichning differensial kuchaytirish koeffitsienti nimani bildiradi?",
    options: [
      "Chiqish kuchlanishining umumiy rejimga nisbatini",
      "Kirish signallari ayirmasiga nisbatan kuchaytirishni",
      "Chastota diapazonini",
      "Tok kuchini oshirish qobiliyatini",
    ],
    correctIndex: 1,
  },
  {
    question:
      "Differensial kuchaytirgichlar qaysi qurilmalarda keng qo‘llaniladi?",
    options: [
      "Zaxira batareyalarda",
      "Audio kuchaytirgichlarda",
      "Optik tolalarda",
      "Rele tizimlarida",
    ],
    correctIndex: 1,
  },
  {
    question:
      "Maydoniy tranzistorda zaryad tashuvchilar kanalga kiradigan qismi nima deyiladi?",
    options: ["Zatvor", "Istok", "Stok", "Baza"],
    correctIndex: 1,
  },
  {
    question:
      "Maydoniy tranzistorda boshqaruvchi kuchlanish beriladigan elektrod nima deyiladi?",
    options: ["Zatvor", "Istok", "Stok", "Emitter"],
    correctIndex: 0,
  },
  {
    question:
      "Kanalning ko‘ndalang kesimi nolga teng bo‘ladigan paytdagi zatvor kuchlanishi nima deyiladi?",
    options: [
      "Berkilish kuchlanishi",
      "To‘yinish rejimi",
      "To‘yinish kuchlanishi",
      "Ishchi rejim",
    ],
    correctIndex: 0,
  },
  {
    question: "Umumiy istok ulanish sxemasi qaysi?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
  },
  {
    question: "Maydoniy tranzistorlarning nechta ish rejimi bor?",
    options: ["5 ta", "3 ta", "4 ta", "2 ta"],
    correctIndex: 1,
  },
  {
    question:
      "Zatvordagi musbat kuchlanish berilganda stok toki ortsa, bu qanday rejim?",
    options: [
      "Boyitilgan rejim",
      "Kambag‘allashgan rejim",
      "To‘yinish rejimi",
      "Berk rejim",
    ],
    correctIndex: 0,
  },
  {
    question:
      "Zatvordagi manfiy kuchlanish ortishi stok tokini kamaytirsa, bu qanday rejim?",
    options: [
      "Berk rejim",
      "To‘yinish rejimi",
      "Kambag‘allashgan rejim",
      "Boyitilgan rejim",
    ],
    correctIndex: 2,
  },
  {
    question:
      "Kanalning ko‘ndalang kesimi nol bo‘ladigan stok kuchlanishi nima deyiladi?",
    options: [
      "Berkilish kuchlanishi",
      "Kambag‘allashgan kuchlanish",
      "Boyitilgan kuchlanish",
      "To‘yinish kuchlanishi",
    ],
    correctIndex: 3,
  },
  {
    question: "Qaysi tranzistorda n-p o‘tish mavjud?",
    options: ["n-p o‘tish", "p-n o‘tish", "n-p-n o‘tish", "p-n-p o‘tish"],
    correctIndex: 0,
  },
  {
    question:
      "MDYA tranzistorda kanal induksiyalangan bo‘lsa, bu qanday belgi bilan ifodalanadi?",
    options: [
      "Kanali qurilgan",
      "Kanal induksiyalangan",
      "Kovagi qurilgan",
      "Kovagi induksiyalangan",
    ],
    correctIndex: 1,
  },
  {
    question: "MDYA tranzistorda kovagi qurilgan bo‘lsa, bu qanday belgi?",
    options: [
      "Kanali qurilgan",
      "Kanal induksiyalangan",
      "Kovagi qurilgan",
      "Kovagi induksiyalangan",
    ],
    correctIndex: 2,
  },
  {
    question: "UI ulanish qaysi kanal turiga tegishli?",
    options: [
      "UI – kanal induksiyalangan",
      "US – kanal qurilgan",
      "UI – kanal qurilgan",
      "US – kanal induksiyalangan",
    ],
    correctIndex: 0,
  },
  {
    question: "US ulanish qaysi kanal turiga mansub?",
    options: [
      "US – induksiyalangan",
      "US – qurilgan",
      "UI – qurilgan",
      "UI – induksiyalangan",
    ],
    correctIndex: 1,
  },
  {
    question:
      "Darlington juftligining natijaviy kirish qarshiligi qanday bo‘ladi?",
    options: [
      "Juda katta",
      "Juda kichik",
      "β2 ga teng",
      "Ikki baravar kamayadi",
    ],
    correctIndex: 0,
  },
  {
    question:
      "Wilson tok ko‘zgusida chiqish toki barqaror bo‘lishi uchun nima kerak?",
    options: [
      "Emitter toki doimiy bo‘lishi",
      "Qarshilik o‘zgarmasligi",
      "Barqaror bo‘lishi mumkin emas",
      "Baza toki doimiy bo‘lishi",
    ],
    correctIndex: 0,
  },
  {
    question: "Darlington juftligi qaysi turdagi sxema?",
    options: [
      "Shiklai juftligi",
      "Darlington juftligi",
      "Uilson juftligi",
      "Aktiv transformator",
    ],
    correctIndex: 1,
  },
  {
    question:
      "Differensial kuchaytirgichning nechta ulanish turi amalda qo‘llaniladi?",
    options: ["6 xil", "5 xil", "4 xil", "3 xil"],
    correctIndex: 2,
  },
  {
    question:
      "Differensial kuchaytirgichning ulanish turlari qaysi javobda to‘liq ko‘rsatilgan?",
    options: [
      "Simmetrik kirish va chiqish, Simmetrik kirish va nosimmetrik chiqish, Nosimmetrik kirish va simmetrik chiqish, Nosimmetrik kirish va chiqish",
      "Simmetrik kirish va chiqish, Nosimmetrik kirish va chiqish",
      "Simmetrik kirish va nosimmetrik chiqish, Nosimmetrik kirish va simmetrik chiqish",
      "Simmetrik kirish va chiqish, Simmetrik kirish va nosimmetrik chiqish",
    ],
    correctIndex: 0,
  },
  {
    question: "Rasmda DKning qanday ulanish turi tasvirlangan?",
    options: [
      "Simmetrik kirish va chiqish",
      "Nosimmetrik kirish va chiqish",
      "Simmetrik kirish va nosimmetrik chiqish",
      "Nosimmetrik kirish va simmetrik chiqish",
    ],
    correctIndex: 0,
  },
  {
    question:
      "Quyidagi rasmda qaysi differensial kuchaytirgich sxemasi tasvirlangan?",
    options: [
      "Simmetrik kirish va chiqishli",
      "Nosimmetrik kirish va simmetrik chiqishli",
      "Dinamik yuklamali",
      "Nosimmetrik kirish va chiqishli",
    ],
    correctIndex: 2,
  },
  {
    question: "Tarkibiy tranzistorlar asosidagi DK sxemasini toping",
    options: ["A", "B", "C", "D"],
    correctIndex: 2,
  },
  {
    question: "DKning asosiy parametrlari berilgan javobni toping",
    options: [
      "Differensial va sinfaz signallarni kuchaytirish koeffitsiyentlari",
      "Sinfaz tashkil etuvchini so‘ndirish koeffitsiyenti",
      "Kirish va chiqish qarshiliklari",
      "Hamma javoblar to‘g‘ri",
    ],
    correctIndex: 3,
  },
  {
    question: "Quyidagi rasmda DKning qaysi sxemasi keltirilgan?",
    options: [
      "Dinamik yuklamali",
      "Tarkibiy tranzistorli DK",
      "Nosimmetrik kirish va chiqishli",
      "DK va uning ekvivalent sxemasi",
    ],
    correctIndex: 3,
  },
  {
    question:
      "MAYDONIY TRANZISTOR: zaryad tashuvchilarning kanaladan ketish sohasi nima deb ataladi?",
    options: ["Zatvor", "Istok", "Stok", "Baza"],
    correctIndex: 2,
  },
  {
    question: "Zaryad tashuvchilar kanalga kiradigan sohasi nima deb ataladi?",
    options: ["Zatvor", "Istok", "Stok", "Baza"],
    correctIndex: 1,
  },
  {
    question:
      "Kanalning ko‘ndalang kesimi nolga teng bo‘lgan paytdagi zatvor kuchlanishi nima deyiladi?",
    options: [
      "Berkilish kuchlanishi",
      "To‘yinish rejimi",
      "To‘yinish kuchlanishi",
      "Ishchi rejim",
    ],
    correctIndex: 0,
  },
  {
    question:
      "Quyidagi formula qaysi parametrga tegishli? (Differensial qarshilik)",
    options: [
      "Ichki differensial qarshilik",
      "Kuchlanish bo‘yicha kuchaytirish koeffitsiyenti",
      "Diferensial tiklik",
      "Xarakteristika tikligi",
    ],
    correctIndex: 0,
  },
  {
    question:
      "Quyidagi formula qaysi parametrga tegishli? (Tiklik xarakteristikasi)",
    options: [
      "Tiklik xarakteristikasi",
      "Kuchlanish kuchaytirish koeffitsiyenti",
      "Ichki differensial qarshilik",
      "Kuchlanishning xususiy qarshiligi",
    ],
    correctIndex: 0,
  },
  {
    question: "Quyidagi formula qaysi birining formulasi?",
    options: [
      "Tiklik xarakteristikasi",
      "Ichki differensial qarshilik",
      "Kuchlanish bo‘yicha kuchaytirish koeffitsiyenti",
      "Tok kuchining xususiy qarshiligi",
    ],
    correctIndex: 2,
  },
  {
    question: "Bu rasm maydoniy tranzistorning qaysi ulanish sxemasi?",
    options: ["Umumiy istok", "Umumiy stok", "Umumiy zatvor", "Umumiy baza"],
    correctIndex: 0,
  },
  {
    question: "Bu qanday ulanish?",
    options: ["Umumiy zatvor", "Umumiy istok", "Umumiy stok", "Umumiy baza"],
    correctIndex: 2,
  },
  {
    question: "Bu qanday ulanish hisoblanadi?",
    options: ["Umumiy istok", "Umumiy zatvor", "Umumiy stok", "Umumiy emitter"],
    correctIndex: 1,
  },
  {
    question:
      "Tranzistorda istok va stok orasidagi kanal tayyorlash jarayonida hosil bo‘lsa, bu qanday tranzistor?",
    options: [
      "Izolyatsiyalangan",
      "Istok izolyatsiyalangan",
      "Zatvori qurilgan",
      "Kanali qurilgan",
    ],
    correctIndex: 3,
  },
  {
    question: "Maydoniy tranzistorning boyitilgan rejimi qachon yuz beradi?",
    options: [
      "Zatvorga musbat kuchlanish berilganda",
      "Zatvorga manfiy kuchlanish berilganda",
      "Stok kuchlanishi ortganda",
      "Tok kamayganda",
    ],
    correctIndex: 0,
  },
  {
    question: "Maydoniy tranzistorning kambag‘allashgan rejimi qachon?",
    options: [
      "Zatvorga manfiy kuchlanish berilganda",
      "Zatvorga musbat kuchlanish berilganda",
      "Stok kuchlanishi kritik bo‘lganda",
      "To‘yinish holati yuz berganda",
    ],
    correctIndex: 0,
  },
  {
    question:
      "Bu MDYA tranzistor belgisida nimani bildiradi? (Kanal induksiyalangan)",
    options: [
      "Kanali qurilgan",
      "Kanal induksiyalangan",
      "Kovagi qurilgan",
      "Kovagi induksiyalangan",
    ],
    correctIndex: 1,
  },
  {
    question:
      "Bu MDYA tranzistor belgisida nimani bildiradi? (Kovagi qurilgan)",
    options: [
      "Kanali qurilgan",
      "Kanal induksiyalangan",
      "Kovagi qurilgan",
      "Kovagi induksiyalangan",
    ],
    correctIndex: 2,
  },
  {
    question: "US ulanish va kanal turi qaysi javobda to‘g‘ri?",
    options: [
      "US – induksiyalangan",
      "US – qurilgan",
      "UI – qurilgan",
      "UI – induksiyalangan",
    ],
    correctIndex: 1,
  },
  {
    question: "UI ulanish qaysi kanal turiga to‘g‘ri keladi?",
    options: [
      "UI – induksiyalangan",
      "US – qurilgan",
      "UI – qurilgan",
      "US – induksiyalangan",
    ],
    correctIndex: 0,
  },
  {
    question:
      "BTda tok hosil bo‘lishida necha xil zaryad tashuvchilar ishtirok etadi?",
    options: [
      "Elektronlar va ionlar",
      "Aniyonlar va katiyonlar",
      "Elektronlar va kovaklar",
      "Ionlar va kovaklar",
    ],
    correctIndex: 2,
  },
  {
    question: "Quyidagi grafik qaysi diodning VAX chizig‘i?",
    options: ["Shottki diod", "Stabilitron diod", "Tunel diod", "Varikap diod"],
    correctIndex: 2,
  },
  {
    question: "Quyidagi diod qaysi turga mansub?",
    options: [
      "Shottki diod",
      "Varikap diod",
      "To‘g‘irlovchi diod",
      "Tunel diod",
    ],
    correctIndex: 1,
  },
  {
    question:
      "Keltirilgan dioddagi belgilar kirganda va chiqqanda qaysi mos keladi?",
    options: [
      "Kirganda – nurlanuvchi, chiqanda – fotodiod",
      "Kirganda va chiqqanda fotodiod",
      "Kirganda va chiqqanda nurlanuvchi",
      "Kirganda – fotodiod, chiqanda – nurlanuvchi",
    ],
    correctIndex: 3,
  },
  {
    question: "Diodning statik qarshilik formulasi qaysi?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
  },
  {
    question: "Bu qanday grafik?",
    options: [
      "Diodning to‘g‘ri ulanish grafigi",
      "Diodning FCHX",
      "Diodning VAX",
      "Diodning ACHX",
    ],
    correctIndex: 2,
  },
  {
    question: "Bu diodda qaysi ulanish keltirilgan?",
    options: [
      "Yarimo‘tkazgichli ulanish",
      "To‘g‘ri ulanish",
      "Parallel ulanish",
      "Teskari ulanish",
    ],
    correctIndex: 1,
  },
  {
    question: "Bu qanday sxema hisoblanadi? (Darlington/Uilson mavzusi)",
    options: [
      "Ulison tok ko‘zgusi",
      "Aktiv tok transformatori",
      "Darlington juftligi",
      "Tarkibiy transistor",
    ],
    correctIndex: 0,
  },
  {
    question:
      "Natijaviy kirish qarshiligi taxminan qanday bo‘ladi? (Uilson/Darlington)",
    options: ["A", "B", "C", "D"],
    correctIndex: 2,
  },
  {
    question:
      "Ikkita tranzistor ketma-ket ulanganida natijaviy tok kuchaytirish koeffitsienti qanday topiladi?",
    options: ["I1 × I2", "I1 + I2", "β1 + β2", "β1 × β2"],
    correctIndex: 3,
  },
  {
    question:
      "Darlington juftligida VT1 emitter toki VT2 kuchaytirishiga qanday ta’sir qiladi?",
    options: [
      "Tok kuchlanishiga bog‘liq",
      "Kuchlanish koeffitsienti bilan bog‘liq",
      "Differensialga bog‘liq",
      "Kuchlanish-qarshilik bog‘liqligiga bog‘liq",
    ],
    correctIndex: 3,
  },
  {
    question: "Tok manbalari qurishda ko‘p ishlatiladigan kaskadlar qaysilar?",
    options: [
      "Umumiy emitter – umumiy istok",
      "Umumiy zatvor – umumiy istok",
      "Umumiy baza – umumiy zatvor",
      "Umumiy stok – umumiy istok",
    ],
    correctIndex: 0,
  },
  {
    question:
      "Ryukl yuklama qarshiligi o‘zgarmaganda emitter zanjiridagi tokka ta’siri qanday?",
    options: [
      "Kollektor toki ham o‘zgarmaydi",
      "Emitter toki ham o‘zgarmaydi",
      "Kollektor toki ham o‘zgaradi",
      "Emitter toki ham o‘zgaradi",
    ],
    correctIndex: 0,
  },
  {
    question: "Ikki kollektor tokini barqarorlashtirish uchun nima kerak?",
    options: [
      "Emitter toki doimiy bo‘lishi kerak",
      "Qarshilik o‘zgarmasligi kerak",
      "Barqarorlik mumkin emas",
      "Baza toki doimiy bo‘lishi kerak",
    ],
    correctIndex: 0,
  },
  {
    question:
      "Transistor VT2 haroratining o‘zgarishi emitter-baza kuchlanishiga qanday ta’sir qiladi?",
    options: [
      "Kuchlanish pasayadi",
      "Kuchlanish ortadi",
      "Qarshilik kamayadi",
      "Qarshilik ortadi",
    ],
    correctIndex: 0,
  },
  {
    question: "Bu qanday sxema? (Darlington/Uilson/Yuklama)",
    options: [
      "Darlington juftligi",
      "Uilson tok ko‘zgusi",
      "Aktiv tok transformatori",
      "Analog kuchaytirgich",
    ],
    correctIndex: 1,
  },
  {
    question: "Qurilmaning kirish toki uchun qaysi munosabat o‘rinli?",
    options: ["A", "B", "C", "D"],
    correctIndex: 0,
  },
  {
    question:
      "Tok ko‘zgusini barqarorlashtirish uchun rezistor nima hosil qiladi?",
    options: [
      "Chiqish tokida salbiy teskari aloqa",
      "Chiqish tokida salbiy to‘g‘ri aloqa",
      "Chiqishda salbiy tok",
      "Musbat aloqa",
    ],
    correctIndex: 0,
  },
  {
    question: "Quyidagi formula nimaga tegishli? (Kirish qarshiligi / Uzatish)",
    options: [
      "Kirish qarshiligi",
      "Chiqish uzatuvchanligi",
      "Tok bo‘yicha uzatish koeffitsiyenti",
      "Teskari bog‘lanish koeffitsiyenti",
    ],
    correctIndex: 0,
  },
  {
    question: "Bu formula qaysi parametrni bildiradi?",
    options: [
      "Kirish qarshiligi",
      "Chiqish uzatuvchanligi",
      "Tok bo‘yicha uzatish koeffitsiyenti",
      "Teskari bog‘lanish",
    ],
    correctIndex: 1,
  },
  {
    question:
      "Bu formulada nimaning ifodasi berilgan? (β uzatish koeffitsient)",
    options: [
      "Kirish qarshiligi",
      "Chiqish uzatuvchanligi",
      "Tok bo‘yicha uzatish koeffitsiyenti",
      "Teskari bog‘lanish",
    ],
    correctIndex: 2,
  },
  {
    question: "Bu formulada nima ifodalangan?",
    options: [
      "Kirish qarshiligi",
      "Chiqish o‘tkazuvchanligi",
      "Tok bo‘yicha uzatish koeffitsiyenti",
      "Teskari bog‘lanish koeffitsiyenti",
    ],
    correctIndex: 1,
  },
  {
    question:
      "Bu qanday sxema? (Shiklai / Darlington / Uilson / Transformator)",
    options: [
      "Shiklai juftligi",
      "Darlington juftligi",
      "Uilson juftligi",
      "Aktiv transformator",
    ],
    correctIndex: 0,
  },
  {
    question: "Bu qanday sxema?",
    options: [
      "Shiklai juftligi",
      "Darlington juftligi",
      "Uilson juftligi",
      "Aktiv transformator",
    ],
    correctIndex: 3,
  },
];
