import { useState, useEffect, useRef } from "react";
import { Tile, TokenType, LevelConfig, BonusStats } from "../types";
import { GRID_SIZE } from "../constants";
import { v4 as uuidv4 } from "uuid";
import { useSound } from "./useSound";

const createTile = (
  row: number,
  col: number,
  types: TokenType[],
  mechanics: LevelConfig["mechanics"]
): Tile => {
  let type = types[Math.floor(Math.random() * types.length)];
  const rand = Math.random();
  let locked = false;

  if (rand < mechanics.noiseChance) type = TokenType.NOISE;
  else if (rand < mechanics.noiseChance + mechanics.lockChance) {
    locked = true;
    if (type === TokenType.NOISE) type = types[0];
  } else if (
    rand <
    mechanics.noiseChance + mechanics.lockChance + mechanics.staticChance
  ) {
    type = TokenType.STATIC_FIELD;
  }

  return {
    id: uuidv4(),
    type,
    row,
    col,
    isMatched: false,
    isNew: true,
    locked,
  };
};

export const useMatch3 = (
  levelConfig: LevelConfig,
  onGoalMet: () => void,
  onGameOver: () => void
) => {
  const [board, setBoard] = useState<Tile[][]>([]);
  const [selectedTile, setSelectedTile] = useState<{
    r: number;
    c: number;
  } | null>(null);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(levelConfig.moves);
  const [goals, setGoals] = useState<Record<string, number>>({
    ...levelConfig.goals,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [comboMultiplier, setComboMultiplier] = useState(1);

  // Statistika
  const [collected, setCollected] = useState<Record<string, number>>({});
  const [bonusStats, setBonusStats] = useState<BonusStats>({
    noiseDestroyed: 0,
    locksUnlocked: 0,
    maxCombo: 0,
  });

  const { play } = useSound();
  const isMounted = useRef(true);

  // 1. Level yuklanganda o'yinni boshlash
  useEffect(() => {
    isMounted.current = true;
    initBoard();
    return () => {
      isMounted.current = false;
    };
  }, [levelConfig]);

  // 2. G'ALABANI TEKSHIRISH (Siz so'ragan qism shu yerda)
  useEffect(() => {
    if (!isMounted.current) return;

    const totalInitialGoals = Object.values(levelConfig.goals).reduce(
      (a, b) => a + b,
      0
    );
    const remainingGoals = Object.values(goals).reduce((a, b) => a + b, 0);

    // Agar ochko > 0 bo'lsa va maqsadlar 0 bo'lsa -> YUTDI
    if (score > 0 && totalInitialGoals > 0 && remainingGoals <= 0) {
      const timer = setTimeout(() => {
        onGoalMet();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [goals, levelConfig, score]); // Goals yoki Score o'zgarganda ishlaydi

  const initBoard = () => {
    const newBoard: Tile[][] = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      const row: Tile[] = [];
      for (let c = 0; c < GRID_SIZE; c++) {
        let tile = createTile(
          r,
          c,
          levelConfig.activeTokens,
          levelConfig.mechanics
        );
        while (
          (c >= 2 &&
            tile.type === row[c - 1].type &&
            tile.type === row[c - 2].type) ||
          (r >= 2 &&
            tile.type === newBoard[r - 1][c].type &&
            tile.type === newBoard[r - 2][c].type)
        ) {
          tile = createTile(
            r,
            c,
            levelConfig.activeTokens,
            levelConfig.mechanics
          );
        }
        row.push(tile);
      }
      newBoard.push(row);
    }
    setBoard(newBoard);
    setScore(0);
    setMoves(levelConfig.moves);
    setGoals({ ...levelConfig.goals });
    setCollected({});
    setBonusStats({ noiseDestroyed: 0, locksUnlocked: 0, maxCombo: 0 });
    setSelectedTile(null);
    setIsProcessing(false);
  };

  const findMatches = (currentBoard: Tile[][]) => {
    const matches: { r: number; c: number }[] = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE - 2; c++) {
        const t1 = currentBoard[r][c];
        const t2 = currentBoard[r][c + 1];
        const t3 = currentBoard[r][c + 2];
        if (
          t1.type !== TokenType.NOISE &&
          t1.type !== TokenType.EMPTY &&
          t1.type !== TokenType.STATIC_FIELD &&
          t1.type === t2.type &&
          t1.type === t3.type
        ) {
          matches.push({ r, c }, { r, c: c + 1 }, { r, c: c + 2 });
        }
      }
    }
    for (let c = 0; c < GRID_SIZE; c++) {
      for (let r = 0; r < GRID_SIZE - 2; r++) {
        const t1 = currentBoard[r][c];
        const t2 = currentBoard[r + 1][c];
        const t3 = currentBoard[r + 2][c];
        if (
          t1.type !== TokenType.NOISE &&
          t1.type !== TokenType.EMPTY &&
          t1.type !== TokenType.STATIC_FIELD &&
          t1.type === t2.type &&
          t1.type === t3.type
        ) {
          matches.push({ r, c }, { r: r + 1, c }, { r: r + 2, c });
        }
      }
    }
    return matches.filter(
      (v, i, a) => a.findIndex((t) => t.r === v.r && t.c === v.c) === i
    );
  };

  const updateGoals = (matchedTiles: Tile[]) => {
    setGoals((prev) => {
      const next = { ...prev };
      matchedTiles.forEach((t) => {
        if (next[t.type] !== undefined && next[t.type] > 0) {
          next[t.type]--;
        }
      });
      return next;
    });
  };

  const handleGravity = async (boardState: Tile[][]) => {
    if (!isMounted.current) return;
    await new Promise((r) => setTimeout(r, 300));
    if (!isMounted.current) return;

    const newBoard = boardState.map((row) => row.map((t) => ({ ...t })));

    // Tozalash
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (newBoard[r][c].isMatched) {
          newBoard[r][c].type = TokenType.EMPTY;
          newBoard[r][c].isMatched = false;
          newBoard[r][c].locked = false;
        }
      }
    }

    // Tushirish
    for (let c = 0; c < GRID_SIZE; c++) {
      let emptySlots = 0;
      for (let r = GRID_SIZE - 1; r >= 0; r--) {
        if (newBoard[r][c].type === TokenType.EMPTY) {
          emptySlots++;
        } else if (emptySlots > 0) {
          newBoard[r + emptySlots][c] = {
            ...newBoard[r][c],
            row: r + emptySlots,
          };
          newBoard[r][c] = { ...newBoard[r][c], type: TokenType.EMPTY };
        }
      }
      for (let r = 0; r < emptySlots; r++) {
        newBoard[r][c] = createTile(
          r,
          c,
          levelConfig.activeTokens,
          levelConfig.mechanics
        );
      }
    }

    setBoard(newBoard);

    // Kaskad effektlari
    setTimeout(() => {
      if (!isMounted.current) return;
      const matches = findMatches(newBoard);
      if (matches.length > 0) {
        setComboMultiplier((prev) => prev + 1);
        processMatches(newBoard, matches);
      } else {
        setComboMultiplier(1);
        setIsProcessing(false);

        // O'yin tugashini tekshirish (faqat yutqazish sharti)
        if (moves <= 0) {
          setGoals((currentGoals) => {
            const remaining = Object.values(currentGoals).reduce(
              (a, b) => a + b,
              0
            );
            if (remaining > 0) {
              onGameOver();
            }
            return currentGoals;
          });
        }
      }
    }, 350);
  };

  const processMatches = (
    currentBoard: Tile[][],
    matches: { r: number; c: number }[]
  ) => {
    if (matches.length > 0) {
      play("match");
    }

    const newBoard = currentBoard.map((row) => row.map((t) => ({ ...t })));
    const matchedTiles: Tile[] = [];
    let noiseCount = 0;
    let unlockCount = 0;

    matches.forEach(({ r, c }) => {
      if (!newBoard[r][c].isMatched) {
        newBoard[r][c].isMatched = true;
        matchedTiles.push(newBoard[r][c]);
      }

      // Atrofdagi kataklarni tekshirish (Lock, Noise)
      const adj = [
        { r: r + 1, c },
        { r: r - 1, c },
        { r, c: c + 1 },
        { r, c: c - 1 },
      ];
      adj.forEach((a) => {
        if (a.r >= 0 && a.r < GRID_SIZE && a.c >= 0 && a.c < GRID_SIZE) {
          if (newBoard[a.r][a.c].locked) {
            newBoard[a.r][a.c].locked = false;
            unlockCount++;
          }
          if (newBoard[a.r][a.c].type === TokenType.NOISE) {
            newBoard[a.r][a.c].isMatched = true;
            noiseCount++;
          }
        }
      });
    });

    setBonusStats((prev) => ({
      noiseDestroyed: prev.noiseDestroyed + noiseCount,
      locksUnlocked: prev.locksUnlocked + unlockCount,
      maxCombo: Math.max(prev.maxCombo, comboMultiplier),
    }));

    setCollected((prev) => {
      const next = { ...prev };
      matchedTiles.forEach((t) => {
        next[t.type] = (next[t.type] || 0) + 1;
      });
      return next;
    });

    setBoard(newBoard);
    setScore((prev) => prev + matches.length * 10 * comboMultiplier);

    updateGoals(matchedTiles); // Maqsadlarni kamaytirish
    handleGravity(newBoard); // Grativatsiya
  };

  const selectTile = async (r: number, c: number) => {
    if (isProcessing) return;
    if (
      board[r][c].type === TokenType.NOISE ||
      board[r][c].type === TokenType.STATIC_FIELD ||
      board[r][c].locked
    )
      return;

    if (!selectedTile) {
      setSelectedTile({ r, c });
      play("click");
      return;
    }

    const { r: r1, c: c1 } = selectedTile;
    if (r1 === r && c1 === c) {
      setSelectedTile(null);
      return;
    }

    const isAdj = Math.abs(r1 - r) + Math.abs(c1 - c) === 1;
    if (!isAdj) {
      setSelectedTile({ r, c });
      return;
    }

    setIsProcessing(true);
    setSelectedTile(null);
    play("move");

    const tempBoard = board.map((row) => row.map((t) => ({ ...t })));
    const t1 = tempBoard[r1][c1];
    const t2 = tempBoard[r][c];
    tempBoard[r1][c1] = { ...t2, row: r1, col: c1 };
    tempBoard[r][c] = { ...t1, row: r, col: c };
    setBoard(tempBoard);

    setTimeout(() => {
      const matches = findMatches(tempBoard);
      if (matches.length > 0) {
        setMoves((prev) => prev - 1);
        processMatches(tempBoard, matches);
      } else {
        setBoard(board);
        setIsProcessing(false);
      }
    }, 300);
  };

  return {
    board,
    score,
    moves,
    goals,
    collected,
    bonusStats,
    selectTile,
    selectedTile,
    initBoard,
  };
};
