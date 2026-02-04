'use client';

import type { BestScore, Difficulty } from '@/types/game';

interface GameStatsProps {
  moves: number;
  time: number;
  bestScore: BestScore | null;
  difficulty: Difficulty;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function GameStats({ moves, time, bestScore }: GameStatsProps) {
  return (
    <div className="flex flex-wrap gap-4 md:gap-8 justify-center items-center text-center">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl px-6 py-3 border border-slate-700/50">
        <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Moves</div>
        <div className="text-2xl md:text-3xl font-bold text-white tabular-nums">{moves}</div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl px-6 py-3 border border-slate-700/50">
        <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Time</div>
        <div className="text-2xl md:text-3xl font-bold text-white tabular-nums">{formatTime(time)}</div>
      </div>

      {bestScore && (
        <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-amber-500/30">
          <div className="text-amber-400 text-xs uppercase tracking-wider mb-1">Best</div>
          <div className="text-lg md:text-xl font-bold text-amber-300">
            {bestScore.moves} moves · {formatTime(bestScore.time)}
          </div>
        </div>
      )}
    </div>
  );
}
