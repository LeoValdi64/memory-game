'use client';

import { Sparkles, Trophy } from 'lucide-react';
import type { Difficulty } from '@/types/game';

interface WinModalProps {
  isOpen: boolean;
  moves: number;
  time: number;
  isNewBest: boolean;
  onPlayAgain: () => void;
  onChangeDifficulty: () => void;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function WinModal({
  isOpen,
  moves,
  time,
  isNewBest,
  onPlayAgain,
  onChangeDifficulty,
}: WinModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-md w-full border border-slate-700/50 shadow-2xl animate-scale-in">
        <div className="text-center">
          <div className="text-6xl mb-4"><Sparkles className="w-16 h-16 mx-auto text-yellow-400" /></div>
          <h2 className="text-3xl font-bold text-white mb-2">Congratulations!</h2>
          <p className="text-slate-400 mb-6">You found all the pairs!</p>

          {isNewBest && (
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-lg p-3 mb-6">
              <span className="text-amber-400 font-semibold inline-flex items-center gap-1"><Trophy className="w-5 h-5" /> New Best Score!</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-700/50 rounded-xl p-4">
              <div className="text-slate-400 text-sm uppercase tracking-wider mb-1">Moves</div>
              <div className="text-3xl font-bold text-white">{moves}</div>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-4">
              <div className="text-slate-400 text-sm uppercase tracking-wider mb-1">Time</div>
              <div className="text-3xl font-bold text-white">{formatTime(time)}</div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={onPlayAgain}
              className="w-full py-3 px-6 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/30"
            >
              Play Again
            </button>
            <button
              onClick={onChangeDifficulty}
              className="w-full py-3 px-6 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium rounded-xl transition-colors"
            >
              Change Difficulty
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
