export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Card {
  id: number;
  label: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: Card[];
  flippedCards: number[];
  moves: number;
  time: number;
  isPlaying: boolean;
  isWon: boolean;
  difficulty: Difficulty;
}

export interface BestScore {
  moves: number;
  time: number;
  date: string;
}

export type BestScores = Record<Difficulty, BestScore | null>;

export const DIFFICULTY_CONFIG: Record<Difficulty, { pairs: number; cols: number }> = {
  easy: { pairs: 4, cols: 4 },
  medium: { pairs: 8, cols: 4 },
  hard: { pairs: 12, cols: 6 },
};

export const SYMBOL_SETS = {
  animals: ['Dog', 'Cat', 'Panda', 'Fox', 'Lion', 'Frog', 'Ape', 'Bunny', 'Bear', 'Koala', 'Tiger', 'Uni'],
  foods: ['Apple', 'Pizza', 'Burger', 'Donut', 'Cream', 'Taco', 'Sushi', 'Cake', 'Cookie', 'Berry', 'Grape', 'Avo'],
  objects: ['Star', 'Gem', 'Ball', 'Music', 'Ship', 'Bulb', 'Dart', 'Orb', 'Tent', 'Mask', 'Cup', 'Art'],
};
