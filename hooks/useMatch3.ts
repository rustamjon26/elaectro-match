import { useState, useEffect, useCallback, useRef } from 'react';
import { Tile, TokenType, LevelConfig } from '../types';
import { GRID_SIZE } from '../constants';
import { v4 as uuidv4 } from 'uuid';

const createTile = (row: number, col: number, types: TokenType[], mechanics: LevelConfig['mechanics']): Tile => {
  let type = types[Math.floor(Math.random() * types.length)];
  
  // Spawn mechanics
  const rand = Math.random();
  let locked = false;
  
  if (rand < mechanics.noiseChance) type = TokenType.NOISE;
  else if (rand < mechanics.noiseChance + mechanics.lockChance) {
     // Lock usually applies to a normal token, but let's make it a distinct property
     locked = true;
     // Ensure type is matchable if locked
     if (type === TokenType.NOISE) type = types[0]; 
  } else if (rand < mechanics.noiseChance + mechanics.lockChance + mechanics.staticChance) {
      type = TokenType.STATIC_FIELD;
  }

  return {
    id: uuidv4(),
    type,
    row,
    col,
    isMatched: false,
    isNew: true,
    locked
  };
};

export const useMatch3 = (levelConfig: LevelConfig, onGoalMet: () => void, onLevelComplete: () => void) => {
  const [board, setBoard] = useState<Tile[][]>([]);
  const [selectedTile, setSelectedTile] = useState<{r: number, c: number} | null>(null);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(levelConfig.moves);
  const [goals, setGoals] = useState<Record<string, number>>({...levelConfig.goals});
  const [isProcessing, setIsProcessing] = useState(false);
  const [comboMultiplier, setComboMultiplier] = useState(1);

  // Initialize Board
  useEffect(() => {
    initBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelConfig]);

  const initBoard = () => {
    const newBoard: Tile[][] = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      const row: Tile[] = [];
      for (let c = 0; c < GRID_SIZE; c++) {
        let tile = createTile(r, c, levelConfig.activeTokens, levelConfig.mechanics);
        // Prevent initial matches
        while (
          (c >= 2 && tile.type === row[c - 1].type && tile.type === row[c - 2].type) ||
          (r >= 2 && tile.type === newBoard[r - 1][c].type && tile.type === newBoard[r - 2][c].type)
        ) {
          tile = createTile(r, c, levelConfig.activeTokens, levelConfig.mechanics);
        }
        row.push(tile);
      }
      newBoard.push(row);
    }
    setBoard(newBoard);
    setScore(0);
    setMoves(levelConfig.moves);
    setGoals({...levelConfig.goals});
    setSelectedTile(null);
  };

  const findMatches = (currentBoard: Tile[][]) => {
    const matches: {r: number, c: number}[] = [];
    
    // Horizontal
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE - 2; c++) {
        const t1 = currentBoard[r][c];
        const t2 = currentBoard[r][c+1];
        const t3 = currentBoard[r][c+2];
        if (t1.type !== TokenType.NOISE && t1.type !== TokenType.EMPTY && t1.type !== TokenType.STATIC_FIELD &&
            t1.type === t2.type && t1.type === t3.type) {
          matches.push({r, c}, {r, c: c+1}, {r, c: c+2});
        }
      }
    }

    // Vertical
    for (let c = 0; c < GRID_SIZE; c++) {
      for (let r = 0; r < GRID_SIZE - 2; r++) {
        const t1 = currentBoard[r][c];
        const t2 = currentBoard[r+1][c];
        const t3 = currentBoard[r+2][c];
        if (t1.type !== TokenType.NOISE && t1.type !== TokenType.EMPTY && t1.type !== TokenType.STATIC_FIELD &&
            t1.type === t2.type && t1.type === t3.type) {
          matches.push({r, c}, {r: r+1, c}, {r: r+2, c});
        }
      }
    }

    // Filter unique matches
    const uniqueMatches = matches.filter((v, i, a) => a.findIndex(t => t.r === v.r && t.c === v.c) === i);
    return uniqueMatches;
  };

  const updateGoals = (matchedTiles: Tile[]) => {
    setGoals(prev => {
      const next = { ...prev };
      let anyGoalMet = false;
      matchedTiles.forEach(t => {
        if (next[t.type] && next[t.type] > 0) {
          next[t.type]--;
          anyGoalMet = true;
        }
      });
      if (anyGoalMet) {
         // Check if all goals are zero
         const remaining = Object.values(next).reduce((a: number, b: number) => a + b, 0);
         if (remaining <= 0) setTimeout(onGoalMet, 500);
      }
      return next;
    });
  };

  const handleGravity = async (boardState: Tile[][]) => {
    // Delay for explosion animation
    await new Promise(r => setTimeout(r, 300));

    const newBoard = boardState.map(row => row.map(t => ({ ...t })));

    // Remove matched tiles
    for(let r=0; r<GRID_SIZE; r++) {
        for(let c=0; c<GRID_SIZE; c++) {
            if(newBoard[r][c].isMatched) {
                newBoard[r][c].type = TokenType.EMPTY;
                newBoard[r][c].isMatched = false;
                newBoard[r][c].locked = false;
            }
        }
    }

    // Shift down
    for (let c = 0; c < GRID_SIZE; c++) {
      let emptySlots = 0;
      for (let r = GRID_SIZE - 1; r >= 0; r--) {
        if (newBoard[r][c].type === TokenType.EMPTY) {
          emptySlots++;
        } else if (emptySlots > 0) {
          // Move tile down
          newBoard[r + emptySlots][c] = { ...newBoard[r][c], row: r + emptySlots };
          newBoard[r][c] = { ...newBoard[r][c], type: TokenType.EMPTY }; // temporarily empty
        }
      }
      
      // Fill top with new tiles
      for (let r = 0; r < emptySlots; r++) {
        newBoard[r][c] = createTile(r, c, levelConfig.activeTokens, levelConfig.mechanics);
      }
    }

    setBoard(newBoard);
    
    // Cascading matches
    setTimeout(() => {
        const matches = findMatches(newBoard);
        if (matches.length > 0) {
            setComboMultiplier(prev => prev + 1);
            processMatches(newBoard, matches);
        } else {
            setComboMultiplier(1);
            setIsProcessing(false);
        }
    }, 350);
  };

  const processMatches = (currentBoard: Tile[][], matches: {r: number, c: number}[]) => {
    const newBoard = currentBoard.map(row => row.map(t => ({ ...t })));
    const matchedTiles: Tile[] = [];

    matches.forEach(({r, c}) => {
      if(!newBoard[r][c].isMatched) {
        newBoard[r][c].isMatched = true;
        matchedTiles.push(newBoard[r][c]);
      }
      
      // Unlock adjacent locked tiles
      const adj = [
          {r: r+1, c}, {r: r-1, c}, {r, c: c+1}, {r, c: c-1}
      ];
      adj.forEach(a => {
          if(a.r >= 0 && a.r < GRID_SIZE && a.c >= 0 && a.c < GRID_SIZE) {
              if(newBoard[a.r][a.c].locked) {
                  newBoard[a.r][a.c].locked = false; // Unlock
              }
          }
      });
    });

    setBoard(newBoard);
    setScore(prev => prev + (matches.length * 10 * comboMultiplier));
    updateGoals(matchedTiles);

    handleGravity(newBoard);
  };

  const selectTile = async (r: number, c: number) => {
    if (isProcessing) return;
    if (board[r][c].type === TokenType.NOISE || board[r][c].type === TokenType.STATIC_FIELD || board[r][c].locked) return;

    if (!selectedTile) {
      setSelectedTile({ r, c });
      return;
    }

    const { r: r1, c: c1 } = selectedTile;
    
    // Deselect if same
    if (r1 === r && c1 === c) {
      setSelectedTile(null);
      return;
    }

    // Check adjacency
    const isAdj = Math.abs(r1 - r) + Math.abs(c1 - c) === 1;
    if (!isAdj) {
      setSelectedTile({ r, c });
      return;
    }

    // Perform Swap
    setIsProcessing(true);
    setSelectedTile(null);

    const tempBoard = board.map(row => row.map(t => ({ ...t })));
    
    // Swap types and IDs to keep React keys consistent if possible, or just swap data
    const t1 = tempBoard[r1][c1];
    const t2 = tempBoard[r][c];
    
    tempBoard[r1][c1] = { ...t2, row: r1, col: c1 };
    tempBoard[r][c] = { ...t1, row: r, col: c };

    setBoard(tempBoard);

    // Check Matches
    const matches = findMatches(tempBoard);

    if (matches.length > 0) {
      setMoves(prev => Math.max(0, prev - 1));
      if (moves - 1 <= 0) {
           // Game over logic handled in useEffect in component usually, but here we just stop
           // In a real game, we'd check if goals are met first.
      }
      setTimeout(() => processMatches(tempBoard, matches), 300);
    } else {
      // Swap back
      setTimeout(() => {
        setBoard(board);
        setIsProcessing(false);
      }, 400);
    }
  };

  return {
    board,
    score,
    moves,
    goals,
    selectTile,
    selectedTile,
    initBoard
  };
};