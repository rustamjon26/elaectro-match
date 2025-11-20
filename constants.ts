import { LevelConfig, TokenType } from './types';

export const GRID_SIZE = 8;

export const TOKEN_COLORS: Record<string, string> = {
  [TokenType.BJT]: 'text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]',
  [TokenType.FET]: 'text-fuchsia-400 drop-shadow-[0_0_10px_rgba(232,121,249,0.8)]',
  [TokenType.GAIN]: 'text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.8)]',
  [TokenType.HIGH_Z]: 'text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]',
  [TokenType.SWITCH]: 'text-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.8)]',
  [TokenType.NOISE]: 'text-gray-500 animate-pulse',
  [TokenType.LOCK]: 'text-red-500',
  [TokenType.STATIC_FIELD]: 'text-blue-800',
};

export const LEVELS: LevelConfig[] = [
  {
    level: 1,
    moves: 20,
    activeTokens: [TokenType.BJT, TokenType.FET, TokenType.GAIN],
    goals: { [TokenType.BJT]: 5, [TokenType.FET]: 5, [TokenType.GAIN]: 5 },
    mechanics: { noiseChance: 0, lockChance: 0, staticChance: 0 },
    quizDifficulty: 'Easy'
  },
  {
    level: 2,
    moves: 22,
    activeTokens: [TokenType.BJT, TokenType.FET, TokenType.GAIN, TokenType.HIGH_Z],
    goals: { [TokenType.BJT]: 6, [TokenType.FET]: 6, [TokenType.GAIN]: 6, [TokenType.HIGH_Z]: 4 },
    mechanics: { noiseChance: 0.05, lockChance: 0, staticChance: 0 },
    quizDifficulty: 'Medium'
  },
  {
    level: 3,
    moves: 24,
    activeTokens: [TokenType.BJT, TokenType.FET, TokenType.GAIN, TokenType.HIGH_Z, TokenType.SWITCH],
    goals: { [TokenType.BJT]: 7, [TokenType.FET]: 7, [TokenType.GAIN]: 7, [TokenType.HIGH_Z]: 7, [TokenType.SWITCH]: 7 },
    mechanics: { noiseChance: 0.05, lockChance: 0.03, staticChance: 0 },
    quizDifficulty: 'Medium'
  },
  {
    level: 4,
    moves: 25,
    activeTokens: [TokenType.BJT, TokenType.FET, TokenType.GAIN, TokenType.HIGH_Z, TokenType.SWITCH],
    goals: { [TokenType.BJT]: 10, [TokenType.FET]: 10, [TokenType.GAIN]: 10 },
    mechanics: { noiseChance: 0.08, lockChance: 0.05, staticChance: 0.02 },
    quizDifficulty: 'Hard'
  },
  {
    level: 5,
    moves: 30,
    activeTokens: [TokenType.BJT, TokenType.FET, TokenType.GAIN, TokenType.HIGH_Z, TokenType.SWITCH],
    goals: { [TokenType.BJT]: 15, [TokenType.FET]: 15, [TokenType.GAIN]: 15, [TokenType.HIGH_Z]: 15, [TokenType.SWITCH]: 15 },
    mechanics: { noiseChance: 0.1, lockChance: 0.1, staticChance: 0.05 },
    quizDifficulty: 'Expert'
  }
];

export const FALLBACK_QUESTIONS = [
  {
    question: "What are the three terminals of a BJT?",
    options: ["Base, Collector, Emitter", "Gate, Source, Drain", "Anode, Cathode, Gate", "Input, Output, Ground"],
    correctIndex: 0,
    explanation: "Bipolar Junction Transistors have a Base, Collector, and Emitter."
  },
  {
    question: "What does FET stand for?",
    options: ["Field Effect Transistor", "Fast Electric Transfer", "Frequency Emitting Tube", "Faraday Electric Test"],
    correctIndex: 0,
    explanation: "FET stands for Field Effect Transistor, a device that uses an electric field to control current."
  },
  {
    question: "Which law relates Voltage, Current, and Resistance?",
    options: ["Ohm's Law", "Moore's Law", "Kirchhoff's Law", "Newton's Law"],
    correctIndex: 0,
    explanation: "Ohm's Law (V=IR) describes the relationship between voltage, current, and resistance."
  }
];
