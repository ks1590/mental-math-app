import { motion } from 'framer-motion';
import { Star, Timer } from 'lucide-react';
import { ScorePopup } from '../ScorePopup';
import { Feedback } from '../Feedback';
import { ScoreDisplay } from '../ScoreDisplay';
import { useOperationColor } from '@/hooks';
import { Problem } from '@/lib/math-engine';

interface GamePlayingScreenProps {
  status: 'idle' | 'countdown' | 'playing' | 'finished';
  timeLeft: number;
  score: number;
  combo: number;
  questionsAnswered: number;
  gameMode: string;
  tickSpeed: number;
  currentProblem: Problem | null;
  feedback: 'correct' | 'incorrect' | null;
  showScorePopup: boolean;
  scoreGain: number;
  submitAnswer: (answer: number) => void;
  controls: any; // AnimationControls
}

export const GamePlayingScreen = ({
  status,
  timeLeft,
  score,
  combo,
  questionsAnswered,
  gameMode,
  tickSpeed,
  currentProblem,
  feedback,
  showScorePopup,
  scoreGain,
  submitAnswer,
  controls,
}: GamePlayingScreenProps) => {
  const { getOperationColor } = useOperationColor();

  if (status !== 'playing' || !currentProblem) return null;

  return (
    <motion.div
      key="game"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center relative"
    >
      {/* Header Info */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
          <Timer className="text-blue-500" />
          <span className={`text-xl font-bold ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-gray-700'}`}>
            {timeLeft}秒
          </span>
        </div>
        <ScoreDisplay score={score} combo={combo} />
      </div>

      {/* Survival Mode Stats */}
      {gameMode === 'survival' && (
        <div className="flex justify-center gap-3 mb-4">
          <div className="bg-white/80 px-3 py-1 rounded-full shadow-sm">
            <span className="text-sm font-bold text-gray-600">{questionsAnswered}問クリア</span>
          </div>
          {tickSpeed < 1000 && (
            <div className="bg-orange-100 px-3 py-1 rounded-full shadow-sm">
              <span className="text-sm font-bold text-orange-600">×{(1000 / tickSpeed).toFixed(1)}倍速</span>
            </div>
          )}
        </div>
      )}

      {/* Combo Display */}
      <div className="h-8 mb-2">
        {combo >= 2 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1.2 }}
            className="text-orange-500 font-black text-lg flex justify-center items-center gap-1 mt-8"
          >
            <Star size={20} fill="currentColor" />
            {combo} コンボ！
            <Star size={20} fill="currentColor" />
          </motion.div>
        )}
      </div>

      {/* Problem Area */}
      <div className="relative mb-8">
        <Feedback type={feedback} />
        <ScorePopup score={scoreGain} isVisible={showScorePopup} />

        <motion.div
          animate={feedback === 'correct' ? { scale: [1, 1.1, 1] } : feedback === 'incorrect' ? controls : {}}
          className="bg-slate-100 rounded-3xl py-10 px-4 shadow-inner border-2 border-slate-200"
        >
          <div className="flex justify-center items-center gap-2 md:gap-4 text-5xl md:text-6xl font-black text-slate-700">
            {/* Operand A */}
            {currentProblem.missingComponent === 'a' ? (
              <span className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-blue-500">
                ?
              </span>
            ) : (
              <span>{currentProblem.operands.a}</span>
            )}

            {/* Operation Symbol */}
            <span className={getOperationColor(currentProblem.operation)}>
              {currentProblem.operation === 'add' && '+'}
              {currentProblem.operation === 'subtract' && '-'}
              {currentProblem.operation === 'multiply' && '×'}
              {currentProblem.operation === 'divide' && '÷'}
            </span>

            {/* Operand B */}
            {currentProblem.missingComponent === 'b' ? (
              <span className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-blue-500">
                ?
              </span>
            ) : (
              <span>{currentProblem.operands.b}</span>
            )}

            <span className="text-gray-400">=</span>

            {/* Result */}
            {currentProblem.missingComponent === 'result' || !currentProblem.missingComponent ? (
              <span className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-blue-500">
                ?
              </span>
            ) : (
              <span>{currentProblem.result}</span>
            )}
          </div>
        </motion.div>
      </div>

      {/* Choice Buttons */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-xs mx-auto mt-4">
        {currentProblem.choices.map((choice) => (
          <motion.button
            key={`${currentProblem.id}-${choice}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => feedback === null && submitAnswer(choice)}
            className="bg-white border-b-4 border-orange-200 text-orange-600 text-3xl font-black py-6 rounded-2xl shadow-lg active:border-b-0 active:translate-y-1 transition-all"
          >
            {choice}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
