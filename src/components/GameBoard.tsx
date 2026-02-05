'use client';

import { Card } from './Card';
import type { Card as CardType, Difficulty } from '@/types/game';
import { DIFFICULTY_CONFIG } from '@/types/game';

interface GameBoardProps {
  cards: CardType[];
  difficulty: Difficulty;
  onCardClick: (id: number) => void;
  disabled: boolean;
}

export function GameBoard({ cards, difficulty, onCardClick, disabled }: GameBoardProps) {
  const { cols } = DIFFICULTY_CONFIG[difficulty];

  return (
    <div
      className="grid gap-3 md:gap-4 w-full max-w-2xl mx-auto p-4"
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
    >
      {cards.map(card => (
        <Card
          key={card.id}
          label={card.label}
          isFlipped={card.isFlipped}
          isMatched={card.isMatched}
          onClick={() => onCardClick(card.id)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
