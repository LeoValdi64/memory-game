'use client';

import { memo } from 'react';

interface CardProps {
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
  disabled: boolean;
}

function CardComponent({ emoji, isFlipped, isMatched, onClick, disabled }: CardProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isFlipped || isMatched}
      className="aspect-square perspective-1000 cursor-pointer disabled:cursor-default"
      aria-label={isFlipped || isMatched ? emoji : 'Hidden card'}
    >
      <div
        className={`relative w-full h-full transition-transform duration-600 transform-style-3d ${
          isFlipped || isMatched ? 'rotate-y-180' : ''
        }`}
      >
        {/* Card Back */}
        <div
          className={`absolute inset-0 backface-hidden rounded-xl flex items-center justify-center text-4xl md:text-5xl lg:text-6xl
            bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700
            border-2 border-violet-400/30
            shadow-lg shadow-violet-500/20
            hover:shadow-xl hover:shadow-violet-500/30
            hover:from-violet-500 hover:via-purple-500 hover:to-indigo-600
            transition-all duration-200
            ${!isFlipped && !isMatched ? 'hover:scale-105' : ''}`}
        >
          <span className="text-violet-200/60 text-3xl md:text-4xl">?</span>
        </div>

        {/* Card Front */}
        <div
          className={`absolute inset-0 backface-hidden rotate-y-180 rounded-xl flex items-center justify-center text-4xl md:text-5xl lg:text-6xl
            bg-gradient-to-br from-slate-800 to-slate-900
            border-2 transition-all duration-300
            ${isMatched
              ? 'border-emerald-400 shadow-lg shadow-emerald-500/50 animate-glow-green'
              : 'border-slate-600 shadow-lg shadow-slate-500/20'
            }`}
        >
          <span className={`transform ${isMatched ? 'scale-110' : ''} transition-transform duration-300`}>
            {emoji}
          </span>
        </div>
      </div>
    </button>
  );
}

export const Card = memo(CardComponent);
