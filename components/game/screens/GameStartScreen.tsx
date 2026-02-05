import { motion } from 'framer-motion';
import { GameModeSelector } from '../GameModeSelector';
import { DifficultySelector } from '../DifficultySelector';
import { DifficultyLevel } from '@/lib/math-engine';

type GameMode = 'normal' | 'survival' | 'fill-in-the-blank';

interface GameStartScreenProps {
  gameMode: GameMode;
  setGameMode: (mode: GameMode) => void;
  difficultyLevel: DifficultyLevel;
  setDifficulty: (level: DifficultyLevel) => void;
  startGame: () => void;
}

export const GameStartScreen = ({
  gameMode,
  setGameMode,
  difficultyLevel,
  setDifficulty,
  startGame,
}: GameStartScreenProps) => {
  return (
    <motion.div
      key="start"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center pt-4"
    >
      <GameModeSelector selectedMode={gameMode} onSelectMode={setGameMode} />

      <DifficultySelector selectedLevel={difficultyLevel} onSelectLevel={setDifficulty} />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => startGame()}
        className="mt-10 bg-gradient-to-b from-sky-400 to-sky-500 text-white text-2xl font-bold py-4 px-12 rounded-full shadow-lg border-b-4 border-sky-600 active:border-b-0 active:translate-y-1"
      >
        スタート！
      </motion.button>
    </motion.div>
  );
};
