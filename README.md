# MemoryMaster 🃏

**Portfolio Project #15** — A professional memory card matching game

🔗 **Live:** [memory-game-liard-gamma.vercel.app](https://memory-game-liard-gamma.vercel.app)

## Features

- 🎴 **3D Card Flip Animations** — Smooth CSS transform transitions
- 🎯 **3 Difficulty Levels** — Easy (4 pairs), Medium (8 pairs), Hard (12 pairs)
- 🎨 **Emoji Card Themes** — Animals 🐶🐱🦊, Foods 🍕🍩🍦, Objects ⭐💎🚀
- ⏱️ **Move Counter & Timer** — Track your performance
- 🏆 **Best Score Tracking** — Persisted in localStorage
- 🎉 **Win Celebration** — Confetti animation on victory
- 📱 **Responsive Design** — Works on all screen sizes
- 🔊 **Sound Effects** — Toggle on/off (Web Audio API)
- 🌙 **Dark Theme** — Modern purple/violet accents

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Audio:** Web Audio API (synthesized sounds)
- **Storage:** localStorage for best scores
- **Deploy:** Vercel

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main game page
│   ├── layout.tsx        # SEO metadata
│   └── globals.css       # Animations & dark theme
├── components/
│   ├── Card.tsx          # 3D flip card component
│   ├── GameBoard.tsx     # Responsive card grid
│   ├── GameStats.tsx     # Moves/timer/best score display
│   ├── DifficultySelector.tsx
│   ├── WinModal.tsx      # Victory celebration modal
│   ├── SoundToggle.tsx   # Audio toggle button
│   └── Confetti.tsx      # Win confetti animation
├── hooks/
│   ├── useGame.ts        # Core game logic
│   ├── useSound.ts       # Web Audio API sounds
│   └── useLocalStorage.ts # Persistent storage
└── types/game.ts         # TypeScript definitions
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
```

---

*Built by Gaspi 🦝 — February 2026*
