'use client';

import { useState, useEffect, useCallback } from 'react';
import type { BestScores, Difficulty, BestScore } from '@/types/game';

const STORAGE_KEY = 'memorymaster-best-scores';

const initialScores: BestScores = {
  easy: null,
  medium: null,
  hard: null,
};

export function useBestScores() {
  const [bestScores, setBestScores] = useState<BestScores>(initialScores);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setBestScores(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load best scores:', e);
    }
    setIsLoaded(true);
  }, []);

  const updateBestScore = useCallback((difficulty: Difficulty, moves: number, time: number) => {
    setBestScores(prev => {
      const current = prev[difficulty];
      // New best if no previous score, fewer moves, or same moves but faster time
      const isNewBest = !current ||
        moves < current.moves ||
        (moves === current.moves && time < current.time);

      if (!isNewBest) return prev;

      const newScore: BestScore = {
        moves,
        time,
        date: new Date().toISOString(),
      };

      const newScores = {
        ...prev,
        [difficulty]: newScore,
      };

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newScores));
      } catch (e) {
        console.error('Failed to save best score:', e);
      }

      return newScores;
    });
  }, []);

  const clearBestScores = useCallback(() => {
    setBestScores(initialScores);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear best scores:', e);
    }
  }, []);

  return { bestScores, updateBestScore, clearBestScores, isLoaded };
}
