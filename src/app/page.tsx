'use client';

import { useState, useCallback, useEffect } from 'react';
import { GameBoard } from '@/components/GameBoard';
import { GameStats } from '@/components/GameStats';
import { DifficultySelector } from '@/components/DifficultySelector';
import { WinModal } from '@/components/WinModal';
import { SoundToggle } from '@/components/SoundToggle';
import { Confetti } from '@/components/Confetti';
import { useGame } from '@/hooks/useGame';
import { useSound } from '@/hooks/useSound';
import { useBestScores } from '@/hooks/useLocalStorage';
import type { Difficulty } from '@/types/game';

export default function Home() {
  const { playSound, isMuted, toggleMute } = useSound();
  const { bestScores, updateBestScore, isLoaded } = useBestScores();
  const [showWinModal, setShowWinModal] = useState(false);
  const [isNewBest, setIsNewBest] = useState(false);
  const [gameKey, setGameKey] = useState(0);

  const handleMatch = useCallback(() => {
    playSound('match');
  }, [playSound]);

  const handleWin = useCallback(() => {
    playSound('win');
    setShowWinModal(true);
  }, [playSound]);

  const { gameState, flipCard, startGame, resetGame, isChecking } = useGame(
    handleMatch,
    handleWin
  );

  // Check for new best score when winning
  useEffect(() => {
    if (gameState.isWon) {
      const currentBest = bestScores[gameState.difficulty];
      const isNewRecord = !currentBest ||
        gameState.moves < currentBest.moves ||
        (gameState.moves === currentBest.moves && gameState.time < currentBest.time);

      setIsNewBest(isNewRecord);

      if (isNewRecord) {
        updateBestScore(gameState.difficulty, gameState.moves, gameState.time);
      }
    }
  }, [gameState.isWon, gameState.moves, gameState.time, gameState.difficulty, bestScores, updateBestScore]);

  const handleCardClick = useCallback((id: number) => {
    playSound('flip');
    flipCard(id);
  }, [playSound, flipCard]);

  const handleDifficultyChange = useCallback((difficulty: Difficulty) => {
    playSound('click');
    startGame(difficulty);
    setShowWinModal(false);
    setIsNewBest(false);
    setGameKey(prev => prev + 1);
  }, [playSound, startGame]);

  const handlePlayAgain = useCallback(() => {
    playSound('click');
    resetGame();
    setShowWinModal(false);
    setIsNewBest(false);
    setGameKey(prev => prev + 1);
  }, [playSound, resetGame]);

  const handleChangeDifficulty = useCallback(() => {
    setShowWinModal(false);
    setIsNewBest(false);
  }, []);

  // Start game on mount
  useEffect(() => {
    if (isLoaded && !gameState.isPlaying) {
      startGame('medium');
    }
  }, [isLoaded, gameState.isPlaying, startGame]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 py-8 px-4">
      <Confetti isActive={gameState.isWon} key={gameKey} />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-4xl">🧠</span>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              MemoryMaster
            </h1>
          </div>
          <p className="text-slate-400 text-lg">Find all the matching pairs!</p>
        </div>

        {/* Sound Toggle */}
        <div className="absolute top-4 right-4">
          <SoundToggle isMuted={isMuted} onToggle={toggleMute} />
        </div>

        {/* Difficulty Selector */}
        <div className="mb-6">
          <DifficultySelector
            currentDifficulty={gameState.difficulty}
            onSelect={handleDifficultyChange}
            disabled={isChecking}
          />
        </div>

        {/* Game Stats */}
        <div className="mb-6">
          <GameStats
            moves={gameState.moves}
            time={gameState.time}
            bestScore={bestScores[gameState.difficulty]}
            difficulty={gameState.difficulty}
          />
        </div>

        {/* Game Board */}
        <GameBoard
          cards={gameState.cards}
          difficulty={gameState.difficulty}
          onCardClick={handleCardClick}
          disabled={isChecking || gameState.isWon}
        />

        {/* Reset Button */}
        <div className="text-center mt-8">
          <button
            onClick={handlePlayAgain}
            className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40"
          >
            🔄 New Game
          </button>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-slate-500 text-sm">
          <p>Match all pairs to win! Click or tap cards to flip them.</p>
          <p className="mt-1">Best scores are saved locally.</p>
        </footer>
      </div>

      {/* Win Modal */}
      <WinModal
        isOpen={showWinModal}
        moves={gameState.moves}
        time={gameState.time}
        isNewBest={isNewBest}
        onPlayAgain={handlePlayAgain}
        onChangeDifficulty={handleChangeDifficulty}
      />
    </main>
  );
}
