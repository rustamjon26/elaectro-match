

import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types';
import { Clock, BrainCircuit, CheckCircle, XCircle } from 'lucide-react';
import { useSound } from '../hooks/useSound'; // <--- IMPORT

interface QuizModalProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isPaused, setIsPaused] = useState(false);

  const { play } = useSound(); // <--- HOOK

  if (!questions || questions.length === 0) {
    console.error("QuizModal: Savollar yo'q!");
    return null; 
  }

  const currentQ = questions[currentIndex];
  if (!currentQ) return null;

  useEffect(() => {
    if (isPaused || showResult) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentIndex, showResult, isPaused]);

  const handleTimeOut = () => {
    if (showResult) return; 
    play('wrong'); // <--- VAQT TUGASA XATO OVOZI
    setSelectedOption(-1);
    setShowResult(true);
    setIsPaused(true);
  };

  const handleSelect = (index: number) => {
    if (showResult) return;
    
    setSelectedOption(index);
    setShowResult(true);
    setIsPaused(true);
    
    if (index === currentQ.correctIndex) {
      setScore((s) => s + 100);
      play('correct'); // <--- TO'G'RI JAVOB OVOZI
    } else {
      play('wrong'); // <--- XATO JAVOB OVOZI
    }
  };

  const nextQuestion = () => {
    play('click');
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
      setTimeLeft(15);
      setIsPaused(false);
    } else {
      onComplete(score);
    }
  };

  // ... (qolgan render qismi avvalgidek, faqat tugmaga play('click') qo'shildi)
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-lg p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-2xl bg-[#0f172a] border-2 border-[#00E5FF] rounded-2xl shadow-[0_0_50px_rgba(0,229,255,0.3)] overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20"></div>

        <div className="bg-[#1e293b] p-4 flex justify-between items-center border-b border-slate-700 relative z-10">
          <div className="flex items-center gap-2 text-[#00E5FF]">
            <BrainCircuit className="w-6 h-6 animate-pulse" />
            <span className="font-orbitron font-bold text-lg tracking-wider">SECURITY CHECK</span>
          </div>
          <div className={`flex items-center gap-2 font-mono text-xl font-bold px-3 py-1 rounded ${timeLeft < 5 ? 'text-red-500 bg-red-900/20 animate-pulse' : 'text-[#FF33CC] bg-pink-900/20'}`}>
            <Clock className="w-5 h-5" />
            <span>{timeLeft}s</span>
          </div>
        </div>

        <div className="p-6 md:p-8 relative z-10">
          <div className="flex justify-between items-center mb-4">
            <span className="text-slate-400 text-xs font-mono tracking-widest">
              QUERY SEQUENCE: <span className="text-white">{currentIndex + 1}</span> / {questions.length}
            </span>
            <span className="text-slate-400 text-xs font-mono">
              SCORE: <span className="text-[#00FF66]">{score}</span>
            </span>
          </div>

          <h2 className="text-xl md:text-2xl text-white font-bold mb-8 font-orbitron leading-relaxed">
            {currentQ.question}
          </h2>

          <div className="grid grid-cols-1 gap-3">
            {currentQ.options.map((opt, idx) => {
              let stateClass = "border-slate-700 bg-slate-800/50 hover:border-[#00E5FF]/50 hover:bg-slate-800";
              let Icon = null;

              if (showResult) {
                if (idx === currentQ.correctIndex) {
                  stateClass = "border-[#00FF66] bg-[#00FF66]/20 text-[#00FF66] shadow-[0_0_15px_rgba(0,255,102,0.3)]";
                  Icon = <CheckCircle className="w-5 h-5" />;
                } else if (idx === selectedOption) {
                  stateClass = "border-red-500 bg-red-500/20 text-red-400";
                  Icon = <XCircle className="w-5 h-5" />;
                } else {
                  stateClass = "border-slate-800 opacity-40";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={showResult}
                  className={`
                    w-full text-left p-4 rounded-xl border-2 transition-all duration-200
                    flex items-center justify-between group relative overflow-hidden
                    ${stateClass}
                  `}
                >
                  <span className="text-sm md:text-lg font-medium z-10">{opt}</span>
                  {Icon && <div className="z-10 animate-bounce">{Icon}</div>}
                </button>
              );
            })}
          </div>
          
          {showResult && (
            <div className="mt-6 animate-in slide-in-from-bottom-4 fade-in duration-300">
              {currentQ.explanation && (
                <div className="bg-slate-900/80 p-4 rounded-lg border-l-4 border-[#B026FF] mb-4">
                  <p className="text-slate-300 text-sm">
                    <span className="text-[#B026FF] font-bold">INFO:</span> {currentQ.explanation}
                  </p>
                </div>
              )}
              <div className="flex justify-end">
                <button
                  onClick={nextQuestion}
                  className="px-8 py-3 bg-[#00E5FF] text-black font-bold font-orbitron rounded hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,229,255,0.5)] hover:scale-105 active:scale-95"
                >
                  {currentIndex === questions.length - 1 ? 'FINALIZE' : 'NEXT QUERY >>'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};