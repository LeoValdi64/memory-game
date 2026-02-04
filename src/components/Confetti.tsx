'use client';

import { useEffect, useState, useMemo } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
}

interface ConfettiProps {
  isActive: boolean;
}

const COLORS = [
  '#f43f5e', // rose
  '#8b5cf6', // violet
  '#3b82f6', // blue
  '#22c55e', // green
  '#eab308', // yellow
  '#f97316', // orange
  '#ec4899', // pink
  '#06b6d4', // cyan
];

export function Confetti({ isActive }: ConfettiProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  const confettiPieces = useMemo(() => {
    if (!isActive) return [];
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
      size: 8 + Math.random() * 8,
    }));
  }, [isActive]);

  useEffect(() => {
    if (isActive) {
      setPieces(confettiPieces);

      const timeout = setTimeout(() => {
        setPieces([]);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [isActive, confettiPieces]);

  if (pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map(piece => (
        <div
          key={piece.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${piece.x}%`,
            top: '-20px',
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
}
