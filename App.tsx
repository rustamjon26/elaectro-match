import React, { useState } from "react";
import { GameState, QuizQuestion } from "./types";
import { LEVELS, GRID_SIZE, FALLBACK_QUESTIONS } from "./constants";
import { useMatch3 } from "./hooks/useMatch3";
import { Tile } from "./components/Tile";
import { QuizModal } from "./components/QuizModal";
import { MissionPanel } from "./components/MissionPanel";
import { generateQuizQuestions } from "./services/geminiService";
import { Play, RefreshCw, Zap, Cpu, Trophy } from "lucide-react";

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [isQuizLoading, setIsQuizLoading] = useState(false);

  const currentLevelConfig = LEVELS[currentLevelIdx];

  // --- YANGI FUNKSIYA: Tasodifiy savol tanlash ---
  const getRandomFallbackQuestions = (count: number): QuizQuestion[] => {
    // Ro'yxatni aralashtiramiz (Shuffle)
    const shuffled = [...FALLBACK_QUESTIONS].sort(() => 0.5 - Math.random());
    // Kerakli miqdorni kesib olamiz
    return shuffled.slice(0, count);
  };

  const prepareQuiz = async () => {
    if (isQuizLoading) return;
    setIsQuizLoading(true);

    try {
      // 1. Avval API dan olishga urinib ko'ramiz
      const questions = await generateQuizQuestions(
        currentLevelConfig.quizDifficulty,
        currentLevelConfig.activeTokens
      );

      // 2. Agar API dan savol kelsa, o'shani qo'yamiz
      if (questions && questions.length >= 5) {
        setQuizQuestions(questions);
      } else {
        // 3. Agar API ishlamasa, o'zimizdagi ro'yxatdan 5 tasini olamiz
        console.warn("API failed, using fallback questions");
        setQuizQuestions(getRandomFallbackQuestions(5));
      }

      setGameState(GameState.QUIZ);
    } catch (e) {
      // Xatolik bo'lsa ham o'zimizdan 5 tasini olamiz
      console.error("Quiz Error:", e);
      setQuizQuestions(getRandomFallbackQuestions(5));
      setGameState(GameState.QUIZ);
    } finally {
      setIsQuizLoading(false);
    }
  };

  const handleGameOver = () => {
    setGameState((prev) =>
      prev === GameState.PLAYING ? GameState.GAME_OVER : prev
    );
  };

  const {
    board,
    score: levelScore,
    moves,
    goals,
    collected,
    bonusStats,
    selectTile,
    selectedTile,
    initBoard,
  } = useMatch3(
    currentLevelConfig,
    () => {
      // Maqsadlarga erishilganda Kviz boshlanadi
      if (gameState === GameState.PLAYING) prepareQuiz();
    },
    handleGameOver
  );

  const startGame = () => {
    setGameState(GameState.PLAYING);
    initBoard();
  };

  const handleQuizComplete = (quizScore: number) => {
    setTotalScore((s) => s + levelScore + quizScore);
    setGameState(GameState.LEVEL_COMPLETE);
  };

  const nextLevel = () => {
    if (currentLevelIdx < LEVELS.length - 1) {
      setCurrentLevelIdx((p) => p + 1);
      setGameState(GameState.PLAYING);
    } else {
      setGameState(GameState.GAME_OVER);
    }
  };

  // --- Scenes ---

  if (gameState === GameState.START) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-slate-950">
        <div className="scanlines"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#080B11] to-black z-0"></div>
        <div className="z-10 text-center p-8 border border-neon-cyan/30 bg-slate-900/50 backdrop-blur-xl rounded-3xl shadow-[0_0_50px_rgba(0,229,255,0.1)] mx-4">
          <div className="mb-6 flex justify-center text-neon-cyan animate-pulse-fast">
            <Cpu className="w-20 h-20" />
          </div>
          <h1 className="text-4xl md:text-6xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-pink mb-4">
            ELECTRO MATCH
          </h1>
          <p className="text-slate-300 font-mono mb-8 tracking-widest">
            BJT & FET NEON PUZZLE
          </p>
          <button
            onClick={startGame}
            className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-md hover:scale-105 transition-transform"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-pink opacity-20 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-neon-cyan to-neon-pink"></div>
            <span className="relative flex items-center gap-2 text-xl font-bold font-orbitron text-white">
              <Play className="w-5 h-5 fill-current" /> INITIALIZE
            </span>
          </button>
        </div>
      </div>
    );
  }

  if (gameState === GameState.LEVEL_COMPLETE) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white relative">
        <div className="scanlines"></div>
        <div className="p-10 text-center bg-slate-900 border border-neon-green rounded-2xl shadow-[0_0_40px_rgba(0,255,102,0.2)] z-10 mx-4">
          <h2 className="text-3xl md:text-4xl font-orbitron text-neon-green mb-6">
            LEVEL COMPLETE
          </h2>
          <div className="text-5xl md:text-6xl font-bold mb-4">
            {totalScore}
          </div>
          <p className="text-slate-400 mb-8">SYSTEM UPGRADED</p>
          <button
            onClick={nextLevel}
            className="px-8 py-3 bg-neon-green text-black font-bold rounded hover:bg-green-400 transition-colors"
          >
            NEXT SEQUENCE
          </button>
        </div>
      </div>
    );
  }

  // --- MAIN GAME SCENE ---

  return (
    <div className="min-h-screen bg-slate-950 text-white relative flex flex-col items-center py-2 overflow-y-auto overflow-x-hidden touch-none">
      <div className="scanlines"></div>

      {/* MAIN LAYOUT CONTAINER */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 w-full max-w-7xl p-2 lg:p-8">
        {/* LEFT COLUMN: GAMEPLAY AREA */}
        <div className="flex flex-col items-center w-full max-w-[600px]">
          {/* HUD */}
          <div className="w-full px-4 mb-2 flex justify-between items-end">
            <div>
              <h3 className="text-neon-cyan font-orbitron text-xs md:text-sm">
                LEVEL {currentLevelConfig.level}
              </h3>
              <div className="text-2xl md:text-3xl font-bold font-mono">
                {levelScore.toLocaleString()}
              </div>
            </div>

            <div className="flex gap-2">
              {Object.entries(goals).map(
                ([key, val]) =>
                  (val as number) > 0 && (
                    <div
                      key={key}
                      className="flex flex-col items-center bg-slate-900/80 p-1.5 rounded border border-slate-700 min-w-[40px]"
                    >
                      <span className="text-[9px] text-slate-400">{key}</span>
                      <span className="font-bold text-sm text-white">
                        {val}
                      </span>
                    </div>
                  )
              )}
            </div>

            <div className="text-right">
              <h3 className="text-neon-pink font-orbitron text-xs md:text-sm">
                MOVES
              </h3>
              <div
                className={`text-2xl md:text-3xl font-bold font-mono ${
                  moves < 5 ? "text-red-500 animate-pulse" : ""
                }`}
              >
                {moves}
              </div>
            </div>
            <button
              onClick={prepareQuiz}
              className="bg-red-500 px-2 py-1 text-xs font-bold rounded z-50 hover:bg-red-400"
            >
              FORCE QUIZ
            </button>
          </div>

          {/* GRID CONTAINER */}
          <div className="relative p-2 md:p-4 bg-slate-900/50 rounded-xl border border-slate-800 shadow-2xl backdrop-blur-sm aspect-square w-full">
            <div
              className="w-full h-full grid gap-1 md:gap-2 relative"
              style={{
                gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
              }}
            >
              {board.flat().map((tile) => (
                <div
                  key={tile.id}
                  className="relative w-full h-full transition-all duration-300 ease-in-out"
                  style={{
                    gridColumn: tile.col + 1,
                    gridRow: tile.row + 1,
                    zIndex:
                      selectedTile?.r === tile.row &&
                      selectedTile?.c === tile.col
                        ? 50
                        : 1,
                  }}
                >
                  {tile.type !== "EMPTY" && (
                    <Tile
                      tile={tile}
                      isSelected={
                        selectedTile?.r === tile.row &&
                        selectedTile?.c === tile.col
                      }
                      onClick={() => selectTile(tile.row, tile.col)}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Game Over Overlay */}
            {gameState === GameState.GAME_OVER &&
              currentLevelIdx < LEVELS.length - 1 && (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded-xl backdrop-blur-sm z-50">
                  <h2 className="text-3xl text-red-500 font-orbitron mb-4">
                    SYSTEM FAILURE
                  </h2>
                  <p className="mb-4 text-slate-400">Moves Exhausted</p>
                  <button
                    onClick={startGame}
                    className="px-6 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-black transition-colors flex items-center gap-2 rounded"
                  >
                    <RefreshCw className="w-4 h-4" /> REBOOT
                  </button>
                </div>
              )}

            {/* Loading Overlay */}
            {isQuizLoading && (
              <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center rounded-xl backdrop-blur-sm z-50 animate-in fade-in">
                <Zap className="w-12 h-12 text-neon-cyan mb-4 animate-bounce" />
                <h2 className="text-lg font-orbitron text-neon-cyan animate-pulse">
                  GENERATING ASSESSMENT
                </h2>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: MISSION PANEL */}
        <div className="w-full lg:w-auto mt-4 lg:mt-0 animate-in slide-in-from-right-10 fade-in duration-700">
          <MissionPanel
            goals={currentLevelConfig.goals}
            collected={collected}
            bonusStats={bonusStats}
          />
        </div>
      </div>

      {/* Quiz Modal */}
      {gameState === GameState.QUIZ && !isQuizLoading && (
        <QuizModal questions={quizQuestions} onComplete={handleQuizComplete} />
      )}

      {/* Victory Screen */}
      {gameState === GameState.GAME_OVER &&
        currentLevelIdx === LEVELS.length - 1 && (
          <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center text-center p-4">
            <Trophy className="w-24 h-24 text-yellow-400 mb-6 animate-bounce" />
            <h1 className="text-5xl md:text-6xl font-orbitron text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 mb-4">
              MASTER ENGINEER
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              All systems operational. Final Score: {totalScore}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-slate-800 border border-slate-600 hover:border-white transition-colors text-white rounded"
            >
              REBOOT SYSTEM
            </button>
          </div>
        )}
    </div>
  );
};

export default App;
