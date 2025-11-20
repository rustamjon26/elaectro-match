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

export const LEVELS: LevelConfig[] = [
  {
    level: 1,
    moves: 34, // <--- 3 EMAS, 25 TA YURISH (O'ynash uchun yetarli)
    activeTokens: [TokenType.BJT, TokenType.FET, TokenType.GAIN],
    goals: { [TokenType.BJT]: 40, [TokenType.FET]: 40, [TokenType.GAIN]: 40 }, // 10 tadan yig'ish kerak
    mechanics: { noiseChance: 0, lockChance: 0, staticChance: 0 },
    quizDifficulty: "Easy",
  },
  {
    level: 2,
    moves: 30,
    activeTokens: [
      TokenType.BJT,
      TokenType.FET,
      TokenType.GAIN,
      TokenType.HIGH_Z,
    ],
    goals: {
      [TokenType.BJT]: 30,
      [TokenType.FET]: 30,
      [TokenType.GAIN]: 30,
      [TokenType.HIGH_Z]: 30,
    },
    mechanics: { noiseChance: 0.05, lockChance: 0, staticChance: 0 },
    quizDifficulty: "Medium",
  },
  // ... Qolgan levellar o'zgarishsiz qolsa ham bo'ladi
  {
    level: 3,
    moves: 26,
    activeTokens: [
      TokenType.BJT,
      TokenType.FET,
      TokenType.GAIN,
      TokenType.HIGH_Z,
      TokenType.SWITCH,
    ],
    goals: {
      [TokenType.BJT]: 25,
      [TokenType.FET]: 25,
      [TokenType.GAIN]: 25,
      [TokenType.HIGH_Z]: 25,
      [TokenType.SWITCH]: 25,
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
    goals: { [TokenType.BJT]: 30, [TokenType.FET]: 30, [TokenType.GAIN]: 30 },
    mechanics: { noiseChance: 0.08, lockChance: 0.05, staticChance: 0.02 },
    quizDifficulty: "Hard",
  },
  {
    level: 5,
    moves: 20,
    activeTokens: [
      TokenType.BJT,
      TokenType.FET,
      TokenType.GAIN,
      TokenType.HIGH_Z,
      TokenType.SWITCH,
    ],
    goals: {
      [TokenType.BJT]: 40,
      [TokenType.FET]: 40,
      [TokenType.GAIN]: 40,
      [TokenType.HIGH_Z]: 40,
      [TokenType.SWITCH]: 40,
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
    question:
      "BJTning aktiv rejimida kollektor toki qaysi parametr orqali deyarli to‘liq boshqariladi?",
    options: [
      "Baza toki",
      "Kollektor kuchlanishi",
      "Emitter kuchlanishi",
      "β ning harorati",
    ],
    correctIndex: 0,
  },
  {
    question:
      "Kollektor-Jem birikmasi teskari ulangan holatda BJT qanday xususiyat beradi?",
    options: [
      "Katta kirish qarshiligi",
      "To‘g‘ri yo‘nalgan katta tok",
      "Kichik chiqish qarshiligi",
      "Termik shovqinning kamayishi",
    ],
    correctIndex: 0,
  },
  {
    question: "β (hFE) ning katta bo‘lishi qaysi holatda foydali bo‘ladi?",
    options: [
      "Kuchaytirgichning kirish toki minimal bo‘lishi kerak bo‘lganda",
      "Tranzistorni to‘yingan rejimga o‘tkazishda",
      "Yuklamani kamaytirishda",
      "Kollektor toki nolga yaqin bo‘lganda",
    ],
    correctIndex: 0,
  },
  {
    question:
      "BJTning termik qochishi (thermal runaway) nima sababdan yuzaga keladi?",
    options: [
      "Kollektor toki oshishi bilan issiqlik ortadi va yana tok oshadi",
      "Baza toki nolga teng bo‘lganda",
      "Kichik kuchlanishda ishlaganda",
      "Emitter qarshiligi juda kattaligidan",
    ],
    correctIndex: 0,
  },
  {
    question:
      "Emitterga qo‘yilgan rezistor BJT stabilizatsiyasida qanday rol o‘ynaydi?",
    options: [
      "Salbiy teskari aloqa hosil qiladi",
      "Musbat aloqa hosil qiladi",
      "Kuchlanishni ikki barobar oshiradi",
      "Baza tokini to‘liq uzib qo‘yadi",
    ],
    correctIndex: 0,
  },
  {
    question:
      "MOSFETda kanal hosil bo‘lishi uchun qanday shart bajarilishi kerak?",
    options: [
      "VGS > Vth bo‘lishi",
      "VDS = 0 bo‘lishi",
      "ID = 0 bo‘lishi",
      "GS qatlamlari teskari ulanadi",
    ],
    correctIndex: 0,
  },
  {
    question:
      "MOSFETning kirish qarshiligi juda katta bo‘lishiga asosiy sabab nima?",
    options: [
      "Gate oksid qatlami izolyator",
      "Drenajning dopingi kuchli",
      "Kanal past harakatlanish tezlikka ega",
      "Substrat qarshiligi nolga teng",
    ],
    correctIndex: 0,
  },
  {
    question: "JFET yopilish kuchlanishi (VGS(off)) nimani bildiradi?",
    options: [
      "Kanal to‘liq yopiladigan gate kuchlanishi",
      "Drenaj toki maksimal bo‘ladigan kuchlanish",
      "Gate zaryadi ikki barobar bo‘lishi",
      "Substrat toki yo‘qolishi",
    ],
    correctIndex: 0,
  },
  {
    question:
      "MOSFETni to‘yingan rejimga o‘tkazish uchun odatda qanday shart bajariladi?",
    options: ["VDS > VGS - Vth", "VDS < VGS", "ID = 0", "VDS = 0"],
    correctIndex: 0,
  },
  {
    question: "FETlarda shovqin kam bo‘lishiga sabab nima?",
    options: [
      "Gate orqali tok oqmaydi",
      "Kanal dopingi katta",
      "Substrat harorati past",
      "Drain qarshiligi o‘zgaruvchan",
    ],
    correctIndex: 0,
  },
  {
    question:
      "Kuchaytirgichning ochiq kontur kuchaytirish koeffitsienti (AOL) deganda nima tushuniladi?",
    options: [
      "Teskari aloqa ulanmagan holatdagi kuchaytirish",
      "Yuklama ulangan holatdagi kuchlanish oshishi",
      "Signal shaklini moslashtirish darajasi",
      "Signalning kirishdagi shovqin darajasi",
    ],
    correctIndex: 0,
  },
  {
    question: "Teskari aloqa kuchaytirgichda qaysi xususiyatni yaxshilaydi?",
    options: [
      "Barqarorlik",
      "Shovqinni oshiradi",
      "Gainni cheksiz oshiradi",
      "Fazoviy kechikishni yo‘q qiladi",
    ],
    correctIndex: 0,
  },
  {
    question: "Differensial kuchaytirgichning eng katta afzalligi nimada?",
    options: [
      "Umumiy rejimdagi shovqinni rad etish",
      "Kirish qarshiligini kamaytirish",
      "Kollektor quvvatini oshirish",
      "Yuklamani teskari ulash",
    ],
    correctIndex: 0,
  },
  {
    question: "Gain banda (A·f) nima bildiradi?",
    options: [
      "Kuchaytirgichning gain va chastota chegarasining ko‘paytmasi",
      "Signalning faza o‘zgarishi",
      "Tokning garmonik tarkibi",
      "Kirish bo‘g‘inining qarshiligi",
    ],
    correctIndex: 0,
  },
  {
    question: "Operational amplifierda slew rate nimani belgilaydi?",
    options: [
      "Chiqish signalining maksimal o‘zgarish tezligi",
      "Kirish ferrit induktivligi",
      "Feedback qarshiligini",
      "Kollektor toki qiymatini",
    ],
    correctIndex: 0,
  },
  {
    question: "High-Z holat qaysi qurilmada eng ko‘p uchraydi?",
    options: [
      "Tristate bufferda",
      "Kuch transformatorida",
      "Induktiv yuklamada",
      "NPN to‘yingan rejimida",
    ],
    correctIndex: 0,
  },
  {
    question: "High-Z holatning asosiy vazifasi?",
    options: [
      "Shinadan butunlay uzilish yaratish",
      "Signalni kuchaytirish",
      "Tokni oshirish",
      "Fazani sinxronlash",
    ],
    correctIndex: 0,
  },
  {
    question: "Digital busda moslashuvchan ulanish uchun High-Z nima beradi?",
    options: [
      "Uchta qurilma bir xil shinaga bog‘lanishi mumkin",
      "Signal chastotasini oshiradi",
      "Raqamli shovqinni kamaytiradi",
      "Kuchlanishni ikki barobar oshiradi",
    ],
    correctIndex: 0,
  },
  {
    question: "Tristate chiqishning uchinchi holati nimani anglatadi?",
    options: [
      "Chiqish elektr jihatdan uzilgan",
      "Chiqish past darajada",
      "Chiqish yuqori darajada",
      "Signal inversiya qilingan",
    ],
    correctIndex: 0,
  },
  {
    question: "CMOS kirish qismi High-Z bo‘lishiga nima sabab?",
    options: [
      "Gate oksidi tok o‘tkazmaydi",
      "Drain yuqori impedansga ega",
      "Substrat nurlanadi",
      "Gate kirish doimo to‘yingan",
    ],
    correctIndex: 0,
  },
  {
    question:
      "Tranzistorning switch rejimida ishlashi uchun qanday shart bajariladi?",
    options: [
      "To‘yingan va yopiq rejimlar orasida almashadi",
      "Faqat aktiv rejimda turadi",
      "Kollektor toki doimiy bo‘ladi",
      "Baza toki nolga teng bo‘ladi",
    ],
    correctIndex: 0,
  },
  {
    question: "To‘yingan rejimdagi BJTning asosiy belgisi?",
    options: [
      "Kollektor–baza birikmasi to‘g‘ri ulanadi",
      "Gate kuchlanishi oshadi",
      "Emitter toki nolga teng",
      "Kanal yopiladi",
    ],
    correctIndex: 0,
  },
  {
    question: "MOSFET switch sifatida ishlaganda eng muhim parametr?",
    options: ["Rds(on)", "Vgs(off)", "β qiymati", "Leakage current"],
    correctIndex: 0,
  },
  {
    question: "Tranzistorning cutoff rejimi nimani anglatadi?",
    options: [
      "Barcha tok deyarli nol",
      "Kuchlanish maksimal",
      "Kollektor oqimi ikki barobar",
      "Gate kuchlanishi oshgan",
    ],
    correctIndex: 0,
  },
  {
    question:
      "PWM boshqaruvida tranzistor switch sifatida ishlashi uchun nima talab qilinadi?",
    options: [
      "Juda tez ochilib-yopilishi",
      "Har doim aktiv rejimda bo‘lishi",
      "Kirish qarshiligini oshirish",
      "Termik barqarorlikni kamaytirish",
    ],
    correctIndex: 0,
  },
  {
    question: "MOSFETni yuqori quvvatda ishlatishda qaysi xavf eng kattadir?",
    options: [
      "SOA (safe operating area) dan chiqib ketish",
      "Gate kuchlanishining nolga teng bo‘lishi",
      "Drain kuchlanishining pastligi",
      "Tristate signal berilishi",
    ],
    correctIndex: 0,
  },
  {
    question: "Switching loss qaysi holatda eng katta bo‘ladi?",
    options: [
      "Tranzistor oraliq rejimda vaqt o‘tkazganda",
      "Cutoff rejimida",
      "To‘yingan rejimda",
      "High-Z holatda",
    ],
    correctIndex: 0,
  },
  {
    question:
      "Induktiv yuklama bilan tranzistorni o‘chirishda nima talab qilinadi?",
    options: [
      "Flyback diod",
      "Gate qarshiligi nolga teng bo‘lishi",
      "Kollektor kuchlanishi past bo‘lishi",
      "Shina qarshiligini oshirish",
    ],
    correctIndex: 0,
  },
  {
    question:
      "Logik daraja mos kelmasligida MOSFET chiqishi ishlamaslik sababi?",
    options: [
      "VGS yetarli darajada ochilmaydi",
      "Drain kuchlanishi noldir",
      "ID maksimalga chiqadi",
      "Gate kichik quvvat iste'mol qiladi",
    ],
    correctIndex: 0,
  },
];
