import { motion } from 'framer-motion';
import { Trophy, RotateCcw } from 'lucide-react';
import { useConfetti } from '@/hooks';

interface GameResultScreenProps {
  score: number;
  maxCombo: number;
  questionsAnswered: number;
  gameMode: string;
  startGame: (duration?: number) => void;
  status: 'idle' | 'countdown' | 'playing' | 'finished';
}

export const GameResultScreen = ({
  score,
  maxCombo,
  questionsAnswered,
  gameMode,
  startGame,
  status,
}: GameResultScreenProps) => {
  // Trigger confetti when status becomes 'finished'
  useConfetti(status === 'finished');

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-6"
    >
      <div className="mb-6">
        <Trophy size={80} className="mx-auto text-yellow-400 mb-8 drop-shadow-md" />
        <h2 className="text-3xl font-black text-gray-700 mb-4">よくできました！</h2>
        <p className="text-gray-500 font-bold">今回のスコア</p>
        <p className="text-6xl font-black text-sky-500 my-4">{score}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8 text-left bg-white p-4 rounded-xl shadow-sm">
        <div>
          <p className="text-xs text-gray-400 font-bold">さいだいコンボ</p>
          <p className="text-xl font-bold text-gray-700">{maxCombo} 回</p>
        </div>
        <div>
          {gameMode === 'survival' ? (
            <>
              <p className="text-xs text-gray-400 font-bold">クリア数</p>
              <p className="text-xl font-bold text-orange-500">{questionsAnswered}問</p>
            </>
          ) : (
            <>
              <p className="text-xs text-gray-400 font-bold">ランク</p>
              <p className="text-xl font-bold text-orange-500">
                {score > 300 ? 'SS' : score > 200 ? 'S' : score > 100 ? 'A' : 'B'}
              </p>
            </>
          )}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => startGame(30)}
        className="flex items-center justify-center gap-2 w-full bg-sky-500 text-white text-xl font-bold py-4 rounded-2xl shadow-lg hover:bg-sky-600 transition-colors"
      >
        <RotateCcw size={24} />
        もういちど遊ぶ
      </motion.button>
    </motion.div>
  );
};
