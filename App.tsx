import React, { useState } from 'react';
import { GameState, QuizQuestion } from './types';
import { LEVELS, GRID_SIZE, FALLBACK_QUESTIONS } from './constants';
import { useMatch3 } from './hooks/useMatch3';
import { Tile } from './components/Tile';
import { QuizModal } from './components/QuizModal';
import { generateQuizQuestions } from './services/geminiService';
import { Play, RefreshCw, Zap, Cpu, Trophy } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [isQuizLoading, setIsQuizLoading] = useState(false);

  const currentLevelConfig = LEVELS[currentLevelIdx];

  const prepareQuiz = async () => {
    if (isQuizLoading) return;
    setIsQuizLoading(true);
    
    try {
      // Fetch questions from Gemini before changing state
      const questions = await generateQuizQuestions(
        currentLevelConfig.quizDifficulty, 
        currentLevelConfig.activeTokens
      );
      
      if (questions && questions.length > 0) {
        setQuizQuestions(questions);
      } else {
        setQuizQuestions(FALLBACK_QUESTIONS);
      }
      
      setGameState(GameState.QUIZ);
    } catch (e) {
      console.error("Failed to load quiz", e);
      setQuizQuestions(FALLBACK_QUESTIONS);
      setGameState(GameState.QUIZ);
    } finally {
      setIsQuizLoading(false);
    }
  };

  const { 
    board, 
    score: levelScore, 
    moves, 
    goals, 
    selectTile, 
    selectedTile, 
    initBoard 
  } = useMatch3(
    currentLevelConfig,
    () => {
       // On Goals Met
       if (gameState === GameState.PLAYING) {
         prepareQuiz();
       }
    },
    () => {
       // Level actually completes after quiz
    }
  );

  const startGame = () => {
    setGameState(GameState.PLAYING);
    initBoard();
  };

  const handleQuizComplete = (quizScore: number) => {
    setTotalScore(s => s + levelScore + quizScore);
    setGameState(GameState.LEVEL_COMPLETE);
  };

  const nextLevel = () => {
    if (currentLevelIdx < LEVELS.length - 1) {
      setCurrentLevelIdx(p => p + 1);
      setGameState(GameState.PLAYING);
    } else {
      // Victory
      setGameState(GameState.GAME_OVER);
    }
  };

  // --- Render Scenes ---

  if (gameState === GameState.START) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
         <div className="scanlines"></div>
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#080B11] to-black z-0"></div>
         
         <div className="z-10 text-center p-8 border border-neon-cyan/30 bg-slate-900/50 backdrop-blur-xl rounded-3xl shadow-[0_0_50px_rgba(0,229,255,0.1)]">
            <div className="mb-6 flex justify-center text-neon-cyan animate-pulse-fast">
              <Cpu className="w-20 h-20" />
            </div>
            <h1 className="text-5xl md:text-7xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-pink mb-4 drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">
              ELECTRO<br/>MATCH
            </h1>
            <p className="text-slate-300 font-mono mb-8 tracking-widest">BJT & FET NEON PUZZLE</p>
            
            <button 
              onClick={startGame}
              className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-md transition-all hover:scale-105"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-neon-cyan to-neon-pink opacity-20 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-neon-cyan to-neon-pink"></div>
              <span className="relative flex items-center gap-2 text-xl font-bold font-orbitron text-white">
                <Play className="w-5 h-5 fill-current" /> INITIALIZE SYSTEM
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
        <div className="p-10 text-center bg-slate-900 border border-neon-green rounded-2xl shadow-[0_0_40px_rgba(0,255,102,0.2)] z-10">
          <h2 className="text-4xl font-orbitron text-neon-green mb-6">LEVEL COMPLETE</h2>
          <div className="text-6xl font-bold mb-4">{totalScore}</div>
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

  return (
    <div className="min-h-screen bg-slate-950 text-white relative flex flex-col items-center py-4">
      <div className="scanlines"></div>
      
      {/* HUD */}
      <div className="w-full max-w-4xl px-4 mb-4 z-10 flex justify-between items-end">
        <div>
          <h3 className="text-neon-cyan font-orbitron text-sm">LEVEL {currentLevelConfig.level}</h3>
          <div className="text-3xl font-bold font-mono">{levelScore.toLocaleString()}</div>
        </div>
        <div className="flex gap-4">
             {Object.entries(goals).map(([key, val]) => (
               (val as number) > 0 && (
                 <div key={key} className="flex flex-col items-center bg-slate-900/80 p-2 rounded border border-slate-700">
                    <span className="text-[10px] text-slate-400">{key}</span>
                    <span className={`font-bold ${val === 0 ? 'text-green-500' : 'text-white'}`}>{val}</span>
                 </div>
               )
             ))}
        </div>
        <div className="text-right">
          <h3 className="text-neon-pink font-orbitron text-sm">MOVES</h3>
          <div className={`text-3xl font-bold font-mono ${moves < 5 ? 'text-red-500 animate-pulse' : ''}`}>
            {moves}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="relative z-10 p-4 bg-slate-900/50 rounded-xl border border-slate-800 shadow-2xl backdrop-blur-sm">
        <div 
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
        >
          {board.map((row, rIdx) => (
            row.map((tile, cIdx) => (
              <div key={`${rIdx}-${cIdx}`} className="w-10 h-10 md:w-14 md:h-14">
                {tile.type !== 'EMPTY' && (
                  <Tile 
                    tile={tile} 
                    isSelected={selectedTile?.r === rIdx && selectedTile?.c === cIdx}
                    onClick={() => selectTile(rIdx, cIdx)} 
                  />
                )}
              </div>
            ))
          ))}
        </div>
        
        {/* Game Over Overlay inside Grid */}
        {moves <= 0 && gameState === GameState.PLAYING && (
           <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded-xl backdrop-blur-sm z-20">
              <h2 className="text-3xl text-red-500 font-orbitron mb-4">SYSTEM FAILURE</h2>
              <button onClick={startGame} className="px-6 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-black transition-colors flex items-center gap-2">
                <RefreshCw className="w-4 h-4" /> RETRY
              </button>
           </div>
        )}

        {/* Loading Overlay */}
        {isQuizLoading && (
           <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center rounded-xl backdrop-blur-sm z-30 animate-in fade-in duration-300">
              <Zap className="w-12 h-12 text-neon-cyan mb-4 animate-bounce" />
              <h2 className="text-xl font-orbitron text-neon-cyan animate-pulse">GENERATING ASSESSMENT...</h2>
              <p className="text-xs text-slate-400 font-mono mt-2">ANALYZING CIRCUIT MASTERY</p>
           </div>
        )}
      </div>

      {/* Quiz Modal */}
      {gameState === GameState.QUIZ && !isQuizLoading && (
        <QuizModal questions={quizQuestions} onComplete={handleQuizComplete} />
      )}
      
      {gameState === GameState.GAME_OVER && currentLevelIdx === LEVELS.length - 1 && (
         <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center text-center p-4">
             <Trophy className="w-24 h-24 text-yellow-400 mb-6 animate-bounce" />
             <h1 className="text-6xl font-orbitron text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 mb-4">
               MASTER ENGINEER
             </h1>
             <p className="text-xl text-slate-400 mb-8">All systems operational. Final Score: {totalScore}</p>
             <button onClick={() => window.location.reload()} className="px-8 py-4 bg-slate-800 border border-slate-600 hover:border-white transition-colors text-white">
                REBOOT SYSTEM
             </button>
         </div>
      )}
    </div>
  );
};

export default App;