'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import type { Card, Difficulty, GameState } from '@/types/game';
import { DIFFICULTY_CONFIG, SYMBOL_SETS } from '@/types/game';

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function generateCards(difficulty: Difficulty): Card[] {
  const { pairs } = DIFFICULTY_CONFIG[difficulty];

  // Combine all symbol sets and shuffle, then take needed number
  const allSymbols = shuffleArray([
    ...SYMBOL_SETS.animals,
    ...SYMBOL_SETS.foods,
    ...SYMBOL_SETS.objects,
  ]);

  const selectedSymbols = allSymbols.slice(0, pairs);

  // Create pairs
  const cards: Card[] = [];
  selectedSymbols.forEach((symbol, index) => {
    cards.push(
      { id: index * 2, symbol, isFlipped: false, isMatched: false },
      { id: index * 2 + 1, symbol, isFlipped: false, isMatched: false }
    );
  });

  return shuffleArray(cards);
}

const initialState: GameState = {
  cards: [],
  flippedCards: [],
  moves: 0,
  time: 0,
  isPlaying: false,
  isWon: false,
  difficulty: 'medium',
};

interface UseGameReturn {
  gameState: GameState;
  flipCard: (id: number) => void;
  startGame: (difficulty: Difficulty) => void;
  resetGame: () => void;
  isChecking: boolean;
}

export function useGame(
  onMatch?: () => void,
  onWin?: () => void
): UseGameReturn {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [isChecking, setIsChecking] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer effect
  useEffect(() => {
    if (gameState.isPlaying && !gameState.isWon) {
      timerRef.current = setInterval(() => {
        setGameState(prev => ({ ...prev, time: prev.time + 1 }));
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameState.isPlaying, gameState.isWon]);

  const startGame = useCallback((difficulty: Difficulty) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setGameState({
      cards: generateCards(difficulty),
      flippedCards: [],
      moves: 0,
      time: 0,
      isPlaying: true,
      isWon: false,
      difficulty,
    });
    setIsChecking(false);
  }, []);

  const resetGame = useCallback(() => {
    startGame(gameState.difficulty);
  }, [startGame, gameState.difficulty]);

  const flipCard = useCallback((id: number) => {
    if (isChecking) return;

    setGameState(prev => {
      const card = prev.cards.find(c => c.id === id);
      if (!card || card.isFlipped || card.isMatched) return prev;
      if (prev.flippedCards.length >= 2) return prev;

      const newFlippedCards = [...prev.flippedCards, id];
      const newCards = prev.cards.map(c =>
        c.id === id ? { ...c, isFlipped: true } : c
      );

      // If this is the second card, increment moves
      const newMoves = newFlippedCards.length === 2 ? prev.moves + 1 : prev.moves;

      return {
        ...prev,
        cards: newCards,
        flippedCards: newFlippedCards,
        moves: newMoves,
      };
    });
  }, [isChecking]);

  // Check for matches
  useEffect(() => {
    if (gameState.flippedCards.length !== 2) return;

    setIsChecking(true);

    const [firstId, secondId] = gameState.flippedCards;
    const firstCard = gameState.cards.find(c => c.id === firstId);
    const secondCard = gameState.cards.find(c => c.id === secondId);

    if (!firstCard || !secondCard) {
      setIsChecking(false);
      return;
    }

    const isMatch = firstCard.symbol === secondCard.symbol;

    const timeout = setTimeout(() => {
      setGameState(prev => {
        const newCards = prev.cards.map(card => {
          if (card.id === firstId || card.id === secondId) {
            return isMatch
              ? { ...card, isMatched: true }
              : { ...card, isFlipped: false };
          }
          return card;
        });

        const allMatched = newCards.every(c => c.isMatched);

        if (isMatch) {
          onMatch?.();
        }

        if (allMatched) {
          onWin?.();
        }

        return {
          ...prev,
          cards: newCards,
          flippedCards: [],
          isWon: allMatched,
        };
      });

      setIsChecking(false);
    }, isMatch ? 500 : 1000);

    return () => clearTimeout(timeout);
  }, [gameState.flippedCards, gameState.cards, onMatch, onWin]);

  return {
    gameState,
    flipCard,
    startGame,
    resetGame,
    isChecking,
  };
}
