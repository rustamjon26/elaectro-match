export enum TokenType {
  BJT = 'BJT',
  FET = 'FET',
  GAIN = 'GAIN',
  HIGH_Z = 'HIGH_Z',
  SWITCH = 'SWITCH',
  NOISE = 'NOISE',
  LOCK = 'LOCK',
  STATIC_FIELD = 'STATIC_FIELD',
  EMPTY = 'EMPTY'
}

export enum GameState {
  START = 'START',
  PLAYING = 'PLAYING',
  QUIZ = 'QUIZ',
  LEVEL_COMPLETE = 'LEVEL_COMPLETE',
  GAME_OVER = 'GAME_OVER'
}

export interface Tile {
  id: string;
  type: TokenType;
  row: number;
  col: number;
  isMatched?: boolean;
  isNew?: boolean; // For spawn animation
  locked?: boolean;
}

export interface LevelConfig {
  level: number;
  moves: number;
  goals: Record<string, number>; // e.g. { BJT: 5, FET: 5 }
  activeTokens: TokenType[];
  mechanics: {
    noiseChance: number;
    lockChance: number;
    staticChance: number;
  };
  quizDifficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
}

export interface QuizQuestion {
  question: string;
  options: string[]; // 4 options
  correctIndex: number; // 0-3
  explanation?: string;
}
