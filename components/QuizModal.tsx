import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types';
import { Clock, BrainCircuit } from 'lucide-react';

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

  useEffect(() => {
    if (isPaused || showResult) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, showResult, isPaused]);

  // Safety check
  if (!questions || questions.length === 0) {
    return null;
  }

  const currentQ = questions[currentIndex];

  const handleTimeOut = () => {
    setSelectedOption(-1); // -1 means timed out
    setShowResult(true);
    setIsPaused(true);
  };

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelectedOption(index);
    setShowResult(true);
    setIsPaused(true);
    if (index === currentQ.correctIndex) {
      setScore(s => s + 100);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
      setTimeLeft(15);
      setIsPaused(false);
    } else {
      onComplete(score);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div className="w-full max-w-2xl bg-slate-900 border border-neon-cyan/50 rounded-2xl shadow-[0_0_50px_rgba(0,229,255,0.2)] overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-950 p-4 flex justify-between items-center border-b border-slate-800">
          <div className="flex items-center gap-2 text-neon-cyan">
            <BrainCircuit className="w-6 h-6" />
            <span className="font-orbitron font-bold text-lg">SYSTEM CHECK: LEVEL SECURITY</span>
          </div>
          <div className="flex items-center gap-2 text-neon-pink">
            <Clock className={`w-5 h-5 ${timeLeft < 5 ? 'animate-pulse' : ''}`} />
            <span className="font-mono text-xl">{timeLeft}s</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="mb-2 text-slate-400 text-sm font-mono">QUERY {currentIndex + 1} / {questions.length}</div>
          <h2 className="text-2xl text-white font-bold mb-8">{currentQ.question}</h2>

          <div className="grid grid-cols-1 gap-4">
            {currentQ.options.map((opt, idx) => {
              let stateClass = "border-slate-700 hover:border-neon-cyan/50 hover:bg-slate-800";
              
              if (showResult) {
                if (idx === currentQ.correctIndex) stateClass = "border-green-500 bg-green-900/20 text-green-300";
                else if (idx === selectedOption) stateClass = "border-red-500 bg-red-900/20 text-red-300";
                else stateClass = "border-slate-800 opacity-50";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={showResult}
                  className={`
                    w-full text-left p-4 rounded-lg border-2 transition-all duration-200
                    flex items-center justify-between group
                    ${stateClass}
                  `}
                >
                  <span className="text-lg">{opt}</span>
                  {showResult && idx === currentQ.correctIndex && (
                     <span className="text-green-400 font-bold">CORRECT</span>
                  )}
                </button>
              );
            })}
          </div>
          
          {showResult && (
            <div className="mt-6 animate-in fade-in slide-in-from-bottom-2">
              <div className="bg-slate-950 p-4 rounded-lg border-l-4 border-neon-purple">
                <p className="text-slate-300 text-sm">{currentQ.explanation}</p>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={nextQuestion}
                  className="px-8 py-3 bg-neon-cyan text-black font-bold font-orbitron rounded hover:bg-cyan-300 transition-colors shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                >
                  {currentIndex === questions.length - 1 ? 'COMPLETE' : 'NEXT QUERY'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};