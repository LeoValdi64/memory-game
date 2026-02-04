'use client';

import type { Difficulty } from '@/types/game';
import { DIFFICULTY_CONFIG } from '@/types/game';

interface DifficultySelectorProps {
  currentDifficulty: Difficulty;
  onSelect: (difficulty: Difficulty) => void;
  disabled?: boolean;
}

const difficultyLabels: Record<Difficulty, { name: string; description: string }> = {
  easy: { name: 'Easy', description: '4 pairs' },
  medium: { name: 'Medium', description: '8 pairs' },
  hard: { name: 'Hard', description: '12 pairs' },
};

export function DifficultySelector({ currentDifficulty, onSelect, disabled }: DifficultySelectorProps) {
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {difficulties.map(difficulty => {
        const { name, description } = difficultyLabels[difficulty];
        const isActive = currentDifficulty === difficulty;

        return (
          <button
            key={difficulty}
            onClick={() => onSelect(difficulty)}
            disabled={disabled}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all duration-200
              ${isActive
                ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            <span className="block text-sm md:text-base">{name}</span>
            <span className="block text-xs opacity-70">{description}</span>
          </button>
        );
      })}
    </div>
  );
}
